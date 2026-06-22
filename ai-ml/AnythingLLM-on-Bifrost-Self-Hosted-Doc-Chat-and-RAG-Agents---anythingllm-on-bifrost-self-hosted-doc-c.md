# Deploy AnythingLLM on Bifrost: Self Hosted Doc Chat and RAG Agents on Railway

Deploy and Host AnythingLLM: Self Hosted Doc Chat and RAG Agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingllm-on-bifrost-self-hosted-doc-c)

## About

AnythingLLM is an open source AI workspace for chatting with your own documents, running RAG, and building no code agents. This template puts AnythingLLM in front of Bifrost, the open source AI gateway from Maxim AI, so every model call is routed, logged, and governed through one OpenAI compatible endpoint.

The stack is three services: AnythingLLM, Bifrost, and Postgres. AnythingLLM keeps its workspaces, documents, and embeddings on its own volume using a built in vector store, so no external vector database is needed. Bifrost holds your real provider keys and exposes a single OpenAI compatible API, and AnythingLLM is pre configured to call it through its Generic OpenAI provider over the private network. Postgres backs Bifrost's configuration and request logs. After deploy, open the Bifrost dashboard, add one or more provider keys under Model Providers, then confirm the model name in AnythingLLM matches a model Bifrost serves. Every completion AnythingLLM sends then flows through Bifrost, where you get virtual keys, budgets, failover, and a full request log.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | `maximhq/bifrost:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| AnythingLLM | `mintplexlabs/anythingllm:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_LEVEL` | Bifrost | info |
| `LOG_STYLE` | Bifrost | json |
| `POSTGRES_DB` | Postgres | app |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `JWT_SECRET` | AnythingLLM | (secret) |
| `SERVER_PORT` | AnythingLLM | 3001 |
| `STORAGE_DIR` | AnythingLLM | /app/server/storage |
| `LLM_PROVIDER` | AnythingLLM | generic-openai |
| `EMBEDDING_ENGINE` | AnythingLLM | native |
| `DISABLE_TELEMETRY` | AnythingLLM | true |
| `GENERIC_OPEN_AI_API_KEY` | AnythingLLM | (secret) |
| `GENERIC_OPEN_AI_MODEL_PREF` | AnythingLLM | gpt-4o-mini |
| `GENERIC_OPEN_AI_MODEL_TOKEN_LIMIT` | AnythingLLM | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/server/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/anythingllm-on-bifrost-self-hosted-doc-c)
