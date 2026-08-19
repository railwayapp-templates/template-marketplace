# Deploy Discord Bot | discord.js v14 Starter with a Lockfile That Installs on Railway

discord.js v14 starter with slash commands and a matching lockfile.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-bot-or-discordjs-v14-starter-wit)

## About

A minimal slash-command bot built on [discord.js](https://discord.js.org) v14 — a working starting point you extend, not a demo you have to repair first.

A Discord bot is a long-running Node process holding a websocket to Discord's gateway. There is no HTTP endpoint and no public URL, so hosting means keeping a worker alive, restarting it when it dies, and passing the token through the environment. The part that quietly breaks is earlier than any of that: the install step. A committed lockfile that has drifted from `package.json` will stop a deployment before a single line of bot code runs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| discordjs-railway-starter | [ak40u/discordjs-railway-starter](https://github.com/ak40u/discordjs-railway-starter) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | Bot token from the Discord Developer Portal: Applications, your app, Bot, Reset Token. Enable the Message Content intent on the same page, or the bot starts and then fails. |

**Category:** Bots · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/discord-bot-or-discordjs-v14-starter-wit)
