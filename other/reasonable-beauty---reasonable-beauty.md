# Deploy reasonable-beauty on Railway

Deploy and Host reasonable-beauty with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reasonable-beauty)

## About

This is a bot that publishes a fact about Gback 3 times a day

Python dependency, httpx, and no other dependencies.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gback-bot | [LucasCordova/gback-bot](https://github.com/LucasCordova/gback-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CHANNEL_ID` | 1474134600019349518 | Base URL of your chat API (no trailing slash) |
| `FACT_PROMPT` | Give me a random fact about gback | Optional: for POST /api/chat JSON body (if your API expects shop/token/session_id) |
| `CHAT_API_URL` | https://gback-production-616d.up.railway.app | Optional: prompt sent to the chat API (default: Give me a random fact) |
| `CHAT_API_SHOP` | shop | - |
| `CHAT_SESSION_ID` | fact-bot | Optional: only for fact_bot.py (long-running) — minutes between posts |
| `CHAT_WIDGET_TOKEN` | (secret) | - |
| `DISCORD_BOT_TOKEN` | (secret) | Discord channel ID (Developer Mode → right-click channel → Copy ID) |

**Category:** Other · **Languages:** Python

[View on Railway →](https://railway.com/deploy/reasonable-beauty)
