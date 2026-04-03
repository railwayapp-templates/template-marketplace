# Deploy RailClaw on Railway

One-click OpenClaw gateway — persistent, containerized, just add API keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railclaw-1)

## About

RailClaw is an open-source AI agent gateway that connects language models to messaging channels like Telegram. It provides a single multiplexed endpoint for WebSocket and HTTP traffic, built-in auth, a control UI, and channel health monitoring out of the box.

Hosting RailClaw requires a persistent process that stays online to maintain connections to messaging channels and handle incoming requests. The gateway needs API keys for your chosen LLM provider (Anthropic, OpenAI), a bot token for each messaging channel, and a secure gateway auth token. 

Railway handles the container lifecycle, health
checks, and automatic restarts — so the gateway stays available without manual intervention. Configuration is injected via environment variables at deploy time, with no files to manage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway-template | [looselyorganized/openclaw-railway-template](https://github.com/looselyorganized/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BRAVE_API_KEY` | (secret) | Enables the web_search tool for live web results |
| `OPENAI_API_KEY` | (secret) | Alternative LLM provider for GPT models (fallback if no Anthropic key)  |
| `OPENCLAW_MODEL` | - | Default personality model (e.g. anthropic/claude-sonnet-4-6)    |
| `ANTHROPIC_API_KEY` | (secret) | Powers the agent's conversational model (Claude)  |
| `CONTROL_UI_ENABLED` | true | Enable gateway Control UI (true/false) |
| `TELEGRAM_BOT_TOKEN` | (secret) | Bot token from @BotFather on Telegram enabling TG conversations. |
| `TELEGRAM_DM_POLICY` | - | DM access policy: "allowlist" or "open" |
| `TELEGRAM_ALLOW_FROM` | - | Comma-separated Telegram user IDs allowed to message the bot |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Random string to secure gateway API access |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.openclaw`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/railclaw-1)
