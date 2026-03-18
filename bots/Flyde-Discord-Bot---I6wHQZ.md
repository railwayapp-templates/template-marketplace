# Deploy Flyde Discord Bot ⚡️ on Railway

Visually build a discord bot, using Flyde - the OS Visual-Programming tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/I6wHQZ)

## About

This is a simple Discord bot using [Flyde](https://www.flyde.dev) and [Discord.js](https://discord.js.org/).
It exposes a "/joke" command that will send a random joke (using https://jokeapi.dev/) to the channel where the command was sent.


Flyde  is a powerful visual flow-based programming toolkit that enables you to create and edit code using a visual flow-based programming interface. With Flyde, you can build backend flows quickly and intuitively, making it ideal for novice developers, non-developer technical teams, and experienced developers who want to prototype and test ideas fast.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flyde-discord-bot | [FlydeHQ/flyde-discord-bot-boilerplate](https://github.com/FlydeHQ/flyde-discord-bot-boilerplate) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_BOT_TOKEN` | (secret) | Discord bot token. Guide here - https://www.writebots.com/discord-bot-token |
| `DISCORD_CLIENT_ID` | - | Discord client ID |

## Configuration

- **Start command:** `pnpm start`

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/I6wHQZ)
