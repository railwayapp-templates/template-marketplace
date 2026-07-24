# Deploy n8n Lite — One-Service Workflow Automation on Railway

Cheapest self-hosted n8n — single service, SQLite on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-lite-single-service)

## About

n8n is a fair-code workflow automation platform — a self-hostable alternative to Zapier and Make that connects 400+ apps, APIs, and databases through a visual node editor, with full code escape hatches when drag-and-drop isn't enough.

This is the lightest possible way to run it: **one service, no database container**, using n8n's built-in SQLite store on a persistent volume. It's the cheapest self-hosted n8n that doesn't lose your work.

---

n8n stores its workflows in SQLite by default, and on a container platform that is either perfectly fine or a disaster, depending on one thing: whether the storage directory is on a persistent volume. Without a volume, `/home/node/.n8n` is ephemeral and a single redeploy wipes every workflow and credential you've built. With one, SQLite is a legitimate production store for personal and low-volume use.

This template mounts that volume. Your workflows, credentials, and execution history live on it and persist across restarts, redeploys, and upgrades.

The variable that matters most is **`N8N_ENCRYPTION_KEY`**. n8n encrypts every stored credential with it. Set it once, keep it stable, and back it up — if it changes or is lost, every saved credential becomes permanently unreadable and you re-enter them all by hand. This template pins it explicitly rather than letting n8n regenerate one, which is the single most common way self-hosted users lose access to their work.

SQLite's limit is concurrency: it locks the database on writes, so many simultaneous executions will queue behind each other. For one person or a small set of scheduled workflows that never matters. For heavy parallel processing, move up to PostgreSQL.

Typical cost: **~$5/month** on Railway's Hobby plan — one service, no database container, no per-execution billing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8n-io/n8n:latest` | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `GENERIC_TIMEZONE` | The n8n instance timezone |

## Configuration

- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-lite-single-service)
