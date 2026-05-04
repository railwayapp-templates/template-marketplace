# Deploy n8n | Open-Source Workflow Automation on Railway

Self-Host n8n : Zapier & Make Alternative, 400+ Integrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-self-hosted)

## About

n8n is an open-source workflow automation platform that connects 400+ apps, APIs, and AI models through a visual drag-and-drop editor. Think Zapier, but you own the server. Build anything from a simple "new lead → Slack notification" zap to a multi-step AI agent that researches, writes, and publishes - with no per-workflow limits and no vendor lock-in.

Here's the math that makes self-hosting obvious: n8n Cloud charges $24/month for 2,500 executions. A busy team burns through that in a week. Self-hosting on Railway? ~$5-10/month with unlimited executions. That's a ~$240/year saving at minimum. This template deploys n8n with a managed PostgreSQL database, auto-generated encryption keys, and a public HTTPS domain - all pre-wired. Railway handles SSL, networking, and container restarts so you don't touch infrastructure. Your workflows, credentials, and execution data stay on your own instance. No third-party analytics. No usage caps. And because it's Railway, you can scale up with a slider if your automations get heavy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | [shruti060701/n8n-railway](https://github.com/shruti060701/n8n-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `NODE_ENV` | n8n | production | - |
| `N8N_PROTOCOL` | n8n | https | - |
| `GENERIC_TIMEZONE` | n8n | Asia/Kolkata | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-self-hosted)
