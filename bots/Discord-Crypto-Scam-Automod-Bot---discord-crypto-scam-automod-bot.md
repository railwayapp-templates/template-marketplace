# Deploy Discord Crypto Scam Automod Bot on Railway

Detect and remove cross-channel crypto scam spam automatically.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-crypto-scam-automod-bot)

## About

Automatically detect image-based crypto spam across Discord channels. The bot times out suspected spammers, removes their recent messages, and sends moderators an incident report.

Deploy the bot as one Railway service with no database. Provide your Discord bot token and moderation log channel, invite the bot with moderation permissions, and enable its required Discord intents.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scam-automod-bot | [Flohhhhh/scam-automod-bot](https://github.com/Flohhhhh/scam-automod-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NEST_ENV` | - | Runtime environment. Use "production" for Railway deployments. |
| `DISCORD_BOT_TOKEN` | (secret) | Secret bot token from the Discord Developer Portal (bot page). |
| `DISCORD_MOD_LOG_CHANNEL_ID` | - | Discord channel ID where moderation reports will be posted. Must be in the same server as the bot is invited to of course. |

## Configuration

- **Healthcheck:** `/health`

**Category:** Bots · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/discord-crypto-scam-automod-bot)
