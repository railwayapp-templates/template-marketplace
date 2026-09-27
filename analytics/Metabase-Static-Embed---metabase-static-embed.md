# Deploy Metabase Static Embed on Railway

signed static embeds for Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-static-embed)

## About

Metabase's static embed feature lets you sign a chart or dashboard URL with a JWT and drop it into an iframe anywhere — no interactive drill-downs, no Pro license, no per-viewer seats. This guide covers the operational reality of running that on Railway: what works out of the box, what breaks, and how to keep the embedding secret and `MB_SITE_URL` straight so your signed URLs actually load.

Static embedding in Metabase OSS sounds simple until the first 404 from a signed URL that was fine five minutes ago. The mechanics are straightforward: configure an embedding secret, generate a JWT, append it to a public embed URL. The friction comes from keeping the secret stable across deploys, matching `MB_SITE_URL` to the host users hit, and separating the Metabase app database from the analytics database you chart.

On Railway, run the official `metabase/metabase` image (pin to something like `v0.63.x`, not `latest`) with a companion Postgres for the app DB. The UI listens on port 3000; health check at `GET /api/health`. First boot runs migrations and can take a minute or two. Never use the default H2 database — it wipes on every redeploy.

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

[View on Railway →](https://railway.com/deploy/metabase-static-embed)
