# Deploy DiscordJS ESM on Railway

DiscordJS ESM bot boilerplate with Railway deployment and dev scripts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discordjs-esm)

## About

**DiscordJS ESM** is a modern boilerplate for building Discord bots using Discord.js with ECMAScript Modules (ESM) instead of the older CommonJS format. It aligns with the latest JavaScript standards and simplifies deployment by including everything needed to run the bot locally or on Railway with minimal setup.

Hosting a DiscordJS ESM bot involves setting up a Discord application, configuring bot commands, and deploying the code to a cloud platform. This template provides a pre-configured environment for Railway, including a `railway.json` file, Node.js `.gitignore`, and helpful npm scripts for registering and running your bot. Designed for simplicity, the boilerplate covers DiscordJS setup using ESM syntax while streamlining development and deployment workflows. Whether testing locally or deploying to production, this template supports both with clear command-line instructions and environment configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| discordjs-bot-railway-template | [dashdesai/discordjs-bot-railway-template](https://github.com/dashdesai/discordjs-bot-railway-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GUILD_ID` | - | The ID of the Discord Server you wish to deploy to |
| `DISCORD_TOKEN` | (secret) | The Bot Token from Discord Developer Portal |
| `APPLICATION_ID` | - | The Application ID from Discord Developer Portal |

**Category:** Bots · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/discordjs-esm)
