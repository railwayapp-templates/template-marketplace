# Deploy Langflow — Visual AI Workflow Builder (Production-Ready) on Railway

Langflow is a low-code app builder for RAG and multi-agent AI applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-spvZa)

## About

Langflow is a low-code app builder for RAG and multi-agent AI applications. It’s Python-based and agnostic to any model, API, or database.


## ✨ Core features

1. **Python-based** and agnostic to models, APIs, data sources, or databases.
2. **Visual IDE** for drag-and-drop building and testing of workflows.
3. **Playground** to immediately test and iterate workflows with step-by-step control.
4. **Multi-agent** orchestration and conversation management and retrieval.
5. **Free cloud service** to get started in minutes with no setup.
6. **Publish as an API** or export as a Python application.
7. **Observability** with LangSmith, LangFuse, or LangWatch integration.
8. **Enterprise-grade** security and scalability with free DataStax Langflow cloud service.
9. **Customize workflows** or create flows entirely just using Python.
10. **Ecosystem integrations** as reusable components for any model, API or database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langflow | `langflowai/langflow:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | langflow | 7860 | Port |
| `DO_NOT_TRACK` | langflow | true | Do not track |
| `LANGFLOW_PORT` | langflow | - | Port |
| `LANGFLOW_SUPERUSER` | langflow | admin | Superuser |
| `LANGFLOW_AUTO_LOGIN` | langflow | (secret) | Auth login |
| `LANGFLOW_CONFIG_DIR` | langflow | /app/langflow | Langflow Config Directory |
| `LANGFLOW_SECRET_KEY` | langflow | (secret) | Secret Key |
| `LANGFLOW_DATABASE_URL` | langflow | - | DB URL |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | langflow | false | New user is active |
| `LANGFLOW_SUPERUSER_PASSWORD` | langflow | (secret) | Superuser Password |
| `POSTGRES_DB` | Postgres | railway | DB Name |
| `DATABASE_URL` | Postgres | - | DB URL |
| `POSTGRES_USER` | Postgres | (secret) | DB User |
| `POSTGRES_PASSWORD` | Postgres | (secret) | DB Password |
| `DATABASE_PUBLIC_URL` | Postgres | - | DB Public URL |

## Configuration

- **Start command:** `python -m langflow run --host 0.0.0.0`
- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/-spvZa)
