# Deploy n8n Fullpack on Railway

A production-ready n8n setup built to make life easier.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-fullpack)

## About

N8N Fullpack is a production-oriented n8n deployment architecture designed for scalable workflow automation on Railway.

This template includes a dedicated Primary instance, Webhook Processor, multiple Workers, external Task Runners, PostgreSQL, and Redis. It is designed for users who want more than a basic single-container n8n deployment and need queue-based execution, workload separation, and horizontal processing capacity.

N8N Fullpack separates the major n8n runtime responsibilities into dedicated services.

The Primary service hosts the n8n Editor UI, API, and orchestration layer. Production webhook traffic is handled independently by the Webhook Processor, while workflow executions are distributed through Redis to multiple Workers.

Each Worker is paired with its own external Task Runner to provide isolated task execution for supported nodes such as the Code node.

PostgreSQL stores persistent n8n application data, while Redis provides the execution queue used by the distributed Workers.

This architecture is suitable for production workloads where execution capacity, separation of responsibilities, and easier horizontal scaling are preferred over a minimal single-instance deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker 1 | `n8nio/n8n` | Worker |
| Worker 2 | `n8nio/n8n:latest` | Worker |
| Runner 1 | `n8nio/runners` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Runner 2 | `n8nio/runners:latest` | Worker |
| Redis | `redis:8.2.1` | Database |
| Primary | `n8nio/n8n` | Web service |
| Webhook Processor | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_TYPE` | Worker 1 | postgresdb | Use PostgreSQL as the shared n8n database backend |
| `NODE_OPTIONS` | Worker 1 | --max_old_space_size=8192 | Allow the Worker Node.js process to use up to 8 GB of heap memory |
| `EXECUTIONS_MODE` | Worker 1 | queue | Run workflow executions received from the Redis queue |
| `N8N_RUNNERS_MODE` | Worker 1 | external | Use a separate n8nio/runners service instead of spawning internal task runners |
| `DB_POSTGRESDB_HOST` | Worker 1 | - | PostgreSQL host shared with Primary and other workers |
| `DB_POSTGRESDB_PORT` | Worker 1 | - | PostgreSQL port shared with Primary and other workers |
| `DB_POSTGRESDB_USER` | Worker 1 | (secret) | PostgreSQL username shared with Primary and other workers |
| `N8N_ENCRYPTION_KEY` | Worker 1 | - | Reuse the Primary encryption key so credentials can be decrypted consistently |
| `QUEUE_BULL_REDIS_HOST` | Worker 1 | - | Redis host used to receive queued executions |
| `QUEUE_BULL_REDIS_PORT` | Worker 1 | - | Redis port used to receive queued executions |
| `DB_POSTGRESDB_DATABASE` | Worker 1 | - | PostgreSQL database shared with all n8n instances |
| `DB_POSTGRESDB_PASSWORD` | Worker 1 | (secret) | PostgreSQL password shared with all n8n instances |
| `N8N_RUNNERS_AUTH_TOKEN` | Worker 1 | (secret) | Shared authentication token between Worker 1 and Runner 1 |
| `N8N_RUNNERS_BROKER_PORT` | Worker 1 | 5679 | Port used by the Worker task broker for external Task Runner connections |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker 1 | (secret) | Redis password provided by Railway |
| `QUEUE_BULL_REDIS_USERNAME` | Worker 1 | (secret) | Redis username provided by Railway |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker 1 | true | Enable Redis communication over Railway dual-stack networking |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker 1 | true | Improve Railway private-network DNS compatibility |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | Worker 1 | :: | Expose the Worker task broker to Runner 1 over Railway private networking |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker 1 | true | Enforce secure permissions on the n8n settings file |
| `DB_TYPE` | Worker 2 | postgresdb | Use PostgreSQL as the shared n8n database backend |
| `NODE_OPTIONS` | Worker 2 | --max_old_space_size=8192 | Allow the Worker Node.js process to use up to 8 GB of heap memory |
| `EXECUTIONS_MODE` | Worker 2 | queue | Run workflow executions received from the Redis queue |
| `N8N_RUNNERS_MODE` | Worker 2 | external | Use Runner 2 as this Worker's external Task Runner |
| `DB_POSTGRESDB_HOST` | Worker 2 | - | PostgreSQL host shared across the n8n cluster |
| `DB_POSTGRESDB_PORT` | Worker 2 | - | PostgreSQL port shared across the n8n cluster |
| `DB_POSTGRESDB_USER` | Worker 2 | (secret) | PostgreSQL username shared across the n8n cluster |
| `N8N_ENCRYPTION_KEY` | Worker 2 | - | Use the exact same encryption key as Primary |
| `QUEUE_BULL_REDIS_HOST` | Worker 2 | - | Redis host used for execution queue distribution |
| `QUEUE_BULL_REDIS_PORT` | Worker 2 | - | Redis port used for execution queue distribution |
| `DB_POSTGRESDB_DATABASE` | Worker 2 | - | PostgreSQL database shared across the n8n cluster |
| `DB_POSTGRESDB_PASSWORD` | Worker 2 | (secret) | PostgreSQL password shared across the n8n cluster |
| `N8N_RUNNERS_AUTH_TOKEN` | Worker 2 | (secret) | Dedicated shared secret between Worker 2 and Runner 2 |
| `N8N_RUNNERS_BROKER_PORT` | Worker 2 | 5679 | Task broker port used by Runner 2 |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker 2 | (secret) | Redis password provided by Railway |
| `QUEUE_BULL_REDIS_USERNAME` | Worker 2 | (secret) | Redis username provided by Railway |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker 2 | true | Enable Redis communication over dual-stack private networking |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker 2 | true | Improve Railway private-network DNS compatibility |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | Worker 2 | :: | Expose the task broker over Railway private networking |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker 2 | true | Enforce secure permissions on the n8n settings file |
| `N8N_RUNNERS_AUTH_TOKEN` | Runner 1 | (secret) | Authenticate Runner 1 with the Worker 1 task broker |
| `N8N_RUNNERS_MAX_PAYLOAD` | Runner 1 | 1073741824 | Maximum broker-to-runner payload size in bytes; 1 GiB matches the n8n default |
| `N8N_RUNNERS_MAX_CONCURRENCY` | Runner 1 | 5 | Maximum number of tasks this runner can execute concurrently |
| `N8N_RUNNERS_TASK_BROKER_URI` | Runner 1 | - | Connect Runner 1 to Worker 1 over Railway private networking |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | Runner 1 | 15 | Stop idle runner processes after 15 seconds |
| `N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT` | Runner 1 | 5680 | Internal health-check port exposed by the Task Runner launcher |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `N8N_RUNNERS_AUTH_TOKEN` | Runner 2 | (secret) | Authenticate Runner 2 with the Worker 2 task broker |
| `N8N_RUNNERS_MAX_PAYLOAD` | Runner 2 | 1073741824 | Maximum broker-to-runner payload size in bytes; matches n8n default |
| `N8N_RUNNERS_MAX_CONCURRENCY` | Runner 2 | 5 | Maximum number of concurrent tasks executed by Runner 2 |
| `N8N_RUNNERS_TASK_BROKER_URI` | Runner 2 | - | Connect Runner 2 specifically to Worker 2 over Railway private networking |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | Runner 2 | 15 | Stop idle runner processes after 15 seconds |
| `N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT` | Runner 2 | 5680 | Internal health-check port exposed by the Runner launcher |
| `REDISHOST` | Redis | - | Redis hostname on Railway private networking |
| `REDISPORT` | Redis | 6379 | Default Redis TCP port |
| `REDISUSER` | Redis | default | Default Redis ACL username |
| `REDIS_URL` | Redis | - | Full Redis connection string using Railway private networking |
| `REDISPASSWORD` | Redis | (secret) | Compatibility alias exposing the Redis password under the REDISPASSWORD variable |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated 32-character Redis password using alphabetic characters |
| `DB_TYPE` | Primary | postgresdb | Use PostgreSQL as the n8n database backend |
| `N8N_PORT` | Primary | 5678 | HTTP port used by the n8n Primary instance |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | Allow the Node.js process to use up to 8 GB of heap memory |
| `EXECUTIONS_MODE` | Primary | queue | Send workflow executions to Redis-backed workers instead of executing them on Primary |
| `N8N_WEBHOOK_URL` | Primary | - | Public production webhook base URL handled by the dedicated Webhook Processor |
| `DB_POSTGRESDB_HOST` | Primary | - | PostgreSQL host provided by the Railway Postgres service |
| `DB_POSTGRESDB_PORT` | Primary | - | PostgreSQL port provided by the Railway Postgres service |
| `DB_POSTGRESDB_USER` | Primary | (secret) | PostgreSQL username provided by the Railway Postgres service |
| `N8N_ENCRYPTION_KEY` | Primary | - | Shared encryption key used to encrypt n8n credentials; must be identical across all n8n instances |
| `N8N_LISTEN_ADDRESS` | Primary | :: | Listen on IPv6 and IPv4-compatible interfaces for Railway private networking |
| `N8N_EDITOR_BASE_URL` | Primary | - | Public URL used to access the n8n Editor UI |
| `QUEUE_BULL_REDIS_HOST` | Primary | - | Redis host used for the n8n execution queue |
| `QUEUE_BULL_REDIS_PORT` | Primary | - | Redis port used for the n8n execution queue |
| `DB_POSTGRESDB_DATABASE` | Primary | - | PostgreSQL database used by n8n |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | PostgreSQL password provided by the Railway Postgres service |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | Redis password provided by Railway |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | Redis username provided by Railway |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | Enable Redis connectivity in dual-stack IPv4/IPv6 environments |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | Improve private-network DNS behavior for Alpine-based containers on Railway |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | Primary | true | Prevent Primary from accepting production webhook traffic because a dedicated Webhook Processor is used |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | Execute manual workflow runs on workers instead of the Primary instance |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | Enforce secure permissions on the n8n settings file |
| `DB_TYPE` | Webhook Processor | postgresdb | Use PostgreSQL as the shared n8n database backend |
| `N8N_PORT` | Webhook Processor | 5678 | HTTP port used by the dedicated Webhook Processor |
| `NODE_OPTIONS` | Webhook Processor | --max_old_space_size=8192 | Allow the Node.js process to use up to 8 GB of heap memory |
| `EXECUTIONS_MODE` | Webhook Processor | queue | Queue incoming webhook executions for workers through Redis |
| `N8N_WEBHOOK_URL` | Webhook Processor | - | Public production webhook URL served by this processor |
| `DB_POSTGRESDB_HOST` | Webhook Processor | - | PostgreSQL host shared with all n8n instances |
| `DB_POSTGRESDB_PORT` | Webhook Processor | - | PostgreSQL port shared with all n8n instances |
| `DB_POSTGRESDB_USER` | Webhook Processor | (secret) | PostgreSQL username shared with all n8n instances |
| `N8N_ENCRYPTION_KEY` | Webhook Processor | - | Reuse the exact encryption key from Primary |
| `N8N_LISTEN_ADDRESS` | Webhook Processor | :: | Listen on IPv6 and IPv4-compatible interfaces |
| `QUEUE_BULL_REDIS_HOST` | Webhook Processor | - | Redis host used to enqueue workflow executions |
| `QUEUE_BULL_REDIS_PORT` | Webhook Processor | - | Redis port used to enqueue workflow executions |
| `DB_POSTGRESDB_DATABASE` | Webhook Processor | - | PostgreSQL database shared with all n8n instances |
| `DB_POSTGRESDB_PASSWORD` | Webhook Processor | (secret) | PostgreSQL password shared with all n8n instances |
| `QUEUE_BULL_REDIS_PASSWORD` | Webhook Processor | (secret) | Redis password provided by Railway |
| `QUEUE_BULL_REDIS_USERNAME` | Webhook Processor | (secret) | Redis username provided by Railway |
| `QUEUE_BULL_REDIS_DUALSTACK` | Webhook Processor | true | Enable Redis connectivity over Railway dual-stack networking |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Webhook Processor | true | Improve private-network DNS compatibility on Railway |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Webhook Processor | true | Enforce secure permissions for the n8n settings file |

## Configuration

- **Start command:** `n8n worker --concurrency=10`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Start command:** `n8n webhook`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-fullpack)
