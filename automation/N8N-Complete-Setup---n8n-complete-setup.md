# Deploy N8N Complete Setup on Railway

[Jul'26] n8n with workers, Redis, Postgres, and Ollama for AI automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-complete-setup)

## About

The **N8N Complete Setup** combines n8n's automation engine with workers, Redis, PostgreSQL, and Ollama for scalable AI automation. It gives you a production-ready n8n architecture with queue-based execution, persistent database storage, and an integrated Ollama service for running open models inside your Railway project.

Hosting **N8N Complete Setup** involves deploying and linking five core services: the primary n8n application, n8n worker service, Redis, PostgreSQL, and Ollama. The primary n8n service provides the editor, webhooks, API, and main application interface. Workers execute queued jobs in parallel, Redis manages the execution queue, PostgreSQL stores workflows and credentials, and Ollama provides an open-model runtime for AI-powered workflows.

This setup is designed for users who want scalable workflow automation with built-in AI capabilities. With Railway, each service can run independently while communicating through private networking, making the stack easier to manage, scale, and debug.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n` | Worker |
| Redis | `redis:8.2.1` | Database |
| Ollama | `ollama/ollama` | Database |
| Primary | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `OLLAMA_HOST` | Ollama | :: | - |
| `OLLAMA_ORIGINS` | Ollama | * | - |
| `OLLAMA_DEFAULT_MODELS` | Ollama | deepseek-r1:1.5b | - |
| `PORT` | Primary | 5678 | - |
| `DB_TYPE` | Primary | postgresdb | - |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | Primary | queue | - |
| `DB_POSTGRESDB_USER` | Primary | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Primary | :: | - |
| `N8N_RUNNERS_ENABLED` | Primary | true | - |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `n8n worker`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Volume:** `/root/.ollama`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-complete-setup)
