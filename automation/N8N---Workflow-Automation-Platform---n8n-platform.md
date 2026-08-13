# Deploy N8N - Workflow Automation Platform on Railway

Deploy and automate workflows in 1-click. Zero-config n8n, it just works 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-platform)

## About

n8n is a fair-code workflow automation platform for building powerful automations, API integrations, AI workflows, and autonomous agents. It combines a visual workflow builder with the flexibility to use custom code, webhooks, APIs, databases, and AI models — while giving you the option to run the platform on your own infrastructure.

![N8N](https://imgur.com/vy7QGef.png)

This template deploys a production-oriented n8n stack using **PostgreSQL, Redis, a main n8n instance, and a dedicated worker**.

The main instance handles the web interface, API, webhooks, scheduling, and workflow orchestration. Workflow executions are distributed through Redis and processed by the worker using n8n's queue mode architecture. PostgreSQL provides persistent storage for workflows, credentials, execution data, and other application data.

Queue mode separates workflow execution from the main application process, making the deployment easier to scale as automation workloads grow. Additional workers can be added when more execution capacity is required.

### Included Architecture

| Service        | Purpose                                                                      |
| -------------- | ---------------------------------------------------------------------------- |
| **Main**       | n8n editor, API, webhooks, scheduling, and orchestration                     |
| **Worker**     | Processes queued workflow executions                                         |
| **Redis**      | Execution queue and communication between n8n processes                      |
| **PostgreSQL** | Persistent storage for workflows, credentials, executions, and configuration |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Main | `n8nio/n8n:latest` | Web service |
| Worker | `n8nio/n8n:latest` | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Main | 5678 | - |
| `DB_TYPE` | Main | postgresdb | - |
| `NODE_OPTIONS` | Main | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | Main | queue | - |
| `DB_POSTGRESDB_USER` | Main | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Main | :: | - |
| `N8N_RUNNERS_ENABLED` | Main | true | - |
| `DB_POSTGRESDB_PASSWORD` | Main | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Main | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Main | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Main | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Main | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Main | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Main | true | - |
| `PORT` | Worker | 5678 | - |
| `DB_TYPE` | Worker | postgresdb | - |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | Worker | queue | - |
| `DB_POSTGRESDB_USER` | Worker | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Worker | :: | - |
| `N8N_RUNNERS_ENABLED` | Worker | true | - |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-platform)
