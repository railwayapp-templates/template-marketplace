# Deploy Discord4J Bot on Railway

A template for deploying Discord bots with Discord4J

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/GnBRzM)

## About

This is a template for deploying Discord4J bots on Railway. It is based on the example Maven / Spring project from
the [example repository](https://github.com/Discord4J/example-projects)

In order to start, you should have made a bot in the [Discord Developer Portal](https://discord.com/developers). You will need the bot's key in order to deploy this template. Don't share the key with anyone!

If you wish to test locally, you can make a .env file with a `BOT_TOKEN` variable. I recommend using a separate bot user for testing and production.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord Bot | [Lelebees/railway-d4j-template](https://github.com/Lelebees/railway-d4j-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BOT_TOKEN` | (secret) | This is the token you use to keep your bot logged in to discord. Do not share! |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | true | Workaround for Alpine image based issues with the internal network |

**Category:** Bots · **Languages:** Java, Dockerfile

[View on Railway →](https://railway.com/template/GnBRzM)
