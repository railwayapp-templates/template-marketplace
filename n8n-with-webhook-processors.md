# Deploy N8N (w/ webhook processors) on Railway

A powerful workflow automation tool for technical people

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-with-webhook-processors)

## About

n8n is an extendable workflow automation tool. With a fair-code distribution model, n8n will always have visible source code, be available to self-host, and allow you to add your own custom functions, logic and apps. n8n's node-based approach makes it highly versatile, enabling you to connect anything to everything.

![n8n.io - Workflow Automation](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

Hosting n8n (w/ webhook processors) means running a workflow automation platform that handles incoming HTTP webhooks and processes them through automated workflows. The system manages webhook endpoints, processes incoming data through workflow nodes, and coordinates with external services and APIs. Production deployment requires managing webhook URL routing, handling concurrent webhook processing, maintaining workflow execution state, and ensuring reliable delivery of processed results. Railway simplifies this deployment by providing HTTP endpoint management for webhook reception, handling workflow execution infrastructure, managing environment variables for integrations, and coordinating the webhook processing pipeline with automatic scaling capabilities.

![n8n.io - Screenshot](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Webhook processor | `n8nio/n8n` | Web service |
| Primary | `n8nio/n8n` | Web service |
| Redis | `railwayapp/redis` | Database |

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
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | Webhook processor | 5678 | The HTTP port the application responds to |
| `DB_TYPE` | Webhook processor | postgresdb | Database type |
| `WEBHOOK_URL` | Webhook processor | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `NODE_OPTIONS` | Webhook processor | --max_old_space_size=8192 | The memory limit for the task runner Node.js process |
| `EXECUTIONS_MODE` | Webhook processor | queue | Whether executions should run directly or using queue |
| `DB_POSTGRESDB_HOST` | Webhook processor | - | Database host |
| `DB_POSTGRESDB_PORT` | Webhook processor | - | Database port |
| `DB_POSTGRESDB_USER` | Webhook processor | (secret) | Database user |
| `N8N_ENCRYPTION_KEY` | Webhook processor | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | Webhook processor | :: | The IP address n8n should listen on |
| `QUEUE_BULL_REDIS_HOST` | Webhook processor | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Webhook processor | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Webhook processor | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Webhook processor | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | Webhook processor | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Webhook processor | (secret) | Redis user |
| `QUEUE_BULL_REDIS_DUALSTACK` | Webhook processor | true | Enable dual-stack support (IPv4 and IPv6) on Redis connections |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Webhook processor | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Webhook processor | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Webhook processor | true | - |
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
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Primary | true | Disable the webhook processing in the main process |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Start command:** `n8n worker`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n webhook`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-with-webhook-processors)
