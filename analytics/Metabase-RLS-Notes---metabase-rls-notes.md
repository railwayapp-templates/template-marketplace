# Deploy Metabase RLS Notes on Railway

honest RLS limits on Metabase OSS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-rls-notes)

## About

Metabase OSS controls collections, not rows. To restrict a sales rep to their own pipeline, you need database-level row policies. This Railway template runs the official Metabase image with a Postgres app DB. These notes show exactly where OSS row limits stop and Postgres RLS takes over.

You spin up Metabase, connect a warehouse, build dashboards. Then someone asks "can accounting only see rows where department = finance?" And you realize collection permissions aren't row permissions. On Railway, Metabase and its Postgres app database deploy as one template. The app DB stores users, dashboards, and collection permissions. The analytics databases you connect later are separate. If you enforce row limits at the warehouse layer, Metabase inherits them automatically. If you don't, Metabase OSS has no native row filters without Pro.

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

[View on Railway →](https://railway.com/deploy/metabase-rls-notes)
