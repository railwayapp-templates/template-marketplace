# Deploy Ragpi on Railway

🤖 An AI assistant answering questions from your documentation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/7ihedX)

## About

Ragpi is an open-source AI assistant API that answers questions using your documentation, GitHub issues, and READMEs. It combines LLMs with intelligent search to provide relevant, documentation-backed answers through a simple API.

[Documentation](https://docs.ragpi.io) | [API Reference](https://docs.ragpi.io/api)

## Key Features

- 📚 Builds knowledge bases from docs, GitHub issues and READMEs
- 🤖 Agentic RAG system for dynamic document retrieval
- 🔌 Supports OpenAI, Ollama, Deepseek & OpenAI-Compatible models
- 💬 Discord integration for community support
- 🚀 API-first design with Docker deployment

## Configuring Deployment

You will need to configure the LLM providers you would like to use, i.e the `CHAT_PROVIDER` and `EMBEDDING_PROVIDER` environment variables. You will also need to configure any required variables for the provider you choose, e.g. `OPENAI_API_KEY` if you choose `openai` as your provider. You can find out more about configuring the providers in the [provider documentation](/providers/overview) and the required environment variables for each provider under their respective pages.

If there are other [environment variables](/configuration) you would like to configure that are not in the deployment template, you can add them to your services in the Railway project canvas after deploying the template.

After deploying the core services, Railway will give you a public URL for the `ragpi-api` service which you can use to access the API. You can also [enable API authentication](/configuration#api-key-configuration) by setting the `RAGPI_API_KEY` environment variable on the `ragpi-api` service and using it to authenticate requests to the API.

## Deploying Integrations

Each Ragpi integration has its own Railway deployment template. Once you have deployed the core Ragpi services, you can deploy integrations like Slack and Discord by adding a new service to your project canvas. You can do this on your project's **Architecture** page by clicking the **Create** button, selecting the **Template** option, and searching for the integration you want to deploy, e.g., `Ragpi Discord Integration` or `Ragpi Slack Integration`.

After selecting the integration template, you will need to configure the required environment variables for the integration. The `RAGPI_BASE_URL` environment variable should already be set to the URL of the `ragpi-api` service you deployed earlier. If you enabled API authentication, the `RAGPI_API_KEY` environment variable should also be set to the API key you configured for the `ragpi-api` service. You can find the required environment variables for each integration in the [integration's documentation](/integrations).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `pgvector/pgvector:pg17` | Database |
| ragpi-api | `ragpi/ragpi` | Web service |
| ragpi-worker | `ragpi/ragpi` | Worker |
| redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | ragpi | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `PGPORT_PRIVATE` | postgres | 5432 | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `PORT` | ragpi-api | 8000 | - |
| `CHAT_PROVIDER` | ragpi-api | - | Options: openai, ollama, deepseek, openai_compatible |
| `RAGPI_API_KEY` | ragpi-api | (secret) | - |
| `OPENAI_API_KEY` | ragpi-api | (secret) | - |
| `EMBEDDING_MODEL` | ragpi-api | - | Default is text-embedding-3-small |
| `DEEPSEEK_API_KEY` | ragpi-api | (secret) | - |
| `DEFAULT_CHAT_MODEL` | ragpi-api | - | Default is gpt-4o |
| `EMBEDDING_PROVIDER` | ragpi-api | - | Options: openai, ollama, openai_compatible |
| `EMBEDDING_DIMENSIONS` | ragpi-api | - | Default is 1536 |
| `CHAT_OPENAI_COMPATIBLE_API_KEY` | ragpi-api | (secret) | - |
| `EMBEDDING_OPENAI_COMPATIBLE_API_KEY` | ragpi-api | (secret) | - |
| `GITHUB_TOKEN` | ragpi-worker | (secret) | - |
| `OPENAI_API_KEY` | ragpi-worker | (secret) | - |
| `EMBEDDING_MODEL` | ragpi-worker | - | Default is text-embedding-3-small |
| `EMBEDDING_PROVIDER` | ragpi-worker | - | Options: openai, ollama, openai_compatible |
| `EMBEDDING_DIMENSIONS` | ragpi-worker | - | Default is 1536 |
| `EMBEDDING_OPENAI_COMPATIBLE_API_KEY` | ragpi-worker | (secret) | - |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `REDIS_RDB_POLICY` | redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | redis | no | - |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `celery --app=src.celery.celery_app worker --concurrency=2 --max-tasks-per-child=1 --loglevel=INFO`
- **Volume:** `/bitnami`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/7ihedX)
