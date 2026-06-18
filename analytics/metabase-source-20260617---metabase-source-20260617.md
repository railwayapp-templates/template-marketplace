# Deploy metabase-source-20260617 on Railway

Metabase BI with a private Postgres application database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-source-20260617)

## About

Metabase is an open-source business intelligence platform for asking questions about data, building dashboards, and sharing analytics. This Railway template deploys Metabase with a private Postgres application database so users, settings, dashboards, questions, and connection metadata persist across restarts.

Published marketplace code: `metabase-source-20260617`

Published template ID: `d4811c37-703e-409c-a2d2-3585dccf197b`

Metabase can run with an embedded H2 database for quick trials, but production deployments should use an external application database. This template uses Postgres for Metabase's application database and keeps that database private inside the Railway project network.

The Metabase service is public on port `3000`. The Postgres service is private and uses a persistent volume at `/var/lib/postgresql/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17` | Database |
| metabase | `metabase/metabase:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `MB_DB_USER` | metabase | (secret) |
| `MB_ENCRYPTION_SECRET_KEY` | metabase | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-source-20260617)
