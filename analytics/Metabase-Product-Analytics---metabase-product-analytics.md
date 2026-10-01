# Deploy Metabase Product Analytics on Railway

product metrics and funnel dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-product-analytics)

## About

Product analytics dashboards shouldn't need a data engineering ticket. Metabase Product Analytics on Railway gives you funnels, retention cohorts, and activation tracking in a self-hosted stack you control. Here's the operator's field guide: what breaks, what matters, and how to deploy it so a redeploy doesn't wipe your work.

Metabase is two databases wearing one hat. The app database stores users, dashboards, saved questions, and settings. The analytics databases hold your product events -- Postgres, MySQL, BigQuery, Snowflake, Redshift, or whatever warehouse you use. On Railway, the template pairs the Metabase container with a managed Postgres service for the app database. You wire up analytics sources after first boot. That separation trips people up: pointing Metabase at your product database during setup, then wondering why dashboards vanish on redeploy. Don't do that. The container binds to port 3000, runs migrations against Postgres on first boot, and serves the setup wizard where you create the admin account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metabase/metabase | `metabase/metabase` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-product-analytics)
