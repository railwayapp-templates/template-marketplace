# Deploy Metabase API on Railway

REST API for questions and automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-metabase-api-headless-bi)

## About

The Metabase REST API turns dashboards into a query engine for scripts, bots, or products. Self-hosting on Railway keeps it on your infrastructure with no per-request or seat fees. This guide covers the container, companion Postgres, and env vars that keep API keys and encrypted settings stable.

Metabase is usually a UI tool, but the API is where headless work happens: pull saved question results into Python, trigger refreshes from webhooks, or provision collections programmatically. Cloud BI vendors charge per seat or API call; self-hosted Metabase on Railway gives the same REST endpoints against a container you control.

The Railway template pairs Metabase and Postgres containers. Metabase stores metadata - saved questions, dashboards, API keys, users - in that Postgres. Analytics databases you query are separate, connected after first boot via admin.

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

[View on Railway →](https://railway.com/deploy/deploy-metabase-api-headless-bi)
