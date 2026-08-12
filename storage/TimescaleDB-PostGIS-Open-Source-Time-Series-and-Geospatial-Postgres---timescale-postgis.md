# Deploy TimescaleDB + PostGIS | Open Source Time-Series and Geospatial Postgres on Railway

Postgres 18 with TimescaleDB and PostGIS — time-series and geospatial in one DB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/timescale-postgis)

## About

TimescaleDB turns PostgreSQL into a time-series database: hypertables partition by time automatically, `time_bucket` and continuous aggregates make rollups cheap, and compression cuts storage on old data. PostGIS adds geometry types and spatial indexes. This template ships both in one database, so a row can carry a timestamp and a location and you can query on either.

This template runs the official `timescale/timescaledb-ha` image on a pinned stable tag — PostgreSQL 18.4 with TimescaleDB 2.29.1 — with the cluster on a persistent Railway volume. Nothing is rebuilt or forked, so upstream releases and upstream security fixes are what you get.

The image tag matters more than it looks. Timescale publishes several builds of the same version, and only the `-all` one carries the full extension set including PostGIS; the plain tag would give you Timescale alone. On top of that, **the extensions are already created for you** — `timescaledb`, `timescaledb_toolkit` and `postgis` are all present in the database on first connect, so `create_hypertable` and `ST_MakePoint` work immediately rather than after two `CREATE EXTENSION` statements you had to know about.

There is no public HTTP endpoint, because nothing here speaks HTTP. The database is reachable two ways: privately at `timescaledb.railway.internal:5432` from other services in your project, and publicly through a Railway TCP proxy for psql, pg_dump, Grafana or a GIS client. Remote connections are password-authenticated with SCRAM.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TimescaleDB | `timescale/timescaledb-ha:pg18.4-ts2.29.1-all` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5432 | The port Railway routes to. Set explicitly because the image exposes three (5432 plus Patroni's 8008 and pgbackrest's 8081, both unused here). |
| `POSTGRES_DB` | railway | Database created on the first boot. The timescaledb, timescaledb_toolkit and postgis extensions are created inside it for you. |
| `POSTGRES_USER` | (secret) | Superuser role created by initdb on the first boot. |
| `POSTGRES_PASSWORD` | (secret) | Password for the postgres role. Generated at deploy — the database is reachable from the internet through the TCP proxy, so treat it as a production credential. |
| `TIMESCALEDB_TELEMETRY` | off | Turns off TimescaleDB's usage reporting and its background job. Set to `basic` if you would rather report upstream. |
| `POSTGRES_HOST_AUTH_METHOD` | scram-sha-256 | Authentication for remote connections. Do not set this to `trust` — the TCP proxy is a public endpoint. |

## Configuration

- **Start command:** `sh -c '( for i in $(seq 1 150); do pg_isready -h 127.0.0.1 -q && break; sleep 2; done; PGPASSWORD="$POSTGRES_PASSWORD" psql -h 127.0.0.1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "CREATE EXTENSION IF NOT EXISTS postgis;" ) & exec /docker-entrypoint.sh postgres'`
- **TCP Proxies:** 5432
- **Volume:** `/home/postgres/pgdata`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/timescale-postgis)
