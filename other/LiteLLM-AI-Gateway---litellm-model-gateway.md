# Deploy LiteLLM — AI Gateway on Railway

One gateway for 100+ AI models, ready to deploy in just 1 click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-model-gateway)

## About

LiteLLM Model Gateway provides a unified OpenAI-compatible API for connecting applications, AI agents, and automation workflows to multiple LLM providers through a single endpoint.

This template deploys LiteLLM with PostgreSQL and Redis, giving you a persistent AI gateway with model management, virtual API keys, usage tracking, routing, authentication, and a built-in administration interface.

LiteLLM acts as a gateway between your applications and AI providers.

Instead of integrating every provider separately, applications can send requests to one LiteLLM endpoint while LiteLLM handles provider routing, authentication, logging, spend tracking, rate limits, and model configuration.

The LiteLLM Proxy exposes OpenAI-compatible APIs, making it easier to switch or combine providers without rewriting application integrations.

PostgreSQL stores persistent gateway data such as models, virtual keys, users, budgets, and usage information. Redis provides a shared backend for features such as caching and distributed rate-limiting when enabled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| litellm-database | `litellm/litellm-database:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | litellm-database | 4000 | Railway public service port for LiteLLM |
| `REDIS_HOST` | litellm-database | - | Redis private hostname |
| `REDIS_PORT` | litellm-database | - | Redis service port |
| `UI_PASSWORD` | litellm-database | (secret) | Strong generated password for the Admin UI |
| `UI_USERNAME` | litellm-database | (secret) | Username for accessing the LiteLLM Admin UI |
| `DATABASE_URL` | litellm-database | - | PostgreSQL connection URI used by LiteLLM |
| `REDIS_PASSWORD` | litellm-database | (secret) | Redis authentication password |
| `LITELLM_SALT_KEY` | litellm-database | - | Persistent salt used for encrypted LiteLLM data |
| `STORE_MODEL_IN_DB` | litellm-database | True | Allow models and proxy configuration to be stored in PostgreSQL |
| `LITELLM_MASTER_KEY` | litellm-database | - | Master API key used to authenticate LiteLLM proxy requests |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Redis private hostname within Railway |
| `REDISPORT` | Redis | 6379 | Redis service port |
| `REDISUSER` | Redis | default | Default Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias for the generated Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/litellm-model-gateway)
