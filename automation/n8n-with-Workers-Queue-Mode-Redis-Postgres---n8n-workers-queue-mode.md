# Deploy n8n with Workers (Queue Mode + Redis + Postgres) on Railway

Self-hosted n8n queue mode: workers, Redis, Postgres. Zapier alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-workers-queue-mode)

## About

![n8n workflow editor showing a visual automation with connected nodes](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot-readme.png)

n8n is the workflow automation platform with **200,000+ GitHub stars**, 400+ integrations and native AI agent nodes. This template deploys n8n on Railway in **queue mode**, so workflow runs are processed by dedicated workers instead of the editor. Zapier charges $129/month for 10,000 tasks — self-host n8n for ~$10–20/month with no execution caps, and keep every workflow, credential and log on infrastructure you control.

---

A single n8n container is fine for testing, but production needs a real database, a queue so long workflows don't block webhooks, scalable workers and one encryption key shared by every process. By hand, that means wiring Postgres, Redis, TLS and a reverse proxy yourself.

On Railway, services talk over a private network, Primary gets an HTTPS domain automatically, Postgres and Redis keep data on volumes, and passwords and the encryption key are generated at deploy time and shared via variable references.

**License note:** n8n is fair-code under the Sustainable Use License, not OSI open source. Self-hosting for your own business or internal use is free; offering n8n itself as a paid hosted service to others is not allowed without a commercial license.

Typical cost: **~$10–20/month** on Railway for light to moderate workloads, with unlimited executions. Zapier Professional is $129/month for 10,000 tasks and n8n Cloud Pro is €50/month for 10,000 executions (both billed annually).

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Primary | `n8nio/n8n` | Web service |
| Redis | `railwayapp/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Worker | `n8nio/n8n` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Primary | 5678 | The HTTP port the application responds to |
| `DB_TYPE` | Primary | postgresdb | Database type |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | The memory limit for the task runner Node.js process |
| `EXECUTIONS_MODE` | Primary | queue | Whether executions should run directly or using queue |
| `N8N_TRUST_PROXY` | Primary | true | Trust X-Forwarded headers from Railway's proxy so n8n sees HTTPS and the real client IP. |
| `N8N_WEBHOOK_URL` | Primary | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `DB_POSTGRESDB_HOST` | Primary | - | Database host |
| `DB_POSTGRESDB_PORT` | Primary | - | Database port |
| `DB_POSTGRESDB_USER` | Primary | (secret) | Database user |
| `N8N_ENCRYPTION_KEY` | Primary | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | Primary | :: | The IP address n8n should listen on |
| `N8N_EDITOR_BASE_URL` | Primary | - | Public URL where users can access the editor |
| `QUEUE_BULL_REDIS_HOST` | Primary | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Primary | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Primary | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | Redis user |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | Enable dual-stack support (IPv4 and IPv6) on Redis connections |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | Run manual executions from the editor on workers instead of the main instance. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | Require strict file permissions (0600) on n8n's settings file. |
| `REDISHOST` | Redis | - | Private hostname of Redis on Railway's internal network. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Redis ACL username. |
| `REDIS_URL` | Redis | - | Private Redis connection URL for other services in this project. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect this name. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated at deploy time. |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL through Railway's TCP proxy, for access from outside Railway. |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first start. |
| `DATABASE_URL` | Postgres | - | Private Postgres connection URL for other services in this project. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first start. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated at deploy time. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection URL through Railway's TCP proxy, for access from outside Railway. |
| `PORT` | Worker | 5678 | The HTTP port the application responds to |
| `DB_TYPE` | Worker | postgresdb | Database type |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | The memory limit for the task runner Node.js process |
| `EXECUTIONS_MODE` | Worker | queue | Whether executions should run directly or using queue |
| `N8N_WEBHOOK_URL` | Worker | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `DB_POSTGRESDB_HOST` | Worker | - | Database host |
| `DB_POSTGRESDB_PORT` | Worker | - | Database port |
| `DB_POSTGRESDB_USER` | Worker | (secret) | Database user |
| `N8N_ENCRYPTION_KEY` | Worker | - | Generates a secure random 32-character string |
| `N8N_LISTEN_ADDRESS` | Worker | :: | The IP address n8n should listen on |
| `QUEUE_BULL_REDIS_HOST` | Worker | - | Redis host |
| `QUEUE_BULL_REDIS_PORT` | Worker | - | Redis port |
| `DB_POSTGRESDB_DATABASE` | Worker | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | Database password |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | Redis user |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | Enable dual-stack support (IPv4 and IPv6) on Redis connections |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Enable alpine private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | Run manual executions from the editor on workers instead of the main instance. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | Require strict file permissions (0600) on n8n's settings file. |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n worker`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-workers-queue-mode)
