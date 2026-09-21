# Deploy Metabase vs Grafana on Railway

Metabase BI vs Grafana dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-vs-grafana)

## About

Metabase and Grafana solve different parts of analytics. Grafana excels at real-time metrics and Prometheus dashboards for operational monitoring, while Metabase is built for business users who write SQL or use a query builder to answer questions about product, sales, or operations data. This guide deploys Metabase on Railway with a Postgres backend, but it also gives an honest comparison: if you already run Grafana for infrastructure metrics, Metabase fills the gap for SQL-based business intelligence without forcing every chart into a time-series format.

Self-hosting Metabase means no per-seat fees and no cloud lock-in. The official `metabase/metabase` image runs the BI app on port 3000 and answers `GET /api/health` for Railway health checks. Avoid the embedded H2 database; it wipes on redeploy and is unsafe for production. Pair Metabase with a Postgres service on Railway (use the Postgres plugin or `ghcr.io/railwayapp-templates/postgres-ssl`). Set `MB_DB_TYPE=postgres` plus `MB_DB_HOST`, `MB_DB_PORT`, `MB_DB_USER`, `MB_DB_PASS`, and `MB_DB_DBNAME`.

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

[View on Railway →](https://railway.com/deploy/metabase-vs-grafana)
