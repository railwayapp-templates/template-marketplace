# Deploy gback-bot-template on Railway

Deploy and Host gback-bot-template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gback-bot-template-1)

## About

This is a bot template for Railway that posts a random fact.

Host it on Railway as a cron.

Deploy the Railway template and configure the environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gback-bot | [LucasCordova/gback-bot](https://github.com/LucasCordova/gback-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CHANNEL_ID` | - | Discord channel ID to post in. |
| `FACT_PROMPT` | - | Prompt sent to the chat API. |
| `CHAT_API_URL` | - | Base URL of the chat API |
| `INTERVAL_MINUTES` | 60 | Minutes between scheduled posts (fact_bot.py only) |
| `DISCORD_BOT_TOKEN` | (secret) | Bot token from the Developer Portal. |

**Category:** Other · **Languages:** Python

[View on Railway →](https://railway.com/deploy/gback-bot-template-1)
