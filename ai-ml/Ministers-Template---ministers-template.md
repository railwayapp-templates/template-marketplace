# Deploy Ministers Template on Railway

Ministers T is a ready-to-run AI Chief of Staff

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ministers-template)

## About

Ministers T is a ready-to-run AI Chief of Staff agent powered by OpenClaw, deployable in minutes on Railway. Connect it to Telegram and get a fully autonomous AI assistant that manages tasks, answers questions, and runs workflows — no servers, no DevOps, no hassle.

Hosting Ministers T requires a persistent process that stays online to handle incoming messages and run autonomous agent workflows. The gateway needs an LLM API key (OpenRouter, Anthropic, or OpenAI), a Telegram bot token from BotFather, and a secure gateway auth token. Railway manages the container lifecycle, health checks, automatic restarts, and persistent storage — so your agent's memory, config, and sessions survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dizerclaw-railway-template | [Cojackhq/dizerclaw-railway-template](https://github.com/Cojackhq/dizerclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Asia/Riyadh | Can be changed based on your region, preferably to use as its |
| `PORT` | 8080 | Can be changed, preferably to use as its |
| `NODE_ENV` | production | Can be changed, preferably to use as its |
| `ENABLE_WEB_TUI` | true | Can be changed, preferably to use as its |
| `SETUP_PASSWORD` | (secret) | Admin secret password make it strong |
| `TELEGRAM_TOKEN` | (secret) | Create a bot in 60 seconds at https://t.me/BotFather  " # Your Telegram bot token from @BotFather (t.me/BotFather)      |
| `ANTHROPIC_API_KEY` | (secret) | API key from openrouter.io — access to Claude, GPT-4, and more. Free tier available. |
| `ANTHROPIC_BASE_URL` | https://openrouter.ai/api/v1 | only when using antrhoptic under open router. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Can be changed, preferably to use as its |
| `OPENROUTER_API_KEY` | (secret) | API key from openrouter.io — access to Claude, GPT-4, and more. Free tier available. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Create a bot in 60 seconds at https://t.me/BotFather  " # Your Telegram bot token from @BotFather (t.me/BotFather)      |
| `OPENCLAW_GATEWAY_BIND` | lan | Can be changed, preferably to use as its |
| `OPENCLAW_ALLOWED_USERS` | Telegram, discord or whatsap user ID | Create a bot in 10 seconds from provider |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Admin secret token for the OpenClaw gateway. Auto-generated. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | # OpenClaw state and config directory. Leave as default: /data/.openclaw   |
| `OPENCLAW_TRUSTED_PROXIES` | 100.64.0.0/10 | Can be changed, preferably to use as its |
| `OPENCLAW_TELEGRAM_ALLOWED_USERS` | Telegram user id from telegram | Create a bot in 10 seconds from telegram |
| `OPENCLAW_CONTROL_UI_ALLOWED_ORIGINS` | * | Can be changed, preferably to use as its |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/ministers-template)
