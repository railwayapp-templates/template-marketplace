# Deploy n8n HubSpot on Railway

HubSpot deals synced to Slack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-hubspot)

## About

Self-host n8n HubSpot on Railway in queue mode so deal-won alerts, contact enrichment, and CRM sync run on dedicated workers with Postgres and Redis—not per-task Zapier billing. This template wires the editor, worker, database, and Bull queue for production HubSpot webhooks.

This Railway template deploys n8n in queue mode for HubSpot automation, using the official `n8nio/n8n:2.36.8` Docker image for both editor and worker. PostgreSQL stores execution data (`DB_TYPE=postgresdb`), Redis Bull queues jobs, and a volume at `/home/node/.n8n` persists credentials and workflows. The editor listens on port 5678 and dispatches webhook events to `n8n worker` processes, enabling reliable HubSpot deal alerts, contact enrichment, and CRM sync without per-operation fees. Self-hosted Community Edition runs under fair-code, giving you full control over encryption keys and execution history.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n-worker | `n8nio/n8n:2.36.8` | Worker |
| Redis | `redis:8.2` | Database |
| n8n | `n8nio/n8n:2.36.8` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n worker`
- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-hubspot)
