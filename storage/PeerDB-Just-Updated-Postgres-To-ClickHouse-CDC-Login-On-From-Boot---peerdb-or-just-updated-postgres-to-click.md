# Deploy PeerDB | (Just Updated) Postgres To ClickHouse CDC, Login On From Boot on Railway

PeerDB Postgres to ClickHouse CDC. Login on from boot, catalog kept

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/peerdb-or-just-updated-postgres-to-click)

## About

PeerDB is an open-source data movement engine built for Postgres. It streams a Postgres database
into ClickHouse (and other warehouses and queues) with change data capture, so your analytics copy
stays seconds behind production instead of a nightly dump behind it. You create peers and mirrors
from a web UI or from plain SQL over the Postgres wire protocol.

PeerDB is not one container. A working install is a catalog Postgres, a Temporal server that runs
the replication workflows, an object store for staging files, an API, two workers, the SQL server
on port 9900 and the web UI. The upstream `docker-compose` file wires those together and publishes
the UI on a port with **no login at all** (`authentication is disabled` in the API log). Copy that
to a public host and anyone who finds the URL can add peers holding your database credentials.

This template deploys the whole stack as nine Railway services with private networking already
wired, and puts a basic-auth proxy in front of the UI:

- **`peerdb`** is the only service with a public URL. Username `peerdb`, password generated per
  deploy (`PASSWORD` in that service's variables). Without credentials you get a 401.
- **`peerdb-server`** speaks the Postgres protocol on a Railway TCP proxy. Connect with `psql` using
  the ready-made `PEERDB_CONNECT` variable and run `CREATE PEER` / `CREATE MIRROR` as SQL.
- **`catalog`** is Postgres with `wal_level=logical` and a volume, so peers and mirror definitions
  survive redeploys.
- **`temporal`** runs on the same catalog Postgres, with the `MirrorName` search attribute PeerDB
  needs created automatically on boot, and dynamic config applied.
- **`minio`** (a community fork of MinIO, with a volume) provides the staging bucket that ClickHouse
  mirrors use; the `peerdbbucket` bucket is created for you.
- **`flow-api`**, **`flow-worker`**, **`flow-snapshot-worker`** and **`peerdb-ui`** are the upstream
  images, pinned to `stable-v0.35.5`. The Temporal UI and the admin-tools sidecar from the compose
  file are left out; the sidecar's one job is done by the Temporal start command.

Verified on a live deploy of this template: unauthenticated requests get 401, authenticated
requests to the UI and the REST API return 200, `psql` over the TCP proxy runs queries, a Postgres
peer is created (which exercises the SQL server, the API and the catalog), and that peer was still
there after the catalog service was redeployed.

What this template does not include is your data. Bring a **source Postgres** with logical
replication enabled (`wal_level=logical`) and a **ClickHouse** destination, then add them as peers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal | `temporalio/auto-setup:1.29.7` | Worker |
| flow-api | `ghcr.io/peerdb-io/flow-api:stable-v0.35.5` | Worker |
| flow-snapshot-worker | `ghcr.io/peerdb-io/flow-snapshot-worker:stable-v0.35.5` | Worker |
| minio | `pgsty/silo:RELEASE.2026-09-16T00-00-00Z` | Database |
| peerdb | `ghcr.io/brody192/railway-caddy-basic-auth:main` | Web service |
| catalog | `postgres:18.4-alpine` | Database |
| peerdb-ui | `ghcr.io/peerdb-io/peerdb-ui:stable-v0.35.5` | Worker |
| flow-worker | `ghcr.io/peerdb-io/flow-worker:stable-v0.35.5` | Worker |
| peerdb-server | `ghcr.io/peerdb-io/peerdb-server:stable-v0.35.5` | TCP service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PEERDB_CATALOG_PASSWORD` | flow-api | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_ACCESS_KEY_ID` | flow-api | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_ENDPOINT_URL_S3` | flow-api | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_SECRET_ACCESS_KEY` | flow-api | (secret) |
| `PEERDB_CATALOG_PASSWORD` | flow-snapshot-worker | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_ACCESS_KEY_ID` | flow-snapshot-worker | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_ENDPOINT_URL_S3` | flow-snapshot-worker | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_SECRET_ACCESS_KEY` | flow-snapshot-worker | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `PASSWORD` | peerdb | (secret) |
| `USERNAME` | peerdb | (secret) |
| `POSTGRES_PASSWORD` | catalog | (secret) |
| `NEXTAUTH_SECRET` | peerdb-ui | (secret) |
| `PEERDB_CATALOG_PASSWORD` | peerdb-ui | (secret) |
| `PEERDB_CATALOG_PASSWORD` | flow-worker | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_ACCESS_KEY_ID` | flow-worker | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_ENDPOINT_URL_S3` | flow-worker | (secret) |
| `PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_SECRET_ACCESS_KEY` | flow-worker | (secret) |
| `PEERDB_PASSWORD` | peerdb-server | (secret) |
| `PEERDB_CATALOG_PASSWORD` | peerdb-server | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export DB=postgres12 DB_PORT=5432 POSTGRES_USER=postgres DBNAME=temporal VISIBILITY_DBNAME=temporal_visibility ENABLE_ES=false DEFAULT_NAMESPACE=default DEFAULT_NAMESPACE_RETENTION=72h DYNAMIC_CONFIG_FILE_PATH=config/peerdb-dynamic.yaml PORT=7233 BIND_ON_IP=:: TEMPORAL_BROADCAST_ADDRESS=127.0.0.1 TEMPORAL_ADDRESS=127.0.0.1:7233; printf "limit.maxIDLength:\n  - value: 255\n    constraints: {}\nfrontend.enableUpdateWorkflowExecution:\n  - value: true\n    constraints: {}\n" > /etc/temporal/config/peerdb-dynamic.yaml; ( until temporal operator search-attribute list --namespace default 2>/dev/null | grep -qw MirrorName || temporal operator search-attribute create --namespace default --name MirrorName --type Text >/dev/null 2>&1; do sleep 5; done; echo "[railway] MirrorName search attribute present" ) & exec /etc/temporal/entrypoint.sh autosetup'`
- **Start command:** `/bin/sh -c 'export PEERDB_CATALOG_PORT=5432 PEERDB_CATALOG_USER=postgres PEERDB_CATALOG_DATABASE=postgres; export PEERDB_TEMPORAL_NAMESPACE=default PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_REGION=us-east-1 PEERDB_CLICKHOUSE_AWS_S3_BUCKET_NAME=peerdbbucket; until nc -z "${TEMPORAL_HOST_PORT%:*}" "${TEMPORAL_HOST_PORT##*:}"; do echo "[railway] waiting for temporal"; sleep 3; done; exec ./peer-flow api --port 8112 --gateway-port 8113'`
- **Start command:** `/bin/sh -c 'export PEERDB_CATALOG_PORT=5432 PEERDB_CATALOG_USER=postgres PEERDB_CATALOG_DATABASE=postgres; export PEERDB_TEMPORAL_NAMESPACE=default PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_REGION=us-east-1 PEERDB_CLICKHOUSE_AWS_S3_BUCKET_NAME=peerdbbucket; until nc -z "${TEMPORAL_HOST_PORT%:*}" "${TEMPORAL_HOST_PORT##*:}"; do echo "[railway] waiting for temporal"; sleep 3; done; exec ./peer-flow snapshot-worker'`
- **Start command:** `/bin/sh -c 'mkdir -p /data/peerdbbucket; exec silo server /data --address :9000 --console-address :9001'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'export POSTGRES_USER=postgres POSTGRES_DB=postgres; exec docker-entrypoint.sh postgres -c wal_level=logical -c max_wal_senders=4 -c max_replication_slots=4'`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export PEERDB_CATALOG_PORT=5432 PEERDB_CATALOG_USER=postgres PEERDB_CATALOG_DATABASE=postgres; export PORT=3000 HOSTNAME=:: PEERDB_EXPERIMENTAL_ENABLE_SCRIPTING=true; export DATABASE_URL="postgres://postgres:${PEERDB_CATALOG_PASSWORD}@${PEERDB_CATALOG_HOST}:5432/postgres"; exec /app/entrypoint.sh node server.js'`
- **Start command:** `/bin/sh -c 'export PEERDB_CATALOG_PORT=5432 PEERDB_CATALOG_USER=postgres PEERDB_CATALOG_DATABASE=postgres; export PEERDB_TEMPORAL_NAMESPACE=default PEERDB_CLICKHOUSE_AWS_CREDENTIALS_AWS_REGION=us-east-1 PEERDB_CLICKHOUSE_AWS_S3_BUCKET_NAME=peerdbbucket; until nc -z "${TEMPORAL_HOST_PORT%:*}" "${TEMPORAL_HOST_PORT##*:}"; do echo "[railway] waiting for temporal"; sleep 3; done; exec ./peer-flow worker'`
- **Start command:** `/bin/sh -c 'export PEERDB_CATALOG_PORT=5432 PEERDB_CATALOG_USER=postgres PEERDB_CATALOG_DATABASE=postgres; export RUST_LOG=info PEERDB_HOST=:: PEERDB_PORT=9900; exec ./peerdb-server'`
- **TCP Proxies:** 9900

**Category:** Storage

[View on Railway →](https://railway.com/deploy/peerdb-or-just-updated-postgres-to-click)
