# Deploy n8n with Postgres on Railway

n8n 2.32.5 with Postgres 17 on a volume: workflows and credentials persist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-with-postgres-1)

## About

n8n is the open-source workflow automation platform — 400+ integrations, a visual node editor, and native AI agent nodes, all self-hosted with no per-execution fees. This template deploys n8n **2.32.5** backed by a dedicated PostgreSQL 17 database on a persistent volume, so your workflows, credentials, and execution history survive every redeploy.

The common way to self-host n8n is a single container writing to SQLite on ephemeral disk. That works right up until the first redeploy, when every workflow and saved credential disappears. This template runs n8n against its own PostgreSQL 17 service over Railway's private network, with the database on a mounted volume — the arrangement n8n itself recommends for production.

`N8N_ENCRYPTION_KEY` is generated once at deploy and held constant. That key is what n8n uses to encrypt stored credentials; if it changes, every saved credential becomes unreadable, which is the usual reason a "working" self-hosted n8n breaks after a restart. Binary data is written to Postgres rather than to container-local disk, so file-producing workflows behave correctly across restarts and replicas. The webhook and editor base URLs are wired to the Railway public domain automatically, so webhook-triggered workflows and OAuth callbacks resolve on the first try instead of pointing at `localhost`. Task runners are enabled, which is how current n8n versions isolate Code-node execution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:2.32.5` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-with-postgres-1)
