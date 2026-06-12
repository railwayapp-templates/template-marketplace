# Deploy n8n — Self-Hosted Workflow Automation on Railway

Self-host n8n: unlimited executions, no Zapier fees. 188k+ GitHub stars.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-latest)

## About

![n8n workflow builder interface](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot-readme.png)

n8n is the world's most popular open-source workflow automation platform — **188k+ GitHub
stars**, 100M+ Docker pulls, 500+ integrations, and a fair-code license that gives you
unlimited executions when you self-host. Connect APIs, databases, AI agents, and business
tools using a visual workflow builder with the flexibility to write code when you need it.
No per-step billing. No execution caps. No vendor lock-in.

---

Running n8n in production means keeping a long-lived application server alive with
persistent database connectivity, webhook-accessible public networking, secrets management
for API credentials, and a controlled upgrade path to avoid workflow downtime.

Railway handles all of it. This template provisions n8n connected to a managed PostgreSQL
instance, exposes a secure HTTPS endpoint for webhooks, and manages container lifecycle,
restarts, and scaling automatically. Your workflows, credentials, and execution history
survive every redeploy.

Typical cost: **~$5/month** on Railway's Hobby plan — versus $20/month on n8n Cloud Starter
with a 2,500 execution cap, or $50/month on Pro with 10,000 executions. Self-hosting on
Railway gives you **unlimited executions** at a fraction of the cloud price.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| n8n-railway | [sahilrupani/n8n-railway](https://github.com/sahilrupani/n8n-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_POSTGRESDB_USER` | n8n-railway | (secret) | - |
| `DB_POSTGRESDB_PASSWORD` | n8n-railway | (secret) | - |
| `N8N_EXPRESS_TRUST_PROXY` | n8n-railway | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-railway | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n-railway | 200 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-railway | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-latest)
