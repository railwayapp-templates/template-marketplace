# Deploy Telegram Bot Studio on Railway

Manage your Telegram bot with a built-in admin panel UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-studio)

## About

Telegram Bot Studio is a self-hosted Telegram bot starter with a built-in admin panel UI. It helps you deploy a Telegram bot quickly, protect the panel with your own login credentials, and store application data using PostgreSQL. This template is designed for fast Railway deployment with minimal setup.

![Telegram Bot Studio](https://raw.githubusercontent.com/codestorm-official/telegram-bot-studio/refs/heads/main/img/bot.png)

Hosting Telegram Bot Studio on Railway gives you a ready-to-run Telegram bot environment with a web-based admin panel. The bot connects to Telegram using your bot token, while the admin panel is protected using the username and password you provide during deployment. PostgreSQL is included for persistent storage, so application data and configuration can survive redeployments. Railway manages the runtime, database, networking, and deployment flow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Telegram Bot Studio | `ghcr.io/codestorm-official/telegram-bot-studio:1.0.0` | Web service |

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
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/telegram-bot-studio)
