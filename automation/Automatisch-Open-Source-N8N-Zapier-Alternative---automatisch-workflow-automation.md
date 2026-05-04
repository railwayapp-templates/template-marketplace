# Deploy Automatisch | Open Source N8N, Zapier Alternative on Railway

Self host Automatisch on Railway: connect apps, automate workflows easily

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automatisch-workflow-automation)

## About

Deploy Automatisch on Railway to self-host your own workflow automation platform — a privacy-first, open-source alternative to Zapier. This template provisions the Automatisch web app, a background worker for executing automations, PostgreSQL for workflow storage, and Redis for the job queue — all connected and ready to use.

Self-host Automatisch on Railway with zero DevOps overhead and full control over your automation data.

![Automatisch Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777812111/16166bf0-e503-4d15-a46b-3e81f1dbd011.png)

Automatisch is an open-source workflow automation platform built for teams who need Zapier-like functionality without sending data to third-party clouds. It runs entirely on your infrastructure, keeping automation data under your control.

Key features:

- **Visual flow builder** — drag-and-drop interface for building multi-step automations without code
- **200+ app integrations** — Slack, GitHub, Google Workspace, Stripe, Notion, and more
- **Webhook triggers** — receive events from any service that supports webhooks
- **Scheduled triggers** — run automations on cron schedules
- **Data privacy** — all credentials and execution data stay on your server
- **Multi-user** — team access with role-based permissions (Enterprise)

The architecture uses a main app service (web UI + API) and a separate worker process for executing automations asynchronously via BullMQ/Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Automatisch | `automatischio/automatisch:0.15.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Automatisch-Worker | `automatischio/automatisch:0.15.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Automatisch | 3000 | HTTP server listening port |
| `APP_ENV` | Automatisch | production | Application environment mode |
| `PROTOCOL` | Automatisch | https | URL protocol for generated links |
| `REDIS_HOST` | Automatisch | - | Redis internal hostname |
| `REDIS_PORT` | Automatisch | - | Redis port |
| `WEBHOOK_URL` | Automatisch | - | Webhook callback URL |
| `WEB_APP_URL` | Automatisch | - | Public-facing app URL |
| `POSTGRES_HOST` | Automatisch | - | Postgres internal hostname |
| `POSTGRES_PORT` | Automatisch | - | Postgres port |
| `APP_SECRET_KEY` | Automatisch | (secret) | User session authentication key |
| `ENCRYPTION_KEY` | Automatisch | - | Encrypts stored third-party credentials |
| `REDIS_PASSWORD` | Automatisch | (secret) | Redis authentication password |
| `POSTGRES_DATABASE` | Automatisch | - | Postgres database name |
| `POSTGRES_PASSWORD` | Automatisch | (secret) | Postgres password |
| `POSTGRES_USERNAME` | Automatisch | (secret) | Postgres username |
| `TELEMETRY_ENABLED` | Automatisch | false | Disable usage telemetry |
| `WEBHOOK_SECRET_KEY` | Automatisch | (secret) | Verifies incoming webhook requests |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `WORKER` | Automatisch-Worker | true | Enables worker mode |
| `APP_ENV` | Automatisch-Worker | production | Application environment mode |
| `PROTOCOL` | Automatisch-Worker | https | URL protocol for generated links |
| `REDIS_HOST` | Automatisch-Worker | - | Redis internal hostname |
| `REDIS_PORT` | Automatisch-Worker | - | Redis port |
| `WEBHOOK_URL` | Automatisch-Worker | - | Webhook callback URL |
| `WEB_APP_URL` | Automatisch-Worker | - | Main app public URL |
| `POSTGRES_HOST` | Automatisch-Worker | - | Postgres internal hostname |
| `POSTGRES_PORT` | Automatisch-Worker | - | Postgres port |
| `APP_SECRET_KEY` | Automatisch-Worker | (secret) | Shared session key |
| `ENCRYPTION_KEY` | Automatisch-Worker | - | Shared encryption key |
| `REDIS_PASSWORD` | Automatisch-Worker | (secret) | Redis authentication password |
| `POSTGRES_DATABASE` | Automatisch-Worker | - | Postgres database name |
| `POSTGRES_PASSWORD` | Automatisch-Worker | (secret) | Postgres password |
| `POSTGRES_USERNAME` | Automatisch-Worker | (secret) | Postgres username |
| `TELEMETRY_ENABLED` | Automatisch-Worker | false | Disable usage telemetry |
| `WEBHOOK_SECRET_KEY` | Automatisch-Worker | (secret) | Shared webhook secret |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/automatisch/storage`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/automatisch-workflow-automation)
