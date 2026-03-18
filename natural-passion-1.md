# Deploy natural-passion on Railway

Deploy and Host natural-passion with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/natural-passion-1)

## About

natural-passion is an automation stack that uses the Evolution API for WhatsApp, n8n for workflows, and PostgreSQL for your database. This template allows for a professional, one-click deployment for students and developers in th world.

This project hosts three essential services. The Evolution API serves as the messaging gateway, n8n acts as the logic engine, and PostgreSQL ensures all data is stored securely. They are connected via Railway's internal private network for maximum security and speed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:2.8.4` | Web service |
| evolution-api | `evoapicloud/evolution-api:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | n8n | 5678 |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PROXY_HOPS` | n8n | 1 |
| `GENERIC_TIMEZONE` | n8n | Asia/Baghdad |
| `DB_POSTGRESDB_PORT` | n8n | 5432 |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `DB_POSTGRESDB_DATABASE` | n8n | railway |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false |
| `N8N_HIRING_BANNER_ENABLED` | n8n | false |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | n8n | true |
| `PORT` | evolution-api | 8080 |
| `DATABASE_ENABLED` | evolution-api | true |
| `DATABASE_PROVIDER` | evolution-api | postgresql |
| `CACHE_REDIS_ENABLED` | evolution-api | false |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/natural-passion-1)
