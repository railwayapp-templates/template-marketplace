# Deploy N8N (w/ workers + task runner) on Railway

n8n with workers and external task runners for secure scaling

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-w-workers-task-runner)

## About

N8N (w/ workers + task runner) is a 1‑click Railway template that deploys n8n in queue mode with worker(s), Redis, Postgres, and external Task Runner(s) (n8nio/runners) for the Code node. It isolates JavaScript/Python execution for reliability, supports high‑throughput webhooks, and lets you scale workers independently for throughput.

This template deploys n8n on Railway with a production-ready setup: a main service (editor/API), worker service(s) that execute workflows, Redis for job queuing, PostgreSQL for storage, and an external Task Runner service (n8nio/runners). The extra Task Runner service provides a separate, managed runtime for the Code node, improving isolation and reliability for custom code without impacting the main editor. Railway provisions and manages the services so you can deploy quickly without manual configuration. As your workload grows, you can scale worker services for throughput and keep the editor responsive.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis` | Database |
| Runner | `n8nio/runners` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Worker | `n8nio/n8n` | Worker |
| Primary | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | Runner | 5680 |
| `N8N_RUNNERS_AUTH_TOKEN` | Runner | (secret) |
| `N8N_RUNNERS_MAX_CONCURRENCY` | Runner | 5 |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL` | Runner | debug |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | Runner | 0 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Worker | 5678 |
| `DB_TYPE` | Worker | postgresdb |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 |
| `NODES_EXCLUDE` | Worker | [] |
| `EXECUTIONS_MODE` | Worker | queue |
| `N8N_RUNNERS_MODE` | Worker | external |
| `DB_POSTGRESDB_USER` | Worker | (secret) |
| `N8N_LISTEN_ADDRESS` | Worker | :: |
| `N8N_RUNNERS_ENABLED` | Worker | true |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) |
| `N8N_RUNNERS_AUTH_TOKEN` | Worker | (secret) |
| `N8N_RUNNERS_BROKER_PORT` | Worker | 5679 |
| `N8N_NATIVE_PYTHON_RUNNER` | Worker | true |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true |
| `N8N_RUNNERS_TASK_REQUEST_TIMEOUT` | Worker | 60 |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | Worker | 0.0.0.0 |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true |
| `PORT` | Primary | 5678 |
| `DB_TYPE` | Primary | postgresdb |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 |
| `NODES_EXCLUDE` | Primary | [] |
| `EXECUTIONS_MODE` | Primary | queue |
| `DB_POSTGRESDB_USER` | Primary | (secret) |
| `N8N_LISTEN_ADDRESS` | Primary | :: |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true |

## Configuration

- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n worker`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-w-workers-task-runner)
