# Deploy Metabase SaaS Metrics on Railway

MRR, churn, and SaaS KPI dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-saas-metrics)

## About

Most SaaS operators don't actually know their real MRR number until it's too late. Metabase lets you query billing data directly and build MRR movement, churn, and NRR dashboards that refresh on schedule. This guide covers deploying Metabase on Railway, wiring it to Postgres, and connecting your billing warehouse.

Two databases matter: the Metabase app DB stores dashboards, users, and permissions; the billing warehouse holds Stripe or subscription data. On Railway, keep them separate. Never use the default H2 app DB in production, because it's wiped on redeploy. Pin the image version, like v0.63.x, rather than blindly pulling latest.

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

[View on Railway →](https://railway.com/deploy/metabase-saas-metrics)
