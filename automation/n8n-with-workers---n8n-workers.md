# Deploy n8n with workers on Railway

Run n8n with queue workers, Redis, Postgres, and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-workers)

## About

n8n with workers is a scalable automation setup that combines the n8n main application, queue workers, Redis, PostgreSQL, and persistent storage. It is designed for users who want a more production-ready n8n deployment for high-volume workflows, concurrent webhook processing, background jobs, and reliable workflow execution.

Hosting n8n with workers on Railway involves deploying multiple connected services: the main n8n web application, one or more n8n worker services, Redis for queue-based job processing, and PostgreSQL for workflow and execution data. The main n8n service provides the web UI and receives webhook/API traffic, while workers process workflow executions in the background. Redis acts as the queue broker between the main service and workers, and PostgreSQL stores n8n data reliably. Railway handles deployments, service networking, public access, and scaling, making it easier to run a scalable automation stack without manually managing servers.

![](https://i.imgur.com/N9LrnYb.png)

> **Note**
> This is an advanced n8n with workers template. It runs multiple Railway services and may cost more than a basic single-service n8n deployment.

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

[View on Railway →](https://railway.com/deploy/n8n-workers)
