# Deploy Ghostlight Plus+ Companion on Railway

Ghostlight Plus+ AI Companion

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghostlight-plus-companion)

## About

Ghostlight Plus+ Companion is a self-hosted AI companion system for Discord with persistent memory, a private dashboard, OpenRouter-powered chat, Qdrant vector memory, PostgreSQL storage, and optional media features such as image generation, audio/TTS, web search, and storage integrations. It is designed for richer companion experiences, client deployments, and customizable AI companion hosting.

Hosting Ghostlight Plus+ Companion on Railway gives each user a private deployment with a dedicated app service, PostgreSQL database, and Qdrant vector memory store. During deployment, users provide their own Discord bot credentials, OpenRouter API key, license key, and dashboard login details. Railway handles infrastructure, service networking, database hosting, volumes, and environment variable wiring. Once deployed, users can access their Ghostlight Plus+ dashboard, connect their Discord bot, configure their companion, and optionally enable advanced features such as image generation, voice/audio, web search, and external storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18.3` | Database |
| ghostlight-plus | `ghcr.io/jcsnowfox/ghostlight-plus:latest` | Worker |
| Qdrant | `qdrant/qdrant` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LOG_LEVEL` | Postgres | info | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `MEMORY_USER_SCOPE` | Postgres | default | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `DISCORD_TOKEN` | ghostlight-plus | (secret) | Your Discord Bot Token=Discord Developer portal-> your bot->Bot-> Reset Token |
| `ADMIN_PASSWORD` | ghostlight-plus | (secret) | Create your Ghostlight dashboard password. Save this somewhere safe. |
| `ADMIN_USERNAME` | ghostlight-plus | (secret) | Create your Ghostlight dashboard username to log in. Save this somewhere safe. |
| `DISCORD_GUILD_ID` | ghostlight-plus | - | This is your Server ID for where your bot lives |
| `DISCORD_CLIENT_ID` | ghostlight-plus | - | Discord Developer portal-> your bot->Oath-> Client ID |
| `MEMORY_USER_SCOPE` | ghostlight-plus | default | - |
| `SECRET_ACCESS_KEY` | ghostlight-plus | (secret) | - |
| `OPENROUTER_API_KEY` | ghostlight-plus | (secret) | Your Openrouter developer API key goes here |
| `PORT` | Qdrant | 3000 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/qdrant/storage`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/ghostlight-plus-companion)
