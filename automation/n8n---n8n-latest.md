# Deploy n8n on Railway

Deploy and Host n8n-latest with Railway [Updated Apr'26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-latest)

## About

n8n-latest is a self-hosted, open-source workflow automation tool that lets you connect APIs, services, and databases to automate tasks without heavy coding. This Railway template provides the most recent stable n8n build, pre-configured for seamless deployment so you can launch scalable automation workflows in minutes.

Hosting n8n-latest on Railway allows you to run powerful workflow automation in a secure, production-ready environment without worrying about manual server management. With this template, you can deploy the latest n8n version directly from GitHub, configure environment variables, and integrate databases or external services—all in just a few clicks. Railway handles scaling, networking, and persistent storage so you can focus on building automations instead of infrastructure.

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
