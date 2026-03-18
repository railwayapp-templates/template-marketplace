# Deploy n8n V2 on Railway

Early access to n8n 2.0 - No code automation workflow platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-v2)

## About

![image](https://i.ibb.co/mCK4Zrwb/Railway-template-cover-image-n8n-V2-0.png)

n8n v2.0 is the next major release of n8n, a powerful, source‑available workflow automation platform for building complex integrations, ETL pipelines, and AI‑driven automations with a low‑code editor. It focuses on security, performance, and long‑term maintainability, while keeping n8n’s flexible, self‑hostable architecture. 
If you are migrating read: [v2 breaking intro](https://docs.n8n.io/2-0-breaking-changes/#n8n-v20-breaking-changes)

Self-hosting n8n gives you full ownership of your automations, without being locked into closed platforms like Zapier, IFTTT, Make.com, or new walled gardens such as Google Opal and OpenAI’s automation system. Unlike these proprietary options that limit integrations, data access, or scaling freedom, n8n is open source, customizable, and portable. Running it on Railway means you get the convenience of a managed environment you control, with the flexibility to migrate anywhere at any time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis` | Database |
| n8n-worker | `n8nio/n8n:latest` | Worker |
| n8n-main | `n8nio/n8n:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | n8n-worker | 5678 | - |
| `DB_TYPE` | n8n-worker | postgresdb | - |
| `NODE_OPTIONS` | n8n-worker | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | n8n-worker | queue | - |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | - |
| `N8N_LISTEN_ADDRESS` | n8n-worker | :: | - |
| `N8N_RUNNERS_ENABLED` | n8n-worker | true | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-worker | true | - |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n-worker | true | Set to false if you need to use variables in code nodes (turned off by default for security reasons in v2.0) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n-worker | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-worker | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-worker | true | - |
| `PORT` | n8n-main | 5678 | - |
| `DB_TYPE` | n8n-main | postgresdb | - |
| `NODE_OPTIONS` | n8n-main | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | n8n-main | queue | - |
| `DB_POSTGRESDB_USER` | n8n-main | (secret) | - |
| `N8N_LISTEN_ADDRESS` | n8n-main | :: | - |
| `N8N_RUNNERS_ENABLED` | n8n-main | true | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-main | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-main | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-main | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-main | true | - |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n-main | true | Set to false if you need to use variables in code nodes (turned off by default for security reasons in v2.0) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n-main | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-main | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-main | true | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Volume:** `/bitnami`
- **Start command:** `n8n worker`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-v2)
