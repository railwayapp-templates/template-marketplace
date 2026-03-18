# Deploy OpenClaw (Clawdbot) - Railway Template on Railway

Deploy and Host OpenClaw (Clawdbot) - Railway Template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-clawdbot-railway-template)

## About

Hosting OpenClaw (Clawdbot) on Railway deploys a web-accessible OpenClaw (Clawdbot) Gateway and Control UI behind Railway’s HTTP proxy. You complete initial setup in the browser at /setup (secured with a password), providing your model credentials and optional chat channel tokens. The template mounts a persistent volume at /data so your configuration, credentials, conversations, and workspace survive restarts and can be exported for migration. After setup, OpenClaw (Clawdbot) runs continuously and you interact with it through your connected channels (Telegram/Discord/Slack) and/or the Control UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clawdbot-railway-template | [lynnzc/clawdbot-railway-template](https://github.com/lynnzc/clawdbot-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/template/openclaw-clawdbot-railway-template)
