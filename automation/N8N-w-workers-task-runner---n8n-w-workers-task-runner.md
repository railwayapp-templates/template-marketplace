# Deploy N8N (w/ workers + task runner) on Railway

n8n Workers [Sep '26] (Queue Mode/Task Runners/Python/Queue Mode) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-w-workers-task-runner)

## About

n8n is an open source workflow automation platform, and queue mode is how it runs in production. Instead of one container doing everything, the main instance handles the editor and webhooks while workers execute workflows from a Redis queue, and external task runners execute Code node JavaScript and Python in an isolated container. Since n8n 2.0, task runners are enabled by default and Python in the Code node requires task runners in external mode. This template deploys that entire production topology on Railway in one click.

A single n8n container works for a handful of scheduled workflows. Under real load it becomes the bottleneck: long executions slow down the editor, webhooks time out during bursts, and one heavy Code node can take the whole instance down. Queue mode splits those responsibilities across services that scale independently.

This template deploys these services, connected over Railway's private network at deploy time:

- **Main**: n8n editor, REST API, webhooks and schedules, exposed on an HTTPS domain. In queue mode it enqueues executions instead of running them.
- **Worker**: pulls executions from Redis and runs the workflows. This is the service you scale.
- **Task runner** (`n8nio/runners`): executes Code node JavaScript and Python outside the worker process.
- **Redis**: the job queue between main and workers.
- **PostgreSQL**: workflows, credentials and execution history.

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
