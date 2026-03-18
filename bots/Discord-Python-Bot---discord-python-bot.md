# Deploy Discord Python Bot on Railway

A simple Discord Bot written in Python

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/discord-python-bot)

## About

A Discord bot is an automated application that connects to the Discord API and responds to commands, messages, and server events. This boilerplate project provides a minimal bot built with `discord.py`, including example commands such as `!ping` and `!hello`, making it a simple starting point for building custom Discord automation.

Hosting a Discord bot means running the bot continuously on a server so it can maintain an active connection to Discord’s gateway. Because bots rely on real-time event listening, the process must remain online at all times.

With Railway, you can deploy the bot directly from a repository and run it as a background worker process. The platform automatically installs dependencies, builds the environment, and starts the Python application defined in your project configuration. Environment variables such as `DISCORD_TOKEN` can be securely configured through the dashboard, ensuring sensitive credentials are not stored directly in the source code

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bot | [railwayapp-templates/discordpy-bot](https://github.com/railwayapp-templates/discordpy-bot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | Your discord bot token |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Tags:** python, discord · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/template/discord-python-bot)
