# Deploy N8N + Worker + Webhook + External DB on Railway

n8n with Separate Worker & Webhook using External DB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Gos_2q)

## About

This Railway template deploys n8n with a scalable architecture, separating the worker and webhook processes while utilizing an external database for persistence. This setup enhances performance, reliability, and scalability, making it ideal for production environments.

🔧 Features:
- Separate Worker & Webhook: Ensures efficient load distribution.
- External Database Support: Uses PostgreSQL or MySQL for better persistence.
- Optimized for Railway: Pre-configured for seamless deployment.
- Scalable & Modular: Easily expand to match your workflow needs.

🚀 Get Started:
1.	Deploy the template to Railway.
2.	Configure environment variables.
3.	Enjoy a high-performance, scalable n8n setup!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Webhook | `n8nio/n8n` | Web service |
| Worker | `n8nio/n8n` | Worker |
| Primary | `n8nio/n8n` | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Webhook | 5678 |
| `DB_TYPE` | Webhook | postgresdb |
| `EXECUTIONS_MODE` | Webhook | queue |
| `DB_POSTGRESDB_PORT` | Webhook | 5432 |
| `DB_POSTGRESDB_USER` | Webhook | (secret) |
| `N8N_LISTEN_ADDRESS` | Webhook | :: |
| `DB_POSTGRESDB_PASSWORD` | Webhook | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Webhook | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Webhook | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Webhook | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Webhook | true |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | Webhook | false |
| `PORT` | Worker | 5678 |
| `DB_TYPE` | Worker | postgresdb |
| `EXECUTIONS_MODE` | Worker | queue |
| `DB_POSTGRESDB_PORT` | Worker | 5432 |
| `DB_POSTGRESDB_USER` | Worker | (secret) |
| `N8N_LISTEN_ADDRESS` | Worker | :: |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Worker | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | Worker | false |
| `PORT` | Primary | 5678 |
| `DB_TYPE` | Primary | postgresdb |
| `EXECUTIONS_MODE` | Primary | queue |
| `DB_POSTGRESDB_PORT` | Primary | 5432 |
| `DB_POSTGRESDB_USER` | Primary | (secret) |
| `N8N_LISTEN_ADDRESS` | Primary | :: |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Primary | true |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | Primary | false |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true |
| `REDISUSER` | Redis | default |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDISPORT_PRIVATE` | Redis | 6379 |

## Configuration

- **Start command:** `n8n webhook`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `n8n worker`
- **Start command:** `n8n start`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/Gos_2q)
