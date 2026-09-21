# Deploy Metabase vs Superset on Railway

Metabase vs Apache Superset bake-off

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-vs-superset)

## About

Two teams, same question: which open-source BI tool do we actually want running in production? One has analysts who live in SQL; the other has PMs who need a weekly dashboard without filing a ticket. This template deploys Metabase, but the real decision is Metabase versus Apache Superset. Both are free to self-host. The difference is complexity: Superset spreads across Redis, Celery workers, and a metadata DB; Metabase concentrates it in one JVM container plus Postgres. That shapes onboarding, upgrades, and whether dashboards survive a redeploy.

This canvas runs Metabase OSS with a managed Postgres application database. Superset is the comparison point, not co-hosted here—though Railway can run it too, it needs Redis and Celery workers, turning a two-service stack into four or five. Metabase ships as a single container plus Postgres. The analytics databases you connect (Postgres, MySQL, BigQuery, Snowflake, Redshift, MongoDB) are separate from the app DB and wired up after first boot via Admin → Databases. The template pins `metabase/metabase` (v0.63.x or later), exposes port 3000, and health-checks `GET /api/health`. Metabase OSS is AGPL; embedding in commercial SaaS has license implications.

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

[View on Railway →](https://railway.com/deploy/metabase-vs-superset)
