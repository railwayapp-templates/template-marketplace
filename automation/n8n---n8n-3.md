# Deploy n8n on Railway

Workflow automation with queue mode: n8n main + worker, Postgres, Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-3)

## About

n8n is an extendable, fair-code workflow automation tool that lets you connect any app with an API to any other app and manipulate its data with little or no code. Its visual, node-based editor makes it highly versatile, while self-hosting keeps your workflows and credentials private and under your control.

Hosting n8n means running its Node.js application server, persisting workflows and credentials in a database, and serving the visual editor plus webhook endpoints over HTTPS. A production deployment goes further: n8n's queue mode separates the main process (editor, API, webhook intake, scheduling) from one or more worker processes that execute workflows, using Redis as the job broker and PostgreSQL as the shared system of record. On Railway, this maps cleanly onto four services — n8n main, n8n worker, Postgres, and Redis — connected over the private network, with a persistent volume for n8n's data directory and a single public domain for the editor and webhooks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n-worker | `n8nio/n8n:2.31.6` | Worker |
| n8n | `n8nio/n8n:2.31.6` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Postgres | 6379 |
| `REDISUSER` | Postgres | default |
| `REDISPASSWORD` | Postgres | (secret) |
| `REDIS_PASSWORD` | Postgres | (secret) |
| `DB_TYPE` | n8n-worker | postgresdb |
| `EXECUTIONS_MODE` | n8n-worker | queue |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-worker | false |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n-worker | true |
| `PORT` | n8n | 5678 |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PROTOCOL` | n8n | https |
| `N8N_PROXY_HOPS` | n8n | 1 |
| `EXECUTIONS_MODE` | n8n | queue |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec n8n worker"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-3)
