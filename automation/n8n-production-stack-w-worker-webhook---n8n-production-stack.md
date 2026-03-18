# Deploy n8n-production-stack (w/ worker & webhook) on Railway

Self-host Open-source workflow automation: 400+ integrations, AI agent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-production-stack)

## About

Deploy a production-grade, self-hosted n8n instance on Railway in one click. This template provisions the full queue-mode architecture: a **main instance** (UI + API), a **worker** (workflow execution), a **webhook processor** (dedicated webhook handling), **PostgreSQL** for persistence, and **Redis** for the job queue — all pre-wired with private networking.

n8n is an open-source workflow automation platform that lets you connect 400+ apps, APIs, and services using a visual node editor — with the option to drop into JavaScript when you need it. Unlike SaaS tools, self-hosting n8n means your credentials and execution data never leave your infrastructure.

**Key features:**
- 400+ native integrations (Slack, GitHub, Postgres, OpenAI, Stripe, and more)
- Visual workflow builder with native code nodes (JavaScript/Python)
- AI agent support via LangChain integration
- Git-based version control for workflows
- Webhook triggers, cron schedules, and event-based execution

**Architecture in this template:**

```
Incoming webhook → Webhook Processor → Redis (Bull queue) → Worker executes
Scheduled trigger → Main instance    → Redis (Bull queue) → Worker executes
```

