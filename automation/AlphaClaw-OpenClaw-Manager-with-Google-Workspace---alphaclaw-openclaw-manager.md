# Deploy AlphaClaw — OpenClaw Manager with Google Workspace on Railway

Run OpenClaw 24/7 with watchdog, GitHub backup & Google OAuth. One env var.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alphaclaw-openclaw-manager)

## About

AlphaClaw is the open-source management harness and watchdog for OpenClaw — the layer that keeps
your AI assistant alive 24/7, version-controls your entire agent configuration to GitHub, and
connects OpenClaw to Google Workspace (Gmail, Calendar, Drive, Contacts, Sheets) via built-in
OAuth. Where a plain OpenClaw deployment gives you an AI agent, AlphaClaw gives you a
production-grade AI assistant that monitors itself, backs up automatically, and never goes dark.

One environment variable at deploy time. Everything else is configured in the browser.

---

Running OpenClaw reliably in production means more than just keeping a container alive — it
means handling crashes and restarts without losing context, keeping agent config and memory
backed up, managing API credentials securely without committing secrets to git, and connecting
Google Workspace tools through a proper OAuth flow rather than manual token configuration.

AlphaClaw handles all of this as a management layer on top of OpenClaw. The watchdog monitors
the OpenClaw process and restarts it automatically on failure. All configuration, cron jobs,
and agent memory are continuously version-controlled to a private GitHub repository — your
agent's entire state is recoverable from git at any point. Secrets are stored as Railway
environment variables and replaced with `${ENV_VAR}` references in git, so credentials are
never committed.

Typical cost: **~$2–5/month** on Railway's Hobby plan — one service plus a persistent volume.
No database required. No Redis. The simplest production OpenClaw stack available.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Alphaclaw | [sahilrupani/alphaclaw](https://github.com/sahilrupani/alphaclaw) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `WEBHOOK_TOKEN` | (secret) |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/alphaclaw-openclaw-manager)
