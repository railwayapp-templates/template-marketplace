# Deploy Metabase Dashboards on Railway

interactive Metabase dashboards and filters

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-dashboards)

## About

Build and share interactive dashboards from your own datlf hosted Metabase Dashboards (Open-Source BI) on Railway

Metabase on Railway gives you a working HTTPS endpoint without reverse-proxy fiddling. Deploy the official `metabase/metabase` image (pin a version like `v0.63.x`), wire it to a managed Postgres, set env vars, and you're done. The container listens on port 3000 and exposes `GET /api/health` for health checks. First boot runs migrations against the app Postgres, then the setup wizard creates your admin user. Connect analytics databases (Postgres, MySQL, BigQuery, Snowflake, etc.) later via Admin → Databases. They are separate from Metabase's own state database.

Never use H2 for production — it's wiped on redeploy. Postgres is mandatory. Keep `MB_ENCRYPTION_SECRET_KEY` stable or encrypted settings break. Set `MB_SITE_URL` to the public HTTPS URL for links, embeds, and emails.

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

[View on Railway →](https://railway.com/deploy/metabase-dashboards)
