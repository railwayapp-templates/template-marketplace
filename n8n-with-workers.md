# Deploy N8N (w/ workers) on Railway

A powerful workflow automation tool for technical people

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-with-workers)

## About

n8n is a workflow automation tool that uses a node-based approach to connect services and automate processes. This template deploys n8n with a worker architecture for handling workflow execution at scale.

![n8n.io - Screenshot](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot.png)

n8n (w/ workers) runs as a multi-service architecture where the main instance handles the web interface and API while worker processes execute workflows. The main service manages workflow definitions, user authentication, and the web UI, while workers pull jobs from a Redis queue to execute workflows independently. The Railway template automatically provisions and configures Redis for job queuing and PostgreSQL for workflow storage. Worker scaling allows handling multiple concurrent workflow executions without blocking the main interface.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Primary | `n8nio/n8n` | Web service |
| Worker | `n8nio/n8n` | Worker |
| Redis | `railwayapp/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `n8n worker`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-with-workers)
