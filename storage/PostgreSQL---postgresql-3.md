# Deploy PostgreSQL on Railway

PostgreSQL 17 + pgAdmin: extensions, persistence, one-click admin UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-3)

## About

PostgreSQL is the world's most advanced open-source relational database. This template deploys a single-node PostgreSQL 17 server with a persistent volume, five widely-used contrib extensions preinstalled on first boot, and a pgAdmin web UI that ships pre-wired to the database.

Hosting PostgreSQL on Railway runs the official `postgres:17.11-alpine` image (plus a thin extension layer) as a private-network service with a persistent volume at `/var/lib/postgresql/data`. Data survives redeploys and restarts. The superuser password is auto-generated at deploy time via Railway's `secret()` function, and a `DATABASE_URL` variable is composed from the service's private hostname so other services in the same project can connect with a single reference — no public exposure required.

Extensions `pgcrypto`, `pg_trgm`, `unaccent`, `citext`, and `uuid-ossp` are created on first boot into your database and into `template1`, so databases created later inherit them too.

A bundled **pgAdmin** service gives you a browser UI for the database in one click: generate a public domain on the `pgadmin` service, open it, and sign in as `admin@template.local` with the generated password. The PostgreSQL server is already registered inside pgAdmin — including its stored credentials — so the browser tree connects immediately; no manual host or password entry.

This is a single-node deployment without replication — the building block most self-hosted apps need. For automated failover and a streaming read replica, see our `Postgres HA Read Replica` template instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `wotonews/postgres:v17.11-3` | Database |
| pgadmin | `wotonews/pgadmin:v9.18-2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PGADMIN_DEFAULT_PASSWORD` | pgadmin | (secret) |
| `PGADMIN_SERVER_1_PASSWORD` | pgadmin | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/pgadmin`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-3)
