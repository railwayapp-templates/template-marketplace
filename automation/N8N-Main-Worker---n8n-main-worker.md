# Deploy N8N Main + Worker on Railway

Deploy and Host N8N with Inactive worker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-main-worker)

## About

N8N Main + Worker is a scalable automation setup using [n8n](https://n8n.io), a workflow automation tool. The **Main instance** handles workflow orchestration, while the **Worker instance** processes jobs from a Redis-powered queue. This architecture allows you to handle higher loads and run workflows in parallel with better reliability.

Hosting N8N Main + Worker on Railway gives you a ready-to-use environment with **Postgres** for persistent storage and **Redis** for queue execution. By default, only the **Main instance** is active in *regular mode*. If you don’t need queue execution, you can safely remove the Worker.  
If you do need scaling, you simply switch the Main’s environment variable `EXECUTIONS_MODE=queue` and deploy the Worker. Redis then manages tasks, offloading execution from the Main instance to the Worker, improving scalability and stability. This setup lets you start small and easily scale as workflow demand increases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| Redis | `bitnamisecure/redis:latest` | Database |
| Main | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Worker | 5678 |
| `DB_TYPE` | Worker | postgresdb |
| `EXECUTIONS_MODE` | Worker | queue |
| `DB_POSTGRESDB_USER` | Worker | (secret) |
| `N8N_LISTEN_ADDRESS` | Worker | :: |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `PGPORT_PRIVATE` | Postgres | 5432 |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISUSER` | Redis | default |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDISPORT_PRIVATE` | Redis | 6379 |
| `PORT` | Main | 5678 |
| `DB_TYPE` | Main | postgresdb |
| `EXECUTIONS_MODE` | Main | regular |
| `GENERIC_TIMEZONE` | Main | America/Sao_Paulo |
| `DB_POSTGRESDB_USER` | Main | (secret) |
| `N8N_LISTEN_ADDRESS` | Main | :: |
| `DB_POSTGRESDB_PASSWORD` | Main | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Main | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Main | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Main | true |

## Configuration

- **Start command:** `n8n worker`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/bitnami`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-main-worker)
