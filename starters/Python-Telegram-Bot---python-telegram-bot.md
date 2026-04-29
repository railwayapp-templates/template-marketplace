# Deploy Python Telegram Bot on Railway

Just 1-click setup. Telegram bot with commands, echo & menu buttons 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/python-telegram-bot)

## About

Python Telegram Bot is a simple starter bot built with `python-telegram-bot`. It includes ready-to-use commands, echo replies, persistent chat menu buttons, fallback handling for unknown commands, and environment-based configuration. This template is ideal for quickly launching a Telegram bot that works immediately after adding your bot token.

![](https://raw.githubusercontent.com/codestorm-official/python-telegram-bot/refs/heads/main/img/bot.png)

Hosting a Python Telegram Bot means running a long-lived Python process that connects to Telegram, listens for incoming messages, and responds through the Telegram Bot API. This template uses environment variables for configuration, so your bot token stays separate from the codebase. After deployment, the bot starts automatically and keeps running as a service. It uses long polling, so you do not need to configure a webhook or public domain. Once the `BOT_TOKEN` variable is added, the bot can respond to commands, normal text messages, and menu button interactions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| python-telegram-bot | [codestorm-official/python-telegram-bot](https://github.com/codestorm-official/python-telegram-bot) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOT_TOKEN` | (secret) |
| `LOG_LEVEL` | INFO |

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/python-telegram-bot)
