# Deploy Apex Legends Server Status Discord Bot on Railway

Show the current status of the Apex Legends login/matchmaking servers!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/TxkIsO)

## About

## Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and set up a new bot. Grab the token and add it to the "DISCORD_TOKEN" environment variable
2. Go to the "Generate URL" section in the "OAuth2" category and generate the necessary permissions. You can set it to Administrator (not advised), or invite the bot with the following permissions:
- Read Messages/View Channel
- Send Messages
- Manage Channels (for the server status in the channel name)
- Use External Emojis
3. Go to the [Apex Legends API Website](https://apexlegendsapi.com/) and generate an API key. Copy the key and add it to the "ALS_API" environment variable
4. Go to your Discord server and create a new channel for the bot to use and store the message. Copy the Server ID and Channel ID into the "SERVER_ID" and "CHANNEL_ID" environment variables respectively.
 - The "MESSAGE_ID" field should default to 0. We'll come back to that
5. Make sure the "DEBUG" environment variable is set to false and the "ENABLED" environment variable is set to TRUE
6. Deploy the bot and wait for it to come online. Once it's online, go into the channel you setup and run the "/template" command
7. If the command was successful, you should get a template embed. Copy the ID of the message and insert it into the "MESSAGE_ID" environment variable and redeploy the bot
8. ???
9. Profit

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Apex Legends Server Status | [StryderDev/Atlas](https://github.com/StryderDev/Atlas) (root: /) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | false | For development purposes. For a live bot, set this to false. |
| `ALS_API` | - | Apex Legends API key. Get the key from https://apexlegendsapi.com/ |
| `ENABLED` | true | Must be true for the status to update. |
| `EMOTE_UP` | - | Your custom emote for the server "UP" status. |
| `SERVER_ID` | - | The server ID that the message will be posted in. |
| `CHANNEL_ID` | - | The channel ID that the message will be posted in. |
| `EMOTE_DOWN` | - | Your custom emote for the server "DOWN" status. |
| `EMOTE_SLOW` | - | Your custom emote for the server "SLOW" status. |
| `MESSAGE_ID` | 0 | You MUST run the bot before setting this variable. Run the bot, type /template, and then copy the message ID into this variable. |
| `FORCE_COLOR` | 1 | For chalk colors in console logs. |
| `DISCORD_TOKEN` | (secret) | Discord bot token. Get the token from https://discord.com/developers/applications |

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/TxkIsO)
