# Deploy open-webui-mcpo-n8n on Railway

Deploy and Host Open Webui with n8n using MCP for full stack AI Automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/open-webui-mcpo-n8n)

## About

A complete chat interface solution that seamlessly integrates Open WebUI with n8n automation workflows through Model Context Protocol (MCP), enabling AI-powered conversations with access to your entire automation ecosystem and external data sources.

Deploying this template sets up a fully configured chat interface that communicates with n8n workflows through MCP. 

The setup includes container orchestration for both Open WebUI and the MCP bridge, automatic SSL configuration, and environment variable management. 

Railway handles the infrastructure complexity while you focus on building powerful AI-driven automations that can interact with databases, APIs, and external services through your n8n instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcpo-openwebui | [bytechie/mcpo-openwebui](https://github.com/bytechie/mcpo-openwebui) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| open-webui | [bytechie/open-webui](https://github.com/bytechie/open-webui) | Web service |
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | n8n | 5678 |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PORT` | n8n | 5678 |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Svelte, TypeScript, CSS, Shell, HTML, Batchfile, Mako, Makefile

[View on Railway →](https://railway.com/template/open-webui-mcpo-n8n)
