# Deploy hypixel-chat-bridge on Railway

Discord ↔ Hypixel guild chat bridge.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hypixel-chat-bridge)

## About

hypixel-chat-bridge connects Hypixel guild chat to Discord. Members talk to in-game players from a Discord channel, and the bot posts guild events and answers SkyBlock stat commands. One deployment can run several guilds and relay chat between them. You configure everything with /setup in Discord.

You run one always-on service: a Discord bot plus one Minecraft account per guild. On first start the bot DMs you a Microsoft sign-in code for each account, then stores the login tokens so redeploys don't ask again. The bot keeps its settings, links, blacklist and tokens in SQLite on the attached Volume. Set DATABASE_URL to use MongoDB or Postgres instead. To deploy, you need a Discord bot token, your Discord user ID and the ID of the channel to bridge. Add a Hypixel API key to turn on stat commands, join requirements and GEXP tracking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hypixel-chat-bridge | [treeot/hypixel-chat-bridge](https://github.com/treeot/hypixel-chat-bridge) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OWNER_ID` | - | Your Discord user ID (Settings → Advanced → Developer Mode, then right-click your name → Copy User ID). You get /setup access and the Minecraft sign-in code by DM. |
| `DATABASE_URL` | - | Optional. MongoDB or Postgres connection URL. Leave empty to use SQLite on the attached Volume. |
| `DISCORD_TOKEN` | (secret) | Your Discord bot token. Discord Developer Portal → your application → Bot → Reset Token. Turn on the Message Content and Server Members intents on the same page. |
| `STAFF_ROLE_ID` | - | Optional. ID of the role allowed to run staff commands. Without it, only you can. |
| `GUILDLB_API_KEY` | (secret) | Optional. GuildLB website key. Gives !nw a stored networth when you have no Hypixel key. Get one at guildlb.com/api. |
| `HYPIXEL_API_KEY` | (secret) | Optional. Hypixel API key from developer.hypixel.net. Turns on stat commands, join requirements, GEXP and verify. |
| `GUILD_CHANNEL_ID` | - | ID of the Discord channel to bridge to guild chat (with Developer Mode on, right-click the channel → Copy Channel ID). |
| `GUILDLB_GUILD_KEY` | - | Optional. GuildLB guild key for alliance guilds. Turns on the shared alliance blacklist and join-request screening. Issued by GuildLB. |
| `OFFICER_CHANNEL_ID` | - | Optional. ID of the Discord channel to bridge to officer chat. |

## Configuration

- **Volume:** `/app/data`

**Category:** Bots · **Languages:** TypeScript, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/hypixel-chat-bridge)
