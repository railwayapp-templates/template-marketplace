# Deploy Discord Bot Starter on Railway

A discord.js bot template written with TypeScript.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-bot-starter)

## About

Discord Bot Starter is a minimal TypeScript template for building Discord bots using the Sapphire framework. It provides a clean project structure with slash command support, Docker deployment, pnpm package management, and modern development tooling, making it an excellent starting point for creating production-ready Discord bots.

Railway provides an easy way to deploy your Discord bot without managing servers or infrastructure. This template automatically builds the application from its included Dockerfile and runs the bot continuously, ensuring it stays online 24/7. Railway manages deployments, environment variables, logs, and scaling while your bot connects directly to Discord using its Bot Token. Since the bot communicates with Discord over outbound connections, no public HTTP endpoint, database, or persistent storage is required unless your bot stores additional application data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| discord-bot-starter | [arloodots/discord-bot-starter](https://github.com/arloodots/discord-bot-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | - |
| `DISCORD_BOT_TOKEN` | (secret) | Your Discord bot token from the Developer Portal. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/discord-bot-starter)
