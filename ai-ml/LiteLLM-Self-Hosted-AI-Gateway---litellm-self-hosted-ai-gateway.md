# Deploy LiteLLM (Self-Hosted AI Gateway) on Railway

Self-hosted LLM proxy for any model, with keys, budgets, and usage logs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-self-hosted-ai-gateway)

## About

LiteLLM is an open-source AI gateway that puts 100+ LLM providers — OpenAI, Anthropic, Google, Azure, Bedrock, local models, and more — behind a single OpenAI-compatible API. Instead of wiring each app to a different provider SDK, you point everything at LiteLLM and manage virtual API keys, per-team budgets, rate limits, fallbacks, and full request logging from one dashboard. This template deploys the LiteLLM proxy backed by a managed PostgreSQL database, so keys, teams, models, and spend are stored durably and managed from the built-in Admin UI. It boots ready to use with no model pre-configuration required. [Updated August '26]

LiteLLM runs as a stateless proxy that stores all of its configuration — virtual keys, teams, models, and usage logs — in PostgreSQL. This template provisions the proxy plus a dedicated Postgres database, connected over Railway's private network, and runs the database migrations automatically on first boot. A master key and salt key are auto-generated, and the Admin UI is available at /ui immediately after deploy. You add your provider API keys and models through the UI — nothing needs to be configured before the first deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16` | Database |
| litellm | `ghcr.io/berriai/litellm:v1.97.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | litellm | Name of the database created for LiteLLM on first boot. |
| `POSTGRES_USER` | postgres | (secret) | Postgres username created on first boot. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres password, auto-generated (alphanumeric for safe connection strings). |
| `PORT` | litellm | 4000 | Internal port the LiteLLM proxy listens on. |
| `LITELLM_LOG` | litellm | ERROR | Log level for the proxy. |
| `UI_PASSWORD` | litellm | (secret) | Password for the LiteLLM Admin UI, auto-generated. |
| `UI_USERNAME` | litellm | (secret) | Username for the LiteLLM Admin UI. |
| `DATABASE_URL` | litellm | - | Postgres connection string used by LiteLLM (Prisma) for keys, teams, and logs. |
| `LITELLM_MODE` | litellm | PRODUCTION | Run in production mode (disables dotenv loading). |
| `LITELLM_SALT_KEY` | litellm | - | Encryption key for provider API keys stored in the database. Never change after adding models. |
| `STORE_MODEL_IN_DB` | litellm | True | Persist models, keys, and teams in Postgres so you can manage them from the Admin UI. |
| `LITELLM_MASTER_KEY` | litellm | - | Admin API key and Admin UI password; must start with sk-. Keep it secret. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/litellm-self-hosted-ai-gateway)
