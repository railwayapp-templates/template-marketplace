# Deploy n8n WordPress on Railway

Auto-publish posts to WordPress with n8n

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-wordpress)

## About

n8n WordPress automation on Railway provides a self-hosted publishing stack.

Hosting n8n WordPress on Railway gives you a production-grade, queue-mode n8n deployment purpose-built for automating WordPress content pipelines. This template provisions the n8n editor and worker processes alongside PostgreSQL and Redis so that your n8n WordPress automation workflows run reliably at scale. You can build AI-driven drafting pipelines that push articles straight into WordPress, sync RSS feeds into scheduled posts, and orchestrate multi-step content operations without paying per-execution fees.

Unlike installing n8n on a single VPS with SQLite, this Railway stack runs n8n in queue mode. That means long-running WordPress publishing jobs, AI generation steps, and webhook-triggered content updates do not block the editor UI. The worker process consumes jobs from a Redis Bull queue while PostgreSQL stores workflow definitions and execution metadata. For teams that run many n8n WordPress automation workflows in parallel, this architecture removes the bottleneck you would hit with the default SQLite-backed community setup.

The open-source n8n Community Edition ships under a fair-code license, so you keep full ownership of your workflows and credentials. Your WordPress site credentials, OpenAI or Anthropic API keys, and RSS source URLs live inside your own infrastructure. No third-party SaaS can inspect or throttle your n8n WordPress automation traffic. Railway handles the container orchestration, networking, persistent volumes, and log aggregation, while you focus entirely on building workflows that move content from drafts to published posts.

This template targets content operators, affiliate site builders, news aggregators, and developers who want a self-hosted WordPress automation layer. The included queue-mode topology mirrors what larger teams run in production n8n deployments. Whether you are publishing ten posts per week or ten thousand, the same stack scales vertically on Railway without changing your workflow definitions or credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| n8n | `n8nio/n8n:2.36.8` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n-worker | `n8nio/n8n:2.36.8` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Value for REDISHOST used to configure this service. |
| `REDISPORT` | Redis | 6379 | Redis port on the Railway private network |
| `REDISUSER` | Redis | default | Redis ACL username used in REDIS_URL |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Value for REDISPASSWORD used to configure this service. |
| `REDIS_PASSWORD` | Redis | (secret) | Value for REDIS_PASSWORD used to configure this service. |
| `PORT` | n8n | 5678 | PORT |
| `DB_TYPE` | n8n | postgresdb | DB_TYPE |
| `N8N_PORT` | n8n | 5678 | N8N_PORT |
| `EXECUTIONS_MODE` | n8n | queue | EXECUTIONS_MODE |
| `N8N_USER_FOLDER` | n8n | /tmp | N8N_USER_FOLDER |
| `GENERIC_TIMEZONE` | n8n | Asia/Kolkata | GENERIC_TIMEZONE |
| `DB_POSTGRESDB_HOST` | n8n | - | DB_POSTGRESDB_HOST |
| `DB_POSTGRESDB_PORT` | n8n | - | DB_POSTGRESDB_PORT |
| `DB_POSTGRESDB_USER` | n8n | (secret) | DB_POSTGRESDB_USER |
| `N8N_ENCRYPTION_KEY` | n8n | ixG-OOWRgFP-OcFI86BYalWhdSeVDo0vTDSSjirUMoc | N8N_ENCRYPTION_KEY |
| `N8N_RUNNERS_ENABLED` | n8n | true | N8N_RUNNERS_ENABLED |
| `QUEUE_BULL_REDIS_HOST` | n8n | - | QUEUE_BULL_REDIS_HOST |
| `QUEUE_BULL_REDIS_PORT` | n8n | - | QUEUE_BULL_REDIS_PORT |
| `DB_POSTGRESDB_DATABASE` | n8n | - | DB_POSTGRESDB_DATABASE |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | DB_POSTGRESDB_PASSWORD |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) | QUEUE_BULL_REDIS_PASSWORD |
| `QUEUE_BULL_REDIS_USERNAME` | n8n | (secret) | QUEUE_BULL_REDIS_USERNAME |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n | true | QUEUE_HEALTH_CHECK_ACTIVE |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | n8n | 10 | N8N_CONCURRENCY_PRODUCTION_LIMIT |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n | true | OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | false | N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | n8n-worker | 5678 | Port Railway uses to route traffic to the worker. Keep at 5678. |
| `DB_TYPE` | n8n-worker | postgresdb | Must be postgresdb. Do not use SQLite in queue mode. |
| `N8N_HOST` | n8n-worker | - | N8N_HOST |
| `N8N_PORT` | n8n-worker | 5678 | Port n8n binds inside the container. Must match PORT. |
| `WEBHOOK_URL` | n8n-worker | - | WEBHOOK_URL |
| `N8N_PROTOCOL` | n8n-worker | https | N8N_PROTOCOL |
| `N8N_PROXY_HOPS` | n8n-worker | 1 | N8N_PROXY_HOPS |
| `EXECUTIONS_MODE` | n8n-worker | queue | EXECUTIONS_MODE |
| `N8N_USER_FOLDER` | n8n-worker | /tmp | N8N_USER_FOLDER |
| `N8N_WEBHOOK_URL` | n8n-worker | - | N8N_WEBHOOK_URL |
| `GENERIC_TIMEZONE` | n8n-worker | Asia/Kolkata | GENERIC_TIMEZONE |
| `DB_POSTGRESDB_HOST` | n8n-worker | - | DB_POSTGRESDB_HOST |
| `DB_POSTGRESDB_PORT` | n8n-worker | - | DB_POSTGRESDB_PORT |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | DB_POSTGRESDB_USER |
| `N8N_ENCRYPTION_KEY` | n8n-worker | ixG-OOWRgFP-OcFI86BYalWhdSeVDo0vTDSSjirUMoc | N8N_ENCRYPTION_KEY |
| `N8N_EDITOR_BASE_URL` | n8n-worker | - | N8N_EDITOR_BASE_URL |
| `N8N_RUNNERS_ENABLED` | n8n-worker | true | N8N_RUNNERS_ENABLED |
| `EXECUTIONS_DATA_PRUNE` | n8n-worker | true | EXECUTIONS_DATA_PRUNE |
| `QUEUE_BULL_REDIS_HOST` | n8n-worker | - | QUEUE_BULL_REDIS_HOST |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | - | QUEUE_BULL_REDIS_PORT |
| `DB_POSTGRESDB_DATABASE` | n8n-worker | - | DB_POSTGRESDB_DATABASE |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | DB_POSTGRESDB_PASSWORD |
| `EXECUTIONS_DATA_MAX_AGE` | n8n-worker | 336 | EXECUTIONS_DATA_MAX_AGE |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | QUEUE_BULL_REDIS_PASSWORD |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) | QUEUE_BULL_REDIS_USERNAME |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true | QUEUE_HEALTH_CHECK_ACTIVE |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-worker | true | OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-worker | false | N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n worker`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-wordpress)
