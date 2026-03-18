# Deploy N8N (w/Workers & Webhooks) on Railway

Deploy and Host N8N (w/Workers & Webhooks) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-wworkers-and-webhooks)

## About

**n8n** is a fair-code workflow automation platform for technical teams, combining the speed of no-code with the flexibility of code. It supports 400+ integrations, native AI features, webhooks, and scheduling, and can be fully self-hosted to keep data and deployments under your control. ([n8n][1], [GitHub][2])

Hosting n8n on Railway is straightforward: provision a service using this template, set environment variables, and attach a persistent Volume to retain data across deploys. n8n defaults to SQLite but supports PostgreSQL for production; Redis is recommended when running in queue mode for horizontal scalability. Add a custom domain with HTTPS and monitor through Railway’s dashboard. Resource needs depend on your workflows, not just the app itself, so plan CPU/RAM accordingly and scale as usage grows. ([n8n Docs][3], [Railway Docs][4])

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis` | Database |
| Worker | `n8nio/n8n` | Worker |
| Primary | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `TZ` | Worker | America/Sao_Paulo |
| `PORT` | Worker | 5678 |
| `DB_TYPE` | Worker | postgresdb |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 |
| `N8N_PROXY_HOPS` | Worker | 1 |
| `EXECUTIONS_MODE` | Worker | queue |
| `GENERIC_TIMEZONE` | Worker | America/Sao_Paulo |
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
| `TZ` | Primary | America/Sao_Paulo |
| `PORT` | Primary | 5678 |
| `DB_TYPE` | Primary | postgresdb |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 |
| `EXECUTIONS_MODE` | Primary | queue |
| `GENERIC_TIMEZONE` | Primary | America/Sao_Paulo |
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
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Volume:** `/bitnami`
- **Start command:** `n8n worker`
- **Start command:** `n8n start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-wworkers-and-webhooks)
