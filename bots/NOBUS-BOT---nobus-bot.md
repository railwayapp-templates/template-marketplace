# Deploy NOBUS-BOT on Railway

Deploy and Host NOBUS-BOT with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nobus-bot)

## About

NOBUS-BOT is a powerful Discord bot built with Python and discord.py. It provides moderation features such as kick, ban, mute, and message management, along with a music system that streams audio from YouTube directly into voice channels.

Hosting NOBUS-BOT on Railway allows your bot to run 24/7 without needing your local machine. It uses Python 3.11 and discord.py 2.x with slash commands. FFmpeg is required for music playback and is installed automatically using nixpacks. Environment variables are used to securely store your Discord token, and deployments are triggered automatically via GitHub pushes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nobus-bot | [miguelmvpinto/Nobus-bot](https://github.com/miguelmvpinto/Nobus-bot) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DISCORD_TOKEN` | (secret) |

**Category:** Bots · **Languages:** Python

[View on Railway →](https://railway.com/deploy/nobus-bot)
