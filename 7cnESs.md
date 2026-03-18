# Deploy telegram-bot on Railway

Build modern Telegram bots quickly with TypeScript and Telegraf

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7cnESs)

## About

This is a deploy-ready Telegram Bot Starter Kit built with TypeScript and Telegraf. It includes features like SWC for fast compilation, Redis session storage, structured bot command handlers, and support for webhooks. Ideal for quickly building and deploying modern Telegram bots. The example branch is pre-configured with sample commands and scenes to help you get started faster. Use this template to explore Telegram bot development with clean code, modular structure, and Railway integration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Telegram Bot | [agoenks29D/Telegram-Bot](https://github.com/agoenks29D/Telegram-Bot) (branch: example) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone setting for the application environment. UTC ensures consistency across deployments. |
| `PORT` | 3000 | Port number on which the server will listen. Default is 3000. |
| `NODE_ENV` | production | Defines the environment mode. Typically set to development, production, or test. |
| `BOT_STORE` | redis | Session storage backend. Set to redis to use Redis for session persistence. |
| `BOT_TOKEN` | (secret) | Telegram bot token obtained from BotFather. Keep this secret! |
| `REDIS_URL` | - | Connection string for Redis instance. Format: redis://<host>:<port>. |
| `BOT_WEBHOOK_PATH` | / | URL path that Telegram will send updates to. Usually set to /. |
| `BOT_WEBHOOK_DOMAIN` | - | Publicly accessible HTTPS URL to receive webhook updates. |
| `BOT_WEBHOOK_ENABLE` | true | Set to true to enable webhook mode (instead of long polling). |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`

**Category:** Starters · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/7cnESs)
