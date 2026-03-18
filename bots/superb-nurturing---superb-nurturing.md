# Deploy superb-nurturing on Railway

bot for transform link from inst

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/superb-nurturing)

## About

A Telegram bot that automatically converts Instagram links to working preview links using InstaFix domains. When users share Instagram posts in Telegram chats, the bot detects these links and responds with fixed versions that display proper previews and media content.

This bot runs continuously as a Node.js service using the Telegram Bot API. It monitors all messages in connected chats for Instagram URLs, then automatically responds with converted links that use alternative domains (like ddinstagram.com) to bypass Telegram's Instagram preview restrictions. The deployment includes TypeScript compilation, polling-based message handling, and environment variable configuration for the bot token.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| transform_insta_link | [Genexys/transform_insta_link](https://github.com/Genexys/transform_insta_link) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TELEGRAM_BOT_TOKEN` | (secret) |

**Category:** Bots · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/superb-nurturing)
