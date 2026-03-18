# Deploy MoltBot on Railway

The AI that actually does things.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clawdbot-railway)

## About

MoltBot is a personal AI assistant that connects to multiple messaging platforms (WhatsApp, Telegram, Discord, Slack, Signal, Teams, Matrix, and more). It runs on your own infrastructure, powered by AI models like Claude or ChatGPT, giving you a private, always-on assistant accessible through your favorite messaging apps or a web interface.

Deploying MoltBot Railway gives you a production-ready AI assistant in minutes. The template includes everything needed: a web UI for configuration, support for 15+ messaging channels, integration with 10+ AI providers, and persistent storage for your conversations and settings. Railway handles the infrastructure automatically—building the Docker image, managing environment variables, providing persistent volumes, and exposing your assistant on a public URL. You simply configure your AI provider credentials and optionally connect messaging channels like Telegram or Discord. No server management, no Docker commands, no complex setup—just click deploy and start chatting with your AI assistant.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MoltBot | [serkanhaslak/clawdbot-railway](https://github.com/serkanhaslak/clawdbot-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PORT` | 8080 |
| `NODE_ENV` | production |
| `OPENAI_API_KEY` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `CLAWDBOT_OAUTH_DIR` | /app/data/credentials |
| `CLAWDBOT_STATE_DIR` | /app/data |
| `CLAWDBOT_CONFIG_DIR` | /app/data/.clawdbot |
| `CLAWDBOT_BRIDGE_PORT` | 18790 |
| `CLAWDBOT_CONFIG_PATH` | /app/config/railway.clawdbot.json |
| `TWILIO_WHATSAPP_FROM` | whatsapp:+ |
| `CLAWDBOT_GATEWAY_BIND` | 0.0.0.0 |
| `CLAWDBOT_GATEWAY_PORT` | 18789 |
| `CLAWDBOT_GATEWAY_TOKEN` | (secret) |
| `CLAWDBOT_WORKSPACE_DIR` | /app/data/clawd |
| `CLAWDBOT_LOAD_SHELL_ENV` | 0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation · **Languages:** TypeScript, Swift, Kotlin, Shell, CSS, JavaScript, Python, HTML, Dockerfile, Ruby

[View on Railway →](https://railway.com/deploy/clawdbot-railway)
