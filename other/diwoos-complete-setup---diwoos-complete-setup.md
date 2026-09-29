# Deploy diwoos-complete-setup on Railway

Complete Setup with Chatwoot, N8N and NocoDB for DiwoOS Projects

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/diwoos-complete-setup)

## About

DiwoOS is a unified operational stack that combines Chatwoot for customer support, n8n for automation, NocoDB for no-code data management, PostgreSQL for durable storage, and Redis for queues. The services are delivered together in one Railway template while keeping each component independently deployable and scalable.

This template provides a complete support and automation foundation. Chatwoot handles customer conversations, n8n Primary provides the workflow editor and API, n8n Worker processes queued executions, and NocoDB gives operations teams a visual data interface. PostgreSQL and Redis are connected through Railway private networking, with persistent volumes for stateful services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Primary | `n8nio/n8n` | Web service |
| Chatwoot | `ghcr.io/railwayapp-templates/chatwoot:Community` | Web service |
| Redis | `railwayapp/redis` | Database |
| NocoDB | `nocodb/nocodb:2026.07.0` | Web service |
| Worker | `n8nio/n8n` | Worker |
| Postgres-DiwoOS | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Primary | 5678 | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_TYPE` | Primary | postgresdb | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `EXECUTIONS_MODE` | Primary | queue | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_TRUST_PROXY` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_WEBHOOK_URL` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_HOST` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_PORT` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_USER` | Primary | (secret) | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_ENCRYPTION_KEY` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_LISTEN_ADDRESS` | Primary | :: | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_EDITOR_BASE_URL` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_HOST` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_PORT` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_DATABASE` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `NODE_ENV` | Chatwoot | production | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `RAILS_ENV` | Chatwoot | production | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `REDIS_URL` | Chatwoot | - | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `DATABASE_URL` | Chatwoot | - | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `FRONTEND_URL` | Chatwoot | - | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `DEFAULT_LOCALE` | Chatwoot | en | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `SECRET_KEY_BASE` | Chatwoot | (secret) | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `INSTALLATION_ENV` | Chatwoot | docker | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `ACTIVE_STORAGE_SERVICE` | Chatwoot | local | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `REDISHOST` | Redis | - | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDISPORT` | Redis | 6379 | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDISUSER` | Redis | default | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDIS_URL` | Redis | - | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDISPASSWORD` | Redis | (secret) | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDIS_PASSWORD` | Redis | (secret) | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDIS_PUBLIC_URL` | Redis | - | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `NC_DB` | NocoDB | - | Configuração interna do NocoDB, pré-definida pelo template DiwoOS. |
| `NC_SITE_URL` | NocoDB | - | Configuração interna do NocoDB, pré-definida pelo template DiwoOS. |
| `NC_DISABLE_MUX` | NocoDB | true | Configuração interna do NocoDB, pré-definida pelo template DiwoOS. |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | Configuração interna do NocoDB, pré-definida pelo template DiwoOS. |
| `PORT` | Worker | 5678 | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_TYPE` | Worker | postgresdb | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `EXECUTIONS_MODE` | Worker | queue | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `N8N_WEBHOOK_URL` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_HOST` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_PORT` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_USER` | Worker | (secret) | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `N8N_ENCRYPTION_KEY` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `N8N_LISTEN_ADDRESS` | Worker | :: | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_HOST` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_PORT` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_DATABASE` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `POSTGRES_DB` | Postgres-DiwoOS | railway | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |
| `DATABASE_URL` | Postgres-DiwoOS | - | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |
| `POSTGRES_USER` | Postgres-DiwoOS | (secret) | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |
| `POSTGRES_PASSWORD` | Postgres-DiwoOS | (secret) | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |
| `DATABASE_PUBLIC_URL` | Postgres-DiwoOS | - | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api`
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c "redis-server --requirepass "$REDIS_PASSWORD" --save 60 1 --dir "$RAILWAY_VOLUME_MOUNT_PATH" --appendonly yes"`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Healthcheck:** `/api/v1/health`
- **Volume:** `/usr/app/data/`
- **Start command:** `n8n worker`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/diwoos-complete-setup)
