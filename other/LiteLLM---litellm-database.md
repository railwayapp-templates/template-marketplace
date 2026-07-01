# Deploy LiteLLM on Railway

Self-hosted LLM gateway with models, keys, caching, and routing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-database)

## About

LiteLLM is an open-source AI gateway that provides a single OpenAI-compatible endpoint for routing requests across multiple LLM providers such as OpenAI, Anthropic, Azure OpenAI, Bedrock, Gemini, Groq, Cohere, Mistral, Ollama, and more.

This template deploys LiteLLM with PostgreSQL and Redis on Railway, giving you a production-ready AI gateway for managing models, virtual keys, provider credentials, request routing, spend tracking, and caching from one centralized proxy.

Hosting LiteLLM gives you a self-hosted LLM gateway that can sit between your apps and multiple AI providers. Instead of wiring each application directly to OpenAI, Anthropic, Gemini, or other providers, your apps can use one OpenAI-compatible API endpoint from LiteLLM.

This setup is useful for teams, internal tools, automation workflows, AI agents, chat interfaces, and applications that need centralized control over model access, API keys, cost tracking, provider routing, and fallback behavior.

This template uses the LiteLLM database image with PostgreSQL for persistent data and Redis for caching, rate limits, and shared gateway state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| litellm-database | `litellm/litellm-database` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | litellm-database | 4000 | - |
| `UI_PASSWORD` | litellm-database | (secret) | - |
| `UI_USERNAME` | litellm-database | (secret) | - |
| `STORE_MODEL_IN_DB` | litellm-database | True | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/litellm-database)
