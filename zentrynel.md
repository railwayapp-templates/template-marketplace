# Deploy Zentrynel on Railway

Deploy and Host Zentrynel with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zentrynel)

## About

Zentrynel is a sharding-ready Discord moderation bot built with Bun and discord.js v14. It features slash commands, an escalating strike system with configurable thresholds, and per-server configuration. Protect your community with automatic mute, kick, and ban escalation out of the box.

Hosting Zentrynel on Railway is straightforward. The bot runs as a Docker container using the `oven/bun:1-alpine` base image. It uses SQLite for data storage, which persists on a mounted volume at `/app/data`. You need a Discord bot token and application client ID from the Discord Developer Portal. Once deployed, the bot automatically initializes its database, connects to Discord, and begins responding to slash commands. Register your slash commands by running `bun run register` or setting `DEV_GUILD_ID` for instant guild-scoped registration during development.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Zentrynel | `wgtechlabs/zentrynel` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CLIENT_ID` | - | Your application Client ID |
| `DISCORD_TOKEN` | (secret) | Your Discord Bot token |

## Configuration

- **Volume:** `/app/data`

**Category:** Bots

[View on Railway →](https://railway.com/template/zentrynel)
