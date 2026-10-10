# Deploy TimescaleDB on Railway

A PostgreSQL-based time-series database for analytics on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/timescaledb-railway-template)

## About

**TimescaleDB** is an open-source, PostgreSQL-based database optimized for time-series data and real-time analytics. It extends PostgreSQL with hypertables, automatic time-based partitioning, columnar storage, and advanced analytical functions. TimescaleDB is ideal for applications handling large volumes of timestamped data, including IoT, monitoring, financial analytics, and event tracking.

Hosting TimescaleDB on Railway provides a straightforward way to deploy and manage a PostgreSQL-compatible time-series database without maintaining your own server infrastructure.

Railway simplifies deployment, service management, persistent storage, and private networking. TimescaleDB supports standard PostgreSQL connections, allowing applications to integrate using familiar database drivers, ORMs, and SQL tools.

Once deployed, you can create hypertables, ingest time-series data, run analytical queries, and configure data retention or columnstore policies according to your workload requirements.

For production environments, consider database backups, storage capacity, resource allocation, connection security, and monitoring to maintain reliability as your data grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| timescaledb | `timescale/timescaledb:latest-pg17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database name |
| `DATABASE_URL` | - | Internal database connection URL |
| `POSTGRES_USER` | (secret) | PostgreSQL username |
| `POSTGRES_PASSWORD` | (secret) | Auto-generated database password |
| `TIMESCALEDB_TELEMETRY` | off | Disable TimescaleDB telemetry |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/timescaledb-railway-template)
