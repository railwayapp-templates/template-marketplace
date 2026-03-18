# Deploy N8N with Webhook Processor on Railway

Self-hosted scalable n8n workers with webhook processor, Redis & PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-with-webhook-processor)

## About

n8n is an extensible, self-hosted workflow automation platform designed for teams and developers who want full control over their automation stack. Built with a fair-code model, n8n keeps its source code visible, supports self-hosting by default, and allows you to create powerful workflows using custom logic, scripts, and integrations.

With its node-based visual editor, n8n makes it easy to connect APIs, services, and internal systems—turning events into automated actions without locking you into a closed ecosystem.

---

Hosting n8n with dedicated webhook processors means running a production-ready automation system that can reliably receive, route, and process incoming HTTP webhooks at scale.

In this architecture, webhook traffic is handled by a dedicated service responsible for exposing public endpoints and accepting incoming events. These events are then queued and processed asynchronously by n8n workers, ensuring better performance, isolation, and scalability compared to single-instance deployments.

A proper production setup must handle:
* Stable public webhook URLs
* Concurrent webhook traffic
* Workflow execution state and persistence
* Reliable queue-based processing
* Safe separation between UI, webhook intake, and execution workers

Railway simplifies all of this by providing managed networking, environment configuration, service isolation, and easy scaling—without forcing you to manage servers manually.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `railwayapp/redis` | Database |
| Webhook Processor | `n8nio/n8n` | Worker |
| Primary | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Worker | 5678 | - |
| `DB_TYPE` | Worker | postgresdb | - |
| `WEBHOOK_URL` | Worker | - | ========================= |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | ========================= |
| `EXECUTIONS_MODE` | Worker | queue | - |
| `DB_POSTGRESDB_USER` | Worker | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Worker | :: | - |
| `N8N_RUNNERS_ENABLED` | Worker | true | - |
| `DB_POSTGRESDB_DATABASE` | Worker | - | ========================= |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | ========================= |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | ========================= |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | ========================= |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | Webhook Processor | 5678 | - |
| `DB_TYPE` | Webhook Processor | postgresdb | - |
| `WEBHOOK_URL` | Webhook Processor | - | ========================= |
| `NODE_OPTIONS` | Webhook Processor | --max_old_space_size=8192 | ========================= |
| `EXECUTIONS_MODE` | Webhook Processor | queue | - |
| `DB_POSTGRESDB_USER` | Webhook Processor | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Webhook Processor | :: | - |
| `N8N_RUNNERS_ENABLED` | Webhook Processor | true | ========================= |
| `DB_POSTGRESDB_DATABASE` | Webhook Processor | - | ========================= |
| `DB_POSTGRESDB_PASSWORD` | Webhook Processor | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Webhook Processor | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Webhook Processor | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Webhook Processor | true | ========================= |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Webhook Processor | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Webhook Processor | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Webhook Processor | true | ========================= |
| `PORT` | Primary | 5678 | - |
| `DB_TYPE` | Primary | postgresdb | - |
| `WEBHOOK_URL` | Primary | - | ========================= |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | ========================= |
| `EXECUTIONS_MODE` | Primary | queue | - |
| `DB_POSTGRESDB_USER` | Primary | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Primary | :: | - |
| `N8N_RUNNERS_ENABLED` | Primary | true | - |
| `DB_POSTGRESDB_DATABASE` | Primary | - | ========================= |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | ========================= |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | - |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Primary | true | ========================= |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | ========================= |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-with-webhook-processor)
