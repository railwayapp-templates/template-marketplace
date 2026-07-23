# Deploy n8n + Postgres — Durable Workflow Automation on Railway

Single-instance n8n with Postgres — cheap, and survives redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-postgres-durable)

## About

n8n is a fair-code workflow automation platform — a self-hostable alternative to Zapier and Make that connects 400+ apps, APIs, and databases through a visual node editor, with full code escape hatches when drag-and-drop isn't enough. This template deploys a lean, durable setup: a single n8n instance backed by PostgreSQL, so your workflows and credentials survive every redeploy without the cost and complexity of a full multi-worker cluster.

![n8n workflow builder](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

---

The default n8n runs on SQLite, and on a container platform that is a trap: SQLite lives on the local filesystem, so a redeploy can wipe your execution history, and it locks up under concurrent writes. The fix is PostgreSQL. This template wires it in from the start, so workflows, credentials, and history persist properly.

There is one variable that matters more than any other: **`N8N_ENCRYPTION_KEY`**. n8n encrypts every stored credential with it. Generate it once, keep it stable, and back it up somewhere safe — because if it changes or is lost, every credential in your instance becomes permanently unreadable and you re-enter them all by hand. This template sets a persistent key and stores it on the volume so a redeploy doesn't regenerate it, which is the single most common way self-hosted n8n users lose access to their work.

This is a single-instance deployment by design. It runs one n8n process that serves the editor, the API, and webhooks together — ideal for personal automation and small-team workflows, and the cheapest durable way to run n8n. When you outgrow it and need to process high volumes in parallel, n8n's queue mode with dedicated workers and Redis is the next step, and this instance's data migrates to it cleanly.

Typical cost: **~$5–10/month** on Railway's Hobby plan for n8n and Postgres — versus n8n Cloud's paid plans that meter executions. Self-hosting removes per-execution caps entirely; you pay only for the compute you use.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| N8n Self Deploy | [sahilrupani/n8n-railway](https://github.com/sahilrupani/n8n-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | N8n Self Deploy | 5678 | n8n runs internally on port 5678 |
| `DB_TYPE` | N8n Self Deploy | postgresdb | - |
| `WEBHOOK_URL` | N8n Self Deploy | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `N8N_PROXY_HOPS` | N8n Self Deploy | 1 | n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443 |
| `DB_POSTGRESDB_PORT` | N8n Self Deploy | 5432 | - |
| `DB_POSTGRESDB_USER` | N8n Self Deploy | (secret) | - |
| `EXECUTIONS_DATA_PRUNE` | N8n Self Deploy | true | EXECUTIONS_DATA_PRUNE in n8n is an environment variable that enables automatic deletion of old workflow execution logs |
| `DB_POSTGRESDB_PASSWORD` | N8n Self Deploy | (secret) | - |
| `N8N_EXPRESS_TRUST_PROXY` | N8n Self Deploy | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | N8n Self Deploy | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | N8n Self Deploy | 200 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | N8n Self Deploy | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-postgres-durable)
