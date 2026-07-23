# Deploy Telegram Bot Starter Kit (Python) on Railway

Python Telegram bot: aiogram 3 webhooks, secret-token auth, Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-starter-kit-python)

## About

A production-ready Python Telegram bot starter built on aiogram 3: webhook-based (no polling, near-zero idle compute), secret-token validation on every Telegram request, optional Postgres persistence, a /healthz endpoint, and JSON logs. Paste a BotFather token, deploy, and your bot is live in about a minute.

This template builds the bot from a public GitHub repo (aiogram 3 + aiohttp) and deploys it with a generated public HTTPS domain. On boot the bot registers its webhook with Telegram automatically and validates the X-Telegram-Bot-Api-Secret-Token header on every update, so nobody but Telegram can hit your endpoint. A Postgres 17 service (private networking only) stores users and state; delete the DATABASE_URL variable and the bot falls back to in-memory storage. Webhooks mean the container sits idle between messages - on Railway's usage-based pricing that keeps hosting cost close to zero for small bots.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bot | [niteshkumargupta/telegram-bot-railway-template](https://github.com/niteshkumargupta/telegram-bot-railway-template) (root: /app) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | bot | - | Postgres connection string (private networking). Delete this variable to run with in-memory storage instead. |
| `WEBHOOK_SECRET` | bot | (secret) | Auto-generated secret validated on every Telegram webhook request (X-Telegram-Bot-Api-Secret-Token header). Do not change. |
| `TELEGRAM_BOT_TOKEN` | bot | (secret) | REQUIRED - Your Telegram bot token. Open https://t.me/BotFather, send /newbot, choose a name and a username ending in bot, then paste the token shown (looks like 123456789:AAH8x...). Keep it secret. |
| `POSTGRES_DB` | Postgres | railway | Database name used by the bot. |
| `DATABASE_URL` | Postgres | - | Connection string the bot uses over private networking. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated Postgres password. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/telegram-bot-starter-kit-python)
