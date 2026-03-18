# Deploy discord-ai on Railway

Discord AI bot using OPENROUTER APIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/discord-ai)

## About

DiscordAI is an AI-powered Discord bot that integrates with OpenRouter to provide conversational AI via slash commands. It comes with a built-in Flask web interface to manage models, making it a complete solution for building interactive, customizable Discord chatbots.

Hosting DiscordAI on Railway enables you to deploy a full-stack AI Discord bot in minutes. Once deployed, the bot connects to your server and responds to user inputs using OpenRouter models like GPT-4 or Claude. The web interface gives you control over which models are available, and users can switch models on-the-fly. With Railway, the backend runs seamlessly with PostgreSQL and your environment variables securely managed in one place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DiscordAI | [xynnpg/DiscordAI](https://github.com/xynnpg/DiscordAI) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GUILD_ID` | - | GUILD_ID |
| `UI_PASSWORD` | (secret) | UI_PASSWORD |
| `FLASK_SECRET_KEY` | (secret) | FLASK_SECRET_KEY |
| `DISCORD_BOT_TOKEN` | (secret) | DISCORD_BOT_TOKEN |

**Category:** AI/ML · **Languages:** Python, HTML, Procfile

[View on Railway →](https://railway.com/template/discord-ai)
