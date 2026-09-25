# Deploy Nanobot on Railway

nanobot 0.3.5: lightweight personal AI agent with a web UI and chat apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanobot-1)

## About

nanobot is an ultra-lightweight personal AI agent from HKU's Data Intelligence Lab, a small alternative to OpenClaw. It chats through a web UI, Telegram, WhatsApp and other channels, remembers context, runs tools such as file editing, shell, web search and cron jobs, and works with Anthropic, OpenAI, OpenRouter and many other providers.

This template builds nanobot v0.3.5 from the upstream release tag through a small public wrapper repository, because upstream publishes no image. The gateway serves the bundled WebUI and a WebSocket chat channel on the public domain; both require `NANOBOT_WEB_TOKEN`, and WebSocket connections without an issued token are refused. Configuration comes from `NANOBOT_*` variables, so no config file is needed. Sessions, memory and the agent workspace live on a Railway volume and survive redeploys. The agent runs as a non-root user and its tools are restricted to the workspace. You must supply an LLM API key. It fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nanobot | [aalfath/nanobot-railway-template](https://github.com/aalfath/nanobot-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8765 |
| `NANOBOT_WEB_TOKEN` | (secret) |
| `NANOBOT_AGENTS__DEFAULTS__MODEL` | anthropic/claude-sonnet-5 |
| `NANOBOT_CHANNELS__WEBSOCKET__HOST` | 0.0.0.0 |
| `NANOBOT_CHANNELS__WEBSOCKET__PORT` | 8765 |
| `NANOBOT_CHANNELS__WEBSOCKET__ENABLED` | true |
| `NANOBOT_TOOLS__RESTRICT_TO_WORKSPACE` | true |
| `NANOBOT_PROVIDERS__ANTHROPIC__API_KEY` | (secret) |
| `NANOBOT_CHANNELS__WEBSOCKET__TOKEN_ISSUE_SECRET` | (secret) |
| `NANOBOT_CHANNELS__WEBSOCKET__WEBSOCKET_REQUIRES_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nanobot/.nanobot`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/nanobot-1)
