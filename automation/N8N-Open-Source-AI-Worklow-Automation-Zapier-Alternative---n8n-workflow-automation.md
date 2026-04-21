# Deploy N8N | Open-Source AI Worklow Automation | Zapier Alternative on Railway

Self-host n8n workflow automation with workers, postgres, webhooks & Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-workflow-automation)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-workflow-automation?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

n8n is an open-source, fair-code workflow automation platform that lets you connect 400+ apps, databases, and APIs through a visual node editor — with full code escape hatches when drag-and-drop isn't enough. Self-host n8n on Railway to keep your workflow data, API keys, and customer payloads in infrastructure you control, instead of routing them through a third-party SaaS.

This Railway deployment runs a production-grade, queue-mode n8n stack: a main editor/API service, a dedicated worker pool, a separate webhook processor, PostgreSQL for persistence, and Redis as the BullMQ job broker. Every tier scales independently, so you can handle thousands of concurrent executions by adding workers without touching the editor.

![n8n Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776701287/n8n-automation-architecture_j84mbk.png)

n8n (pronounced "n-eight-n", short for nodemation) is a workflow automation tool maintained by n8n GmbH under the Sustainable Use License. Unlike no-code SaaS tools, self-hosted n8n gives you root-level control over data, execution logs, and custom JavaScript/Python code nodes — without per-execution pricing or step caps.

Key features:
- Visual drag-and-drop editor with 400+ integrations
- Code nodes (JavaScript + Python) for custom logic inside any workflow
- Webhook, schedule, and event triggers
- Queue mode for horizontal scaling across worker processes
- Built-in version control, error workflows, and execution replay
- AI nodes with native LangChain integration

The deployment uses queue mode (`EXECUTIONS_MODE=queue`) — the main service enqueues jobs to Redis, and a pool of worker replicas pulls them off in parallel.

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

[View on Railway →](https://railway.com/deploy/n8n-workflow-automation)
