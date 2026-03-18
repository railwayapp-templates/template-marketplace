# Deploy Flowise & n8n AI Automation on Railway

AI agent orchestration with Flowise and workflow automation using n8n

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/flowise-and-n8n-ai-automation)

## About

Flowise & n8n AI Automation is a self-hosted automation stack that combines AI
agent orchestration with workflow automation. Flowise manages LLM and
multi-agent flows, while n8n handles triggers, webhooks, and integrations to
build scalable, AI-powered automation pipelines.

Hosting Flowise & n8n AI Automation involves deploying two complementary
services connected through a shared database and private network. Flowise
provides a visual interface for building AI agent workflows and LLM chains,
while n8n is responsible for workflow execution, event handling, and system
integrations. A production-ready setup requires persistent storage, reliable
database connectivity, secure environment variables, and proper networking
between services. Railway simplifies this by managing infrastructure,
networking, and scaling, allowing you to focus on building AI-driven
automations instead of maintaining servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| flowiseai/flowise | `flowiseai/flowise` | Web service |
| n8nio/n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `LOG_PATH` | flowiseai/flowise | /opt/flowise/.flowise/logs | - |
| `APIKEY_PATH` | flowiseai/flowise | /opt/flowise/.flowise | - |
| `DATABASE_PATH` | flowiseai/flowise | /opt/flowise/.flowise | - |
| `DATABASE_USER` | flowiseai/flowise | (secret) | - |
| `SECRETKEY_PATH` | flowiseai/flowise | (secret) | - |
| `DATABASE_PASSWORD` | flowiseai/flowise | (secret) | - |
| `OVERRIDE_DATABASE` | flowiseai/flowise | false | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | flowiseai/flowise | true | - |
| `PORT` | n8nio/n8n | 5678 | - |
| `DB_TYPE` | n8nio/n8n | postgresdb | - |
| `N8N_PORT` | n8nio/n8n | 5678 | - |
| `DB_POSTGRESDB_USER` | n8nio/n8n | (secret) | - |
| `N8N_LISTEN_ADDRESS` | n8nio/n8n | :: | - |
| `DB_POSTGRESDB_PASSWORD` | n8nio/n8n | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8nio/n8n | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8nio/n8n | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/flowise/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/flowise-and-n8n-ai-automation)
