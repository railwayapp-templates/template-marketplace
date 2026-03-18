# Deploy LiteLLM on Railway

Unified LLM gateway — route to 100+ providers through one OpenAI-compatible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/litellm)

## About

LiteLLM is a unified API gateway that provides OpenAI-compatible endpoints for over 100 LLM providers, including OpenAI, Anthropic, Azure, Cohere, Mistral, Google Gemini, and AWS Bedrock. It includes spend tracking, rate limiting, and an admin dashboard.

LiteLLM runs as an API proxy that translates OpenAI-format requests to provider-specific formats behind the scenes. This template deploys the LiteLLM proxy alongside PostgreSQL for storing API keys, spend logs, and model configurations, and Redis for response caching and rate limiting. All three services are wired together automatically. The master key and salt key are auto-generated. Once deployed, you add your LLM provider API keys through the admin UI or API, create virtual keys with per-key budgets and rate limits, then point your applications at the LiteLLM endpoint as a drop-in replacement for any OpenAI SDK.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| litellm | [Sokanon/railway-litellm](https://github.com/Sokanon/railway-litellm) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | litellm | (secret) |

## Configuration

- **Healthcheck:** `/health/liveliness`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/litellm)
