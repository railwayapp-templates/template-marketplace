# Deploy Bot Empire on Railway

Deploy and Host The Avengers with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bot-empire)

## About

The Avengers is a multi-agent AI assistant ecosystem powered by OpenClaw. Deploy 10 specialized AI bots — each with a unique role — that you manage through Telegram. One-click deploy, setup wizard, no terminal required.

The Avengers runs on OpenClaw's gateway platform, deployed as a single Railway service with a persistent volume. The setup wizard configures your AI provider (OpenRouter, Anthropic, OpenAI, or Google Gemini) and messaging channel (Telegram, Discord, or Slack) through a browser-based UI protected by a password. Once configured, the gateway manages all 10 bot agents, routes messages, and persists conversations and workspace data to the Railway volume at /data. The entire stack — gateway, control UI, and channel integrations — runs in one container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clawdbot-railway-template | [vignesh07/clawdbot-railway-template](https://github.com/vignesh07/clawdbot-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/bot-empire)
