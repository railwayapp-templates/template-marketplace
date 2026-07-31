# Deploy ElectricSQL | Postgres Sync Engine, Database Included on Railway

Electric sync engine + Postgres with logical replication already on.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/electricsql-or-postgres-sync-engine-data)

## About

ElectricSQL is an open-source Postgres sync engine. It streams little subsets of your Postgres data — called shapes — out to local apps over a simple HTTP API, so your frontend reads from a local cache that stays live instead of round-tripping to your API on every render. This template ships Electric **together with its own Postgres**, already configured for logical replication, so there is nothing to fill in and nothing to reconfigure.

Electric's one hard requirement is a Postgres running with `wal_level = logical` and a role holding the `REPLICATION` attribute. That is exactly the setting most managed Postgres providers leave off by default, and it is the step that turns "just point Electric at your database" into an afternoon of provider documentation.

This template removes that step. It deploys two services: the official `postgres:18.4-trixie` image started with `-c wal_level=logical -c max_wal_senders=10 -c max_replication_slots=10`, and the official `electricsql/electric` image already pointed at it over Railway's private network. Postgres data persists on a volume at `/var/lib/postgresql`; Electric's shape logs persist on their own volume at `/var/lib/electric/persistent`, so a redeploy does not force every client to re-sync from scratch. Electric follows Railway's injected `$PORT`, listens on IPv6 for the private network, and exposes `/v1/health` for the platform healthcheck.

The deploy form is empty. `POSTGRES_PASSWORD` and `ELECTRIC_SECRET` are generated for you at deploy time, and `DATABASE_URL` is wired from the Postgres service by reference — you click deploy and get a working sync engine with a database behind it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:18.4-trixie` | Database |
| electric | `electricsql/electric:1.7.8` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `ELECTRIC_SECRET` | electric | (secret) |

## Configuration

- **Start command:** `/usr/local/bin/docker-entrypoint.sh postgres -c wal_level=logical -c max_wal_senders=10 -c max_replication_slots=10`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export ELECTRIC_PORT="${PORT:-3000}" ELECTRIC_LISTEN_ON_IPV6=true ELECTRIC_DATABASE_USE_IPV6=true ELECTRIC_STORAGE_DIR=/var/lib/electric/persistent; exec /app/bin/entrypoint start'`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/electric/persistent`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/electricsql-or-postgres-sync-engine-data)
