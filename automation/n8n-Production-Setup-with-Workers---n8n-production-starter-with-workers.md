# Deploy n8n Production Setup with Workers on Railway

Production-ready latest n8n with workers, Redis & Postgres - Apr 2026

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-production-starter-with-workers)

## About

n8n Production Setup with Workers is a production-ready deployment of n8n on Railway using queue mode, dedicated workers, Redis, and PostgreSQL. It enables scalable workflow execution, reliable webhook handling, and background job processing, making it suitable for real-world automation systems and AI-driven workflows.

This template runs n8n as a multi-service architecture optimized for production workloads.

The **main service** handles the web UI, authentication, API requests, webhooks, and workflow orchestration.

The **worker service** executes workflows independently by pulling jobs from a Redis queue, allowing execution to scale without blocking the main application.

Redis manages queue coordination, while PostgreSQL stores workflows, credentials, and execution data.

This separation improves reliability and makes it easy to scale horizontally by increasing worker instances as usage grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n worker | `n8nio/n8n:2.17.7` | Worker |
| n8n admin | `n8nio/n8n:2.17.7` | Database |
| redis for n8n | `redis:8.2.1` | Database |
| postgres for n8n | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_TYPE` | n8n worker | postgresdb |
| `N8N_LOG_LEVEL` | n8n worker | debug |
| `EXECUTIONS_MODE` | n8n worker | queue |
| `N8N_USER_FOLDER` | n8n worker | /home/node/.n8n |
| `DB_POSTGRESDB_USER` | n8n worker | (secret) |
| `EXECUTIONS_TIMEOUT` | n8n worker | -1 |
| `EXECUTIONS_DATA_PRUNE` | n8n worker | true |
| `DB_POSTGRESDB_PASSWORD` | n8n worker | (secret) |
| `EXECUTIONS_TIMEOUT_MAX` | n8n worker | 3600 |
| `EXECUTIONS_DATA_MAX_AGE` | n8n worker | 336 |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n worker | (secret) |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | n8n worker | all |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n worker | 10000 |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | n8n worker | all |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | n8n worker | false |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | n8n worker | true |
| `PORT` | n8n admin | 5678 |
| `DB_TYPE` | n8n admin | postgresdb |
| `N8N_METRICS` | n8n admin | true |
| `N8N_LOG_LEVEL` | n8n admin | debug |
| `N8N_AI_ENABLED` | n8n admin | false |
| `EXECUTIONS_MODE` | n8n admin | queue |
| `N8N_AI_PROVIDER` | n8n admin | openai |
| `N8N_USER_FOLDER` | n8n admin | /home/node/.n8n |
| `DB_POSTGRESDB_USER` | n8n admin | (secret) |
| `EXECUTIONS_TIMEOUT` | n8n admin | -1 |
| `EXECUTIONS_DATA_PRUNE` | n8n admin | true |
| `DB_POSTGRESDB_PASSWORD` | n8n admin | (secret) |
| `EXECUTIONS_TIMEOUT_MAX` | n8n admin | 3600 |
| `EXECUTIONS_DATA_MAX_AGE` | n8n admin | 336 |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n admin | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n admin | (secret) |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | n8n admin | all |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n admin | 10000 |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | n8n admin | all |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n admin | TRUE |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | n8n admin | false |
| `EXECUTIONS_DATA_HARD_DELETE_BUFFER` | n8n admin | 1 |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | n8n admin | true |
| `EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL` | n8n admin | 15 |
| `EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL` | n8n admin | 60 |
| `REDISPORT` | redis for n8n | 6379 |
| `REDISUSER` | redis for n8n | default |
| `REDISPASSWORD` | redis for n8n | (secret) |
| `REDIS_PASSWORD` | redis for n8n | (secret) |
| `POSTGRES_DB` | postgres for n8n | main |
| `POSTGRES_USER` | postgres for n8n | (secret) |
| `POSTGRES_PASSWORD` | postgres for n8n | (secret) |

## Configuration

- **Start command:** `n8n worker`
- **Volume:** `/home/node/.n8n`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-production-starter-with-workers)
