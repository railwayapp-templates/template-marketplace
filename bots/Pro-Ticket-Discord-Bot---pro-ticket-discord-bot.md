# Deploy Pro Ticket Discord Bot on Railway

Ticket bot. 3 languages (PT, ES, EN). Web panel for stats, reports & config

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pro-ticket-discord-bot)

## About

Professional Discord bot for ticket management with 30+ slash commands, Steam OAuth verification, dynamic voice channels, welcome DMs, mutual rating system, smart tags, custom fields, HTML transcripts, and scheduled reports. Multi-language: PT-BR, EN-US, ES-ES. One-click deploy — just provide bot token and server ID.

Hosting Pro Ticket on Railway provides a complete infrastructure with MongoDB, automatic SSL, and on-demand scalability. This template includes pre-configured environment variables and automatic database connection. The deploy configures the bot with all dependencies, making it production-ready in minutes — just provide the Discord bot token and server ID. All other variables (database, collections, API URL) are auto-configured. Steam verification optionally requires Public Networking enabled on port 8080.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pro Ticket Bot | `ghcr.io/jorgehenrrique/pro-ticket-bot:latest` | Web service |
| MongoDB | `mongo:8.2.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Pro Ticket Bot | 8080 | API PORT |
| `BASE_URL` | Pro Ticket Bot | - | URL API |
| `GUILD_ID` | Pro Ticket Bot | - | ID do servidor Discord |
| `NODE_ENV` | Pro Ticket Bot | production | Produção para iniciar os recursos completos |
| `BOT_TOKEN` | Pro Ticket Bot | (secret) | Token do bot |
| `MONGO_URI` | Pro Ticket Bot | - | Conexão do banco de dados |
| `STEAM_API_KEY` | Pro Ticket Bot | (secret) | Chave API Steam para visualizar imagens do perfil, opcional |
| `MONGO_DB_TICKET` | Pro Ticket Bot | pro_ticket | Banco de dados do bot |
| `SERVER_HOSTNAME` | Pro Ticket Bot | - | URL API |
| `COLLECTION_TICKETS` | Pro Ticket Bot | tickets | Coleção de tickets do banco |
| `DISCORD_CLIENT_SECRET` | Pro Ticket Bot | (secret) | Client Secret do bot |
| `COLLECTION_TICKET_USERS` | Pro Ticket Bot | ticket_users | Coleção de usuários do ticket do banco |
| `COLLECTION_VERIFIED_USERS` | Pro Ticket Bot | verified_users | Coleção de usuários verificados do banco |
| `COLLECTION_SYSTEM_SETTINGS` | Pro Ticket Bot | system_settings | Coleção de ajustes do ticket do banco |
| `MONGOPORT` | MongoDB | 27017 | - |
| `MONGOPASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/pro-ticket-discord-bot)
