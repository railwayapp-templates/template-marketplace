# Deploy n8n-self-hosted on Railway

Deploy and Host n8n-self-hosted with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-self-hosted)

## About

n8n is an open-source workflow automation platform that lets you connect 400+ apps, APIs, and AI models with a visual drag-and-drop editor. Build everything from simple Zapier-style automations to complex AI agent workflows - self-hosted with full data ownership, no per-workflow limits, and zero vendor lock-in.

Self-hosting n8n gives you complete control over your automation infrastructure - your workflows, credentials, and execution data stay on your own servers. This Railway template deploys n8n with a managed PostgreSQL database, pre-configured with secure environment variables, persistent storage, and a public HTTPS domain. Railway handles networking, SSL certificates, and container orchestration so you can focus on building workflows. Unlike n8n Cloud ($24/month for 2,500 executions), self-hosting on Railway costs ~$5-10/month with unlimited executions - making it ideal for teams running high-volume automations.

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
