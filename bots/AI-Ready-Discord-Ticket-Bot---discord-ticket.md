# Deploy AI-Ready Discord Ticket Bot on Railway

Discord Ticket + Web Panel with reports & config+. 3 langs (PT, ES, EN).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-ticket)

## About

Professional Discord ticket bot with optional **AI auto-support**, web panel 2.0, 30+ slash commands, Steam OAuth, smart tags, transcripts, and reports. Languages: PT-BR, EN-US, ES-ES. One-click deploy — provide bot token, client secret, and server ID.

Railway provides MongoDB, SSL, and scaling. This template pre-configures env vars and DB connection. You only set Discord credentials; the rest (including `AI_MASTER_KEY` for encrypting AI API keys) is auto-configured. Steam verification needs Public Networking on port **8080**.

### Keep the Docker image updated

The bot runs from `ghcr.io/jorgehenrrique/pro-ticket-bot:latest`. After deploy, open Railway → bot service → **Settings → Source** (Deploy from Image) and enable automatic checks / updates for the image (or periodically **Check for updates** + redeploy). Otherwise your project keeps an old build after we publish new `:latest` versions.

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
| `AI_MASTER_KEY` | Discord Pro Ticket | - | Master key da criptografia das chaves de API da IA (auto geração) |
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
