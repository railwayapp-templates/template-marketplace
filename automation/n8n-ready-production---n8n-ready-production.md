# Deploy n8n ready production on Railway

A n8n ready to production multi worker in 1 click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-ready-production)

## About

**n8n Ready Production** is a workflow automation platform that lets you connect APIs, databases, and services visually. This template deploys a **production-ready n8n environment** with **PostgreSQL** for persistent storage and **Valkey** (Redis-compatible) for queue and cache management — all hosted and auto-configured on **Railway**.

---

Hosting **n8n ready production** on Railway allows you to run automated workflows reliably at scale.  
This setup provisions three key components:

1. **n8n Service** – The core workflow engine for automation and integrations.  
2. **PostgreSQL Database** – Stores users, workflows, executions, and credentials securely.  
3. **Valkey Cache** – Handles background job queues and accelerates workflow execution.

Once deployed, Railway automatically links all services via environment variables.  
You can access your n8n instance securely via HTTPS with minimal setup.  
This production configuration is suitable for teams, SaaS integrations, or internal automation systems that need high uptime and scalability.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| N8N | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VALKEY_PORT` | Valkey | 6379 | - |
| `VALKEY_USER` | Valkey | (secret) | - |
| `VALKEY_PASSWORD` | Valkey | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | N8N | 5678 | - |
| `DB_TYPE` | N8N | postgresdb | - |
| `N8N_PORT` | N8N | 5678 | - |
| `N8N_PROTOCOL` | N8N | https | - |
| `NODE_OPTIONS` | N8N | --max_old_space_size=8192 | - |
| `N8N_LOG_LEVEL` | N8N | info | - |
| `N8N_JWT_SECRET` | N8N | (secret) | ########################################### |
| `N8N_LOG_OUTPUT` | N8N | console | - |
| `EXECUTIONS_MODE` | N8N | regular | - |
| `N8N_DEFAULT_ROLE` | N8N | owner | - |
| `DB_POSTGRESDB_USER` | N8N | (secret) | - |
| `EXECUTIONS_PROCESS` | N8N | main | - |
| `EXECUTIONS_TIMEOUT` | N8N | 1800 | - |
| `N8N_DEFAULT_LOCALE` | N8N | en | - |
| `N8N_BASIC_AUTH_USER` | N8N | (secret) | - |
| `N8N_JWT_AUTH_ACTIVE` | N8N | true | - |
| `N8N_PAYWALL_ENABLED` | N8N | false | - |
| `DB_POSTGRESDB_SCHEMA` | N8N | public | - |
| `EXECUTIONS_DATA_PRUNE` | N8N | true | - |
| `N8N_BASIC_AUTH_ACTIVE` | N8N | true | - |
| `N8N_TEMPLATES_ENABLED` | N8N | true | - |
| `DB_POSTGRESDB_PASSWORD` | N8N | (secret) | - |
| `EXECUTIONS_TIMEOUT_MAX` | N8N | 3600 | ########################################### |
| `EXECUTIONS_DATA_MAX_AGE` | N8N | 10080 | 7 days |
| `N8N_BASIC_AUTH_PASSWORD` | N8N | (secret) | - |
| `N8N_DIAGNOSTICS_ENABLED` | N8N | false | - |
| `DB_POSTGRESDB_SSL_ENABLED` | N8N | false | - |
| `EXECUTIONS_DATA_MAX_COUNT` | N8N | 10000 | - |
| `N8N_HIRING_BANNER_ENABLED` | N8N | false | - |
| `QUEUE_BULL_REDIS_PASSWORD` | N8N | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | N8N | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | N8N | true | - |
| `N8N_PERSONALIZATION_ENABLED` | N8N | false | - |
| `N8N_USER_MANAGEMENT_DISABLED` | N8N | false | - |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | N8N | all | - |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | N8N | true | - |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | N8N | all | - |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | N8N | false | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | N8N | true | - |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | N8N | true | - |

## Configuration

- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-ready-production)
