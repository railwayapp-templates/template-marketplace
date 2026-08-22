# Deploy Telegram Bot (Python 3.12) on Railway

Webhook Telegram bot pinned to Python 3.12. Set TELEGRAM_BOT_TOKEN.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-python-312)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-py312)

Webhook Telegram bot pinned to Python 3.12 so it does not crash on Railpack default Python 3.13 (`imghdr` removed, PEP 594). Set `TELEGRAM_BOT_TOKEN` from BotFather and deploy. Healthcheck: `GET /healthz`.

This template runs an ASGI webhook server (`python-telegram-bot` v21 + `uvicorn`) on Railway. Railpack builds Python from `.python-version` and `RAILPACK_PYTHON_VERSION=3.12`. The process binds `PORT` and serves `/healthz` even if the token is missing. When `TELEGRAM_BOT_TOKEN` is set, it registers `https://$RAILWAY_PUBLIC_DOMAIN/webhook`. No volume. No database. Webhooks fit Railway better than long polling because the service must pass an HTTP healthcheck.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| telegram-bot-py312 | [bhanuvadlakonda/telegram-bot-py312](https://github.com/bhanuvadlakonda/telegram-bot-py312) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TELEGRAM_BOT_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** Python

[View on Railway →](https://railway.com/deploy/telegram-bot-python-312)
