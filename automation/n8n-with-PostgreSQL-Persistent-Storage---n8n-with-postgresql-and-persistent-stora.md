# Deploy n8n with PostgreSQL & Persistent Storage on Railway

Production-ready n8n instance with PostgreSQL and persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-with-postgresql-and-persistent-stora)

## About

A production-ready template to deploy and self-host n8n workflow automation paired with a dedicated PostgreSQL database and persistent volume storage. Easily automate tasks, connect webhooks, and integrate AI workflows without data loss.

This template provides a robust, self-hosted n8n environment on Railway. Unlike default SQLite setups, this deployment links directly to a managed PostgreSQL database, offering high performance and scalability for complex workflows. It includes pre-configured persistent volumes for both n8n data and PostgreSQL storage, ensuring your credentials, custom modules, and workflow history remain safe across restarts and deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8nio/n8n:latest | `n8nio/n8n:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DB_TYPE` | n8nio/n8n:latest | postgresdb | Database type |
| `N8N_PORT` | n8nio/n8n:latest | 5678 | Default internal port (5678) |
| `WEBHOOK_URL` | n8nio/n8n:latest | - | Public webhook URL |
| `DB_POSTGRESDB_HOST` | n8nio/n8n:latest | - | PostgreSQL host address |
| `DB_POSTGRESDB_PORT` | n8nio/n8n:latest | 5432 | PostgreSQL port (5432) |
| `DB_POSTGRESDB_USER` | n8nio/n8n:latest | (secret) | PostgreSQL database user |
| `DB_POSTGRESDB_DATABASE` | n8nio/n8n:latest | - | PostgreSQL database name |
| `DB_POSTGRESDB_PASSWORD` | n8nio/n8n:latest | (secret) | PostgreSQL database password |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8nio/n8n:latest | true | Enforce secure file permissions |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-with-postgresql-and-persistent-stora)
