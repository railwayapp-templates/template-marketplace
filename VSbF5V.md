# Deploy TimescaleDB on Railway

Time-series database built on top of Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/VSbF5V)

## About

[Timescale](https://www.timescale.com/) is a time-series database built on top of PostgreSQL. 

> "Engineered to efficiently handle resource-intensive workloads, like time series, event, and analytics data. Built on PostgreSQL, with expert support at no extra charge."

Read the docs for usage info [docs.timescale.com](https://docs.timescale.com/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Timescale | `timescale/timescaledb:latest-pg17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Name of the default database |
| `DATABASE_URL` | - | The DB url of the database over the private network |
| `POSTGRES_USER` | (secret) | Username of the default account |
| `POSTGRES_PASSWORD` | (secret) | The database password |
| `DATABASE_PUBLIC_URL` | - | The full public URL of the database |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; unset PGHOST; docker-entrypoint.sh postgres -p 5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/VSbF5V)
