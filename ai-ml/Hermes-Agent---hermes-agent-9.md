# Deploy Hermes Agent on Railway

Nous Research's self-improving AI agent with OpenAI API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-9)

## About

Hermes Agent v0.22.0 runs on Railway as one pinned container using `nousresearch/hermes-agent:v0.22.0` (October 14, 2026) by sha256 digest. It mounts `/opt/data` for config, memory, skills, and sessions, needs no deploy-time config, and exposes an OpenAI-compatible API on your public domain.

The template deploys one service with start command `hermes gateway run`, port 8642, health check `/health`, and volume `/opt/data`. That's the Hermes home: config, memory, learned skills, and session search. It persists across deploys.

`RAILWAY_RUN_UID`, `HERMES_UID`, and `HERMES_GID` line up the runtime user with the volume owner so `/opt/data` stays writable, and `HERMES_ALLOW_ROOT_GATEWAY` lets the gateway start under Railway's container user. No Dockerfile edits. API server is on: `API_SERVER_ENABLED=true`, `API_SERVER_HOST=0.0.0.0`, `API_SERVER_PORT=8642`. A per-deploy `API_SERVER_KEY` is generated, and `API_SERVER_CORS_ORIGINS=*`.

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

[View on Railway →](https://railway.com/deploy/hermes-agent-9)
