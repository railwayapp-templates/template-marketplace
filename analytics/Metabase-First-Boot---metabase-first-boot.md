# Deploy Metabase First Boot on Railway

first-boot migrations and admin setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-first-boot)

## About

The first time `metabase/metabase` meets an empty Postgres database, it spends a few quiet minutes running migrations before it shows you anything. Most "Metabase won't start" threads are really "someone restarted it halfway through." This template pairs the official image with a Railway Postgres app DB and walks through that first boot so every deploy after it is boring.

Here's what actually happens. The JVM starts, Metabase connects to the app database named in `MB_DB_*`, and Liquibase applies the full changelog history in order, not just the latest schema. On a fresh database that's hundreds of changesets. Only after that does the web server answer on port 3000 and the setup wizard appear.

Logs look stalled during this stretch. They aren't. The two mistakes that hurt are killing the container mid-run and forgetting to point Metabase at Postgres at all, which leaves it on H2. This template avoids the second by wiring Postgres before the first deploy.

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

[View on Railway →](https://railway.com/deploy/metabase-first-boot)
