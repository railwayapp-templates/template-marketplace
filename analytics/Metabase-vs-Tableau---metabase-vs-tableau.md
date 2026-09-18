# Deploy Metabase vs Tableau on Railway

self-hosted Metabase as a Tableau alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-vs-tableau)

## About

Metabase vs Tableau is a self-hosted Tableau alternative for teams that want open-source business intelligence without per-seat licensing.

Metabase vs Tableau is a self-hosted deployment of the open-source Metabase business intelligence platform, configured as a direct Tableau alternative. This Railway template pairs the official `metabase/metabase` Docker image (pin `v0.63.x` or `latest`) with a production Postgres application database. The app listens on port 3000, and Railway proxies public HTTPS to it.

The Postgres service stores all Metabase metadata—users, dashboards, questions, settings. It is separate from the analytics databases you later connect via Admin → Databases. The default H2 app database is wiped on redeploy and is not production-safe. Use `MB_DB_TYPE=postgres` against the companion Postgres (Postgres 17 works).

Railway handles orchestration and networking while you own the instance and data.

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

[View on Railway →](https://railway.com/deploy/metabase-vs-tableau)
