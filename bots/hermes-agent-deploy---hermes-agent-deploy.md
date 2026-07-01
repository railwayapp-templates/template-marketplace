# Deploy hermes-agent-deploy on Railway

Template for one-click deployment of the Hermes agent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-deploy)

## About

hermes-agent-deploy is a minimal Railway-ready deployment template for running a stateful Hermes agent with Telegram and OpenRouter. It packages the official Hermes image, validates required environment variables at startup, mounts persistent storage for agent state, and provides a straightforward foundation for securely operating a single Hermes gateway in production.

Hosting hermes-agent-deploy on Railway involves deploying a Docker-based Hermes service, attaching a persistent volume, and configuring the required environment variables for Telegram access and model provider credentials. This template is designed for a single long-running Hermes gateway that keeps its sessions, memory, configuration, and editable instructions across restarts. Railway handles the build and runtime infrastructure, while the template bootstrap script configures Hermes from environment variables on each boot. The result is a reproducible, low-maintenance deployment path for users who want a persistent AI agent without managing their own servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-template-export | [agteo/railway-template-export](https://github.com/agteo/railway-template-export) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HERMES_HOME` | /opt/data | Persistent data path, set to /opt/data. |
| ` HERMES_MODEL` | openai/gpt-5.4-mini | Default OpenRouter model ID. |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key for model access. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token from BotFather. |
| `TELEGRAM_ALLOWED_USERS` | - | Allowed Telegram user IDs, comma-separated. |
| `GATEWAY_ALLOW_ALL_USERS` | false | Leave false; do not make the bot public. |

## Configuration

- **Volume:** `/opt/data`

**Category:** Bots · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-deploy)