The main instance never executes workflows itself — it only manages the UI and dispatches jobs. This prevents long-running workflows from blocking the editor or incoming webhooks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| main | `n8nio/n8n` | Web service |
| worker | `n8nio/n8n` | Worker |
| Redis | `redis:8.2.1` | Database |
| webhook | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres admin username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres user authentication password |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `PORT` | main | 5678 | Container exposed HTTP port |
| `DB_TYPE` | main | postgresdb | Database type used by n8n |
| `N8N_PORT` | main | 5678 | Port n8n server runs on |
| `WEBHOOK_URL` | main | - | Public base URL for webhooks |
| `NODE_OPTIONS` | main | --max_old_space_size=8192 | Increase Node.js memory limit |
| `EXECUTIONS_MODE` | main | queue | Use Redis queue for execution |
| `DB_POSTGRESDB_HOST` | main | - | Hostname of Postgres database server |
| `DB_POSTGRESDB_PORT` | main | - | Port used by Postgres server |
| `DB_POSTGRESDB_USER` | main | (secret) | Username for Postgres database login |
| `N8N_ENCRYPTION_KEY` | main | {{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }} | Encrypt credentials and sensitive data |
| `N8N_LISTEN_ADDRESS` | main | :: | Listen on all IPv6 interfaces |
| `N8N_EDITOR_BASE_URL` | main | - | Public URL for n8n editor |
| `N8N_RUNNERS_ENABLED` | main | true | Enable workflow runner processes |
| `EXECUTIONS_DATA_PRUNE` | main | true | Automatically delete old execution data |
| `QUEUE_BULL_REDIS_HOST` | main | - | Redis host for queue system |
| `QUEUE_BULL_REDIS_PORT` | main | - | Redis server listening port |
| `DB_POSTGRESDB_DATABASE` | main | - | Postgres database used by n8n |
| `DB_POSTGRESDB_PASSWORD` | main | (secret) | Password for Postgres database access |
| `QUEUE_BULL_REDIS_PASSWORD` | main | (secret) | Redis authentication password |
| `QUEUE_BULL_REDIS_USERNAME` | main | (secret) | Redis username for authentication |
| `QUEUE_BULL_REDIS_DUALSTACK` | main | true | Enable Redis IPv4 and IPv6 |
| `N8N_DEFAULT_BINARY_DATA_MODE` | main | filesystem | Store binary workflow data locally |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | main | 100 | Maximum stored workflow executions |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | main | true | Enable Railway internal service networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | main | true | Send manual runs to workers |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | main | true | Enforce secure settings file permissions |
| `PORT` | worker | 5678 | Worker service listening port |
| `DB_TYPE` | worker | postgresdb | Database type used by n8n |
| `WEBHOOK_URL` | worker | - | Public base URL for webhooks |
| `NODE_OPTIONS` | worker | --max_old_space_size=8192 | Increase Node.js memory limit |
| `EXECUTIONS_MODE` | worker | queue | Workers process queued executions |
| `DB_POSTGRESDB_HOST` | worker | - | Hostname of Postgres database server |
| `DB_POSTGRESDB_PORT` | worker | - | Port used by Postgres server |
| `DB_POSTGRESDB_USER` | worker | (secret) | Username for Postgres database login |
| `N8N_ENCRYPTION_KEY` | worker | - | Shared encryption key for credentials |
| `N8N_LISTEN_ADDRESS` | worker | :: | Listen on all IPv6 interfaces |
| `N8N_RUNNERS_ENABLED` | worker | true | Enable workflow runner processes |
| `QUEUE_BULL_REDIS_HOST` | worker | - | Redis host for queue system |
| `QUEUE_BULL_REDIS_PORT` | worker | - | Redis server listening port |
| `DB_POSTGRESDB_DATABASE` | worker | - | Postgres database used by workers |
| `DB_POSTGRESDB_PASSWORD` | worker | (secret) | Password for Postgres database access |
| `QUEUE_BULL_REDIS_PASSWORD` | worker | (secret) | Redis authentication password |
| `QUEUE_BULL_REDIS_USERNAME` | worker | (secret) | Redis username for authentication |
| `QUEUE_BULL_REDIS_DUALSTACK` | worker | true | Enable Redis IPv4 and IPv6 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | worker | true | Enable Railway internal service networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | worker | true | Send manual runs to workers |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | worker | true | Enforce secure settings file permissions |
| `REDISHOST` | Redis | - | Internal hostname for Redis service |
| `REDISPORT` | Redis | 6379 | Default Redis server port |
| `REDISUSER` | Redis | default | Redis authentication username |
| `REDIS_URL` | Redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | Redis | - | External Redis connection string |
| `PORT` | webhook | 5678 | Webhook service listening port |
| `DB_TYPE` | webhook | postgresdb | Database type used by n8n |
| `WEBHOOK_URL` | webhook | - | Public URL receiving webhook calls |
| `NODE_OPTIONS` | webhook | --max_old_space_size=8192 | Increase Node.js memory limit |
| `EXECUTIONS_MODE` | webhook | queue | Use queue system for executions |
| `DB_POSTGRESDB_HOST` | webhook | - | Hostname of Postgres database server |
| `DB_POSTGRESDB_PORT` | webhook | - | Port used by Postgres server |
| `DB_POSTGRESDB_USER` | webhook | (secret) | Username for Postgres database login |
| `N8N_ENCRYPTION_KEY` | webhook | - | Shared encryption key for credentials |
| `N8N_LISTEN_ADDRESS` | webhook | :: | Listen on all IPv6 interfaces |
| `QUEUE_BULL_REDIS_HOST` | webhook | - | Redis host for queue system |
| `QUEUE_BULL_REDIS_PORT` | webhook | - | Redis server listening port |
| `DB_POSTGRESDB_DATABASE` | webhook | - | Postgres database used by webhooks |
| `DB_POSTGRESDB_PASSWORD` | webhook | (secret) | Password for Postgres database access |
| `QUEUE_BULL_REDIS_PASSWORD` | webhook | (secret) | Redis authentication password |
| `QUEUE_BULL_REDIS_USERNAME` | webhook | (secret) | Redis username for authentication |
| `QUEUE_HEALTH_CHECK_ACTIVE` | webhook | true | Enable queue health monitoring |
| `QUEUE_BULL_REDIS_DUALSTACK` | webhook | true | Enable Redis IPv4 and IPv6 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | webhook | true | Enable Railway internal service networking |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `n8n worker`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `n8n webhook`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-production-stack)
