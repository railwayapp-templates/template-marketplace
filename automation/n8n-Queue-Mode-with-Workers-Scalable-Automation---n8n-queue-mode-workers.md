# Deploy n8n Queue Mode with Workers — Scalable Automation on Railway

Production n8n with workers, webhooks & Redis queue. Scales horizontally.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue-mode-workers)

## About

![n8n workflow builder](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

n8n is the world's most popular open-source workflow automation platform — **188k+ GitHub stars**,
500+ integrations, and unlimited executions when self-hosted. This template deploys a
**production-grade, queue mode architecture**: a dedicated main instance for the UI, a separate
worker for parallel execution, a webhook processor for high-concurrency triggers, PostgreSQL for
persistence, and Redis as the job broker — all pre-configured and ready to scale from day one.

Unlike basic n8n templates that deploy a single container, this setup separates concerns so your
editor never slows down during heavy workflow execution, workers scale horizontally with a single
click, and webhooks are never blocked by running jobs.

---

A single-container n8n deployment hits a hard ceiling: the editor UI slows down during heavy
executions, webhooks queue behind running jobs, and there is no path to horizontal scaling without
restructuring the entire setup. Queue mode solves this by splitting n8n into independent layers —
but configuring it manually requires coordinating five services, shared encryption keys, Redis
queue settings, and private networking across containers.

This template handles all of it at deploy time. Every service shares the same `N8N_ENCRYPTION_KEY`
via Railway reference variables. Workers connect to the same PostgreSQL and Redis instances
automatically. The webhook processor handles incoming triggers independently so high-frequency
webhook workflows never block scheduled or manual executions.

Typical cost: **~$10–20/month** on Railway's Hobby plan for the full five-service stack. n8n
Cloud's equivalent scalable tier starts at $50/month with execution caps — self-hosting removes
the cap entirely.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| main | `n8nio/n8n:2.20.9` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| worker | `n8nio/n8n:2.20.9` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | main | 5678 | Port on which the n8n service listens (typically 5678). |
| `DB_TYPE` | main | postgresdb | - |
| `N8N_PORT` | main | 5678 | - |
| `NODE_OPTIONS` | main | --max_old_space_size=8192 | - |
| `EXECUTIONS_MODE` | main | queue | - |
| `DB_POSTGRESDB_USER` | main | (secret) | - |
| `N8N_ENCRYPTION_KEY` | main | {{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }} | - |
| `N8N_LISTEN_ADDRESS` | main | :: | - |
| `N8N_RUNNERS_ENABLED` | main | true | - |
| `EXECUTIONS_DATA_PRUNE` | main | true | - |
| `DB_POSTGRESDB_PASSWORD` | main | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | main | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | main | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | main | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | main | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | main | 100 | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | main | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | main | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | main | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | worker | 5678 | Port on which the n8n service listens (typically 5678). |
| `DB_TYPE` | worker | postgresdb | Specifies the type of database used by n8n — here it’s postgresdb. |
| `WEBHOOK_URL` | worker | - | Public URL endpoint for receiving external webhook triggers through Railway’s public domain. |
| `NODE_OPTIONS` | worker | --max_old_space_size=8192 | Configures Node.js memory usage. |
| `EXECUTIONS_MODE` | worker | queue | Determines how workflows are processed. queue enables distributed execution using Redis. |
| `DB_POSTGRESDB_HOST` | worker | - | Host address of the PostgreSQL database connected to n8n. |
| `DB_POSTGRESDB_PORT` | worker | - | Port number where PostgreSQL is running — usually 5432. |
| `DB_POSTGRESDB_USER` | worker | (secret) | Username used by n8n to authenticate with PostgreSQL. |
| `N8N_ENCRYPTION_KEY` | worker | - | Secret key used to encrypt sensitive credentials stored in the n8n database. |
| `N8N_LISTEN_ADDRESS` | worker | :: | Defines which network interfaces n8n binds to — :: allows both IPv4 and IPv6. |
| `N8N_RUNNERS_ENABLED` | worker | true | Enables “Runners,” allowing distributed workflow execution across multiple worker nodes. |
| `QUEUE_BULL_REDIS_HOST` | worker | - | Redis host address used by n8n for managing job queues in queue mode. |
| `QUEUE_BULL_REDIS_PORT` | worker | - | Redis port number — typically 6379. |
| `DB_POSTGRESDB_DATABASE` | worker | - | The name of the PostgreSQL database that stores n8n’s workflow and execution data. |
| `DB_POSTGRESDB_PASSWORD` | worker | (secret) | Password for authenticating the PostgreSQL connection. |
| `QUEUE_BULL_REDIS_PASSWORD` | worker | (secret) | Password used to connect securely to Redis. |
| `QUEUE_BULL_REDIS_USERNAME` | worker | (secret) | Username used for authenticating Redis connections (if required). |
| `QUEUE_BULL_REDIS_DUALSTACK` | worker | true | Enables dual IPv4 and IPv6 support for Redis connections. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | worker | true | Enables private networking between services on Railway’s infrastructure for secure internal communication. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | worker | true | Runs manual (UI-triggered) executions on worker nodes instead of the main instance to improve performance. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | worker | true | Ensures configuration files have strict permissions for improved security in production environments. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-queue-mode-workers)
