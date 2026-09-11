# Deploy n8n Shopify Telegram on Railway

Run Shopify from Telegram with n8n

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-shopify-telegram)

## About

.

n8n Shopify Telegram is a self-hosted automation stack that turns your Telegram chat into a full Shopify store operations co..nsole. Instead of logging into the Shopify Admin dashboard from a laptop, you send Telegram commands like `/orders`, `/stock sku-123`, or `/refund #1042` and n8n translates those messages into Shopify Admin API calls, returning order details, inventory levels, customer data, and fulfillment status directly in the chat thread. This Railway template packages the n8n editor, a dedicated worker, PostgreSQL, and Redis into a single deployable infrastructure stack so the entire command-to-API pipeline runs on your own infrastructure without a custom bot framework, without a separate Telegram bot hosting service, and without paying per-conversation fees to a managed chat platform. Prefer the workers stack for Shopify traffic spikes; the [cheapest n8n without queue mode](https://railway.com/deploy/n8n) is only for lighter single-node needs.

The core of this template is the n8n workflow engine running in queue mode. The editor container (n8nio/n8n:2.36.8) handles workflow design and the webhook endpoint on port 5678, while the worker container runs the `n8n worker` command to execute Telegram-triggered jobs asynchronously. Redis Bull manages the job queue between the editor and worker, and PostgreSQL stores workflow definitions, execution history, and credential data. The volume at `/home/node/.n8n` persists workflow files and encryption keys across restarts. Because the stack runs the Community Edition under fair-code licensing, you own the entire automation layer: the Telegram bot token, the Shopify Admin API credentials, the workflow logic, and the execution logs. No vendor can throttle your message volume, gate your API access, or change pricing on you mid-quarter.

The Telegram-to-Shopify bridge works through n8n's native Telegram Trigger node, which listens for bot updates via long polling or webhook delivery, paired with the HTTP Request node that authenticates against the Shopify Admin API using an access token with the scopes you explicitly grant. A single workflow can handle dozens of command patterns: `/orders today` fetches orders created in the last 24 hours, `/customer email@example.com` pulls the customer's order history and lifetime value, `/inventory low` lists products below a reorder threshold, and `/fulfill #1042` marks an order as fulfilled with tracking information. Because n8n executes these as standard HTTP requests with your Shopify credentials, you are not limited to a vendor's pre-built command set. You can extend the workflow to update product prices, create draft orders, issue refunds, adjust inventory levels, or trigger email notifications to customers, all from the same Telegram chat.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:2.36.8` | Web service |
| n8n-worker | `n8nio/n8n:2.36.8` | Worker |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Start command:** `n8n worker`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-shopify-telegram)
