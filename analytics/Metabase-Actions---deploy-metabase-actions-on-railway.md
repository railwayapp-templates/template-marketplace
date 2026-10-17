# Deploy Metabase Actions on Railway

Write-back actions from Metabase dashboards and models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-metabase-actions-on-railway)

## About

Metabase Actions turn a dashboard into a small ops console: someone spots a bad order in a chart, clicks a button, and the row in your database changes. This template runs open-source Metabase with its own Postgres on Railway, so write-back works without paying for cloud seats.

Actions sit on top of models (curated, admin-defined layers over your tables) and let people create, update, or delete rows through buttons and forms. Railway runs the official `metabase/metabase` image next to a Postgres service that holds the Metabase application database: users, dashboards, models, and the action definitions themselves. The app listens on port 3000 with a health check at `/api/health`. Your warehouse, the database the actions actually write to, gets connected after first boot.

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

[View on Railway →](https://railway.com/deploy/deploy-metabase-actions-on-railway)
