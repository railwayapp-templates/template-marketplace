# Deploy Metabase vs Power BI on Railway

Metabase BI without Power BI lock-in

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-vs-power-bi)

## About

Host Metabase on Railway.

Metabase is an open-source business intelligence and analytics platform that runs as a single Docker container. The official image, metabase/metabase, listens on port 3000 and exposes a health check at GET /api/health. On Railway you pair the Metabase service with a companion Postgres service using the ghcr.io/railwayapp-templates/postgres-ssl image (Postgres 17 is fine) and point Metabase at it with MB_DB_TYPE=postgres plus MB_DB_HOST, MB_DB_PORT, MB_DB_USER, MB_DB_PASS, and MB_DB_DBNAME. The internal H2 database is wiped on every redeploy and is not suitable for production, so Postgres is mandatory for any hosted Metabase vs Power BI deployment that must keep dashboards, saved questions, collections, and admin settings across deploys.

First boot runs migrations against the application Postgres database, after which the setup wizard creates the initial admin user. That application database is separate from the analytics or warehouse databases you connect later under Admin → Databases; Metabase supports Postgres, MySQL, BigQuery, Snowflake, Redshift, MongoDB, and many other sources. Set MB_ENCRYPTION_SECRET_KEY to a stable value across deploys or encrypted connection settings will break, and set MB_SITE_URL to the public HTTPS URL so shared links, embedded dashboards, and email links resolve correctly.

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

[View on Railway →](https://railway.com/deploy/metabase-vs-power-bi)
