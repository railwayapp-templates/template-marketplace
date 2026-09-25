# Deploy n8n vs Node-RED on Railway

Node-RED alternative for SaaS APIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-vs-node-red)

## About

When you're choosing between n8n and Node-RED, the decision usually comes down to what you're automating: SaaS APIs and business workflows, or device-level messaging and IoT event streams. This Railway template deploys n8n in queue mode with PostgreSQL and Redis so your SaaS-heavy automation pipelines scale horizontally without choking on webhook bursts. Node-RED stays on your Raspberry Pi where it belongs.

Self-host n8n vs Node-RED on Railway in queue mode with an n8n editor, dedicated worker, PostgreSQL, and Redis Bull so webhooks and long workflows stay off the UI—flat infrastructure cost instead of per-task SaaS billing.

Self-host n8n vs Node-RED on Railway in queue mode with an n8n editor, dedicated worker, PostgreSQL, and Redis Bull so webhooks and long workflows stay off the UI—flat infrastructure cost instead of per-task SaaS billing.

The moment you move past five or six production workflows, n8n's Community Edition starts to feel different from a fresh install. Execution history piles up, webhook retries block the event loop, and that single SQLite file starts sweating under concurrent executions. Queue mode fixes this by splitting the editor from the worker process. This template deploys n8n with `EXECUTIONS_MODE=queue`, PostgreSQL as the shared state store, and Redis Bull handling job distribution. The editor container stays responsive while workers chew through long-running HTTP integrations in parallel.

Node-RED, by contrast, doesn't need any of that for its sweet spot. A single Node.js process handling MQTT topics from a dozen sensors is a very different workload than n8n polling five SaaS APIs and triggering a dozen webhooks per minute. That's why the two tools rarely compete in practice — and why this template exists as a Node-RED alternative specifically for SaaS-heavy automation, not IoT.

Railway gives you a place to run n8n without a Docker Compose file in your home directory, and the Postgres plus Redis sidecars spin up in the same project with one deploy. No VPC peering, no firewall rules for Redis, no "wait, which port is Bull on again?"

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

[View on Railway →](https://railway.com/deploy/n8n-vs-node-red)
