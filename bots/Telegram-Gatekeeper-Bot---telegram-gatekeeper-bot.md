# Deploy Telegram Gatekeeper Bot on Railway

Gatekeeper bot for Telegram groups to verify users on join.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/telegram-gatekeeper-bot)

## About

Hosting Telegram Gatekeeper Bot on Railway is simple and maintenance-free.
Railway builds and runs the bot using Docker, manages environment variables
securely, and keeps the service online without manual server management.
You only need to provide your Telegram bot token and optional configuration
values. Railway handles deployments, restarts, and scaling automatically,
making it ideal for running long-lived Telegram bots reliably.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Telegram-Gatekeeper-Bot | [BigDaddyAman/Telegram-Gatekeeper-Bot](https://github.com/BigDaddyAman/Telegram-Gatekeeper-Bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BOT_TOKEN` | (secret) | Telegram bot token from @BotFather. Bot must be added as admin to your Telegram group. |
| `VERIFY_TIMEOUT` | - | Seconds before kicking unverified users. Default is 60 seconds. |

**Category:** Bots · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/telegram-gatekeeper-bot)
