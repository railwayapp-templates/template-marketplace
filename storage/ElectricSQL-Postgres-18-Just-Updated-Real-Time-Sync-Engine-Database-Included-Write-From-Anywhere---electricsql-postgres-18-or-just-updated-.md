# Deploy ElectricSQL + Postgres 18 | (Just Updated) Real-Time Sync Engine, Database Included, Write From Anywhere on Railway

Electric sync engine + Postgres 18, logical replication on, public psql URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/electricsql-postgres-18-or-just-updated-)

## About

ElectricSQL is an open-source Postgres sync engine. It streams subsets of your Postgres data, called shapes, to local apps over a plain HTTP API, so your frontend reads from a live local copy instead of calling your API on every render. This template deploys Electric together with its own **Postgres 18**, with logical replication already on and a public, TLS-encrypted connection string, so you can write to the database from your laptop the moment the deploy goes green.

**Write a row, read it through Electric. Your first two minutes:**

```bash

Electric has one hard requirement: a Postgres running with `wal_level = logical`, and a role that holds the `REPLICATION` attribute. Most managed Postgres providers leave that setting off and many do not let you change it, which turns "point Electric at your database" into an afternoon of provider documentation. This template removes that step.

It deploys two services:

- **postgres**: the official `postgres:18.6` image, pinned by digest, started with `wal_level=logical`, `max_wal_senders=10` and `max_replication_slots=10`. Data lives on a volume at `/var/lib/postgresql`. Postgres 18 moved its data directory to `/var/lib/postgresql/18/docker`, so the volume is mounted one level up, where the image expects it. Railway's TCP proxy exposes the database publicly, and TLS is switched on with a certificate generated on first boot and kept on the volume, so your password never crosses the internet in plain text.
- **electric**: the official `electricsql/electric:latest` image, connected to Postgres over Railway's private network. Its shape logs persist on a second volume at `/var/lib/electric/persistent`, so a redeploy does not force every client to re-sync. `/v1/health` drives the Railway healthcheck.

Both services restart on failure. Measured idle on Railway: about 50–100 MB for Postgres and 300–330 MB for Electric. Both services also ran healthy and served shapes under a 512 MB memory limit each, so the stack fits Railway's Free and Trial plans.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| electric | `electricsql/electric:latest` | Web service |
| postgres | `postgres:18.6@sha256:74935e72241653ca55e0414067e6d8763aceb8a810eb51b452253ec3dcfc4336` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ELECTRIC_SECRET` | electric | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export ELECTRIC_PORT="${PORT:-3000}" ELECTRIC_LISTEN_ON_IPV6=true ELECTRIC_DATABASE_USE_IPV6=true ELECTRIC_STORAGE_DIR=/var/lib/electric/persistent; exec /app/bin/entrypoint start'`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/electric/persistent`
- **Start command:** `/bin/sh -c 'D=/var/lib/postgresql/ssl; if [ ! -s "$D/server.key" ]; then mkdir -p "$D" && openssl req -new -x509 -days 3650 -nodes -subj /CN=postgres -keyout "$D/server.key" -out "$D/server.crt" 2>/dev/null && chown -R postgres:postgres "$D" && chmod 600 "$D/server.key"; fi; exec docker-entrypoint.sh postgres -c wal_level=logical -c max_wal_senders=10 -c max_replication_slots=10 -c ssl=on -c ssl_cert_file="$D/server.crt" -c ssl_key_file="$D/server.key"'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/electricsql-postgres-18-or-just-updated-)
