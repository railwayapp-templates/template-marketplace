# Deploy n8n-workers-template on Railway

n8n queue mode: Primary+Worker+Redis+Postgres. No API keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-workers-template)

## About

Advanced [n8n](https://n8n.io/) on Railway in **queue mode**: Primary (editor + webhooks) + Worker + Redis + Postgres. This is the scalable stack on [c17.io/stacks/n8n-workers](https://c17.io/stacks/n8n-workers).

For personal / light use, prefer the simpler two-service template: [9o4t/n8n](https://github.com/9o4t/n8n) → [c17.io/stacks/n8n-automation](https://c17.io/stacks/n8n-automation).

No LLM or SaaS API keys are required to boot. Railway injects `PORT`. The template generates `N8N_ENCRYPTION_KEY` (shared by Primary and Worker) and wires `WEBHOOK_URL` to the public domain.

> **Cost note:** four services (Primary, Worker, Redis, Postgres) cost more than the simple n8n + Postgres stack. Use this when concurrent workflows or heavy jobs would slow the editor.

Queue mode separates the UI from execution:

```text
Browser / Webhooks → Primary (n8n start)
                         ↓
                      Redis (Bull queue)
                         ↓
                      Worker (n8n worker)
                         ↓
                      Postgres
```

| Service | Source | Public | Notes |
|---|---|---|---|
| `Primary` | Docker image `n8nio/n8n` | Yes | `n8n start`. Health `GET /healthz`. Volume `/home/node/.n8n`. |
| `Worker` | Docker image `n8nio/n8n` | No | `n8n worker`. Shares DB, Redis, and encryption key. |
| `Redis` | `redis:7-alpine` (or Railway Redis) | No | Bull queue broker. |
| `Postgres` | `postgres:16` | No | Workflows, credentials, execution history. |

Both Primary and Worker need `EXECUTIONS_MODE=queue` and the **same** `N8N_ENCRYPTION_KEY`. Losing the key makes stored credentials unreadable.

The first account you create in the editor is the owner. There is no default username or password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `n8nio/n8n` | Worker |
| Postgres | `postgres:16` | Database |
| Redis | `redis:7-alpine` | Database |
| Primary | [9o4t/n8n-workers](https://github.com/9o4t/n8n-workers) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_POSTGRESDB_USER` | Worker | (secret) |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `DB_POSTGRESDB_USER` | Primary | (secret) |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) |

## Configuration

- **Start command:** `n8n worker`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir ${RAILWAY_VOLUME_MOUNT_PATH:-/data}`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/n8n-workers-template)
