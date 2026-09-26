# Deploy opencode-telegram-bot on Railway

Telegram client for OpenCode coding tasks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-telegram-bot)

## About

Secure Telegram client for [OpenCode](https://opencode.ai). Run AI coding tasks, monitor progress, switch models, and manage sessions from your phone.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-telegram-bot)

No open ports, no exposed APIs. The bot talks to its bundled OpenCode server and the Telegram Bot API only.

The service runs the Telegram bot plus a bundled `opencode serve` backend in one container (Alpine, `linux/amd64`). Bot state (`settings.json`, logs, SQLite, OpenCode auth/sessions) and cloned workspace repos persist on the attached `/app/data` volume. Railway auto-detects the `Dockerfile`; restart policy is `ALWAYS`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode-telegram-bot | [NOOBGLITCH/opencode-telegram-bot](https://github.com/NOOBGLITCH/opencode-telegram-bot) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TELEGRAM_BOT_TOKEN` | (secret) |

## Configuration

- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, Shell, PowerShell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencode-telegram-bot)
