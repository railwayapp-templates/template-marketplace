# Deploy LiteLLM Proxy | Open Source OpenRouter Alternative on Railway

Self Host LiteLLM. Cost tracking, gateway for 100+ LLMs, chat UI & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-proxy)

## About

LiteLLM is an open-source AI gateway that gives you a single OpenAI-compatible endpoint to call 100+ LLM providers — OpenAI, Anthropic, Azure OpenAI, Bedrock, Gemini, Groq, Cohere, Mistral, Ollama, and more. Point your existing apps at the LiteLLM proxy once, and swap providers, route across models, enforce budgets, track spend, and issue per-team virtual keys without touching app code.

This Railway template deploys a production-shaped LiteLLM stack in one click: the `ghcr.io/berriai/litellm-database:main-stable` proxy, a managed Postgres for persistent model/key/spend state, and a managed Redis for shared rate limits and response caching. You self-host LiteLLM on Railway with the master key, salt key, and `STORE_MODEL_IN_DB=True` already wired so you can add models from the Admin UI without redeploying.

LiteLLM is a drop-in OpenAI-compatible proxy. Apps keep using the OpenAI SDK; LiteLLM translates, routes, retries, and bills. It solves three things vendors won't: unified auth across providers, unified observability, and unified cost control.

Key features:
- OpenAI-format `/v1/chat/completions`, `/v1/embeddings`, `/v1/images/generations` across all providers
- Virtual keys with per-key budgets, rate limits, model allowlists, TTL
- Team/user hierarchy with aggregate spend caps
- Automatic fallbacks, retries, load balancing across deployments of the same model
- Response caching, rate-limit coordination, and budget sync via Redis
- Full request/spend logs in Postgres for audit and cost attribution

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LiteLLM | `ghcr.io/berriai/litellm-database:main-stable` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | LiteLLM | 4000 | Proxy HTTP port |
| `REDIS_HOST` | LiteLLM | - | Redis private hostname |
| `REDIS_PORT` | LiteLLM | - | Redis port |
| `DATABASE_URL` | LiteLLM | - | Postgres connection string |
| `LITELLM_MODE` | LiteLLM | PRODUCTION | Disable .env loading, tighten defaults |
| `REDIS_PASSWORD` | LiteLLM | (secret) | Redis auth password |
| `LITELLM_SALT_KEY` | LiteLLM | - | Encrypts provider keys in DB |
| `STORE_MODEL_IN_DB` | LiteLLM | True | Manage models via Admin UI |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Proxy root auth token |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Healthcheck:** `/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/litellm-proxy)
