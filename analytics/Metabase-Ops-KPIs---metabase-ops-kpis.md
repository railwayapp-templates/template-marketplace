# Deploy Metabase Ops KPIs on Railway

operations KPI dashboards on Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-ops-kpis)

## About

If your team still tracks uptime, deploy frequency, or support queue depth in a spreadsheet nobody opens, Metabase Ops KPIs gives you a live, queryable dashboard without the Tableau invoice. This Railway template pairs the official Metabase image with a production Postgres app database, so you can stand up operations dashboards in an afternoon, not a quarter.

Metabase Ops KPIs is the open-source Metabase Business Intelligence server, configured for operational metrics: incident counts, lead time for changes, error rates, p99 latencies, queue depths. You get the full query builder, native SQL editor, dashboards, subscriptions, and embedded charts. The template already knows where the app database lives and how to keep it from vanishing on redeploy.

The gotcha most first-time self-hosters hit is the H2 database. Metabase ships with an embedded H2 file store for convenience, but every container restart wipes it. This Railway template pairs Metabase with a dedicated Postgres service from the start, so dashboards, questions, collections, and permissions persist.

Remember: the Metabase app database is not the same as the analytics databases you query. Your production Postgres, MySQL, Snowflake, Redshift, or MongoDB live elsewhere. Connect them after first boot from Admin → Databases. The Postgres service in this template stores only Metabase's metadata.

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

[View on Railway →](https://railway.com/deploy/metabase-ops-kpis)
