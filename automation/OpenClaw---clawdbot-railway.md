# Deploy OpenClaw on Railway

Personal AI assistant for WhatsApp, Telegram, Slack, and 20+ channels

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clawdbot-railway)

## About

# Deploy OpenClaw on Railway

OpenClaw is a personal AI assistant that connects to 20+ messaging platforms (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Teams, Matrix, and more). It runs on your own infrastructure, powered by AI models like Claude or ChatGPT, giving you a private, always-on assistant accessible through your favorite messaging apps or a web interface.

## Features

- **20+ messaging channels** — WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Microsoft Teams, Matrix, and more
- **Multi-provider AI** — Works with Claude, OpenAI, and other AI providers
- **Self-hosted & private** — Your data stays on your infrastructure
- **Always-on gateway** — Runs 24/7 on Railway with automatic restarts
- **Built-in health checks** — `/health` and `/readyz` endpoints for monitoring

## Getting Started

1. Click **Deploy on Railway**
2. The gateway will start automatically
3. Run `openclaw onboard` locally to configure channels and AI providers
4. Connect your messaging accounts

## Environment Variables

No required variables — the gateway starts in unconfigured mode and guides you through setup via the onboarding wizard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [serkanhaslak/openclaw-railway](https://github.com/serkanhaslak/openclaw-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PORT` | 8080 |
| `NODE_ENV` | production |
| `OPENAI_API_KEY` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `TWILIO_WHATSAPP_FROM` | whatsapp:+ |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |
| `OPENCLAW_LOAD_SHELL_ENV` | 0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, Swift, Kotlin, Shell, JavaScript, CSS, Go, Python, HTML, Dockerfile, PowerShell, Ruby

[View on Railway →](https://railway.com/deploy/clawdbot-railway)
