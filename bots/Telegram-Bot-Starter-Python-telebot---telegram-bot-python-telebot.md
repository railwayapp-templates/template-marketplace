# Deploy Telegram Bot Starter — Python + telebot on Railway

Production-ready Python Telegram bot: commands, keyboards, long polling

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-python-telebot)

## About

This template deploys a production-ready Telegram bot written in Python with the `pyTelegramBotAPI` (telebot) library. It ships with a real command router, inline and reply keyboards, error handling, and graceful shutdown — not just an echo loop — so you have a foundation to build on rather than a snippet to rewrite.

Add your bot token, deploy, and the bot is live in under two minutes.

---

A Telegram bot is a long-lived process: it opens a connection to Telegram, waits for messages, and replies. That sounds trivial until you host it. On a laptop it stops the moment you close the lid. On a bare VPS you are writing systemd units, handling restarts, and babysitting a process that dies silently at 3am.

Railway keeps the process alive. The service restarts automatically on failure, redeploys on every push, and streams logs so you can see exactly what your bot received and how it replied. Because this template uses long polling, there is nothing to expose publicly — no webhook URL, no TLS, no domain.

Dependencies are managed with `uv`, so cold builds are fast and the lockfile keeps production identical to local.

Typical cost: **~$5/month** on Railway's Hobby plan for a single always-on bot, flat regardless of how many users it serves.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Telegram Bot Python | [aeither/telegram-bot-python](https://github.com/aeither/telegram-bot-python) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TELEGRAM_BOT_TOKEN` | (secret) |

**Category:** Bots · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/telegram-bot-python-telebot)
