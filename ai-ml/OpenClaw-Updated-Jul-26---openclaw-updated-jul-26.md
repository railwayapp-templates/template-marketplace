# Deploy OpenClaw [Updated Jul '26] on Railway

OpenClaw [Jul '26] (Self-Hosted AI Assistant & Multi-Channel Bot) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-updated-jul-26)

## About

OpenClaw is your personal AI assistant running on your own infrastructure, accessible across WhatsApp, Telegram, Slack, Discord, Signal, iMessage, and 12+ other messaging platforms. Instead of relying on cloud services that log your conversations, OpenClaw keeps everything local while staying connected to the apps you already use every day.

Self-hosting OpenClaw means your assistant and entire conversation history remain under your control. Railway handles the infrastructure complexity - managed storage, automatic HTTPS, and zero-config networking - while you keep complete ownership of your data. Deploy the gateway, pair your local devices via the CLI, and start chatting. Your workspace stays private, your model choice stays yours, and your message history never leaves your servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway | [shruti060701/openclaw-railway](https://github.com/shruti060701/openclaw-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for the gateway (e.g., UTC, America/New_York). |
| `PORT` | 18789 | The public port the wrapper listens on; Railway routes your domain to this. |
| `SETUP_PASSWORD` | (secret) | Password protecting the /setup page, where you approve new device pairing requests. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Authentication token for the gateway API (auto-generated on first startup — paste this into the Control UI's "Gateway Token" field to connect). |
| `OPENCLAW_DISABLE_BONJOUR` | 1 | Disables Bonjour/mDNS device discovery, which doesn't work inside a container. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.openclaw`

**Category:** AI/ML · **Languages:** JavaScript, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-updated-jul-26)
