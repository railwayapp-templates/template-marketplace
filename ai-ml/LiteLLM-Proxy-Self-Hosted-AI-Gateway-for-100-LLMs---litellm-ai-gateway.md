# Deploy LiteLLM Proxy — Self-Hosted AI Gateway for 100+ LLMs on Railway

Self-host an AI gateway for 100+ LLMs with spend tracking & budgets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-ai-gateway)

## About

LiteLLM Proxy is the open-source AI gateway — **~40k GitHub stars**, YC-backed, 240M+ Docker
pulls — that puts one OpenAI-compatible endpoint in front of 100+ LLM providers. Point your apps
at a single URL and route to OpenAI, Anthropic, Gemini, Azure, Groq, Bedrock, or a local Ollama
behind the scenes — with virtual keys, per-team and per-user spend tracking, budget enforcement,
load balancing, fallbacks, and an admin dashboard out of the box.

This template deploys LiteLLM with PostgreSQL (for virtual keys and spend tracking) and Redis
(for caching) — the production setup. Self-host on Railway for ~$10–15/month and replace Helicone
($20/mo), OpenRouter's markup, and hand-rolled key-management scripts with infrastructure you own.

---

The problem LiteLLM solves: several developers, multiple providers, and no visibility into who's
burning budget on which model until the invoice lands. LiteLLM exposes one OpenAI-compatible
endpoint, routes each request to the provider you configured, tracks spend per virtual key,
enforces budgets *before* the request leaves your server, and logs everything — in one service.

It needs PostgreSQL (virtual keys, spend tracking) and ideally Redis (caching). LiteLLM is CPU-only
Python at ~400 MB idle — no GPU required, which makes Railway a natural home. This template wires
the proxy, Postgres, and Redis over private networking with automatic HTTPS.

Typical cost: **~$10–15/month** on Railway for the proxy, PostgreSQL, and Redis, plus your own LLM
provider usage. That replaces Helicone's $20/month observability, OpenRouter's per-request markup,
and the hand-rolled key scripts teams otherwise maintain — while keeping all keys and spend data
on your own infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LiteLLM | `berriai/litellm:main-stable` | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | LiteLLM | :: | - |
| `PORT` | LiteLLM | 4000 | - |
| `OR_API_KEY` | LiteLLM | (secret) | - |
| `OR_APP_NAME` | LiteLLM | - | App name for OpenRouter metrics - ex. "Your App Name" |
| `OR_SITE_URL` | LiteLLM | - | Site URL for OpenRouter metrics - ex. "https://yoursite.com" |
| `UI_PASSWORD` | LiteLLM | (secret) | Admin panel login password |
| `LANGFUSE_HOST` | LiteLLM | - | For LLM logging callbacks |
| `REDIS_PASSWORD` | LiteLLM | (secret) | - |
| `AWS_REGION_NAME` | LiteLLM | - | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket |
| `LITELLM_SALT_KEY` | LiteLLM | - | Key for salting DB entries, immutable after initialization - ex. "sk-12345" |
| `AWS_ACCESS_KEY_ID` | LiteLLM | - | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket |
| `STORE_MODEL_IN_DB` | LiteLLM | - | See LiteLLM Proxy Server Documentation |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Master authentication key for virtual key creation - ex. "sk-12345" |
| `LANGFUSE_PUBLIC_KEY` | LiteLLM | - | For LLM logging callbacks |
| `LANGFUSE_SECRET_KEY` | LiteLLM | (secret) | For LLM logging callbacks |
| `AWS_SECRET_ACCESS_KEY` | LiteLLM | (secret) | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket |
| `LITELLM_CONFIG_BUCKET_NAME` | LiteLLM | - | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket |
| `LITELLM_CONFIG_BUCKET_OBJECT_KEY` | LiteLLM | - | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket |
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

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/litellm-ai-gateway)
