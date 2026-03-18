# Deploy Telegram JavaScript Bot on Railway

A template for Telegram bot in JavaScript using grammY

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5lRkWa)

## About

Telegram-JavaScript-Bot is a simple Telegram bot made with JavaScript. It uses [grammY](https://grammy.dev)

## Features:
- Categories for commands
- Command handler (add commands in [commands](./commands))
- Error handler
- Command aliases (check [8ball](./commands/8ball.js) command, can add multiple aliases)

## Commands
- `/start` - Start the bot

#### Categories

##### Utilities
- `/help` - Show help

##### Fun
- `/8ball` - Ask the magic 8-ball a question

## Environment Variables
- `BOT_TOKEN` - Telegram bot token, get it from [@BotFather](https://t.me/BotFather)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Telegram JavaScript Bot | [agam778/Telegram-JavaScript-Bot](https://github.com/agam778/Telegram-JavaScript-Bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BOT_TOKEN` | (secret) | Telegram bot token - Get from @BotFather |

**Category:** Bots · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/5lRkWa)
