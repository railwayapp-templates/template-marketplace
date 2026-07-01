# Deploy OpenClaw – Self-Hosted AI Agent on Railway

Self-hosted OpenClaw: deploy your private AI agent on Railway in one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-prev-clawdbot-moltbot-easy-self)

## About

![OpenClaw AI Agent](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/openclaw/openclaw)

OpenClaw (formerly Clawdbot and Moltbot) is the open-source AI agent with 328k+ GitHub stars
that goes beyond chat — it browses the web, manages files, runs commands, handles email, and
works autonomously on your behalf, accessible from WhatsApp, Telegram, Discord, Slack, iMessage,
and 20+ other messaging platforms.

**Self-host a personal AI agent for ~$1–3/month** — compared to $20/month for ChatGPT Plus,
$20/month for Claude Pro, or Manus AI which is cloud-only with no self-host option. Full data
ownership. No usage caps. No subscription.

---

Running OpenClaw in production means keeping a persistent Node.js gateway alive 24/7, managing
secure credentials, handling HTTPS, and ensuring config and memory survive redeploys. Without a
managed host, that's VPS setup, Nginx, SSL, process managers, and manual Docker maintenance.

Railway handles all of it. This template mounts a **5 GB persistent volume** at `/data`,
provisions the gateway with automatic HTTPS, and injects secrets as environment variables.
OpenClaw's memory, channel auth, and workspace survive every redeploy. The browser-based `/setup`
wizard configures everything after deploy — no SSH, no terminal, no config files.

Typical cost: **~$1–3/month** on Railway's Hobby plan. ChatGPT Plus costs $20/month. Claude
Pro costs $20/month. Manus AI is cloud-only with no self-host option. OpenClaw on Railway gives
you an autonomous AI agent at a fraction of the cost with full data ownership.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openclaw | [sahilrupani/openclaw-railway-template](https://github.com/sahilrupani/openclaw-railway-template) | Web service |

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
