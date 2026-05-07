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
| `OPENCLAW_MODEL` | Default AI model. Example: openrouter/qwen/qwen3-30b-a3b:free for a free model, or anthropic/claude-sonnet-4-6. | Default AI model, e.g. openrouter/anthropic/claude-sonnet-4-6    |
| `OPENCLAW_STATE_DIR` |  /data/.openclaw    | OpenClaw state and config directory. Leave as default: /data/.openclaw   |
| `OPENROUTER_API_KEY` | (secret) | API key from openrouter.io — access to Claude, GPT-4, and more. Free tier available. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Your Telegram bot token from @BotFather (t.me/BotFather)      |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Admin secret token for the OpenClaw gateway. Auto-generated. |
| `OPENCLAW_WORKSPACE_DIR` | /data/.openclaw      | Agent workspace and memory directory. Leave as default: /data/workspace |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ministers-template)
