# Deploy Langflow on Railway

Drag-and-drop interface for building AI-powered agents and workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/LcJLmZ)

## About

Langflow is an open-source visual platform for building, testing, and deploying AI workflows and agents. It provides a drag-and-drop canvas for connecting LLMs, prompts, memory, tools, vector databases, and APIs into production-ready pipelines — no coding required to prototype, coding-friendly when you need it.

Langflow is a Python application served via Docker. This Railway template deploys the official Docker image, alongside a Railway-provisioned PostgreSQL service for production-grade storage. Langflow is available on a Railway-provided HTTPS domain immediately after deployment. On first launch, the setup wizard creates an initial admin account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langflow | `langflowai/langflow:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Langflow | 7860 | - |
| `LANGFLOW_LOG_LEVEL` | Langflow | debug | - |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/LcJLmZ)
