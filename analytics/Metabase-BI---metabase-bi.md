# Deploy Metabase BI on Railway

Metabase v0.63 with Postgres 17 on a volume, no H2 data loss

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-bi)

## About

Metabase is the open-source business intelligence tool: connect a database, then build dashboards, charts, and SQL questions through a browser — no BI license, no per-seat pricing. This template deploys Metabase v0.63 backed by its own PostgreSQL 17 application database on a persistent volume.

Metabase ships with an embedded H2 database so it can start with zero configuration. That default is the single most common way a self-hosted Metabase is lost: H2 writes to the container filesystem, so on Railway every redeploy discards your dashboards, questions, users, and saved database connections. Metabase's own documentation states H2 is unsuitable for production and offers no supported migration path once data is in it.

This template never touches H2. Metabase is pointed at a dedicated PostgreSQL 17 service over Railway's private network from the first boot, with Postgres storing its data on a mounted volume. `MB_ENCRYPTION_SECRET_KEY` is generated once at deploy and held stable — that key encrypts the credentials Metabase stores for the databases you connect, so a rotating key would lock you out of your own data sources.

Metabase runs on the JVM and is memory-resident rather than request-scaled; `JAVA_OPTS` is set to a 2GB heap with the G1 collector, which suits Railway's standard instance. Anonymous usage tracking is disabled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metabase | `metabase/metabase:v0.63.1.6` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MB_DB_USER` | metabase | (secret) |
| `MB_ENCRYPTION_SECRET_KEY` | metabase | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-bi)
