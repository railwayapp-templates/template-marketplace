# Deploy Companion memory and storage template-connect your own repo on Railway

connect your own repo for your companion

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/companion-memory-and-storage-template-co)

## About

Ghostlight Plus+ Companion is a self-hosted AI companion system for Discord with persistent memory, a private dashboard, OpenRouter-powered chat, Qdrant vector memory, PostgreSQL storage, and optional media features such as image generation, audio/TTS, web search, and storage integrations. It is designed for richer companion experiences, client deployments, and customizable AI companion hosting.

Hosting Ghostlight Plus+ Companion on Railway gives each user a private deployment with a dedicated app service, PostgreSQL database, and Qdrant vector memory store. During deployment, users provide their own Discord bot credentials, OpenRouter API key, license key, and dashboard login details. Railway handles infrastructure, service networking, database hosting, volumes, and environment variable wiring. Once deployed, users can access their Ghostlight Plus+ dashboard, connect their Discord bot, configure their companion, and optionally enable advanced features such as image generation, voice/audio, web search, and external storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18.3` | Database |
| Qdrant | `qdrant/qdrant` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `LOG_LEVEL` | Postgres | info |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `MEMORY_USER_SCOPE` | Postgres | default |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Qdrant | 3000 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/qdrant/storage`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/companion-memory-and-storage-template-co)
