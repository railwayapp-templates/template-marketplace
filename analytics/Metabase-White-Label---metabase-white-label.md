# Deploy Metabase White Label on Railway

white-label BI embeds for your brand

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-white-label)

## About

White-labeling Metabase means your customers see your logo, your colors, and your fonts — never the Metabase name. You run the official OSS image, set appearance variables, and hand over a branded analytics URL.

You’re not deploying a fork. You’re deploying stock `metabase/metabase` with appearance settings, a companion Postgres, and a few environment variables that keep branding and encryption stable across redeploys.

The biggest mistake is treating H2 as acceptable. First boot will happily create an embedded H2 file if no Postgres is configured, then wipe it on every deploy, taking users, dashboards, and permissions with it. Always point `MB_DB_TYPE` at Postgres from the start.

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

[View on Railway →](https://railway.com/deploy/metabase-white-label)
