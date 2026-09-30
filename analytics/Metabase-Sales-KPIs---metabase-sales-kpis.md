# Deploy Metabase Sales KPIs on Railway

sales pipeline and revenue KPI dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-sales-kpis)

## About

Metabase Sales KPIs is the fastest way to stop exporting CSVs into spreadsheet purgatory. Point Metabase at your CRM, warehouse, or Postgres replica, then build revenue dashboards your sales team will actually open. This guide covers running it on Railway with a proper Postgres app database.

I once ran Metabase with its default H2 database and lost three weeks of dashboards on a redeploy. The fix: point Metabase at Postgres from day one. The Metabase container serves the UI on port 3000 and stores configuration, dashboards, and user accounts in the app database. Your actual sales data lives elsewhere — a CRM, warehouse, or database replica — and you connect it after first boot via Admin → Databases.

On Railway, add a companion Postgres service before opening the setup wizard. Set `MB_DB_TYPE=postgres` plus `MB_DB_HOST`, `MB_DB_PORT`, `MB_DB_USER`, `MB_DB_PASS`, and `MB_DB_DBNAME` so Metabase uses that instead of H2. Keep `MB_ENCRYPTION_SECRET_KEY` stable across deploys or encrypted credentials break. Set `MB_SITE_URL` to your public HTTPS URL for correct links and embeds. Pin the image to a version like `v0.63.x` to avoid surprise migrations.

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

[View on Railway →](https://railway.com/deploy/metabase-sales-kpis)
