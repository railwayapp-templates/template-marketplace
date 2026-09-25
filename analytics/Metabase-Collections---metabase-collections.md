# Deploy Metabase Collections on Railway

organize questions and dashboards in collections

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-collections)

## About

You finally find last quarter's revenue dashboard — buried three folders deep under someone's personal collection — while the exec sync starts in two minutes. Metabase Collections are the folder tree that keeps questions and dashboards findable: product, ops, and finance each get a home, with permissions that decide who can edit versus who only peeks. Self-hosting on Railway means that tree lives in your Postgres app DB, not in a SaaS seat you lose when the contract renews.

The sidebar of a fresh Metabase instance starts empty except “Our analytics.” A few months later it’s a junk drawer unless you keep the metadata database under control. This Railway template runs the official `metabase/metabase` image with a managed Postgres service as the application database. Postgres stores every collection, dashboard, question, user, and permission. It is not your analytics warehouse; it’s Metabase’s own state. Both containers share Railway’s private network. The app listens on port 3000 and has a health check at `/api/health`. You get the AGPL-licensed Metabase OSS, single-node, with full control over collection metadata and no per-viewer seat fees. Do not use the embedded H2 database in production; H2 is wiped on redeploy and will destroy your collection tree. This template pins the app database to Postgres from the first boot.

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

[View on Railway →](https://railway.com/deploy/metabase-collections)
