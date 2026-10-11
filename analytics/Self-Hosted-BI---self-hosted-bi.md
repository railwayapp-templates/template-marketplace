# Deploy Self-Hosted BI on Railway

self-hosted BI platform on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-bi)

## About

Running your own BI stack sounds like a weekend project that becomes a part-time job. It doesn't have to.

The first time I stood up Metabase on a bare VPS, I spent more time fighting systemd than writing a query. Railway removes that pain.

This template pairs Metabase with a companion Postgres service. That Postgres is the application database where Metabase stores dashboards, collections, saved questions, and admin settings.

Many people skip this distinction and get confused when dashboards disappear after a redeploy. Metabase can run on the embedded H2 database, but H2 lives inside the container filesystem.

The AGPL license matters too. You can run Metabase Self-Hosted BI forever without paying anyone for the core product. You operate it; you don't license it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | metabase/metabase | 3000 | PORT |
| `MB_DB_HOST` | metabase/metabase | - | MB_DB_HOST |
| `MB_DB_PASS` | metabase/metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | metabase/metabase | - | MB_DB_PORT |
| `MB_DB_TYPE` | metabase/metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | metabase/metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | metabase/metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | metabase/metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | metabase/metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | metabase/metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/self-hosted-bi)
