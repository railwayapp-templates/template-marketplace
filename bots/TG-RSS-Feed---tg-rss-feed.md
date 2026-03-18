# Deploy TG RSS Feed on Railway

Deploy and Host TG RSS Feed with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tg-rss-feed)

## About

TG RSS Feed is a Telegram bot that automatically fetches content from RSS/Atom feeds and delivers them directly to your Telegram chat. Keep your channels, groups, or personal chats updated with the latest news, blogs, or custom feeds with minimal setup and maintenance.

Hosting TG RSS Feed on Railway is straightforward and requires minimal configuration. The bot runs on Bun runtime, which ensures fast and efficient execution. It uses a JSON file to store feed subscriptions, eliminating the need for a separate database. Once deployed, Railway keeps the bot running 24/7, handling uptime, scaling, and network configuration. You only need to provide your Telegram `BOT_TOKEN` in the environment variables, and the bot will automatically poll feeds and send new posts to your specified chats.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TG-Feed | [MohammadTaseenKhan/TG-Feed](https://github.com/MohammadTaseenKhan/TG-Feed) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOT_TOKEN` | (secret) |

## Configuration

- **Start command:** `node bot.js`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/tg-rss-feed)
