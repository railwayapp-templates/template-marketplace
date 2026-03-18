# Deploy nanobot on Railway

Ultra-Lightweight Personal AI Assistant

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nanobot)

## About

nanobot is an ultra-lightweight personal AI assistant built in just ~4,000 lines of Python. It connects to LLM providers like OpenRouter, Anthropic, OpenAI, or DeepSeek, and integrates with chat platforms including Telegram, WhatsApp, and Feishu. Despite its minimal footprint, it delivers full agent functionality with web search, scheduled tasks, persistent memory, and extensible skills.

This template deploys nanobot with a web-based configuration UI and status dashboard. Instead of editing JSON files directly, you can configure providers, channels, tools, and agent settings from your browser. The dashboard shows gateway state, uptime, provider/channel status, and live logs, with controls to start, stop, and restart the gateway. The admin panel is protected with basic authentication. A persistent volume at `/data` stores configuration and workspace data across container restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nanobot | [arjunkomath/nanobot-railway-template](https://github.com/arjunkomath/nanobot-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Setup server port |
| `ADMIN_PASSWORD` | (secret) | Setup login password |
| `ADMIN_USERNAME` | (secret) | Setup login username |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/template/nanobot)
