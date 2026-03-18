# Deploy Discord Necord Bot on Railway

A solid Discord bot foundation built with NestJS that scales to any size

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/discord-nestjs-bot)

## About

Discord NestJS Bot Template is a foundation for building scalable Discord bots using NestJS, Necord, and Discord.js. It provides a clean, modular structure, built-in examples, and guides that help beginners and advanced developers alike quickly set up and extend their bots with commands, events, and integrations.

Hosting a Discord NestJS Bot on Railway means your bot is always online, automatically redeploys when you push changes to GitHub, and scales seamlessly with your needs. The template is pre-configured for cloud deployment, so you can skip server setup and focus on building your bot’s features. With NestJS under the hood, you also gain the ability to extend your bot into a REST API or full-stack application without changing platforms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord Bot | [maxijonson/discord-nestjs-bot-template](https://github.com/maxijonson/discord-nestjs-bot-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NEST_ENV` | production | One of "production", "staging" or "development". "development" should only be used on your own machine, not here. "staging" can be used if you deploy this as a test environment. Leave as "production" otherwise. |
| `DISCORD_BOT_TOKEN` | (secret) | Your bot token can be obtained from the "Bot" tab of your Discord Application: https://discord.com/developers/applications |

**Category:** Bots · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/discord-nestjs-bot)
