# Deploy Metabase AGPL on Railway

Metabase OSS AGPL licensing notes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-agpl)

## About

Metabase AGPL's copyleft rarely triggers on Railway: running the stock image needs no source sharing. Here's the operational reality of hosting the OSS BI stack with Postgres.

First deploy takes ten minutes once Postgres is ready. The container runs migrations, then the setup wizard creates an admin.

AGPL changes legal obligations only for modified code. Running upstream unmodified for internal users is fine; only if you fork, patch, and serve the modified version externally do you owe source.

Keep the app DB on Postgres, not H2. Without MB_DB_TYPE set, Metabase falls back to H2, whose data disappears on redeploy. The template pins MB_DB_TYPE=postgres to the companion Postgres service.

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

[View on Railway →](https://railway.com/deploy/metabase-agpl)
