# Deploy Metabase Charts on Railway

charts, pivots, and visualization in Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-charts)

## About

You open Metabase at 9:15 on a Tuesday and see a line chart of daily signups with a 7-day rolling average, then click a pivot table that slices revenue by region across the last three quarters. A product manager toggles the date filter from "last 90 days" to "this year" and the whole dashboard re-renders in under a second. That's the moment self-hosting stops feeling like a server project and starts feeling like a shared language for your database. Metabase's chart layer is deliberately boring in the best way: bars, lines, areas, rows, maps, funnels, and pivots that just work after you pick a table and an aggregation. You don't get Tableau's dual-axis wizardry or Power BI's custom visual marketplace, but you get a clean path from `SELECT count(*) FROM orders WHERE status = 'paid'` to a dashboard your support team actually checks. Pivot tables are the sleeper hit—two dimensions as rows, one as columns, a measure in the cells, and suddenly a support backlog spreadsheet becomes a real question about team load by priority and week. The visualization picker auto-suggests a chart type based on your result set, but you can override it with one click, which is exactly the right amount of opinion for people who don't live in SQL all day.

Metabase turns SQL result sets into charts and dashboards that non-analysts can actually read. Self-hosting it on Railway means you control the app and its backing database instead of renting seats from a BI vendor. This template runs the official `metabase/metabase` image on Railway. The container listens on port 3000 and exposes `GET /api/health` so Railway knows when it's ready. On first boot, Metabase runs migrations against a Postgres database. The companion Postgres service (`ghcr.io/railwayapp-templates/postgres-ssl`, version 17 is fine) stores your saved questions, dashboards, admin users, and settings. Do not let Metabase fall back to its embedded H2 database—H2 lives inside the container and is wiped on every redeploy. Your actual analytics databases (Postgres, MySQL, BigQuery, Snowflake, Redshift, MongoDB, etc.) are separate. You connect them after first boot via Admin → Databases; Metabase queries them directly and caches results in the app Postgres.

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

[View on Railway →](https://railway.com/deploy/metabase-charts)
