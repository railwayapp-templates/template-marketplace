# Deploy PostgreSQL on Railway

PostgreSQL 17 with persistent storage and extensions preinstalled.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-2)

## About

PostgreSQL is the world's most advanced open-source relational database. This template deploys a single-node PostgreSQL 17 server with a persistent volume and five widely-used contrib extensions preinstalled on first boot.

Hosting PostgreSQL on Railway runs the official `postgres:17.11-alpine` image (plus a thin extension layer) as a private-network service with a persistent volume at `/var/lib/postgresql/data`. Data survives redeploys and restarts. The superuser password is auto-generated at deploy time via Railway's `secret()` function, and a `DATABASE_URL` variable is composed from the service's private hostname so other services in the same project can connect with a single reference — no public exposure required.

Extensions `pgcrypto`, `pg_trgm`, `unaccent`, `citext`, and `uuid-ossp` are created on first boot into your database and into `template1`, so databases created later inherit them too.

This is a single-node deployment without replication — the building block most self-hosted apps need. For automated failover and a streaming read replica, see our `Postgres HA Read Replica` template instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `wotonews/postgres:v17.11-2` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-2)
