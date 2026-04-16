# Deploy TimescaleDB + PostGIS (PG14) on Railway

Deploy and Host TimescaleDB + PostGIS (PG14) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/timescaledb-postgis-pg14)

## About

TimescaleDB + PostGIS (PG14) is a PostgreSQL 14 database service combining TimescaleDB for efficient time-series data handling and PostGIS for geographic/spatial data support. This template deploys an SSL-enabled instance with both extensions available, ideal for applications needing temporal and geospatial capabilities on a proven relational foundation.

Hosting TimescaleDB + PostGIS on PostgreSQL 14 involves deploying a customized PostgreSQL image with both extensions pre-installed and SSL enabled for secure connections. The database is configured with tuned memory, checkpoint, and worker process settings suitable for web workloads. Authentication is handled via md5 for remote connections, and the instance listens on all interfaces. PostGIS is installed but not enabled by default—you simply run `CREATE EXTENSION postgis;` to activate it. TimescaleDB is loaded as a shared preload library. This template handles all of that configuration so you can focus on your application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TimescaleDB | `ghcr.io/railwayapp-templates/timescale-postgis-ssl:pg14-ts2.12` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NO_TS_TUNE` | true | Do not run `timescaledb-tune` at Startup. This improves memory usage of the database. |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database over private networking |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | URL to connect to Postgres database over public networking |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/timescaledb-postgis-pg14)
