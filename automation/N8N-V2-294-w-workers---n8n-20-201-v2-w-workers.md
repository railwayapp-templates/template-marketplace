# Deploy N8N V2 (2.9.4) (w/ workers) on Railway

Prod-ready N8N 2.0 2.9.4 worker+redis+postgres, secure default, task-runner

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-20-201-v2-w-workers)

## About

N8N 2.x is a major release of the open‑source workflow automation platform, continuing the **secure‑by‑default** approach introduced in N8N 2.x and expanding the AI and credential-management feature set. This template deploys a dedicated **main** service for the editor and API plus a **worker** service for queue processing, backed by PostgreSQL and Redis for durable, scalable automation.

This template provisions a production‑grade N8N 2.9.4 stack in queue mode. The main instance exposes the editor and webhooks, while workers consume jobs from a Redis‑backed queue to execute workflows in parallel. PostgreSQL stores workflows, credentials, and execution logs. Security‑oriented defaults are enabled, including environment‑variable blocking inside workflows and stricter settings‑file permissions, aligning with the hardening changes introduced in N8N 2.x. Railway manages networking, TLS termination, and scaling, so you can focus on building automations rather than servers. You can horizontally scale workers as your workload grows, without changing your workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-main | `n8nio/n8n:2.9.4` | Web service |
| Redis | `railwayapp/redis` | Database |
| n8n-worker | `n8nio/n8n:2.9.4` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17.7` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | n8n-main | 5678 |
| `DB_TYPE` | n8n-main | postgresdb |
| `N8N_METRICS` | n8n-main | true |
| `NODE_OPTIONS` | n8n-main | --max_old_space_size=8192 |
| `N8N_PROXY_HOPS` | n8n-main | 1 |
| `EXECUTIONS_MODE` | n8n-main | queue |
| `N8N_TRUST_PROXY` | n8n-main | true |
| `DB_POSTGRESDB_USER` | n8n-main | (secret) |
| `N8N_LISTEN_ADDRESS` | n8n-main | :: |
| `N8N_EDITOR_BASE_URL` | n8n-main | https://${RAILWAY_PUBLIC_DOMAIN} |
| `N8N_RUNNERS_ENABLED` | n8n-main | true |
| `DB_POSTGRESDB_PASSWORD` | n8n-main | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-main | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-main | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-main | true |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-main | true |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n-main | true |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n-main | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n-main | true |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-main | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-main | true |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | n8n-worker | 5678 |
| `DB_TYPE` | n8n-worker | postgresdb |
| `N8N_METRICS` | n8n-worker | true |
| `NODE_OPTIONS` | n8n-worker | --max_old_space_size=8192 |
| `N8N_PROXY_HOPS` | n8n-worker | 1 |
| `EXECUTIONS_MODE` | n8n-worker | queue |
| `N8N_TRUST_PROXY` | n8n-worker | true |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) |
| `N8N_LISTEN_ADDRESS` | n8n-worker | :: |
| `N8N_RUNNERS_ENABLED` | n8n-worker | true |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-worker | true |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n-worker | true |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n-worker | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n-worker | true |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-worker | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-worker | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `n8n start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `n8n worker`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-20-201-v2-w-workers)
