# Deploy Hermes Agent Telegram on Railway

Self-hosted Hermes Agent with Telegram messaging

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-teleg-1)

## About

This template is Hermes Agent aimed at Telegram: same nousresearch/hermes-agent:v0.22.0 digest pin, /opt/data volume, and OpenAI-compatible API, plus TELEGRAM_BOT_TOKEN and TELEGRAM_ALLOWED_USERS so only your numeric IDs can drive the bot. One `hermes gateway run` process serves chat and /v1.

One service starts `hermes gateway run` on port 8642 with health /health and volume /opt/data (config, memory, skills, sessions). API_SERVER_ENABLED=true, API_SERVER_HOST=0.0.0.0, API_SERVER_PORT=8642, API_SERVER_KEY generated per deploy, API_SERVER_CORS_ORIGINS=*, HERMES_API_URL=https://YOUR-DOMAIN/v1. Fixed also: PORT=8642, HERMES_ALLOW_ROOT_GATEWAY, RAILWAY_RUN_UID, HERMES_UID, HERMES_GID. Optional empty: OPENROUTER_API_KEY, ANTHROPIC_API_KEY, OPENAI_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_ALLOWED_USERS. Model name for frontends is hermes-agent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | `nousresearch/hermes-agent:v0.22.0@sha256:c69536a39e885b8943329bda68cdf44492458b96aa74a212239bde9d2aeb406a` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8642 | HTTP port Railway routes to (8642). |
| `HERMES_GID` | 10000 | Group ID that owns the /opt/data volume. |
| `HERMES_UID` | 10000 | User ID that owns the /opt/data volume. |
| `API_SERVER_KEY` | - | Bearer key for the API, generated per deploy. |
| `HERMES_API_URL` | - | Public base URL of the API (/v1). |
| `OPENAI_API_KEY` | (secret) | Optional OpenAI key for GPT models. |
| `API_SERVER_HOST` | 0.0.0.0 | API bind address; 0.0.0.0 for Railway. |
| `API_SERVER_PORT` | 8642 | API server port; keep equal to PORT. |
| `ANTHROPIC_API_KEY` | (secret) | Optional Anthropic key for Claude models. |
| `API_SERVER_ENABLED` | true | Turns on the OpenAI-compatible API server. |
| `OPENROUTER_API_KEY` | (secret) | Optional OpenRouter key for models. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional Telegram bot token from BotFather. |
| `TELEGRAM_ALLOWED_USERS` | - | Telegram user IDs allowed to use the bot. |
| `API_SERVER_CORS_ORIGINS` | * | Allowed browser origins; * or your frontend URL. |
| `HERMES_ALLOW_ROOT_GATEWAY` | 1 | Allows the gateway to run as root inside the container. |

## Configuration

- **Start command:** `hermes gateway run`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-teleg-1)
