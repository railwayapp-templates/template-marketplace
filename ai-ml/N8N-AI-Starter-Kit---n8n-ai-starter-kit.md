# Deploy N8N (AI Starter Kit) on Railway

A powerful workflow automation tool for technical people

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-ai-starter-kit)

## About

This template extends the N8N (w/ workers) template by adding compatible AI products and components. This starter kit is designed to help you get started with self-hosted AI workflows.

Hosting the n8n (AI Starter Kit) means running multiple AI-focused services including n8n workflow automation, Ollama for local language models, and Qdrant for vector storage. The system coordinates between workflow execution, AI model inference, and vector database operations while maintaining local data processing. Production deployment requires managing service interconnections, configuring AI model access, handling vector storage scaling, and coordinating workflow scheduling across AI components. Railway simplifies this multi-service deployment by providing container orchestration for all AI services, managing internal networking between components, and handling environment variable configuration for service discovery.

![n8n - Banner image](https://raw.githubusercontent.com/n8n-io/self-hosted-ai-starter-kit/main/assets/n8n-demo.gif)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n` | Worker |
| Redis | `railwayapp/redis` | Database |
| Primary | `n8nio/n8n` | Web service |
| Ollama | `ollama/ollama` | Database |
| Qdrant | `qdrant/qdrant` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| Open WebUI | `ghcr.io/open-webui/open-webui` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Worker | 5678 | The HTTP port the application responds to |
| `DB_TYPE` | Worker | postgresdb | Database type |
| `WEBHOOK_URL` | Worker | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | The memory limit for the task runner Node.js process |
| `EXECUTIONS_MODE` | Worker | queue | Whether executions should run directly or using queue |
| `DB_POSTGRESDB_HOST` | Worker | - | Database host |
| `DB_POSTGRESDB_PORT` | Worker | - | Database port |
| `DB_POSTGRESDB_USER` | Worker | (secret) | Database user |
| `N8N_ENCRYPTION_KEY` | Worker | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | Worker | :: | The IP address n8n should listen on |
| `QUEUE_BULL_REDIS_HOST` | Worker | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Worker | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Worker | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | Redis user |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | Enable dual-stack support (IPv4 and IPv6) on Redis connections |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | Primary | 5678 | The HTTP port the application responds to |
| `DB_TYPE` | Primary | postgresdb | Database type |
| `WEBHOOK_URL` | Primary | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | The memory limit for the task runner Node.js process |
| `EXECUTIONS_MODE` | Primary | queue | Whether executions should run directly or using queue |
| ` N8N_TRUST_PROXY` | Primary | true | - |
| `DB_POSTGRESDB_HOST` | Primary | - | Database host |
| `DB_POSTGRESDB_PORT` | Primary | - | Database port |
| `DB_POSTGRESDB_USER` | Primary | (secret) | Database user |
| `N8N_ENCRYPTION_KEY` | Primary | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | Primary | :: | The IP address n8n should listen on |
| `N8N_EDITOR_BASE_URL` | Primary | - | Public URL where users can access the editor |
| `QUEUE_BULL_REDIS_HOST` | Primary | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Primary | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Primary | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | Redis user |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | Enable dual-stack support (IPv4 and IPv6) on Redis connections |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | - |
| `OLLAMA_HOST` | Ollama | :: | - |
| `QDRANT__SERVICE__HOST` | Qdrant | :: | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `n8n worker`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.ollama`
- **Volume:** `/qdrant/storage`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/n8n-ai-starter-kit)
