# Deploy N8N (w/ task runners) on Railway

n8n with external task runners for isolated and reliable code execution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-with-task-runners)

## About

n8n is a powerful workflow automation platform for connecting APIs, applications, databases, AI models, and business processes. This template pairs n8n with PostgreSQL and dedicated external Task Runners, providing a cleaner architecture for executing Code node tasks separately from the main n8n process.

![N8N](https://imgur.com/ypXsnwZ.png)

This template deploys a self-hosted n8n stack with **PostgreSQL** for persistent application data and dedicated **n8n Task Runners** for isolated task execution.

The Main service hosts the n8n editor, APIs, webhooks, scheduling, and workflow orchestration. PostgreSQL stores workflows, credentials, execution history, and other persistent n8n data. The separate Task Runners service connects to n8n's task broker and executes supported Code node tasks outside the main n8n process.

Unlike n8n Queue Mode deployments, this template does **not require Redis or separate workflow workers**, keeping the infrastructure smaller while still providing dedicated task execution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Main | `n8nio/n8n:latest` | Web service |
| Runners | `n8nio/runners` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
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
| `N8N_RUNNERS_AUTH_TOKEN` | Runners | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-with-task-runners)
