# Deploy Discord Bot Starter on Railway

A discord.js bot template written with TypeScript.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-bot-starter)

## About

Discord Bot Starter is a minimal TypeScript template for building Discord bots using the Sapphire framework. It provides a clean project structure with slash command support, Docker deployment, pnpm package management, and modern development tooling, making it an excellent starting point for creating production-ready Discord bots.

Railway provides an easy way to deploy your Discord bot without managing servers or infrastructure. This template automatically builds the application from its included Dockerfile and runs the bot continuously, ensuring it stays online 24/7. Railway manages deployments, environment variables, logs, and scaling while your bot connects directly to Discord using its Bot Token. Since the bot communicates with Discord over outbound connections, no public HTTP endpoint, database, or persistent storage is required unless your bot stores additional application data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| discord-bot-starter | [arloodots/discord-bot-starter](https://github.com/arloodots/discord-bot-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `BOT_TOKEN` | discord-bot-starter | (secret) | "your_discord_bot_token" |
| `CLIENT_ID` | discord-bot-starter | - | "your_discord_application_client_id" |
| `OPEN_AI_KEY` | discord-bot-starter | - | "your_openai_api_key" |
| `ADMIN_USER_ID` | discord-bot-starter | - | "your_discord_user_id" |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/discord-bot-starter)
