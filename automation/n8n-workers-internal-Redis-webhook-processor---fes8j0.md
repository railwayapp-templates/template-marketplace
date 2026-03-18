# Deploy n8n (workers + internal Redis + webhook processor) on Railway

n8n w/internal Redis, Postgres, workers, webhook processor. 1-click deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fes8j0)

## About

Quick Start
Just deploy it - no additional configuration required
Open the Primary node / instance
Go to Settings, follow the Public Networking URL to access your n8n web UI

I am not taking credit for this template. I have combined the templates of Nikolai and Jack because I needed internal Redis AND Webhook Processor

Changelog:
2025-03-26: Added N8N_REINSTALL_MISSING_PACKAGES to reinstall community packages

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n` | Worker |
| Webhook processor | `n8nio/n8n` | Worker |
| Redis | `bitnami/redis` | Database |
| Primary | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Worker | 5678 |
| `DB_TYPE` | Worker | postgresdb |
| `EXECUTIONS_MODE` | Worker | queue |
| `DB_POSTGRESDB_USER` | Worker | (secret) |
| `N8N_LISTEN_ADDRESS` | Worker | :: |
| `N8N_RUNNERS_ENABLED` | Worker | true |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Worker | true |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true |
| `N8N_REINSTALL_MISSING_PACKAGES` | Worker | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true |
| `PORT` | Webhook processor | 5678 |
| `DB_TYPE` | Webhook processor | postgresdb |
| `NODE_OPTIONS` | Webhook processor | --max_old_space_size=8192 |
| `EXECUTIONS_MODE` | Webhook processor | queue |
| `DB_POSTGRESDB_USER` | Webhook processor | (secret) |
| `N8N_LISTEN_ADDRESS` | Webhook processor | :: |
| `DB_POSTGRESDB_PASSWORD` | Webhook processor | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Webhook processor | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Webhook processor | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Webhook processor | true |
| `QUEUE_BULL_REDIS_DUALSTACK` | Webhook processor | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Webhook processor | true |
| `REDISUSER` | Redis | default |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDISPORT_PRIVATE` | Redis | 6379 |
| `PORT` | Primary | 5678 |
| `DB_TYPE` | Primary | postgresdb |
| `EXECUTIONS_MODE` | Primary | queue |
| `DB_POSTGRESDB_USER` | Primary | (secret) |
| `N8N_ENCRYPTION_KEY` | Primary | KbddBBbBnbZ6sFwqtkxp!Tp5IEeVmbAZ |
| `N8N_LISTEN_ADDRESS` | Primary | :: |
| `N8N_RUNNERS_ENABLED` | Primary | true |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true |
| `N8N_REINSTALL_MISSING_PACKAGES` | Primary | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true |
| `POSTGRES_DB` | Postgres | n8n |
| `POSTGRES_USER` | Postgres | (secret) |
| `PGPORT_PRIVATE` | Postgres | 5432 |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `n8n worker`
- **Healthcheck:** `/healthz`
- **Start command:** `n8n webhook`
- **Volume:** `/bitnami`
- **Start command:** `n8n start`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/fes8j0)
