# Deploy Metabase Redshift on Railway

Amazon Redshift BI with Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-redshift-clone)

## About

Pointing a BI tool at Redshift shouldn't cost more than the warehouse itself. Metabase gives you a clean, question-driven interface that talks to Redshift natively, and self-hosting it on Railway means one small container plus a Postgres sidecar. This guide covers setup, gotchas, and comparisons.

Metabase runs as a single JVM containerâ€”no orchestrator, no sidecars. The app needs exactly one external dependency: a Postgres database for its own state (users, questions, dashboards, permissions, cached results). Your Redshift cluster is a separate analytics source you connect after first boot, not a place to store Metabase's settings.

The most common mistake is conflating these two. People point Metabase's app database at Redshift, or leave it on the default H2 file database, and settings vanish on redeploy. Don't do either. Set `MB_DB_TYPE=postgres` and point it at a real Postgres instance from day one.

Railway handles persistent volumes, internal DNS between the Metabase container and its companion Postgres, and environment variable injection that survives redeploys. You still need to keep your encryption secret stable and set the site URL.

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

[View on Railway →](https://railway.com/deploy/metabase-redshift-clone)
