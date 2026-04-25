# Deploy n8n on Railway

n8n [May '26] (Workflows/Integrations/API Automation/AI Coding) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n)

## About

n8n.io is an open-source workflow automation tool available on n8n GitHub, making it easy to connect apps, APIs, and even coding AI into powerful automations. With a simple setup and options like n8n download, you can design complex n8n workflows without heavy coding. Built for developers and teams, n8n gives you full control and flexibility.

The core platform is free under a fair-code n8n license, giving you the flexibility to build without vendor lock-in. Hosting n8n on Railway makes it simple to deploy and run your own instance in minutes, so you get the full power of automation with complete control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | [Shinyduo/n8n-railway-updated](https://github.com/Shinyduo/n8n-railway-updated) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | n8n | 5678 |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PROXY_HOPS` | n8n | 1 |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `EXECUTIONS_DATA_PRUNE` | n8n | true |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `N8N_EXPRESS_TRUST_PROXY` | n8n | true |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | filesystem |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 200 |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n)
