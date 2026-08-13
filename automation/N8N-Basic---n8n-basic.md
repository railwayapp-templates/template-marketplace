# Deploy N8N Basic on Railway

A minimal n8n setup to save on costs, build workflows, and automate tasks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-basic)

## About

n8n is a fair-code workflow automation platform for connecting APIs, apps, databases, AI models, and business processes through a visual workflow builder. It combines low-code automation with custom JavaScript, API integrations, webhooks, and AI capabilities while remaining fully self-hostable.

![n8n](https://imgur.com/zX4KERj.png)

This template provides a **minimal and cost-efficient n8n deployment** using a single n8n application service backed by PostgreSQL.

It is designed for users who want the simplicity of a basic deployment without the additional infrastructure required for queue mode, Redis, dedicated workers, or external Task Runners.

PostgreSQL stores persistent application data such as workflows, credentials, execution history, users, and configuration. n8n officially supports PostgreSQL as an alternative to its default SQLite database.

The result is a lightweight architecture suitable for personal automation, small projects, prototypes, and moderate workflow workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Main | `n8nio/n8n:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Main | 5678 | - |
| `DB_TYPE` | Main | postgresdb | - |
| `NODE_OPTIONS` | Main | --max_old_space_size=8192 | - |
| `N8N_RUNNERS_MODE` | Main | external | - |
| `DB_POSTGRESDB_USER` | Main | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Main | :: | - |
| `N8N_RUNNERS_ENABLED` | Main | true | - |
| `DB_POSTGRESDB_PASSWORD` | Main | (secret) | - |
| `N8N_RUNNERS_AUTH_TOKEN` | Main | (secret) | - |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | Main | 0.0.0.0 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Main | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-basic)
