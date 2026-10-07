# Deploy Metabase Backups on Railway

back up the Metabase app DB, settings, and dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-backups)

## About

Metabase backups mean the Postgres app DB, the encryption secret, and a tested restore path. Railway volume backups plus `pg_dump` give you boring, reliable recovery. This guide covers what to back up, how to restore, and what to practice.

State lives in Postgres, not the container. The official image (`metabase/metabase`, pin v0.63.x) listens on 3000, health at `/api/health`. Back up the companion Postgres (ghcr.io/railwayapp-templates/postgres-ssl, 17) plus `MB_ENCRYPTION_SECRET_KEY`. H2 is wiped on redeploy, so never run production on it. Volume backups cover fast recovery on Railway; `pg_dump` gives you portable copies.

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

[View on Railway →](https://railway.com/deploy/metabase-backups)
