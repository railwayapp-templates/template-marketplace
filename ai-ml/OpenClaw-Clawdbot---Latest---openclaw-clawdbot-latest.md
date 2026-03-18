# Deploy OpenClaw (Clawdbot) - Latest on Railway

Quickly deploy your openclaw (clawdbot) on Railway: https://openclaw.ai

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-clawdbot-latest)

## About

OpenClaw (Clawdbot) is an open-source AI agent platform that lets you run your own chatbot gateway and control panel with persistent memory and workflows. The Railway Template provides a one-click deployment with a browser-based setup wizard, enabling you to connect OpenClaw to platforms like Telegram, Discord, and Slack without using the terminal.

Hosting OpenClaw (Clawdbot) on Railway deploys a web-accessible OpenClaw Gateway and Control UI behind Railway’s HTTP proxy. You complete the initial setup in the browser at `/setup` (secured with a password), where you provide your model credentials and optional chat channel tokens. The template mounts a persistent volume at `/data` so your configuration, credentials, conversations, and workspace survive restarts and can be exported for migration. After setup, OpenClaw runs continuously and you interact with it through your connected channels (Telegram/Discord/Slack) and/or the Control UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw (Clowdbot) | [baranberkay96/clawdbot-railway-template](https://github.com/baranberkay96/clawdbot-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.clawdbot |
| `CLAWDBOT_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-clawdbot-latest)
