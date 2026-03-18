# Deploy openclaw-workshop on Railway

openclaw workshop template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-workshop)

## About

OpenClaw is an open-source AI agent gateway that connects powerful language models to your favorite messaging apps. Chat with your personal AI assistant through Telegram, with support for file handling, code execution, and persistent memory across conversations.

Hosting OpenClaw requires a persistent server that maintains WebSocket connections to messaging platforms and routes requests to AI model providers. This template handles all the complexity: nginx provides secure authentication, pm2 ensures the gateway stays running, and Railway's persistent volumes preserve your chat history and settings. Simply provide your API keys and bot tokens, and you'll have a fully functional AI assistant in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway | [zeroexcore/openclaw-railway](https://github.com/zeroexcore/openclaw-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PROXY_USER` | (secret) | - |
| `OPENCODE_API_KEY` | (secret) | Get free api key on https://opencode.ai/zen |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token from https://t.me/BotFather |
| `TELEGRAM_ALLOW_FROM` | - | Telegram user ID to pre-approve (get from https://t.me/getmyid_bot) |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/openclaw-workshop)
