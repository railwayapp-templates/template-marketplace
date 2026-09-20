# Deploy Metabase vs Looker on Railway

self-hosted Metabase vs Looker / Looker Studio

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-vs-looker)

## About

If Looker seat costs or Looker Studio limits are pushing you out, this listing is self-hosted Metabase on Railway — same Metabase + Postgres canvas, aimed at teams leaving Looker pricing behind.

Looker feels metered — every join and saved dashboard counts against someone upstream. Hosting Metabase yourself removes that. On Railway, the Metabase container and its Postgres backend share private networking; the image serves the BI app on port 3000 and answers `GET /api/health`.

The trap is the embedded H2 database — it gets wiped on redeploy and is not for production. Pair `metabase/metabase` with Postgres (use `ghcr.io/railwayapp-templates/postgres-ssl`, Postgres 17) and set `MB_DB_TYPE=postgres` plus `MB_DB_HOST`, `MB_DB_PORT`, `MB_DB_USER`, `MB_DB_PASS`, `MB_DB_DBNAME`. First boot runs migrations and the wizard creates your admin. Warehouses connect later via Admin → Databases, not through env vars.

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

[View on Railway →](https://railway.com/deploy/metabase-vs-looker)
