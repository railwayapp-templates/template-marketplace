# Deploy MoltBot-No-Setup on Railway

Deploy and Host MoltBot-No-Setup with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moltbot-no-setup-1)

## About

MoltBot-No-Setup is a one-click Railway template for deploying Moltbot, an AI-powered coding assistant and chatbot. Deploy instantly with zero configuration—just add your OpenRouter API key and your AI assistant is live.

Hosting MoltBot-No-Setup on Railway is as simple as it gets. Click deploy, enter your OpenRouter API key, and you're done. No setup wizards, no environment variable configuration, no passwords to generate. The template handles everything automatically including persistent storage for your data and workspace. Within minutes you have a fully functional Moltbot instance running 24/7 in the cloud, accessible via Telegram, Discord, Slack, or the web Control UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| moltbot-railway-template | [ZK-Juro/moltbot-railway-template](https://github.com/ZK-Juro/moltbot-railway-template) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOOTSTRAP_JSON` | {"model":"openrouter/moonshotai/kimi-k2"} |
| `BASIC_AUTH_USER` | (secret) |
| `MOLTBOT_STATE_DIR` | /data/.moltbot |
| `OPENROUTER_API_KEY` | (secret) |
| `MOLTBOT_WORKSPACE_DIR` | /data/workspace |
| `CONTROL_UI_ALLOW_INSECURE_AUTH` | true |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/moltbot-no-setup-1)
