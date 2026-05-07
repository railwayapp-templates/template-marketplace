# Deploy modmail on Railway

A Discord bot that functions as a shared inbox between staff and members.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/modmail)

## About

A Discord bot that functions as a shared inbox between staff and members, similar to Reddit's Modmail.

Includes one docker container hosted from the official modmail github image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| modmail-dev/modmail:master | `ghcr.io/modmail-dev/modmail:master` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TOKEN` | (secret) | The token to run your Modmail application under your Discord bot account |
| `OWNERS` | - | The user ID of the Discord accounts you want to set as owner for the bot. Can consist of multiple users, separated by comma. |
| `LOG_URL` | - | Logviewer URL that will be used to view threads in your web browser. |
| `GUILD_ID` | - | The ID of the main Discord server that your bot will operate in. |
| `CONNECTION_URI` | - | The URI the bot will use to connect to your MongoDB instance. |
| `MODMAIL_GUILD_ID` | - | The ID of the Discord server that your bot will create ticket channels in. This is only needed if you want your ticket channels to be created in a separate server, for an example, Staff Server. |
| `REGISTRY_PLUGINS_ONLY` | - | Enable the abillity to install plugins that are not in the official Modmail plugin registry. |

**Category:** Bots

[View on Railway →](https://railway.com/deploy/modmail)
