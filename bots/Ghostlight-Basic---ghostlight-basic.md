# Deploy Ghostlight Basic on Railway

Ghostlight AI Basic companion

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghostlight-basic)

## About

Ghostlight Basic is a self-hosted AI companion starter system for Discord, powered by OpenRouter, PostgreSQL, and Qdrant memory storage. It gives users a private companion dashboard, configurable personality settings, persistent memory, and Discord bot connectivity in a lightweight deployable package designed for personal companions, client builds, and custom hosted AI experiences.

Hosting Ghostlight Basic on Railway gives each user their own private deployment with a dedicated app service, PostgreSQL database, and Qdrant vector memory store. During deployment, users provide their own Discord bot credentials, OpenRouter API key, timezone, and admin dashboard password. Railway handles the infrastructure, networking, service orchestration, database hosting, and environment variable setup. Once deployed, users can access their Ghostlight dashboard, connect their Discord bot, and begin configuring their companion without managing servers manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Qdrant | `qdrant/qdrant` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18.3` | Database |
| ghostlight-basic-template | `ghcr.io/jcsnowfox/ghostlight-basic-template:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Qdrant | 3000 | - |
| `PORT` | Postgres | 3000 | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | ghostlight-basic-template | 3000 | - |
| `LOG_LEVEL` | ghostlight-basic-template | info | - |
| `POSTGRES_DB` | ghostlight-basic-template | railway | - |
| `ADMIN_SECRET` | ghostlight-basic-template | (secret) | Create your Ghostlight dashboard password. Save this somewhere safe. |
| `DISCORD_TOKEN` | ghostlight-basic-template | (secret) | Your Discord Bot Token=Discord Developer portal-> your bot->Bot-> Reset Token |
| `POSTGRES_USER` | ghostlight-basic-template | (secret) | - |
| `DISCORD_GUILD_ID` | ghostlight-basic-template | - | This is your Server ID for where your bot lives |
| `DISCORD_CLIENT_ID` | ghostlight-basic-template | - | Discord Developer portal-> your bot->Oath-> Client ID |
| `MEMORY_USER_SCOPE` | ghostlight-basic-template | default | - |
| `OPENROUTER_API_KEY` | ghostlight-basic-template | (secret) | Your Openrouter developer API key goes here |

## Configuration

- **Volume:** `/qdrant/storage`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/ghostlight-basic)
