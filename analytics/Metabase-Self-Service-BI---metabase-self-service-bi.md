# Deploy Metabase Self-Service BI on Railway

self-service BI for non-SQL teammates

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-self-service-bi)

## About

The PM opens Slack at 9:14 and sees the same question for the third time this week: “Can someone pull last month’s trial-to-paid conversion by plan?” The data team is backlogged, the analyst is on vacation, and the PM has never written a join. That’s the moment self-service BI either works or becomes another abandoned dashboard. Host Metabase Self-Service BI on Railway, and that PM can ask the question in plain language, drag a filter, and share a link before standup ends.

Metabase is the open-source BI tool for non-SQL teammates. The self-hosted version runs as a single Java app. Railway deploys it next to your Postgres metadata DB, giving you a public HTTPS URL without managing servers or Nginx. The Docker image boots, the health check hits `/api/health` on port 3000, and you’re live.

This template is deliberately simple: one Metabase service plus one Postgres service for the application DB. That Postgres is not where your analytics data lives—it stores users, dashboards, and settings. Your actual warehouse databases (Postgres, MySQL, Snowflake, BigQuery, Redshift, MongoDB) get connected after first boot via Admin → Databases. Keeping them separate avoids locking production tables during a sync.

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

[View on Railway →](https://railway.com/deploy/metabase-self-service-bi)
