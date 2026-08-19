# Deploy LiteLLM Proxy on Railway

LLM proxy for Claude, GPT & Gemini with keys, budgets & caching

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-proxy-1)

## About

LiteLLM Proxy is an open-source gateway that puts one OpenAI-compatible endpoint in front of Anthropic, OpenAI, Google and 100+ other LLM providers. Point any OpenAI SDK at it and switch models by name, without changing client code. This template deploys the proxy with Postgres for key management and spend tracking, and Redis for response caching.

Running LiteLLM in production means more than starting a container: it needs a Postgres database for virtual keys and spend logs, database migrations applied on every version bump, and ideally Redis so repeated prompts are not paid for twice. This template wires all three services together, generates the master key for you, applies Prisma migrations automatically on first boot, and exposes a healthcheck so deploys fail loudly rather than silently. The LiteLLM image is pinned by digest, so every deploy gets the same tested version instead of whatever upstream released today.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| railway-litellm-template | [officeOptibiz/railway-litellm-template](https://github.com/officeOptibiz/railway-litellm-template) (branch: stable) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Internal hostname of the Redis service on Railway's private network. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. Default 6379. |
| `REDISUSER` | Redis | default | Redis username. Defaults to "default" as used by Redis ACLs. |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Redis password, mirrored from REDIS_PASSWORD for clients that expect this name. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password. Used to build REDIS_URL. |
| `REDIS_URL` | railway-litellm-template | - | Redis connection for response caching. Optional — remove Redis and caching is disabled. |
| `DATABASE_URL` | railway-litellm-template | - | Postgres connection for key management and spend tracking. |
| `GEMINI_API_KEY` | railway-litellm-template | (secret) | Your Google AI key. Leave empty if you don't use Gemini models. |
| `OPENAI_API_KEY` | railway-litellm-template | (secret) | Your OpenAI key. Leave empty if you don't use GPT models. |
| `ANTHROPIC_API_KEY` | railway-litellm-template | (secret) | Your Anthropic key. Leave empty if you don't use Claude models. |
| `LITELLM_MASTER_KEY` | railway-litellm-template | - | Admin key for the proxy UI and for minting virtual API keys. Generated automatically. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health/liveliness`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/litellm-proxy-1)
