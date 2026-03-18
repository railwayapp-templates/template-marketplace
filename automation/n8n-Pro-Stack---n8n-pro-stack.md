# Deploy n8n Pro Stack on Railway

Deploy n8n with workers, Redis, and Postgres for scalable automation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-pro-stack)

## About

The **n8n Pro Stack** combines the power of n8n's core automation engine with horizontal scalability. It includes dedicated workers, Redis for caching and queue management, and PostgreSQL for reliable data persistence. This stack is designed for building high-performance, fault-tolerant automation workflows.

Hosting the **n8n Pro Stack** involves deploying and linking four core services: the main n8n application, worker services to run tasks in parallel, Redis for messaging and caching, and PostgreSQL for storing workflows and logs. Using Railway, you can provision these services easily, configure environment variables, manage networking between containers, and scale resources based on your workload. Railway’s managed services streamline this entire setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| Primary | `n8nio/n8n` | Web service |
| Worker | `n8nio/n8n` | Worker |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Primary | 5678 |
| `DB_TYPE` | Primary | postgresdb |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 |
| `EXECUTIONS_MODE` | Primary | queue |
| `DB_POSTGRESDB_USER` | Primary | (secret) |
| `N8N_LISTEN_ADDRESS` | Primary | :: |
| `N8N_RUNNERS_ENABLED` | Primary | true |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true |
| `PORT` | Worker | 5678 |
| `DB_TYPE` | Worker | postgresdb |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 |
| `EXECUTIONS_MODE` | Worker | queue |
| `DB_POSTGRESDB_USER` | Worker | (secret) |
| `N8N_LISTEN_ADDRESS` | Worker | :: |
| `N8N_RUNNERS_ENABLED` | Worker | true |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Start command:** `n8n worker`
- **Volume:** `/bitnami`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-pro-stack)
