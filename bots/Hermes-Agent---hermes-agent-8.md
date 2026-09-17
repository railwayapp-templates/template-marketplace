# Deploy Hermes Agent on Railway

One-click Hermes Agent on Railway with gateway + web dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-8)

## About

One-click deploy of [Hermes Agent](https://github.com/NousResearch/hermes-agent) — the self-improving AI agent by [Nous Research](https://nousresearch.com) — on [Railway](https://railway.app), using the official `nousresearch/hermes-agent` image with the built-in web dashboard enabled.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-8)

Hosting Hermes Agent means running a persistent gateway process that connects your messaging platforms (Telegram, Discord, Slack, WhatsApp) to an LLM-powered agent, alongside a web dashboard for configuration and monitoring.

The template deploys a single Railway service:

- **Gateway** — supervised by s6-overlay inside the container; if it crashes, it restarts automatically
- **Web dashboard** — config editor, API keys, messaging channels, sessions, logs, cron jobs, and browser chat
- **Volume at `/opt/data`** — all agent state (config, keys, skills, memories, sessions) persists across restarts and upgrades

**Resource sizing:** at least 2 GB of RAM (4 GB recommended with browser tools); the image is ~1 GB.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-hermes-agent-template | [TheGreatAxios/railway-hermes-agent-template](https://github.com/TheGreatAxios/railway-hermes-agent-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** Bots · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-8)
