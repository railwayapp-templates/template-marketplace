# Deploy Telegram Bot Studio — Self-Hosted Bot with Admin Panel on Railway

Self-host a Telegram bot with admin panel & PostgreSQL. No code needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-admin-panel)

## About

![Telegram Bot Studio admin panel](https://raw.githubusercontent.com/codestorm-official/telegram-bot-studio/refs/heads/main/img/bot.png)

Telegram Bot Studio is a self-hosted Telegram bot starter with a built-in web admin panel —
deploy a working bot in minutes, manage it through a password-protected UI, and persist all
data in PostgreSQL. No coding required to get running, no servers to configure, no polling
infrastructure to manage. Bring your BotFather token, set a panel login, and your bot is live.

Self-host on Railway for ~$5/month — own your bot, your data, and your panel, with no
third-party bot-builder subscription and no per-message fees.

---

Running a Telegram bot in production means keeping a long-lived process connected to Telegram's
API, persisting configuration and data through restarts, and securing whatever admin interface
you use to manage it. Without a managed host, that's a VPS, a process manager, a database, and
manual deployment to maintain.

Railway handles all of it. This template deploys the bot connected to a managed PostgreSQL
instance over private networking, with the admin panel protected by credentials you set at
deploy time. Your bot stays online 24/7 and your data survives every redeploy.

Typical cost: **~$5/month** on Railway's Hobby plan for the bot and PostgreSQL. Hosted Telegram
bot builders like Manybot and Chatfuel charge monthly subscriptions and cap features behind
paid tiers. Self-hosting on Railway gives you full control at flat compute cost.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Telegram Bot Studio | `codestorm-official/telegram-bot-studio:1.0.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Telegram Bot Studio | 8080 | - |
| `BOT_TOKEN` | Telegram Bot Studio | (secret) | - |
| `LOG_LEVEL` | Telegram Bot Studio | INFO | - |
| `PANEL_PASSWORD` | Telegram Bot Studio | (secret) | - |
| `PANEL_USERNAME` | Telegram Bot Studio | (secret) | - |
| `PANEL_SECRET_KEY` | Telegram Bot Studio | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/telegram-bot-admin-panel)
