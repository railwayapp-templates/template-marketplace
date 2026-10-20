# Deploy Hermes Agent OpenAI API on Railway

OpenAI-compatible Hermes endpoint for Open WebUI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-hermes-agent-openai-api-server)

## About

This template runs Hermes Agent with its OpenAI-compatible API server on port 8642. For ops who want a tool-using agent behind familiar chat UIs: point Open WebUI, LobeChat, LibreChat or the OpenAI SDK at https://your-domain/v1.

This template runs Hermes with its API server on port 8642 and a generated API_SERVER_KEY. Chat history, skills, and memory stay in the /opt/data volume, not a vendor account.

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

- **Start command:** `sh -c "mkdir -p /opt/data && chown -R 10000:10000 /opt/data && exec /opt/hermes/docker/entrypoint-dispatch.sh hermes gateway run"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deploy-hermes-agent-openai-api-server)
