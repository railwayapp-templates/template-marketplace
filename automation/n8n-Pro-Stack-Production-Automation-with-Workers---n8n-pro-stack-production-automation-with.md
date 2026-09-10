# Deploy n8n Pro Stack — Production Automation with Workers on Railway

Deploy n8n with Worker, Task Runner, Redis & PostgreSQL—ready to scale.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-pro-stack-production-automation-with)

## About

**Launch your own powerful automation platform in one click.** Build AI agents, connect apps, automate business processes, and keep control of your workflows, credentials, and data—without paying per task or workflow step.

**Automate More. Own Everything.**

n8n is a flexible self-hosted alternative to Zapier and Make. This template gives you a complete, production-ready n8n environment on Railway with the essential services already connected.

Deploy once, create your owner account, add your app credentials, and start building powerful automations.

No manual database wiring. No Redis setup. No shared secrets to copy. No infrastructure puzzle.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-runner | `n8nio/runners` | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| n8n-primary | `n8nio/n8n` | Web service |
| n8n-worker | `n8nio/n8n` | Worker |
| redis | `railwayapp/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-runner | (secret) | Shared authentication token used by the task runner to connect securely to the n8n Worker. |
| `N8N_RUNNERS_TASK_BROKER_URI` | n8n-runner | - | Private task-broker endpoint exposed by the n8n Worker on port 5679. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | n8n-runner | 0 | Keeps the external task runner active while idle; zero disables automatic shutdown. |
| `POSTGRES_DB` | postgres | n8n | Database name used by n8n for workflows, credentials, and execution data. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL user created for the n8n application services. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Automatically generated PostgreSQL password shared through private service references. |
| `PORT` | n8n-primary | 5678 | Public HTTP port used by the n8n editor, API, and webhook server. |
| `DB_TYPE` | n8n-primary | postgresdb | Selects PostgreSQL as the persistent database backend for n8n. |
| `N8N_PROXY_HOPS` | n8n-primary | 1 | Trusts Railway's reverse proxy when resolving public request information. |
| `EXECUTIONS_MODE` | n8n-primary | queue | Sends workflow executions through Redis to the dedicated Worker service. |
| `N8N_WEBHOOK_URL` | n8n-primary | - | Public HTTPS base URL used when n8n generates production webhook links. |
| `N8N_RUNNERS_MODE` | n8n-primary | external | Uses the external task-runner service for isolated Code node execution. |
| `DB_POSTGRESDB_HOST` | n8n-primary | - | Private PostgreSQL hostname supplied automatically by the database service. |
| `DB_POSTGRESDB_PORT` | n8n-primary | 5432 | Internal PostgreSQL port used by n8n services. |
| `DB_POSTGRESDB_USER` | n8n-primary | (secret) | PostgreSQL application user shared by the database service. |
| `N8N_ENCRYPTION_KEY` | n8n-primary | - | Generated key used to encrypt n8n credentials; keep it unchanged after deployment. |
| `N8N_LISTEN_ADDRESS` | n8n-primary | 0.0.0.0 | Binds n8n to all container network interfaces inside Railway. |
| `N8N_EDITOR_BASE_URL` | n8n-primary | - | Public base URL used by the n8n editor and browser-facing links. |
| `QUEUE_BULL_REDIS_HOST` | n8n-primary | - | Private Redis hostname used for the workflow execution queue. |
| `QUEUE_BULL_REDIS_PORT` | n8n-primary | 6379 | Internal Redis port used by the queue connection. |
| `DB_POSTGRESDB_DATABASE` | n8n-primary | - | PostgreSQL database that stores n8n application data. |
| `DB_POSTGRESDB_PASSWORD` | n8n-primary | (secret) | Database password referenced securely from the PostgreSQL service. |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-primary | (secret) | Generated token available to authenticate external task runners. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-primary | (secret) | Redis password referenced securely from the Redis service. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-primary | true | Enables reliable Redis resolution across Railway's private network. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-primary | database | Stores binary execution data in the shared PostgreSQL database for queue mode. |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | n8n-primary | 60 | Allows active executions time to finish during graceful shutdown. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-primary | true | Routes manual workflow runs to the dedicated Worker service as well. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-primary | true | Enforces secure permissions for n8n settings files inside the container. |
| `PORT` | n8n-worker | 5678 | Internal HTTP port used by the n8n Worker health endpoint. |
| `DB_TYPE` | n8n-worker | postgresdb | Selects PostgreSQL as the persistent database backend for the Worker. |
| `EXECUTIONS_MODE` | n8n-worker | queue | Processes workflow jobs received through the Redis execution queue. |
| `N8N_RUNNERS_MODE` | n8n-worker | external | Uses the external task-runner service for isolated Code node execution. |
| `DB_POSTGRESDB_HOST` | n8n-worker | - | Private PostgreSQL hostname supplied automatically by the database service. |
| `DB_POSTGRESDB_PORT` | n8n-worker | 5432 | Internal PostgreSQL port used by the Worker. |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | PostgreSQL application user shared by the database service. |
| `N8N_ENCRYPTION_KEY` | n8n-worker | - | Uses the Primary service encryption key so all credentials remain readable. |
| `N8N_LISTEN_ADDRESS` | n8n-worker | 0.0.0.0 | Binds the Worker service to all container network interfaces. |
| `QUEUE_BULL_REDIS_HOST` | n8n-worker | - | Private Redis hostname used to receive queued workflow jobs. |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | 6379 | Internal Redis port used by the Worker queue connection. |
| `DB_POSTGRESDB_DATABASE` | n8n-worker | - | PostgreSQL database that stores n8n application and execution data. |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | Database password referenced securely from the PostgreSQL service. |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-worker | (secret) | Generated token shared with the external task runner for authentication. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | Redis password referenced securely from the Redis service. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true | Exposes the Worker readiness endpoint used by Railway health checks. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-worker | true | Enables reliable Redis resolution across Railway's private network. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-worker | database | Stores binary execution data in PostgreSQL for queue-mode compatibility. |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | n8n-worker | 60 | Allows active workflow executions time to finish during shutdown. |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n-worker | 0.0.0.0 | Makes the Worker's task broker reachable by the private Runner service. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-worker | true | Ensures manual workflow tests use the same production Worker path. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-worker | true | Enforces secure permissions for n8n settings files inside the container. |
| `REDISHOST` | redis | - | Private Redis hostname used by the n8n Primary and Worker services. |
| `REDISPORT` | redis | 6379 | Internal Redis port used for queued workflow execution. |
| `REDISUSER` | redis | default | Redis username used by the n8n queue connection. |
| `REDIS_PASSWORD` | redis | (secret) | Automatically generated Redis password shared through private service references. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `n8n worker --concurrency=5`
- **Healthcheck:** `/healthz/readiness`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-pro-stack-production-automation-with)
