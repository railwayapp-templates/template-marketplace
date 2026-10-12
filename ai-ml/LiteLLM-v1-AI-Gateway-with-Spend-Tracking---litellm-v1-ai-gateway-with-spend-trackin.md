# Deploy LiteLLM v1 AI Gateway with Spend Tracking on Railway

One OpenAI-compatible API for 100+ LLMs with keys, budgets and rate limits.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-v1-ai-gateway-with-spend-trackin)

## About

LiteLLM is an open-source AI gateway that puts OpenAI, Anthropic, Gemini, Bedrock, Azure, OpenRouter and 100+ other model providers behind one OpenAI-compatible API. This community template runs the LiteLLM proxy with Postgres for keys and spend tracking and Redis for caching and shared rate limits.

The LiteLLM proxy is a Python service that translates OpenAI-style requests to each provider's API, then records who called which model and what it cost. Running it as a shared gateway needs a database for virtual keys, teams, budgets and spend logs, and a shared cache so rate limits and cooldowns stay consistent when the proxy runs several processes or replicas. This template deploys the official LiteLLM database image with a small production configuration: models are managed from the Admin UI, spend is written in batches, the Redis cache and router state are enabled, and the master key, salt key and Admin UI password are generated for you at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| LiteLLM | [baranberkay96/litellm-railway](https://github.com/baranberkay96/litellm-railway) (branch: main) (root: /services/litellm) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `HOST` | LiteLLM | :: | Bind address; :: accepts IPv4 and IPv6 so other Railway services can call the gateway privately. |
| `PORT` | LiteLLM | 4000 | HTTP port of the proxy and Admin UI (public domain target). |
| `REDIS_HOST` | LiteLLM | - | Redis host for response caching and shared router state (rate limits, cooldowns) across workers/replicas. |
| `REDIS_PORT` | LiteLLM | - | Redis port. |
| `LITELLM_LOG` | LiteLLM | INFO | Log level (DEBUG, INFO, WARNING, ERROR). Use ERROR at high request volume. |
| `NUM_WORKERS` | LiteLLM | 2 | Uvicorn worker processes. ~0.6-1 GB RAM each; for more throughput prefer adding replicas. |
| `UI_PASSWORD` | LiteLLM | (secret) | Admin UI password. Generated; read it from this variable. |
| `UI_USERNAME` | LiteLLM | (secret) | Admin UI username (/ui). |
| `DATABASE_URL` | LiteLLM | - | Postgres for models, virtual keys, teams, budgets and spend logs. Migrations run on start. |
| `LITELLM_MODE` | LiteLLM | PRODUCTION | Production mode: no .env loading inside the container. |
| `GEMINI_API_KEY` | LiteLLM | (secret) | Optional. Default Google AI Studio (Gemini) key. |
| `OPENAI_API_KEY` | LiteLLM | (secret) | Optional. Default OpenAI key used when a model has no key of its own. |
| `REDIS_PASSWORD` | LiteLLM | (secret) | Redis password. |
| `LITELLM_SALT_KEY` | LiteLLM | - | Encrypts provider credentials stored in Postgres. Generated once; never change it after adding models. |
| `ANTHROPIC_API_KEY` | LiteLLM | (secret) | Optional. Default Anthropic key. |
| `STORE_MODEL_IN_DB` | LiteLLM | True | Lets you add and edit models from the Admin UI (stored encrypted in Postgres). |
| `LITELLM_CACHE_MODE` | LiteLLM | default_off | Response cache mode: default_off = opt-in per request (cache: {use-cache: true}); default_on = cache every identical request. |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Admin API key (must start with sk-). Use it to create virtual keys; keep private. |
| `OPENROUTER_API_KEY` | LiteLLM | (secret) | Optional. Default OpenRouter key. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Tags:** litellm, llm, ai-gateway, openai-compatible, proxy · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/litellm-v1-ai-gateway-with-spend-trackin)
