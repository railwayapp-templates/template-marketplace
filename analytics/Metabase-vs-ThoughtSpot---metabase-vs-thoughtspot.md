# Deploy Metabase vs ThoughtSpot on Railway

Metabase vs ThoughtSpot search BI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-vs-thoughtspot)

## About

You saw the ThoughtSpot demo where someone types “revenue by region last quarter” and gets a chart in two seconds. Then the quote landed and finance winced. That’s when a self-hosted Metabase on Railway stops being a side project and becomes the plan.

Metabase runs from the official `metabase/metabase` image — pin `v0.63.4` or similar so a redeploy doesn’t surprise you with breaking migrations. The app listens on port 3000 and Railway hits `GET /api/health` to confirm it’s alive. The critical gotcha: the Metabase *application* database must be Postgres. If you skip it, Metabase falls back to an embedded H2 file that gets wiped on every container rebuild. You’ll lose dashboards, users, and saved questions. The template includes a Postgres service (`ghcr.io/railwayapp-templates/postgres-ssl`, version 17 fine) and sets `MB_DB_TYPE=postgres` plus `MB_DB_HOST`, `MB_DB_PORT`, `MB_DB_USER`, `MB_DB_PASS`, `MB_DB_DBNAME`. On first boot, migrations run against that Postgres, then you create the admin user. Keep `MB_ENCRYPTION_SECRET_KEY` stable across deploys — rotate it and encrypted connections break. Set `MB_SITE_URL` to your public HTTPS URL for correct links in emails and embeds.

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

[View on Railway →](https://railway.com/deploy/metabase-vs-thoughtspot)
