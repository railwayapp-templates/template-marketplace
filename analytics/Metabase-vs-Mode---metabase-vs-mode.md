# Deploy Metabase vs Mode on Railway

Metabase vs Mode for SQL analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-vs-mode)

## About

If you’ve spent two years writing SQL in Mode’s browser notebook, switching to self-hosted Metabase feels like moving from a managed condo to a workshop you actually own. You give up a few polished collaboration features, but you stop paying per seat and your query results never leave your VPC. On Railway, that workshop is a single Postgres service plus a Metabase container—no Kubernetes, no Terraform, no begging IT for a staging box.

This stack runs the official `metabase/metabase` Docker image (pin a version like `v0.63.x` for stability) with an external Postgres database for Metabase application state. The app listens on port 3000 and exposes a health check at `GET /api/health`. On first boot, Metabase runs migrations against that Postgres and drops you into a setup wizard where you create the admin account.

The crucial distinction: the Postgres here is **only** for Metabase’s own metadata—users, dashboards, saved questions, permissions, settings. Your actual analytics databases (Postgres, MySQL, BigQuery, Snowflake, Redshift, MongoDB, whatever) are separate connections you add after login via **Admin → Databases**. If you run Metabase with the embedded H2 database, a redeploy wipes every dashboard and saved question. Don’t do that. Use Postgres from the start.

Railway’s template includes a companion Postgres service using `ghcr.io/railwayapp-templates/postgres-ssl` (version 17 is fine).

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

[View on Railway →](https://railway.com/deploy/metabase-vs-mode)
