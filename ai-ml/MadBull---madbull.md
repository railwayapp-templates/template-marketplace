# Deploy MadBull on Railway

Your own MadBull AI assistant with web dashboard and setup wizard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/madbull)

## About

MadBull is your personal AI assistant gateway. It connects to AI providers like OpenAI, Anthropic, and Google, and exposes them through a unified web dashboard and messaging channels.

This template deploys MadBull on Railway with a guided setup wizard. After deployment, visit your app URL to configure your AI provider API key, connect messaging channels (Telegram, Discord, Slack), and start chatting. The web dashboard provides real-time session management, configuration editing, and debug tools.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| madbull-railway | [staticpayload/madbull-railway](https://github.com/staticpayload/madbull-railway) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `OPENCLAW_PUBLIC_PORT` | 8080 |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/madbull)
