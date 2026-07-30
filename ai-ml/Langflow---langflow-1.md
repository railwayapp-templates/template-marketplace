# Deploy Langflow on Railway

Visual builder for AI agents, workflows, and API applications.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-1)

## About

Langflow is an open-source visual platform for building and deploying AI agents, workflows, and API applications. It combines drag-and-drop authoring, custom Python components, an interactive playground, and built-in API and MCP servers, with support for major model providers, vector databases, and AI tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-1)

> **Published:** https://railway.com/deploy/langflow-1 (marketplace code `langflow-1`, category `AI/ML`). See [TEMPLATE.md](./TEMPLATE.md) for the publication record and complete variable audit.

Hosting Langflow on Railway runs the official Langflow 1.11.0 container with PostgreSQL 16.14. Langflow listens on port 7860, runs database migrations during startup, and uses Railway private networking for its database connection. A public Railway domain exposes only the authenticated Langflow UI and APIs. Persistent volumes retain Langflow configuration, encrypted credentials, files, logs, and PostgreSQL data across restarts. The template disables auto-login, signup, telemetry, and superuser CLI creation; generates independent database, encryption, and administrator secrets; and leaves external AI provider API keys optional with no defaults.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16.14-trixie` | Database |
| Langflow | `langflowai/langflow:1.11.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | langflow |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `DO_NOT_TRACK` | Langflow | true |
| `LANGFLOW_SUPERUSER` | Langflow | langflow |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) |
| `LANGFLOW_CONFIG_DIR` | Langflow | /app/langflow |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) |
| `LANGFLOW_ENABLE_SIGNUP` | Langflow | false |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | Langflow | false |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) |
| `LANGFLOW_ENABLE_SUPERUSER_CLI` | Langflow | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langflow-1)
