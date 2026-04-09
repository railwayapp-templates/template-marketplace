# Deploy OpenClaw (Moltbot/Clawdbot) – With Step by Step Guide on Railway

[Apr '26] Deploy OpenClaw without CLI (Steps In Overview). Just Deploy It!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-moltbotclawdbot-autonomous-ai-a)

## About

**OpenClaw** (formerly Clawdbot/Moltbot) is a powerful, open-source AI agent framework that lets you run **Claude, ChatGPT, or Gemini** as your own self-hosted private personal assistant. 

Chat securely through the built-in web dashboard, or integrate with Telegram, Discord, and Slack. OpenClaw can execute code, browse the web autonomously, schedule cron tasks, and maintain infinite long-term conversation context. Deploy your own privacy-first AI alternative to ChatGPT on Railway in just one click!

Deploying OpenClaw on Railway traditionally requires interactive terminal access for onboarding, which Railway doesn't provide. This template solves that challenge by wrapping OpenClaw's gateway with a web-based setup wizard. You get a one-click deployment with browser-based configuration—no CLI commands needed. This template lets you deploy OpenClaw in 1 click.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw (Prev Moltbot, Clawdbot) | [praveen-ks-2001/openclaw-railway-template-enhanced](https://github.com/praveen-ks-2001/openclaw-railway-template-enhanced) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port for wrapper server. |
| `ENABLE_WEB_TUI` | false | Gives an option Terminal UI |
| `SETUP_PASSWORD` | (secret) | Password to access /setup wizard |
| `OPENCLAW_VERSION` | 2026.4.8 | Pin openclaw version. Use 'latest' to always take the most recent version. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Where config and credentials are stored. |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | Internal host for gateway |
| `INTERNAL_GATEWAY_PORT` | 18789 | Internal port for OpenClaw gateway. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Shared secret used to authenticate every request between the proxy and the OpenClaw gateway. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Filesystem workspace where OpenClaw reads/writes user projects, tools, and generated artifacts. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** HTML, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openclaw-moltbotclawdbot-autonomous-ai-a)
