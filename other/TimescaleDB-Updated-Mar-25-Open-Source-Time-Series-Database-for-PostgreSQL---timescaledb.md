# Deploy TimescaleDB [Updated Mar ’25] (Open-Source Time Series Database for PostgreSQL) on Railway

TimescaleDB [Mar ’26] (Analyze Time-Based Data Efficiently) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/timescaledb)

## About

TimescaleDB is an open-source time-series database built on PostgreSQL, designed for storing and analyzing time-stamped data efficiently. It’s used in IoT, DevOps monitoring, finance, energy, and application performance tracking due to its high performance, scalability, and PostgreSQL compatibility.

* * *

Self-hosting TimescaleDB gives you full control over your time-series data, configurations, and performance tuning. Unlike cloud databases that lock your data behind managed walls, hosting TimescaleDB on Railway allows you to maintain complete ownership while enjoying modern DevOps conveniences like automated scaling, secure environments, and simplified deployment.

Railway provides a streamlined experience for developers looking to host TimescaleDB — combining the power of PostgreSQL with automatic scaling and fast deployment pipelines. You can set up TimescaleDB in just one click and start collecting, storing, and analyzing time-series data immediately.

* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| timescaledb | `timescale/timescaledb:latest-pg16` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; unset PGHOST; docker-entrypoint.sh postgres -p 5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/timescaledb)
