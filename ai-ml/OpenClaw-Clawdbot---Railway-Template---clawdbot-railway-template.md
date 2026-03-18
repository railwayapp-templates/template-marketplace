# Deploy OpenClaw (Clawdbot) - Railway Template on Railway

Quickly deploy your openclaw (clawdbot) on Railway: https://openclaw.ai

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clawdbot-railway-template)

## About

OpenClaw (Clawdbot) - Railway Template is a one-click Railway deployment for running your own OpenClaw instance (Clawdbot, gateway + Control UI) with a friendly /setup wizard. It stores state on a Railway Volume for persistence and supports onboarding without running terminal commands, then lets you chat with the bot via Telegram/Discord/Slack.

Hosting OpenClaw (Clawdbot) on Railway deploys a web-accessible OpenClaw (Clawdbot) Gateway and Control UI behind Railway’s HTTP proxy. You complete initial setup in the browser at /setup (secured with a password), providing your model credentials and optional chat channel tokens. The template mounts a persistent volume at /data so your configuration, credentials, conversations, and workspace survive restarts and can be exported for migration. After setup, OpenClaw (Clawdbot) runs continuously and you interact with it through your connected channels (Telegram/Discord/Slack) and/or the Control UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clawdbot-railway-template | [vignesh07/clawdbot-railway-template](https://github.com/vignesh07/clawdbot-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SETUP_PASSWORD` | (secret) | Setup password that will protect your clawdbot UI from the rest of the world |
| `CLAWDBOT_STATE_DIR` | /data/.clawdbot | where your clawdbot data lives - configs, auth, sessions. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `CLAWDBOT_GATEWAY_TOKEN` | (secret) | token that protects your gateway |
| `CLAWDBOT_WORKSPACE_DIR` | /data/workspace | Where all the files you create via clawdbot will reside. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | - |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/clawdbot-railway-template)
