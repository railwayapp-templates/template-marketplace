# Deploy dbt + Metabase analytics on Railway

Scheduled dbt transformations with a ready-to-use Metabase analytics layer.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dbt-metabase-analytics)

## About

Deploy scheduled dbt transformations, a ready-to-use Metabase dashboard, and separate PostgreSQL databases for Metabase state and warehouse data. The first boot seeds and tests an example model, connects Metabase to the warehouse, and creates a working question and dashboard.

dbt turns warehouse SQL into tested, repeatable data models, while Metabase provides browser-based exploration and dashboards. This template runs dbt daily, keeps both databases private, and exposes only Metabase through Railway's public networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Metabase PostgreSQL | `postgres:17.6-alpine@sha256:ef257d85f76e48da1c64832459b59fcaba1a4dac97bf5d7450c77753542eee94` | Database |
| Metabase | `metabase/metabase:v0.63.2@sha256:252f8c9bd56dd21158005675b55876cf9fb838e0a0e0541581af859eafe1f32e` | Web service |
| dbt | [tech-progress/railway-template-dbt-metabase](https://github.com/tech-progress/railway-template-dbt-metabase) (branch: release-v1) (root: /) | Worker |
| Warehouse PostgreSQL | `postgres:17.6-alpine@sha256:ef257d85f76e48da1c64832459b59fcaba1a4dac97bf5d7450c77753542eee94` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Metabase PostgreSQL | metabase | - |
| `POSTGRES_USER` | Metabase PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Metabase PostgreSQL | (secret) | - |
| `PORT` | Metabase | 3000 | - |
| `JAVA_OPTS` | Metabase | -Xms128m -Xmx384m | Bounded Java heap sized for this small-team baseline. |
| `MB_DB_PORT` | Metabase | 5432 | - |
| `MB_DB_TYPE` | Metabase | postgres | - |
| `MB_DB_USER` | Metabase | (secret) | - |
| `MB_JETTY_PORT` | Metabase | 3000 | - |
| `METABASE_ADMIN_EMAIL` | Metabase | admin@example.com | Email for the administrator created on first boot. |
| `MB_LOAD_SAMPLE_CONTENT` | Metabase | false | - |
| `METABASE_ADMIN_PASSWORD` | Metabase | (secret) | Generated first-boot administrator password; changing it later does not rotate the account. |
| `MB_ANON_TRACKING_ENABLED` | Metabase | false | - |
| `MB_ENCRYPTION_SECRET_KEY` | Metabase | (secret) | Generated key used to encrypt warehouse credentials in Metabase. |
| `PORT` | dbt | 8080 | - |
| `WAREHOUSE_PORT` | dbt | 5432 | - |
| `WAREHOUSE_USER` | dbt | (secret) | - |
| `WAREHOUSE_PASSWORD` | dbt | (secret) | - |
| `METABASE_ADMIN_PASSWORD` | dbt | (secret) | - |
| `DBT_RUN_INTERVAL_SECONDS` | dbt | 86400 | Seconds between successful dbt seed and build runs. |
| `POSTGRES_DB` | Warehouse PostgreSQL | warehouse | - |
| `POSTGRES_USER` | Warehouse PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Warehouse PostgreSQL | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`

**Category:** Analytics · **Languages:** Shell, Python, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/dbt-metabase-analytics)
