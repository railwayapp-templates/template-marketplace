# Deploy Nango Production Template on Railway

[Updated Jun 2026] Connect your product & AI agents with 800+ APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nango-production-template)

## About

[Nango](https://nango.dev) is the open-source unified API for product integrations — connect 400+ APIs (Salesforce, HubSpot, GitHub, Slack, Notion, and more) with managed OAuth, sync, and webhooks. This template deploys a complete self-hosted Nango stack on Railway in a single click.

Self-hosting Nango means running three coordinated services: the Nango server (API and admin dashboard), a PostgreSQL database that stores encrypted integration credentials and sync state, and a Redis instance for queues and caching. The official Nango Docker image bundles a static Connect UI server alongside the API, but running them in one container is fragile — if either process exits, both die. This template runs them as **two services from the same image** instead, each with its own auto-generated public domain. Postgres and Redis are Railway managed plugins. Every credential at rest is AES-256 encrypted with a key generated at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nango-connect-ui | `nangohq/nango-server:hosted-0.70.6` | Web service |
| nango-server | `nangohq/nango-server:hosted-0.70.6` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | nango-connect-ui | UTC | - |
| `PORT` | nango-connect-ui | 3009 | - |
| `NODE_ENV` | nango-connect-ui | production | - |
| `NANGO_CONNECT_UI_PORT` | nango-connect-ui | 3009 | - |
| `TZ` | nango-server | UTC | - |
| `PORT` | nango-server | 3003 | - |
| `NODE_ENV` | nango-server | production | - |
| `LOG_LEVEL` | nango-server | info | - |
| `SERVER_PORT` | nango-server | 3003 | - |
| `NANGO_DB_SSL` | nango-server | false | - |
| `NANGO_DB_USER` | nango-server | (secret) | - |
| `CSP_REPORT_ONLY` | nango-server | true | - |
| `FLAG_AUTH_ENABLED` | nango-server | false | - |
| `NANGO_DB_PASSWORD` | nango-server | (secret) | - |
| `NANGO_LOGS_ENABLED` | nango-server | false | - |
| `FLAG_SERVE_CONNECT_UI` | nango-server | false | - |
| `NANGO_DASHBOARD_PASSWORD` | nango-server | (secret) | - |
| `NANGO_DASHBOARD_USERNAME` | nango-server | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `sh -c "npm run -w @nangohq/connect-ui serve:unsafe"`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/ready`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/nango-production-template)
