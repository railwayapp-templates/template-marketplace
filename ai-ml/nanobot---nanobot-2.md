# Deploy nanobot on Railway

🐈 nanobot: The Ultra-Lightweight OpenClaw

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nanobot-2)

## About

nanobot is an ultra-lightweight personal AI assistant inspired by OpenClaw, delivering core agent functionality in just ~4,000 lines of code — 99% smaller than Clawdbot's 430k+ lines.

This template provides a straightforward setup for nanobot with data persistence, using telegram as channel (you can change it by editing the config.json file)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nanobot | [Lima-e-Silva/nanobot](https://github.com/Lima-e-Silva/nanobot) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Your API key for the chosen provider |
| `LLM_MODEL` | x-ai/grok-4.1-fast | Which model to use? (ex: gpt-5.1, moonshotai/kimi-k2.5) |
| `TELEGRAM_ID` | - | Your Telegram account's ID |
| `LLM_PROVIDER` | openrouter | Which LLM provider to use? (ex: openai, anthropic, openrouter) |
| `TELEGRAM_BOT_TOKEN` | (secret) | Your bot's token generated in Telegram's BotFather |

## Configuration

- **Volume:** `/root/.nanobot`

**Category:** AI/ML · **Languages:** Python, TypeScript, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/nanobot-2)
