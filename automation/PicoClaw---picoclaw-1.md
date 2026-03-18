# Deploy PicoClaw on Railway

$10 Hardware · 10MB RAM · 1s Boot 🚀🦞!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/picoclaw-1)

## About

🦞

Picoclaw is an ultra-lightweight AI assistant written in Go, designed to run on minimal hardware (even $10 boards with &lt;10MB RAM). It's inspired by nanobot philosophy: simplicity, performance, and user control..

![Less Resources!](https://raw.githubusercontent.com/sipeed/picoclaw/main/assets/compare.jpg)

🚀 **Hosting PicoClaw on Railway: Super Simple!**

Tired of complex deployments? PicoClaw makes AI hosting a breeze! 🦞✨

**How It Works**

PicoClaw acts as your personal AI gateway:

💬 Receives messages from your channels (Discord, Telegram, etc.)
🧠 Routes requests to your favorite AI (OpenAI, Anthropic, Zhipu...)
↩️ Returns smart responses right back to the channel!

The service handles everything: config management, tool execution, and channel integrations - all in one lightweight package.

**Railway Deployment: Zero Hassle** ⚡

Just set environment variables and you're live!

✅ Pick your AI provider & model
✅ Add your API key(s)
✅ Enable your channels
✅ Deploy (Railway handles the rest!)

**Built-in Goodies:**
- Automatic port mapping
- Health check endpoints
- Centralized logging
- Secure secret management

No config files, no manual setup, no headaches. Railway's managed runtime + PicoClaw's simplicity = instant AI service! 🎉

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| picoclaw | [8u9i/picoclaw](https://github.com/8u9i/picoclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PICOCLAW_GATEWAY_HOST` | 0.0.0.0 | Gateway bind host |
| `PICOCLAW_GATEWAY_PORT` | 8080 | Gateway listen port  |
| `PICOCLAW_HEARTBEAT_ENABLED` | - | Enable periodic heartbeat logs/tasks. |
| `PICOCLAW_AGENTS_DEFAULTS_MODEL` | - | Default model ID used for requests. |
| `PICOCLAW_CHANNELS_DISCORD_TOKEN` | (secret) | Discord bot token. |
| `PICOCLAW_CHANNELS_TELEGRAM_TOKEN` | (secret) | Telegram bot token from BotFather. |
| `PICOCLAW_TOOLS_WEB_BRAVE_API_KEY` | (secret) | - |
| `PICOCLAW_AGENTS_DEFAULTS_PROVIDER` | openrouter | Default LLM provider name (e.g. openrouter). |
| `PICOCLAW_CHANNELS_DISCORD_ENABLED` | - | Enable discord for interacting with llm |
| `PICOCLAW_AGENTS_DEFAULTS_WORKSPACE` | /tmp/picoclaw/workspace | - |
| `PICOCLAW_CHANNELS_TELEGRAM_ENABLED` | true | Enable Telegram bot channel. |
| `PICOCLAW_PROVIDERS_OPENROUTER_API_KEY` | (secret) | OpenRouter API key (required unless another provider key is set). |

## Configuration

- **Start command:** `gateway`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/tmp/picoclaw/workspace`

**Category:** Automation · **Languages:** Go, Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/picoclaw-1)
