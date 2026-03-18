# Deploy N8n - Comunidade Visionários on Railway

Template ajustado de bugs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b_LXy3)

## About

Template ajustado de bugs.

Caso ocorrer o erro ao conectar com API externas (Google, Webhook, etc), você deve adicionar o "https://" nas variáveis de ambiente do Railway.

As 2 que precisam ser modificadas são as seguintes:

N8N_EDITOR_BASE_URL 
WEBHOOK_URL

Depois de fazer esse ajuste, só executar o deploy novamente.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| Redis | `bitnami/redis` | Database |
| Worker | `n8nio/n8n` | Worker |
| Primary | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `PGPORT_PRIVATE` | Postgres | 5432 |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISUSER` | Redis | default |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDISPORT_PRIVATE` | Redis | 6379 |
| `PORT` | Worker | 5678 |
| `DB_TYPE` | Worker | postgresdb |
| `EXECUTIONS_MODE` | Worker | queue |
| `DB_POSTGRESDB_USER` | Worker | (secret) |
| `N8N_LISTEN_ADDRESS` | Worker | :: |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true |
| `PORT` | Primary | 5678 |
| `DB_TYPE` | Primary | postgresdb |
| `EXECUTIONS_MODE` | Primary | queue |
| `DB_POSTGRESDB_USER` | Primary | (secret) |
| `N8N_ENCRYPTION_KEY` | Primary | QZF8rbTk9dS85ZGRh*O4Olzg-~Qjg5Nk |
| `N8N_LISTEN_ADDRESS` | Primary | :: |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/bitnami`
- **Start command:** `n8n worker`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/b_LXy3)
