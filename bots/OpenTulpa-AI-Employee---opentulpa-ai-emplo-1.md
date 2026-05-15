# Deploy OpenTulpa AI Employee on Railway

Self-hosted Telegram AI employee with durable memory.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opentulpa-ai-emplo-1)

## About

Deploy OpenTulpa as a self-hosted AI employee you operate from Telegram. The service runs from the public `kvyb/opentulpa` repository, persists state on a Railway volume, and uses an OpenAI-compatible model provider.

OpenTulpa is a FastAPI and LangGraph-based agent runtime for work that repeats. It keeps durable memory, workflow state, checkpoints, behavior logs, and generated artifacts on disk. This Railway template mounts persistent storage at `/app/opentulpa_data` and starts the server with `./start.sh run server`.

The deployed service exposes health checks at `/healthz` and `/agent/healthz`. When Telegram variables are configured, OpenTulpa registers the Telegram webhook from the public Railway domain during startup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opentulpa | [kvyb/opentulpa](https://github.com/kvyb/opentulpa) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `COMPOSIO_API_KEY` | (secret) | Optional. Enables Composio Tool Router integrations such as Google Sheets, Gmail, Slack, Notion, HubSpot, Instagram, and other connected SaaS tools. |
| `TELEGRAM_BOT_TOKEN` | (secret) | - |
| `BROWSER_USE_API_KEY` | (secret) | - |
| `LANGFUSE_SECRET_KEY` | (secret) | - |
| `TELEGRAM_WEBHOOK_SECRET` | (secret) | - |
| `OPENAI_COMPATIBLE_API_KEY` | (secret) | - |

## Configuration

- **Start command:** `./start.sh run server`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/opentulpa_data`

**Category:** Bots · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opentulpa-ai-emplo-1)
