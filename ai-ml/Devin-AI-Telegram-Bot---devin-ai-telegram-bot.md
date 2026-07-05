# Deploy Devin AI — Telegram Bot on Railway

Deploy Devin, your friendly AI software engineer, directly into Telegram.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/devin-ai-telegram-bot)

## About

A self-hosted Telegram bot that integrates with the Devin AI API. Start autonomous coding sessions, review PRs, write tests, and fix bugs directly from Telegram chats and group threads.

Devin Telegram Bot brings AI-powered autonomous coding to your Telegram workspace. Deploy the bot as a persistent service on Railway, connect it to your Devin AI account, and let your team start coding sessions without leaving Telegram. The bot manages real-time session polling, chat/thread-based conversations, PostgreSQL-backed session persistence, and status updates—all self-hosted under your control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Devin AI | `wgtechlabs/devin-telegram-bot:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LOG_LEVEL` | Devin AI | info | Application Log Level (debug | info | warn | error) |
| `DATABASE_URL` | Devin AI | - | PostgreSQL Database Connection String |
| `DEVIN_ORG_ID` | Devin AI | - | Devin Organization ID (format: org_...) |
| `DEVIN_API_KEY` | Devin AI | (secret) | Devin API Key (format: cog_...) |
| `TELEGRAM_BOT_TOKEN` | Devin AI | (secret) | Telegram Bot Token |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/devin-ai-telegram-bot)
