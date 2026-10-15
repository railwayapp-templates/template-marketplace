# Deploy CockroachDB | (Just Updated) Distributed SQL Database, Secure From Boot, Data Survives Redeploys on Railway

Secure single-node CockroachDB SQL database with persistent volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cockroachdb-or-just-updated-distributed-)

## About

CockroachDB is a distributed SQL database that speaks the PostgreSQL wire protocol, so existing drivers and ORMs connect to it unchanged. This template runs CockroachDB as a single secure node from a digest-pinned official image, with TLS enabled from the first boot, a generated SQL password and a persistent volume.

CockroachDB needs several things handled for Railway, all done in the start command:

- **Secure mode, not insecure mode.** The node generates its own certificate authority and node certificate on first boot and stores them on the volume. The certificate covers the TCP proxy and private hostnames, so `sslmode=require` works from outside and inside the project.
- **A real SQL user.** An `app` user with the `admin` role is created on every boot with the password in `CRDB_PASSWORD`, which is generated per deploy. No default credential is ever live on a public address. A database named `app` is created for you.
- **Writable volume.** Railway mounts volumes root-owned, so the service runs as root and logs the owner of the data directory at boot.
- **Data directory under the mount.** The store lives in a subdirectory of `/cockroach/cockroach-data`, so the volume's `lost+found` never lands in the store.
- **Wire protocol.** Clients connect over a TCP proxy on port 26257. There is no HTTP healthcheck, because a TCP proxy and an HTTP healthcheck cannot share one service on Railway.
- **Memory.** Cache and SQL memory are capped at a quarter of memory each.

The DB Console is not exposed on a public domain: Railway's edge forwards plain HTTP, and a secure CockroachDB node answers plain HTTP with a redirect to itself, so a public domain would loop forever. Use SQL, or reach the console over the project's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cockroachdb | `cockroachdb/cockroach:v26.3.2@sha256:bc15746ef2c2493b2cfd46a76898a745587d068b1a259fff3c4447c3f3b36ea2` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CRDB_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'CRDB_USER=app; CRDB_DATABASE=app; D=/cockroach/cockroach-data; C=$D/certs; CR=/cockroach/cockroach; Q=$(printf "\047"); echo "cockroach uid=$(id -u) mount_owner=$(stat -c %u:%g $D)"; mkdir -p $C; if [ ! -f $C/node.crt ]; then $CR cert create-ca --certs-dir=$C --ca-key=$C/ca.key && $CR cert create-node localhost 127.0.0.1 $(hostname) $RAILWAY_PRIVATE_DOMAIN $RAILWAY_TCP_PROXY_DOMAIN $RAILWAY_PUBLIC_DOMAIN --certs-dir=$C --ca-key=$C/ca.key && $CR cert create-client root --certs-dir=$C --ca-key=$C/ca.key || exit 1; fi; ( until $CR sql --certs-dir=$C --host=127.0.0.1 -e "select 1" >/dev/null 2>&1; do sleep 1; done; $CR sql --certs-dir=$C --host=127.0.0.1 -e "CREATE USER IF NOT EXISTS \"$CRDB_USER\"; ALTER USER \"$CRDB_USER\" WITH PASSWORD ${Q}${CRDB_PASSWORD}${Q}; GRANT admin TO \"$CRDB_USER\"; CREATE DATABASE IF NOT EXISTS \"$CRDB_DATABASE\";" && echo "cockroach user $CRDB_USER ready" ) & exec $CR start-single-node --certs-dir=$C --store=$D/data --listen-addr=0.0.0.0:26257 --http-addr=0.0.0.0:8080 --advertise-addr=$RAILWAY_PRIVATE_DOMAIN --cache=.25 --max-sql-memory=.25'`
- **TCP Proxies:** 26257
- **Volume:** `/cockroach/cockroach-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cockroachdb-or-just-updated-distributed-)
