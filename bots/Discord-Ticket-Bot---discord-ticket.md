# Deploy Discord Ticket Bot on Railway

Discord Ticket + Web Panel with reports & config+. 3 langs (PT, ES, EN).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-ticket)

## About

Professional Discord bot for ticket management with 30+ slash commands, Steam OAuth verification, dynamic voice channels, welcome DMs, mutual rating system, smart tags, custom fields, HTML transcripts, and scheduled reports. Multi-language: PT-BR, EN-US, ES-ES. One-click deploy — just provide bot token and server ID.

Hosting Pro Ticket on Railway provides a complete infrastructure with MongoDB, automatic SSL, and on-demand scalability. This template includes pre-configured environment variables and automatic database connection. The deploy configures the bot with all dependencies, making it production-ready in minutes — just provide the Discord bot token and server ID. All other variables (database, collections, API URL) are auto-configured. Steam verification optionally requires Public Networking enabled on port 8080.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord Pro Ticket | [jorgehenrrique/docker-discord-bot-pro-ticket](https://github.com/jorgehenrrique/docker-discord-bot-pro-ticket) | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Discord Pro Ticket | 8080 | API PORT |
| `BASE_URL` | Discord Pro Ticket | - | URL API |
| `GUILD_ID` | Discord Pro Ticket | - | ID do servidor Discord |
| `NODE_ENV` | Discord Pro Ticket | production | Produção para iniciar os recursos completos |
| `BOT_TOKEN` | Discord Pro Ticket | (secret) | Token do bot |
| `MONGO_URI` | Discord Pro Ticket | - | Conexão do banco de dados |
| `STEAM_API_KEY` | Discord Pro Ticket | (secret) | Chave API Steam para visualizar imagens do perfil, opcional |
| `SERVER_HOSTNAME` | Discord Pro Ticket | - | URL API |
| `DISCORD_CLIENT_SECRET` | Discord Pro Ticket | (secret) | Client Secret do bot |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Bots · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/discord-ticket)
