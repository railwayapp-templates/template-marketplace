# Deploy Hermes Agent vs OpenClaw on Railway

Nous Hermes Agent vs OpenClaw personal agent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-hermes-agent-vs-openclaw)

## About

This Railway template runs Nous Research's Hermes Agent, not OpenClaw. It compares Hermes Agent's self-improving memory and skills with an OpenAI-compatible API to OpenClaw's multi-channel assistant gateway with a built-in browser.

Hermes Agent is MIT-licensed and runs as one service. Start it with `hermes gateway run`; it listens on port 8642 with a health check at `/health`. The template uses a persistent volume at `/opt/data` for skills, memory, and settings.

OpenClaw is a personal assistant gateway with many chat channels and a built-in browser. It is not deployed by this template. Hermes Agent focuses on memory and skills; OpenClaw focuses on channel breadth and browser automation.

The Railway template sets `PORT=8642`, `HERMES_ALLOW_ROOT_GATEWAY`, `RAILWAY_RUN_UID`, `HERMES_UID`, and `HERMES_GID`. Add at least one model provider key: `OPENROUTER_API_KEY`, `ANTHROPIC_API_KEY`, or `OPENAI_API_KEY`, or use optional Nous Portal.

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

[View on Railway →](https://railway.com/deploy/deploy-hermes-agent-vs-openclaw)
