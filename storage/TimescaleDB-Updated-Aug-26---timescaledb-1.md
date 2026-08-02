# Deploy TimescaleDB [Updated Aug '26] on Railway

TimescaleDB [Aug '26] (Time-Series Database Built on Postgres) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/timescaledb-1)

## About

TimescaleDB is a time-series database built directly into Postgres as an extension, not a separate database with its own query language. It adds hypertables, native compression, and continuous aggregates on top of full Postgres compatibility, so every existing Postgres client, driver, and ORM keeps working exactly as before.

Tiger Cloud, Timescale's own managed service, starts at $30/month for its Performance tier, which caps out at 8 CPU, 32GB memory, and 16TB storage per service. The Scale tier starts at $36/month but only unlocks unlimited database services and higher throughput at that price. Self-hosted TimescaleDB on Railway costs a flat infrastructure fee no matter how much data you ingest or how many queries you run.

The pricing gap isn't the only reason to self-host a time-series database specifically. Time-series data, sensor readings, application metrics, financial ticks, tends to accumulate fast and get queried constantly by internal dashboards and alerting systems. Keeping that data and those query patterns on infrastructure you control, rather than routed through a managed vendor's own compute, matters more here than it does for a database you touch occasionally.

It's worth being direct about something easy to miss when picking a TimescaleDB image: some published variants are trimmed `-oss` builds that drop compression and continuous aggregate policies, both licensed under Timescale's source-available terms rather than pure Apache 2.0. This template runs the full official image instead, the same one the existing Railway reference template (247 real deploys) uses, so compression and continuous aggregates work out of the box under Timescale's free self-hosted license, not a stripped-down build missing half the reason to pick TimescaleDB in the first place.

This isn't a small or unproven project either. TimescaleDB has real production traction in observability, IoT, and fintech, it's the extension most Postgres teams reach for first when a plain table starts slowing down under time-ordered data at scale. That matters for infrastructure you're depending on: an actively maintained extension keeps working as Postgres itself ships new major versions, a smaller project can fall behind.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| timescaledb-railway | [shruti060701/timescaledb-railway](https://github.com/shruti060701/timescaledb-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database name created on startup. The `timescaledb` extension is pre-created here automatically, no manual `CREATE EXTENSION` step needed. |
| `DATABASE_URL` | - | Full connection string for other services in the same project to connect to this database over Railway's private network. |
| `POSTGRES_USER` | (secret) | Superuser username for the database. |
| `POSTGRES_PASSWORD` | (secret) | Superuser password. Auto-generated per deploy. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/timescaledb-1)
