# Deploy N8N using PostgreSQL on Railway

n8n with PostgreSQL, auto-updates, and Community Nodes tool usage support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vFXgsT)

## About

Easily set up n8n with PostgreSQL for workflow storage. This template keeps your workflows safe, always runs the latest n8n version, and allows Community Nodes like n8n_MCP to be used as tools. No complicated setup — just deploy and start automating!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `N8N_RUNNERS_ENABLED` | n8n | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | n8n | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vFXgsT)
