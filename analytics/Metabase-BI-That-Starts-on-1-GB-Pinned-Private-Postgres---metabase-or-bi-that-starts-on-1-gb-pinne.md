# Deploy Metabase | BI That Starts on 1 GB, Pinned, Private Postgres on Railway

Self-host Metabase on Railway — starts in 1 GB, pinned, private Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-or-bi-that-starts-on-1-gb-pinne)

## About

Metabase, the open-source BI tool, self-hosted with its own Postgres for settings and dashboards. It starts within 1 GB of memory, the image is pinned, and the database is reachable only inside the project.

Nothing to fill in. Open the domain and Metabase's setup wizard creates the first admin account.

Two services:

- **Metabase** `v0.63.19.1`: dashboards, questions and the admin panel (public)
- **Postgres 17**: Metabase's application database, holding users, saved questions and dashboards, on its own volume and on the private network only

Connect the databases you want to analyse from Metabase's admin panel; they are separate from the Postgres that comes with this template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.11-alpine` | Database |
| Metabase | `metabase/metabase:v0.63.19.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | metabase |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Metabase | 3000 |
| `MB_DB_PORT` | Metabase | 5432 |
| `MB_DB_TYPE` | Metabase | postgres |
| `MB_DB_USER` | Metabase | (secret) |
| `MB_JETTY_PORT` | Metabase | 3000 |
| `JAVA_TOOL_OPTIONS` | Metabase | -XX:MaxRAMPercentage=50 -XX:+UseSerialGC -XX:TieredStopAtLevel=1 |
| `MB_PASSWORD_COMPLEXITY` | Metabase | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-or-bi-that-starts-on-1-gb-pinne)
