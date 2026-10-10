# Deploy Metabase Cloud Pricing on Railway

Metabase Cloud $85+ vs Railway self-host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-cloud-pricing)

## About

You can run Metabase OSS for the price of a couple of coffees, but only if you point the app database at Postgres and pin your encryption secret. This guide covers the real bill math, AGPL tradeoffs, and the Railway setup that won't wipe dashboards on redeploy.

The official metabase/metabase image runs migrations against MB_DB_TYPE. Leaving H2 means dashboards vanish on redeploy because the file lives on ephemeral disk. Point the app at a companion Postgres service before finishing the setup wizard. Use the companion Postgres service (ghcr.io/railwayapp-templates/postgres-ssl). The container listens on port 3000, health check at /api/health. Set MB_SITE_URL before inviting anyone—reset emails and shared links bake in the hostname from first boot.

Analytics databases are separate. Postgres stores users, collections, permissions. Warehouse connections happen after boot under Admin → Databases (Postgres, MySQL, BigQuery, Snowflake, Redshift, MongoDB, etc.).

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

[View on Railway →](https://railway.com/deploy/metabase-cloud-pricing)
