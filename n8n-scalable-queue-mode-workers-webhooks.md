# Deploy n8n — Queue Mode, Workers, Webhooks & Task Runners on Railway

Production-ready n8n with Redis queue, workers, webhooks, and task runners

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-scalable-queue-mode-workers-webhooks)

## About

**n8n** is an open-source workflow automation platform that enables you to connect apps, automate business processes, and build AI-powered workflows with full flexibility. It combines the ease of no-code tools with the power of custom code, making it ideal for developers and teams who need scalable automation.

This template deploys a **production-ready, scalable n8n architecture** on Railway, including queue mode, workers, webhooks, and external task runners.

Official documentation:  
https://docs.n8n.io/

---

Hosting n8n gives you complete control over your automation infrastructure while maintaining flexibility and scalability. You can run workflows with custom logic, integrate with hundreds of services, and extend functionality using code nodes or community packages.

This template deploys n8n using a **distributed architecture** designed for production workloads:

- Editor service (main UI & API)
- Worker service (execution processing)
- Webhook service (high-performance triggers)
- External Task Runners (isolated code execution)

Running n8n on Railway allows you to leverage managed infrastructure, automatic networking, and persistent storage without managing servers manually.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-webhook | `n8nio/n8n:latest` | Worker |
| n8n-editor | `n8nio/n8n:latest` | Web service |
| n8n-worker | `n8nio/n8n:latest` | Database |
| n8n-runner | `n8nio/runners:latest` | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_TYPE` | n8n-webhook | postgresdb | - |
| `NODE_ENV` | n8n-webhook | production | - |
| `N8N_LOG_LEVEL` | n8n-webhook | warn | - |
| `EXECUTIONS_MODE` | n8n-webhook | queue | - |
| `DB_POSTGRESDB_SSL` | n8n-webhook | true | - |
| `DB_POSTGRESDB_USER` | n8n-webhook | (secret) | - |
| `QUEUE_BULL_REDIS_DB` | n8n-webhook | 0 | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-webhook | (secret) | - |
| `N8N_SKIP_DB_MIGRATIONS` | n8n-webhook | true | - |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-webhook | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-webhook | (secret) | - |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | n8n-webhook | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-webhook | false | - |
| `PORT` | n8n-editor | 5678 | - |
| `DB_TYPE` | n8n-editor | postgresdb | - |
| `NODE_ENV` | n8n-editor | production | - |
| `N8N_METRICS` | n8n-editor | false | - |
| `N8N_PROTOCOL` | n8n-editor | https | - |
| `N8N_LOG_LEVEL` | n8n-editor | warn | - |
| `N8N_PROXY_HOPS` | n8n-editor | 1 | - |
| `EXECUTIONS_MODE` | n8n-editor | queue | - |
| `DB_POSTGRESDB_SSL` | n8n-editor | true | - |
| `DB_POSTGRESDB_USER` | n8n-editor | (secret) | - |
| `QUEUE_BULL_REDIS_DB` | n8n-editor | 0 | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-editor | (secret) | - |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-editor | (secret) | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-editor | false | - |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-editor | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-editor | (secret) | - |
| `N8N_RUNNERS_DISABLED_INTERNAL` | n8n-editor | true | - |
| `N8N_BLOCK_CODE_EXECUTION_IN_MAIN` | n8n-editor | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-editor | true | - |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | n8n-editor | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-editor | false | - |
| `DB_TYPE` | n8n-worker | postgresdb | - |
| `NODE_ENV` | n8n-worker | production | - |
| `N8N_LOG_LEVEL` | n8n-worker | warn | - |
| `EXECUTIONS_MODE` | n8n-worker | queue | - |
| `N8N_RUNNERS_MODE` | n8n-worker | external | - |
| `DB_POSTGRESDB_SSL` | n8n-worker | true | - |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | - |
| `RUNNERS_AUTH_TOKEN` | n8n-worker | (secret) | - |
| `QUEUE_BULL_REDIS_DB` | n8n-worker | 0 | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | - |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-worker | (secret) | - |
| `N8N_SKIP_DB_MIGRATIONS` | n8n-worker | true | - |
| `N8N_RUNNERS_BROKER_PORT` | n8n-worker | 5679 | - |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) | - |
| `N8N_RUNNERS_DISABLED_INTERNAL` | n8n-worker | true | - |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n-worker | 0.0.0.0 | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-worker | true | - |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | n8n-worker | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-worker | false | - |
| `NODE_ENV` | n8n-runner | production | - |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-runner | (secret) | - |
| `N8N_RUNNERS_MAX_CONCURRENCY` | n8n-runner | 5 | - |
| `N8N_RUNNERS_TASK_REQUEST_TIMEOUT` | n8n-runner | 300 | - |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | n8n-runner | 15 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `n8n webhook`
- **Start command:** `n8n`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `n8n worker`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-scalable-queue-mode-workers-webhooks)
