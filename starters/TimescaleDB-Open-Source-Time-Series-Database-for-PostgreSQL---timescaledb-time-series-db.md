# Deploy TimescaleDB | Open Source Time-Series Database for PostgreSQL on Railway

Self Host TimescaleDB on Railway: hypertables, compression, full SQL & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/timescaledb-time-series-db)

## About

Deploy TimescaleDB on Railway to get a fully managed, persistent time-series database running in minutes. TimescaleDB is a PostgreSQL extension that transforms Postgres into a high-performance time-series database — hypertables, continuous aggregates, columnar compression, and real-time analytics, all with full SQL support.

Self-host TimescaleDB on Railway with this template and get a production-ready instance backed by persistent volume storage, automatic performance tuning via `timescaledb-tune`, and external TCP proxy access. The template deploys `timescale/timescaledb:2.18.0-pg16` with a single service — no additional dependencies required since TimescaleDB runs as a native PostgreSQL extension.

TimescaleDB (by Tiger Data, formerly Timescale) is a PostgreSQL extension with 22,000+ GitHub stars that adds time-series superpowers to the world's most trusted relational database. Unlike purpose-built TSDBs that force you to learn new query languages, TimescaleDB uses standard SQL — your existing Postgres knowledge, tools, and ORMs work immediately.

Key features:

- **Hypertables** — automatic time-based partitioning, transparent to queries
- **Continuous aggregates** — materialized views that refresh incrementally
- **Columnar compression** — 10-15x storage reduction with automatic policies
- **Data retention** — automatic drop policies for aging data
- **Full PostgreSQL** — JOINs, foreign keys, indexes, extensions (PostGIS, pgvector)
- **Automatic tuning** — `timescaledb-tune` optimizes Postgres config for your hardware

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TimescaleDB | `timescale/timescaledb:2.18.0-pg16` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | timescaledb | Default database name |
| `POSTGRES_USER` | (secret) | Database superuser name |
| `POSTGRES_PASSWORD` | (secret) | Database superuser password |
| `TIMESCALEDB_TELEMETRY` | off | Disable usage telemetry |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/timescaledb-time-series-db)
