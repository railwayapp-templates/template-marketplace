# Deploy Dittofeed on Railway

Customer engagement journeys — self-hosted Customer.io alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dittofeed-2)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/dittofeed?utm_medium=integration&utm_source=button&utm_campaign=dittofeed)

[Dittofeed](https://dittofeed.com/) is an open-source customer engagement platform — a self-hosted alternative to Customer.io, Braze, and OneSignal. Build segment-driven automated journeys with a visual editor, send templated messages over email, SMS, and webhooks, and keep every user event in your own infrastructure.

This template runs Dittofeed's **lite** bundle — API, dashboard, and worker in a single service — next to the three stores it needs: Postgres (app data), ClickHouse (user events and segmentation), and Temporal (journey orchestration, using the same Postgres). Database migrations and the initial workspace bootstrap run automatically on first boot. Authentication is single-tenant: one shared login guarded by the generated `PASSWORD` template variable, with sessions signed by `SECRET_KEY`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dittofeed | [nomideusz/dittofeed-railway](https://github.com/nomideusz/dittofeed-railway) (root: /lite) | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| clickhouse | `clickhouse/clickhouse-server:24.12.6.70-alpine` | Database |
| temporal | [nomideusz/dittofeed-railway](https://github.com/nomideusz/dittofeed-railway) (root: /temporal) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | dittofeed | production | Leave as production |
| `PASSWORD` | dittofeed | (secret) | Auto-generated - your dashboard login password |
| `AUTH_MODE` | dittofeed | single-tenant | Single shared login guarded by PASSWORD |
| `BOOTSTRAP` | dittofeed | true | Creates the workspace on first boot (idempotent) - set false later for faster restarts |
| `SECRET_KEY` | dittofeed | (secret) | Auto-generated - signs dashboard sessions |
| `DATABASE_HOST` | dittofeed | - | Wired to the bundled Postgres - leave as is |
| `DATABASE_PORT` | dittofeed | 5432 | Postgres port |
| `DATABASE_USER` | dittofeed | (secret) | Wired to the bundled Postgres - leave as is |
| `WORKSPACE_NAME` | dittofeed | Default | Name of your Dittofeed workspace |
| `CLICKHOUSE_HOST` | dittofeed | - | Wired to the bundled ClickHouse - leave as is |
| `CLICKHOUSE_USER` | dittofeed | (secret) | Wired to the bundled ClickHouse - leave as is |
| `TEMPORAL_ADDRESS` | dittofeed | - | Wired to the bundled Temporal - leave as is |
| `DATABASE_PASSWORD` | dittofeed | (secret) | Wired to the bundled Postgres - leave as is |
| `DASHBOARD_API_BASE` | dittofeed | - | Leave empty - derived from your Railway domain automatically |
| `CLICKHOUSE_PASSWORD` | dittofeed | (secret) | Wired to the bundled ClickHouse - leave as is |
| `SESSION_COOKIE_SECURE` | dittofeed | true | Secure session cookie - correct behind Railway's HTTPS edge, leave true |
| `POSTGRES_DB` | postgres | dittofeed | App database (Temporal creates its own alongside) |
| `POSTGRES_USER` | postgres | (secret) | Superuser - Dittofeed bootstrap and Temporal auto-setup need it |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password |
| `CLICKHOUSE_USER` | clickhouse | (secret) | ClickHouse application user |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Auto-generated ClickHouse password |
| `DB` | temporal | postgresql | Temporal persistence driver - leave as is |
| `DB_PORT` | temporal | 5432 | Postgres port |
| `POSTGRES_PWD` | temporal | - | Wired to the bundled Postgres - leave as is |
| `POSTGRES_USER` | temporal | (secret) | Wired to the bundled Postgres - leave as is |
| `POSTGRES_SEEDS` | temporal | - | Wired to the bundled Postgres - leave as is |

## Configuration

- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/clickhouse`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/dittofeed-2)
