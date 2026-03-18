# Deploy Telegram Webhook Gateway on Railway

Telegram webhook gateway with durable queue and retry support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-webhook-gateway)

## About

Telegram Webhook Gateway is a small, production-ready service that receives Telegram bot webhooks, stores events durably, and forwards them to one or more backend services with retries, fan-out, and optional signature verification. It helps make Telegram webhooks reliable and easier to integrate with real systems.

Hosting Telegram Webhook Gateway involves running a lightweight FastAPI service with a persistent SQLite-backed queue and a background worker. Telegram sends webhook updates to the gateway, which immediately acknowledges them and processes delivery asynchronously. This setup prevents data loss during restarts, handles temporary downstream failures with retries, and allows a single Telegram bot to send events to multiple services. Railway handles HTTPS, environment variables, and persistent storage, so no manual infrastructure setup is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Telegram-Webhook | [BigDaddyAman/Telegram-Webhook-Gateway](https://github.com/BigDaddyAman/Telegram-Webhook-Gateway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BOT_TOKEN` | (secret) | Telegram bot token from @BotFather |
| `PUBLIC_MODE` | false | Allow messages from any chat (true / false) |
| `SQLITE_PATH` | ./events.db | Path to the SQLite database file used for the queue |
| `QUEUE_BACKEND` | sqlite | Queue backend to use (default: sqlite) |
| `OUTBOUND_SECRET` | (secret) | Optional HMAC secret for signing outgoing webhooks (example: mysecret123) |
| `MAX_BODY_SIZE_KB` | 512 | Max allowed size of incoming webhook payload (KB) |
| `RATE_LIMIT_PER_MIN` | 30 | Max messages per chat per minute |
| `AUTHORIZED_CHAT_IDS` | - | Comma-separated list of allowed Telegram chat IDs |
| `TARGET_WEBHOOK_URLS` | - | Comma-separated list of webhook URLs to forward events to |
| `TELEGRAM_SECRET_TOKEN` | (secret) | Secret token to verify Telegram webhook requests (example: supersecret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Queues · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/telegram-webhook-gateway)
