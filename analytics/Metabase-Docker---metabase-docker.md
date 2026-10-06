# Deploy Metabase Docker on Railway

official Metabase image on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-docker)

## About

Running Metabase in Docker is easy until the default H2 database vanishes on redeploy. This guide pins the official image to Postgres on Railway so dashboards, users, and settings survive upgrades instead of disappearing with the container.

The container is the JVM process that serves the UI, runs queries, and renders charts. Durable state—dashboards, saved questions, permissions, connection metadata—lives in an application database. The stock image with no env vars uses H2 inside the container filesystem. That works for a demo, but Railway wipes it on rebuild.

This template wires metabase/metabase to a companion Postgres service. Port 3000 serves the web UI; health check GET /api/health returns 200 only after migrations finish. First boot creates the schema and drops you into the setup wizard to create an admin user. Then you add warehouse databases—Postgres, MySQL, BigQuery, Snowflake, Redshift, MongoDB—via Admin → Databases.

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

[View on Railway →](https://railway.com/deploy/metabase-docker)
