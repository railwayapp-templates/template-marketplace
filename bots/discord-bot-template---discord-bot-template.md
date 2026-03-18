# Deploy discord-bot-template on Railway

Type-safe Discord bot template with Bun + discord.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/discord-bot-template)

## About

A modern, type-safe Discord bot template built with Bun and TypeScript. It features dynamic command and event loading, robust environment variable validation using Zod, and a pre-configured setup for fast development. Ideal for developers seeking a high-performance, AI-ready foundation for building Discord bots with minimal boilerplate.

Hosting this template on Railway is streamlined thanks to its included `Dockerfile` and `railway.json` configuration. As a Discord bot, it runs as a persistent worker service that stays online to listen for events and interactions.

To deploy, you simply connect your repository to Railway and provide the required environment variables (`DISCORD_BOT_TOKEN` and `DISCORD_APPLICATION_ID`). The project utilizes the Bun runtime for rapid startup and execution. Railway handles the container creation and deployment automatically, ensuring your bot scales vertically as your server activity grows without requiring complex server management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| discord-bot-template | [caru-ini/discord-bot-template](https://github.com/caru-ini/discord-bot-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | info | Log level (debug, info, warn, error) |
| `DISCORD_BOT_TOKEN` | (secret) | - |

**Category:** Bots

[View on Railway →](https://railway.com/template/discord-bot-template)
