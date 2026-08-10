# Deploy CrewAI Studio on Railway

Collaborative AI workflows, data analysis, and management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crewai-studio)

## About

CrewAI Studio is a Streamlit-based interface for building and managing collaborative AI workflows with CrewAI. It provides tools for AI task collaboration, data analysis, visualization, and data management, backed by PostgreSQL for persistent application data.

Hosting CrewAI Studio on Railway involves deploying the Streamlit application alongside a PostgreSQL database. The application is provided as a Docker image and runs on HTTP port 8501, while PostgreSQL provides persistent relational storage. On Railway, the application can connect directly to the PostgreSQL service using Railway reference variables rather than hardcoded database hostnames or credentials. Once deployed, you can expose CrewAI Studio through a Railway-generated domain and configure the required LLM provider API keys for your AI workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| crewai-studio | `tham0nk/crewai-studio:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | crewai-studio | 8501 | - |
| `GOOGLE_API_KEY` | crewai-studio | (secret) | - |
| `OPENAI_API_KEY` | crewai-studio | (secret) | - |
| `ANTHROPIC_API_KEY` | crewai-studio | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/crewai-studio)
