# Deploy OpenClaw on Railway

Deploy OpenClaw with a persistent volume on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-5)

## About

OpenClaw is a self-hosted AI agent gateway — all your chats, one OpenClaw. It connects a persistent AI agent to chat channels like Telegram, giving you an assistant with memory, skills, cron automations, and a web Control UI instead of a stateless one-off chatbot.

This template builds OpenClaw from source against a pinned release and runs it behind a lightweight setup wizard, so you can deploy without touching a terminal. A Railway Volume mounted at /data persists your config, credentials, and agent memory across deploys and restarts. On first boot, visit /setup (protected by a password you choose) to connect a model provider and a chat channel, and your agent goes live at your Railway domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway-template | [Lukem121/openclaw-railway-template](https://github.com/Lukem121/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SETUP_PASSWORD` | (secret) | Password to access /setup and the Control UI (HTTP Basic auth). |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Where OpenClaw stores config/credentials on the persistent volume. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Gateway admin token protecting the OpenClaw gateway and Control UI. Auto-generated if left unset. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Where the agent's default workspace lives on the persistent volume. |

## Configuration

- **Healthcheck:** `/setup/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-5)
