# Deploy PostgreSQL 18 with TimescaleDB, PostGIS, and SSL on Railway

PostgreSQL 18 with TimescaleDB, PostGIS, and SSL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-18-with-timescaledb-postgis-a)

## About

Deploy a PostgreSQL 18 database with TimescaleDB 2.26, PostGIS, and SSL enabled on Railway.

  ## About Hosting

  This template uses the prebuilt image `ghcr.io/novotnyllc/timescale-postgis-ssl:pg18-ts2.26`.

  It mounts the Railway volume at `/home/postgres/pgdata` and sets `PGDATA=/home/postgres/pgdata/data`.

  Use `DATABASE_URL` from Railway services for private networking. `DATABASE_PUBLIC_URL` is available for external clients and uses Railway's TCP proxy.

  ## Why Deploy

  Use this when you need PostgreSQL with both time-series and geospatial extensions, SSL enabled, persistent Railway storage, and Railway's Database tab
  integration.

  ## Common Use Cases

  - Geospatial applications using PostGIS.
  - Time-series workloads using TimescaleDB.
  - Railway apps that need private Postgres networking.
  - External SQL clients that need TCP proxy access.

  ## Dependencies for TimescaleDB PostGIS SSL

  The image includes PostgreSQL 18, TimescaleDB 2.26, PostGIS, and SSL initialization from the source repository.

  ### Deployment Dependencies

  - Railway volume mounted at `/home/postgres/pgdata`.
  - `PGDATA=/home/postgres/pgdata/data`.
  - PostgreSQL variables: `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `DATABASE_URL`.
  - TCP proxy variables for `DATABASE_PUBLIC_URL`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TimescaleDB PostGIS SSL | `ghcr.io/novotnyllc/timescale-postgis-ssl:pg18-ts2.26` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/home/postgres/pgdata`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-18-with-timescaledb-postgis-a)
