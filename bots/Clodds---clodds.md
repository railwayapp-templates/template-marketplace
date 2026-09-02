# Deploy Clodds on Railway

AI trading terminal for prediction markets & crypto, powered by Claude

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clodds)

## About

Clodds runs as a single Node.js service with an embedded SQLite database persisted on a Railway volume at `/data`. The gateway exposes:

- `/health` — health endpoint (used by Railway healthchecks)
- `/webchat` — built-in browser chat interface
- HTTP/WebSocket API — full trading + chat API (see upstream `docs/API_REFERENCE.md`)

Trading is **dry-run by default**: add exchange API keys as environment variables when you want live execution. LLM inference calls Anthropic directly from the container, so no inbound webhooks are needed for chat. The container pre-downloads the embedding model at build time so first request is instant.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clodds | [INAPP-Mobile/clodds](https://github.com/INAPP-Mobile/clodds) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 18789 | HTTP gateway port. Must stay 18789 — it matches the Railway domain target port configured in this template. |
| `CLODDS_TOKEN` | (secret) | Optional secret token for gateway API access. Recommended for public deployments. Leave empty to allow unauthenticated local API access. |
| `WEBCHAT_TOKEN` | (secret) | Optional auth token required by the built-in WebChat client. Leave empty for open WebChat access. |
| `ANTHROPIC_API_KEY` | (secret) | REQUIRED. Anthropic API key that powers the AI agent (sk-ant-...). Get one at https://console.anthropic.com. The app will not start without it. |
| `DISCORD_BOT_TOKEN` | (secret) | Optional. Discord bot token to enable the Discord channel. Leave empty to skip. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional. Telegram bot token from @BotFather to enable the Telegram channel. Leave empty to skip (WebChat works without any channel). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** TypeScript, JavaScript, CSS, HTML, Rust, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/clodds)
