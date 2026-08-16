# Deploy Flowise — AI Agent Builder on Railway

Build AI agents visually with a powerful low-code workflow platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-visual-ai-builder)

## About

Flowise is an open-source visual platform for building AI agents, LLM workflows, chat applications, and multi-agent systems. It provides a drag-and-drop interface for connecting models, tools, APIs, vector databases, memory, custom code, and workflow logic without building every integration from scratch.

This template deploys **Flowise with PostgreSQL and persistent storage**, providing a practical foundation for building and running AI workflows.

![Flowise]()

Flowise provides several ways to build AI applications, including Chatflows, Assistants, and Agentflows. Agentflow supports conversational assistants, single-agent systems, multi-agent architectures, and more complex workflow orchestration.

PostgreSQL stores Flowise application data, while persistent storage preserves local Flowise files such as secrets, API keys, logs, and uploaded data across restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| flowise | `flowiseai/flowise:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | flowise | 3000 | Flowise HTTP service port |
| `LOG_PATH` | flowise | /opt/railway/.flowise/logs | Persistent Flowise logs directory |
| `PGSSLMODE` | flowise | disable | Disable PostgreSQL SSL for Railway private networking |
| `APIKEY_PATH` | flowise | /opt/railway/.flowise | Persistent location for Flowise API keys |
| `DATABASE_HOST` | flowise | - | PostgreSQL host |
| `DATABASE_NAME` | flowise | - | PostgreSQL database name |
| `DATABASE_PORT` | flowise | - | PostgreSQL port |
| `DATABASE_TYPE` | flowise | postgres | Use PostgreSQL as the Flowise application database |
| `DATABASE_USER` | flowise | (secret) | PostgreSQL username |
| `SECRETKEY_PATH` | flowise | (secret) | Persistent location for Flowise encryption secret |
| `FLOWISE_PASSWORD` | flowise | (secret) | Auto-generated strong password |
| `FLOWISE_USERNAME` | flowise | (secret) | Optional basic authentication username |
| `BLOB_STORAGE_PATH` | flowise | /opt/railway/.flowise/storage | Persistent uploaded/blob storage |
| `DATABASE_PASSWORD` | flowise | (secret) | PostgreSQL password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/railway/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-visual-ai-builder)
