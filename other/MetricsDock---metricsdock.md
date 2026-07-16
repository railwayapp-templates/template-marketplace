# Deploy MetricsDock on Railway

Shopify Partner analytics with a web app, worker, PostgreSQL, and Valkey.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metricsdock)

## About

MetricsDock is an open-source, standalone analytics SaaS for Shopify app developers. It imports Shopify Partner API data and turns it into auditable revenue, customer, churn, shop, and App Store performance reports without running as an embedded Shopify app.

This template deploys the complete production stack: a TanStack Start web application, a BullMQ worker, PostgreSQL, and Valkey. Railway builds the web and worker from the same public repository, connects them to the database and queue over private networking, provisions persistent volumes, runs committed Drizzle migrations before the web process starts, and exposes the application with a health-checked public domain.

You provide authentication and encryption secrets during deployment. Shopify Partner credentials are added later inside MetricsDock and remain scoped to the active Better Auth organization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| app | [djordje-st/metricsdock](https://github.com/djordje-st/metricsdock) | Web service |
| worker | [djordje-st/metricsdock](https://github.com/djordje-st/metricsdock) | Worker |
| Valkey | `valkey/valkey:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `CRON_SECRET` | app | (secret) |
| `PLUNK_API_KEY` | app | (secret) |
| `BETTER_AUTH_SECRET` | app | (secret) |
| `WORKBENCH_PASSWORD` | app | (secret) |
| `WORKBENCH_USERNAME` | app | (secret) |
| `GOOGLE_CLIENT_SECRET` | app | (secret) |
| `CRON_SECRET` | worker | (secret) |
| `PLUNK_API_KEY` | worker | (secret) |
| `BETTER_AUTH_SECRET` | worker | (secret) |
| `WORKBENCH_PASSWORD` | worker | (secret) |
| `WORKBENCH_USERNAME` | worker | (secret) |
| `GOOGLE_CLIENT_SECRET` | worker | (secret) |
| `VALKEY_USER` | Valkey | (secret) |
| `VALKEY_PASSWORD` | Valkey | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm run start`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `pnpm run worker`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/metricsdock)
