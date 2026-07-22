# Deploy OpenClaw [Jun'26] on Railway

Self-hosted AI assistant. Runs on Telegram, WhatsApp, Slack, Discord

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-jun26)

## About

**OpenClaw** is an open-source, **self-hosted personal AI assistant** that connects to the chat apps you already use — **Telegram, WhatsApp, Slack, Discord**, and more. It runs your own AI agent on your own infrastructure, keeping your data private and under your control.

Hosting OpenClaw on Railway involves running the **OpenClaw gateway** inside a Docker container alongside a lightweight setup wizard for configuration. The gateway acts as a bridge between your chosen AI provider (**Anthropic, OpenAI, or Gemini**) and your connected chat channels. Railway handles SSL, networking, and uptime automatically. All configuration, credentials, and workspace files are persisted to a **Railway Volume** mounted at `/data`, so nothing is lost between redeploys. After deployment, you configure your AI provider and onboard channels through a password-protected web UI — no command line required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway-template | [Amritasha/openclaw-railway-template](https://github.com/Amritasha/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SETUP_PASSWORD` | (secret) | Generate: openssl rand -base64 18 |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `INTERNAL_GATEWAY_PORT` | 18789 | - |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Generate: openssl rand -hex 32 |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openclaw-jun26)
