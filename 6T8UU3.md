# Deploy chatgpt-telegram-bot-telegraf on Railway

Deploy ChatGPT Telegram Bot with optional Pinecone on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6T8UU3)

## About

# Railway Deployment Template for ChatGPT Telegram Bot via Telegraf

This template sets up the chatgpt-telegram-bot-telegraf on Railway with the following features:

- **Node.js Environment**: Automatically installs dependencies and starts the Telegram bot.
- **PostgreSQL Database**: Configures a PostgreSQL database for storing user data and messages.
- **Pinecone Integration**: Optional long-term memory support using Pinecone.

Enjoy seamless deployment and scaling with Railway's infrastructure!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| chatgpt-telegram-bot-telegraf | [kirill-markin/chatgpt-telegram-bot-telegraf](https://github.com/kirill-markin/chatgpt-telegram-bot-telegraf) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `SETTINGS_PATH` | chatgpt-telegram-bot-telegraf | ./settings/private_en.yaml | - |
| `OPENAI_API_KEY` | chatgpt-telegram-bot-telegraf | (secret) | - |
| `TELEGRAM_BOT_TOKEN` | chatgpt-telegram-bot-telegraf | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** TypeScript, Jupyter Notebook, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/6T8UU3)
