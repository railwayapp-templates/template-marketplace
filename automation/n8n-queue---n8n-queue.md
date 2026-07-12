# Deploy n8n-queue on Railway

n8n in production queue mode: scaled workers, webhook processor, pgvector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue?utm_medium=integration&utm_source=button&utm_campaign=n8n-queue)

[n8n](https://n8n.io/) is the workflow automation platform: connect 400+ services, build AI agents with built-in LangChain nodes, and automate anything from webhooks to scheduled jobs. This template runs it in **queue mode** — n8n's production architecture — instead of the single-process setup most templates ship.

Five Railway services: the main instance (editor UI, queue producer), horizontally scalable workers (executions), a dedicated webhook processor (production webhooks keep flowing while you redeploy the editor), PostgreSQL 16 with **pgvector pre-enabled** (n8n's AI nodes get a vector store for free), and Redis as the Bull queue. The queue connection sets `QUEUE_BULL_REDIS_DUALSTACK=true` — BullMQ's ioredis defaults to IPv4 while Railway's private DNS is IPv6-only, which is the single most common way self-assembled n8n queue setups break here. Redis runs append-only on a volume so queued executions survive restarts. Scale throughput by increasing worker replicas — no other changes needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| main | [nomideusz/n8n-queue-railway](https://github.com/nomideusz/n8n-queue-railway) (root: /main) | Web service |
| redis | [nomideusz/n8n-queue-railway](https://github.com/nomideusz/n8n-queue-railway) (root: /redis) | Database |
| postgres | [nomideusz/n8n-queue-railway](https://github.com/nomideusz/n8n-queue-railway) (root: /postgres) | Database |
| worker | [nomideusz/n8n-queue-railway](https://github.com/nomideusz/n8n-queue-railway) (root: /worker) | Worker |
| webhook | [nomideusz/n8n-queue-railway](https://github.com/nomideusz/n8n-queue-railway) (root: /webhook) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | main | 5678 | n8n's listen port. Must stay 5678 — Railway would otherwise inject 8080 and break routing. |
| `N8N_HOST` | main | - | Public hostname of this n8n instance. Wired automatically — don't change. |
| `WEBHOOK_URL` | main | - | Public URL used for production webhooks — points at the dedicated webhook service so webhooks survive editor redeploys. |
| `DB_POSTGRESDB_HOST` | main | - | Postgres private hostname. Wired automatically — don't change. |
| `N8N_ENCRYPTION_KEY` | main | - | Encrypts credentials stored by n8n. Must be identical on every n8n service; losing it orphans saved credentials. |
| `N8N_EDITOR_BASE_URL` | main | - | Public URL of the n8n editor. Wired automatically — don't change. |
| `QUEUE_BULL_REDIS_HOST` | main | - | Redis private hostname for the Bull queue. Wired automatically — don't change. |
| `DB_POSTGRESDB_PASSWORD` | main | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `QUEUE_BULL_REDIS_PASSWORD` | main | (secret) | Redis password for the Bull queue. Wired automatically — don't change. |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. |
| `PORT` | worker | 5678 | Health-endpoint port for Railway's healthcheck. Must stay 5678. |
| `DB_POSTGRESDB_HOST` | worker | - | Postgres private hostname. Wired automatically — don't change. |
| `N8N_ENCRYPTION_KEY` | worker | - | Encrypts credentials stored by n8n. Must be identical on every n8n service; losing it orphans saved credentials. |
| `QUEUE_BULL_REDIS_HOST` | worker | - | Redis private hostname for the Bull queue. Wired automatically — don't change. |
| `DB_POSTGRESDB_PASSWORD` | worker | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `QUEUE_BULL_REDIS_PASSWORD` | worker | (secret) | Redis password for the Bull queue. Wired automatically — don't change. |
| `PORT` | webhook | 5678 | n8n's listen port. Must stay 5678. |
| `WEBHOOK_URL` | webhook | - | This service's own public URL. Wired automatically — don't change. |
| `DB_POSTGRESDB_HOST` | webhook | - | Postgres private hostname. Wired automatically — don't change. |
| `N8N_ENCRYPTION_KEY` | webhook | - | Encrypts credentials stored by n8n. Must be identical on every n8n service; losing it orphans saved credentials. |
| `QUEUE_BULL_REDIS_HOST` | webhook | - | Redis private hostname for the Bull queue. Wired automatically — don't change. |
| `DB_POSTGRESDB_PASSWORD` | webhook | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `QUEUE_BULL_REDIS_PASSWORD` | webhook | (secret) | Redis password for the Bull queue. Wired automatically — don't change. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/n8n-queue)
