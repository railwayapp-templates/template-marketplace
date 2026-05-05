# Deploy PostgreSQL 18 + TimescaleDB + PostGIS on Railway

PostgreSQL 18, TimescaleDB 2.26 and PostGIS 3.6

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-18-timescaledb-postgis)

## About

PostgreSQL 18 combined with TimescaleDB 2.26 and PostGIS 3.6 gives you a single database that handles relational, time-series, and geospatial workloads. Ingest time-stamped data into hypertables with automatic partitioning and compression, run spatial queries with PostGIS indexing, and use standard SQL for everything.

Hosting a PostgreSQL instance with both TimescaleDB and PostGIS typically requires building a custom Docker image, managing extension compatibility across versions, and handling persistent storage with correct filesystem permissions. This template eliminates that setup entirely. It deploys PostgreSQL 18.3 with TimescaleDB 2.26.4 and PostGIS 3.6.3 pre-installed, configures a persistent volume with automatic ownership correction at container start, and includes a health check that monitors database readiness. TimescaleDB is enabled by default — PostGIS activates with a single SQL command after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgreSQL 18 + TimescaleDB + PostGIS | `timescale/timescaledb-ha:pg18-ts2.26-all` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | postgres |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-18-timescaledb-postgis)
