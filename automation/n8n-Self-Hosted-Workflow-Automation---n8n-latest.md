# Deploy n8n — Self-Hosted Workflow Automation on Railway

Self-host n8n: unlimited executions, no Zapier fees. 188k+ GitHub stars.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-latest)

## About

![n8n workflow builder interface](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot-readme.png)

n8n is the world's most popular open-source workflow automation platform — **180k+ GitHub
stars**, 100M+ Docker pulls, 400+ integrations, and a fair-code license that gives you
unlimited executions when you self-host. The 2.x line adds the spatial Canvas UI, autosave with
versioned publishing, and a rebuilt AI Agent node with native tool-calling across Claude,
GPT-4o, Gemini, and Groq. Connect APIs, databases, AI agents, and business tools with a visual
builder — and drop into code whenever you need it. No per-step billing. No execution caps.

---

Running n8n in production means keeping a long-lived application server alive with
persistent database connectivity, webhook-accessible public networking, secrets management
for API credentials, and a controlled upgrade path. n8n ships new releases most weeks, so a
clean self-hosted setup with persistent data and easy version control matters.

Railway handles all of it. This template provisions n8n connected to a managed PostgreSQL
instance, exposes a secure HTTPS endpoint for webhooks, and manages container lifecycle,
restarts, and scaling automatically. Your workflows, credentials, and execution history
survive every redeploy.

Typical cost: **~$5/month** on Railway's Hobby plan — versus $20/month on n8n Cloud Starter
with a capped execution allowance, or more on Pro. Self-hosting on Railway gives you
**unlimited executions** at a fraction of the cloud price, with your data on your own infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| N8n Latest Version  | [sahilrupani/n8n-railway](https://github.com/sahilrupani/n8n-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | N8n Latest Version  | 5678 | - |
| `DB_TYPE` | N8n Latest Version  | postgresdb | - |
| `N8N_PROXY_HOPS` | N8n Latest Version  | 1 | - |
| `DB_POSTGRESDB_USER` | N8n Latest Version  | (secret) | - |
| `EXECUTIONS_DATA_PRUNE` | N8n Latest Version  | true | - |
| `DB_POSTGRESDB_PASSWORD` | N8n Latest Version  | (secret) | - |
| `N8N_EXPRESS_TRUST_PROXY` | N8n Latest Version  | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | N8n Latest Version  | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | N8n Latest Version  | 200 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | N8n Latest Version  | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-latest)
