# Deploy Telegram Bot | Python Starter That Says When the Token Is Wrong on Railway

Telegram bot in Python on Railway — clear errors when the token is wrong.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-or-python-starter-that-says)

## About

A minimal Telegram bot in Python on the official Bot API, with python-telegram-bot 22 and long polling, so there is no domain or webhook to set up. When the token is wrong, the log says so in one sentence.

Paste one value: the bot token from @BotFather.

One service, built from [ak40u/telegram-bot-python-railway-starter](https://github.com/ak40u/telegram-bot-python-railway-starter):

- **Telegram Bot**: polls the Bot API for updates and answers `/start`, `/help` and any text with an echo. No public domain, because long polling needs none.

To get a token, open [@BotFather](https://t.me/BotFather) in Telegram, send `/newbot`, and copy the token it gives you. After the deploy the log prints `Logged in as @yourbot`; open the bot and send `/start`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Telegram Bot | [ak40u/telegram-bot-python-railway-starter](https://github.com/ak40u/telegram-bot-python-railway-starter) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TELEGRAM_BOT_TOKEN` | (secret) |

**Category:** Bots · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/telegram-bot-or-python-starter-that-says)
