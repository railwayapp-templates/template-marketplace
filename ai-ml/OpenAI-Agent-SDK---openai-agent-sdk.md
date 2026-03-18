# Deploy OpenAI-Agent-SDK on Railway

Deploy and Host OpenAI-Agent-SDK with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openai-agent-sdk)

## About

This template helps developers master both the OpenAI Agent SDK and traditional OpenAI Python library through side-by-side web interfaces, featuring persistent memory, tool integration, and production-ready architecture.

Deploying this template involves hosting a FastAPI backend with dual Gradio interfaces, managing SQLite/PostgreSQL databases for conversation persistence, and handling real-time streaming responses. The template automatically manages session isolation, memory optimization, and API key validation. With Railway's seamless deployment, you get instant scalability for multiple concurrent users, automatic HTTPS, and zero-configuration database provisioning - perfect for educational environments, development teams, or AI workshops.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenAI-Agent-Template | [yuting1214/OpenAI-Agent-Template](https://github.com/yuting1214/OpenAI-Agent-Template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST_URL` | OpenAI-Agent-Template | - | Host URL for App |
| `OPENAI_API_KEY` | OpenAI-Agent-Template | (secret) | OpenAI API Key. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/openai-agent-sdk)
