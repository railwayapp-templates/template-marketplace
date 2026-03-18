# Deploy (C#) Discord.NET Bot on Railway

A Discord.NET bot template for making bots with C# using Docker deployments

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inw1EU)

## About

# Discord.NET Bot Template
This is a great starting point for making C# Discord bots with the Discord.NET framework in a containerized fashion (Docker).

## Discord Bot Setup Guide

This guide will walk you through setting up a simple Discord bot and deploying it to Railway.

### Prerequisites

Before starting, make sure you have the following:
- A [Discord account](https://discord.com/) with permissions to create a bot.

### Step 1: Set Up the Environment Variables
Go to your project settings and add the following environment variable:

   - `DISCORD_TOKEN=your-discord-bot-token`

### Step 2: Inviting Your Bot to a Server

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and select your bot.
2. Under the "OAuth2" tab, go to the "URL Generator".
3. Under "OAuth2 Scopes", check the `bot` box.
4. Under "Bot Permissions", select the necessary permissions for your bot.
5. Copy the generated URL and paste it into your browser.
6. Select the server you want to add the bot to and authorize it.

### Step 3: Test Your Bot

Once the bot is running, you can test it by typing the following commands in your Discord server:

- `/ping` - Check the bot's latency.
- `/hi @username` - Say hi to a specific user.
- `/random coin-toss` - Flip a coin.
- `/random dice-roll` - Roll a 6-sided die.

### Step 4: Monitor and Manage Your Bot

Railway provides logs and management tools to monitor your bot's performance and status.

- **Logs**: You can view logs from the Railway dashboard.
- **Scaling**: Adjust the resources allocated to your bot if necessary.

### Step 5: Add Your Features!
You are all set, time to add your own commands to make the Discord bot your own!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord.net-Bot-Template | [Quantam-Studios/Discord.net-Bot-Template](https://github.com/Quantam-Studios/Discord.net-Bot-Template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | Place your Discord-Generated API key here. |

**Category:** Bots · **Languages:** C#, Dockerfile

[View on Railway →](https://railway.com/deploy/inw1EU)
