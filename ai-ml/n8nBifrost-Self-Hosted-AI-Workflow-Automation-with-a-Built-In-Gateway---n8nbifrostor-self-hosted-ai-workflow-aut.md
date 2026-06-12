# Deploy n8n+Bifrost| Self Hosted AI Workflow Automation with a Built In Gateway on Railway

n8n + Bifrost| Self Hosted AI Workflow Automation with a Built In Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8nbifrostor-self-hosted-ai-workflow-aut)

## About

When you build automations that call AI, the model keys usually end up pasted into node after node, with no failover, no shared budget, and no single place to see what the AI is costing you. This template fixes that. n8n gives you the visual automation builder, and Bifrost sits underneath as the gateway every AI step routes through, so one connection reaches OpenAI, Anthropic, Google, and more, with provider failover and request logging built in.

The stack runs three services: n8n as the automation builder, Bifrost as the AI gateway, and Postgres shared between them for storage. After deploy, add a provider key in Bifrost, then in n8n create an OpenAI credential with the base URL pointed at Bifrost over the private network. Use the AI Agent node for model steps. Every AI call then flows through Bifrost with failover and full logging.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | `n8nio/n8n` | Web service |
| Bifrost | `maximhq/bifrost:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | app |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PORT` | n8n | 5678 |
| `N8N_PROTOCOL` | n8n | https |
| `N8N_PROXY_HOPS` | n8n | 1 |
| `DB_POSTGRESDB_PORT` | n8n | 5432 |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `N8N_ENCRYPTION_KEY` | n8n | xrjy2xr8h6b9bjm9p5kjtgi4dyswbmb0 |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_LEVEL` | Bifrost | info |
| `LOG_STYLE` | Bifrost | json |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Healthcheck:** `/health`
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/n8nbifrostor-self-hosted-ai-workflow-aut)
