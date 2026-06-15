# Deploy Evolution API with n8n on Railway

[Jun'26] WhatsApp automation platform using Evolution API, n8n & PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-with-n8n)

## About

Evolution API With n8n is a ready-to-use Railway template for running a WhatsApp HTTP REST API backend with n8n automation. It combines Evolution API, n8n, PostgreSQL for Evolution API, and persistent volume storage so you can deploy a simple WhatsApp automation stack without manually wiring each service from scratch.

Hosting Evolution API With n8n on Railway gives you a fast way to run Evolution API together with n8n. Evolution API provides the WhatsApp HTTP REST API layer, while n8n gives you a visual workflow automation builder for connecting webhooks, APIs, apps, and custom automation logic.

PostgreSQL is used by Evolution API to store application data such as instances, messages, contacts, and session-related records. n8n uses its default SQLite storage with a persistent volume, keeping the stack lighter while still preserving workflows, credentials, and local n8n data across redeployments.

Railway handles the infrastructure layer, including service deployment, private networking, public domains, environment variables, PostgreSQL, and persistent storage.

This template is designed for users who want a simple WhatsApp automation stack that is easy to deploy, test, and extend. Once deployed, you can open the Evolution API Manager, connect a WhatsApp instance using the Baileys channel, open n8n, import the starter workflow, and send a WhatsApp message through Evolution API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evolution-api | `evoapicloud/evolution-api:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | `n8nio/n8n:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | evolution-api | 8080 | - |
| `N8N_ENABLED` | evolution-api | true | - |
| `DATABASE_PROVIDER` | evolution-api | postgresql | - |
| `CACHE_REDIS_ENABLED` | evolution-api | false | - |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | n8n | Asia/Jakarta | - |
| `PORT` | n8n | 5678 | - |
| `N8N_PORT` | n8n | 5678 | - |
| `N8N_PROTOCOL` | n8n | https | - |
| `N8N_LOG_LEVEL` | n8n | info | - |
| `N8N_LOG_OUTPUT` | n8n | console | - |
| `N8N_PROXY_HOPS` | n8n | 1 | - |
| `EXECUTIONS_MODE` | n8n | regular | - |
| `GENERIC_TIMEZONE` | n8n | Asia/Jakarta | - |
| `N8N_RUNNERS_MODE` | n8n | internal | - |
| `EVOLUTION_API_KEY` | n8n | (secret) | - |
| `N8N_SECURE_COOKIE` | n8n | true | - |
| `N8N_RUNNERS_ENABLED` | n8n | true | - |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 336 | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | - |
| `N8N_HIRING_BANNER_ENABLED` | n8n | false | - |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | n8n | all | - |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | n8n | true | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 10000 | - |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | n8n | none | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | - |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | n8n | true | - |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | n8n | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-api-with-n8n)
