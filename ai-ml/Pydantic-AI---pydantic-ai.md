# Deploy Pydantic AI on Railway

A typed AI agent runtime with web chat and persistent memory.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pydantic-ai)

## About

Pydantic AI is a typed Python framework for building reliable AI agents with structured outputs, multi-provider model support, tool integration, and production-focused application patterns.

This Railway template deploys a ready-to-use **Pydantic AI agent runtime with a built-in web chat interface and PostgreSQL-backed persistent conversation memory**.

This template provides a lightweight production-oriented Pydantic AI deployment that runs as a FastAPI application.

The application includes a browser-based chat interface, REST API endpoints, multi-provider model configuration, persistent conversation history, and PostgreSQL storage.

Unlike a stateless demo chatbot, conversations are stored in PostgreSQL using Pydantic AI's native message history format, allowing conversations to survive application restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pydantic AI | [codestorm-official/pydantic-ai](https://github.com/codestorm-official/pydantic-ai) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Pydantic AI | 0.0.0.0 | Optional: bind address; keep 0.0.0.0 for Railway and containers. |
| `PORT` | Pydantic AI | 8000 | Optional: local HTTP port; Railway supplies PORT automatically. |
| `MODEL_NAME` | Pydantic AI | gpt-4o-mini | Optional: provider model name without its Pydantic AI prefix. |
| `APP_API_KEY` | Pydantic AI | (secret) | Optional: Bearer token required by chat and conversation APIs when set. |
| `DATABASE_URL` | Pydantic AI | - | PostgreSQL URL; on Railway use ${{Postgres.DATABASE_URL}}. |
| `GROQ_API_KEY` | Pydantic AI | (secret) | Optional: required when MODEL_PROVIDER=groq |
| `SYSTEM_PROMPT` | Pydantic AI | You are a helpful AI assistant. | Optional: instructions applied to every agent run. |
| `GOOGLE_API_KEY` | Pydantic AI | (secret) | Optional: required when MODEL_PROVIDER=google |
| `MODEL_PROVIDER` | Pydantic AI | openai | Optional: supported values are openai, anthropic, google, or groq. |
| `OPENAI_API_KEY` | Pydantic AI | (secret) | Optional: required when MODEL_PROVIDER=openai |
| `DB_POOL_TIMEOUT` | Pydantic AI | 10 | Optional: seconds to wait for an available database connection. |
| `DB_POOL_MAX_SIZE` | Pydantic AI | 10 | Optional: maximum PostgreSQL connections per app instance. |
| `DB_POOL_MIN_SIZE` | Pydantic AI | 1 | Optional: minimum PostgreSQL connections kept open. |
| `ANTHROPIC_API_KEY` | Pydantic AI | (secret) | Optional: required when MODEL_PROVIDER=anthropic |
| `REQUEST_TIMEOUT_SECONDS` | Pydantic AI | 60 | Optional: maximum duration of a model request in seconds. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/pydantic-ai)
