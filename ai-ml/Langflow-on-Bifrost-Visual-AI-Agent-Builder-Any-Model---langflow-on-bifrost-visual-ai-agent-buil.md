# Deploy Langflow on Bifrost: Visual AI Agent Builder, Any Model on Railway

Host Langflow on Bifrost: Visual AI Agent Builder, Any Model with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-on-bifrost-visual-ai-agent-buil)

## About

Langflow is an open source visual builder for AI agents, RAG pipelines, and chat flows. This template runs Langflow on top of Bifrost, the open source AI gateway from Maxim AI, so every model node in your flows reaches 20+ providers through one OpenAI compatible endpoint, with failover, virtual keys, and request logs handled at the gateway.

The stack runs three services: Langflow as the visual builder with its flows stored on a volume, Bifrost as the AI gateway, and Postgres as Bifrost storage for configuration and request logs. Langflow is pre wired to Bifrost through the OPENAI_API_BASE setting, so when you drop an OpenAI model component onto the canvas it already points at the gateway. After deploy, log in with the admin account, add a provider key in Bifrost under Model Providers, then in your flow set the model component API key to sk-bifrost and pick a model Bifrost serves. From then on you manage providers and keys in Bifrost instead of inside every flow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langflow | `langflowai/langflow:latest` | Web service |
| Bifrost | `maximhq/bifrost:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `LANGFLOW_SUPERUSER` | Langflow | admin |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) |
| `LANGFLOW_CONFIG_DIR` | Langflow | /app/langflow |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) |
| `LANGFLOW_DATABASE_URL` | Langflow | sqlite:////app/langflow/langflow.db |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_LEVEL` | Bifrost | info |
| `LOG_STYLE` | Bifrost | json |
| `POSTGRES_DB` | Postgres | app |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`
- **Healthcheck:** `/health`
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langflow-on-bifrost-visual-ai-agent-buil)
