# Deploy Discord Bot on Railway

Discord bot with modern slash commands,Music app,Chatgpt & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-bot)

## About

A Discord Bot is an automated application that interacts with users and servers through Discord. This template provides a feature-rich starting point with modern slash commands, including ChatGPT integration, a music player, Tic Tac Toe, an auto-generated help command, and error logging for unexpected issues.

Hosting the Discord Bot on Railway requires running the bot application alongside a MongoDB database. The bot uses Discord credentials and an OpenAI API key for its integrations, while MongoDB provides persistent application data storage. Railway can run both services within the same project, with the bot connecting to MongoDB through private service networking. MongoDB requires a persistent volume mounted at `/data/db` so database data survives restarts and redeployments. Since the bot operates through Discord rather than serving a web application, it does not require a public HTTP domain or exposed web port. Railway handles the underlying service infrastructure while keeping the bot and database easy to manage together.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord-Bot-Template | [OnCloud125252/Discord-Bot-Template](https://github.com/OnCloud125252/Discord-Bot-Template) | Worker |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BOT_TOKEN` | Discord-Bot-Template | (secret) | your_discord_bot_token |
| `CLIENT_ID` | Discord-Bot-Template | - | your_discord_application_client_id |
| `OPEN_AI_KEY` | Discord-Bot-Template | - | your_openai_api_key |
| `ADMIN_USER_ID` | Discord-Bot-Template | - | your_discord_user_id |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Bots · **Languages:** JavaScript, Nix

[View on Railway →](https://railway.com/deploy/discord-bot)
