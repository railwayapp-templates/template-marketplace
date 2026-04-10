# Deploy Ferro Labs AI - PostgreSQL storage on Railway

Unified AI Gateway - All your traffic. One gateway - PostgreSQL storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ferro-labs-ai-postgresql-storage)

## About

Ferro Labs AI - PostgreSQL storage is a high-performance, OpenAI-compatible AI gateway written in Go. It routes requests across multiple LLM providers through one API while persisting admin keys, config history, and request logs in PostgreSQL, making it a strong Railway template for durable multi-service deployments.

Hosting Ferro Labs AI - PostgreSQL storage on Railway gives you a production-ready AI gateway backed by a managed Postgres database. Railway builds and runs the gateway service from the repository, while a Railway Postgres service stores API keys, runtime configuration, and request logs. You only need a `MASTER_KEY`, at least one provider API key such as `OPENAI_API_KEY`, and Postgres-backed store environment variables. This template is ideal when you want persistent state without managing SQLite volumes, and when you want a cleaner path from initial deployment to a larger production setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Ferro Labs AI Gateway | [ferro-labs/ai-gateway](https://github.com/ferro-labs/ai-gateway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Ferro Labs AI Gateway | 8080 | - |
| `OLLAMA_HOST` | Ferro Labs AI Gateway | - | http://localhost:11434 |
| `XAI_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `CORS_ORIGINS` | Ferro Labs AI Gateway | - | e.g http://xyz.com |
| `GROQ_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `OLLAMA_MODELS` | Ferro Labs AI Gateway | - | llama3,codellama |
| `COHERE_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `GATEWAY_CONFIG` | Ferro Labs AI Gateway | - | e.g /etc/config.yaml |
| `GEMINI_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `OPENAI_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `MISTRAL_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `DEEPSEEK_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `TOGETHER_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `ANTHROPIC_API_KEY` | Ferro Labs AI Gateway | (secret) | - |
| `API_KEY_STORE_DSN` | Ferro Labs AI Gateway | (secret) | - |
| `CONFIG_STORE_BACKEND` | Ferro Labs AI Gateway | postgres | - |
| `API_KEY_STORE_BACKEND` | Ferro Labs AI Gateway | (secret) | - |
| `REQUEST_LOG_STORE_BACKEND` | Ferro Labs AI Gateway | postgres | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** Go, JavaScript, HTML, CSS, Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/ferro-labs-ai-postgresql-storage)
