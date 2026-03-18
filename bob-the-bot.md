# Deploy Bob the Bot on Railway

Deploy and Host Bob the Bot with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bob-the-bot)

## About

An autonomous assistant agent capable of growing. Telegram fully optional. Built for simplicity, with a native UI.

Simply add an api key for OpenRouter or your other preferred provider and a password and spin it up on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bobbot | [thegreataxios/bobbot](https://github.com/thegreataxios/bobbot) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | ./data | - |
| `LLM_MODEL` | openrouter/free | Override for non Open Router |
| `LOG_LEVEL` | info | - |
| `LLM_API_KEY` | (secret) | LLM API Key |
| `LLM_BASE_URL` | - | Defaults to OpenRouter. Override for Z.AI, Kimi, MiniMax |
| `CHAT_PASSWORD` | (secret) | Your password to access chat UI |
| `KEY_MANAGER_SECRET` | (secret) | Secret Management Key |
| `TELEGRAM_ADMIN_IDS` | - | Admin User Ids |
| `TELEGRAM_BOT_TOKEN` | (secret) | From @BotFather |

## Configuration

- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/template/bob-the-bot)
