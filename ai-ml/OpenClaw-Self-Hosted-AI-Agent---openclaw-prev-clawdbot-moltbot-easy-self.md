# Deploy OpenClaw – Self-Hosted AI Agent on Railway

Self-hosted OpenClaw: deploy your private AI agent on Railway in one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-prev-clawdbot-moltbot-easy-self)

## About

OpenClaw (formerly Clawdbot and Moltbot) is the open-source AI agent with 328k+ GitHub stars that
goes beyond chat — it browses the web, manages files, runs commands, handles email, and works
autonomously on your behalf, accessible from WhatsApp, Telegram, Discord, Slack, iMessage, and
20+ other messaging platforms. This template deploys a fully configured, production-ready OpenClaw
instance on Railway with a one-click setup — no terminal access, no VPS, no DevOps knowledge
required.

---

Running OpenClaw in production means keeping a persistent Node.js gateway alive 24/7, managing
secure credentials for your LLM provider and messaging platforms, handling HTTPS termination, and
ensuring config and memory survive redeploys. Without a managed host, you're looking at VPS setup,
Nginx config, SSL certificates, process managers, and manual Docker maintenance.

Railway handles all of it. This template provisions the gateway with automatic HTTPS, injects
secrets as environment variables, and mounts a persistent volume so your OpenClaw instance — its
memory, channel auth, and workspace — survives every redeploy without any manual intervention on
your part.

Typical cost: **~$1–3/month** on Railway's Hobby plan, depending on usage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openclaw Main | [sahilrupani/openclaw-railway-template](https://github.com/sahilrupani/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `ENABLE_WEB_TUI` | false | Enable / Disable web based TUI |
| `SETUP_PASSWORD` | (secret) | Password for the setup (no username required) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | - |
| `INTERNAL_GATEWAY_PORT` | 18789 | - |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Token for the gateway. Set it to something secure (you need to paste this on the UI on first run) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, HTML, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openclaw-prev-clawdbot-moltbot-easy-self)
