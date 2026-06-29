# Deploy Python Telegram Bot on Railway

[Jun'26] 1-Click Telegram bot setup with commands, echo & menu buttons

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/python-telegram-bot)

## About

Python Telegram Bot is a starter Telegram bot built with `python-telegram-bot`. It includes ready-to-use commands, echo replies, persistent chat menu buttons, fallback handling for unknown commands, environment-based configuration, and optional PostgreSQL and Redis integration.

This template is ideal for quickly launching a Telegram bot that works immediately after adding your bot token. For more advanced use cases, you can connect PostgreSQL to persist user data and Redis to enable lightweight caching and per-user message counters.

![](https://raw.githubusercontent.com/codestorm-official/python-telegram-bot/refs/heads/main/img/bot.png)

Hosting a Python Telegram Bot means running a long-lived Python process that connects to Telegram, listens for incoming messages, and responds through the Telegram Bot API.

This template uses environment variables for configuration, so sensitive values such as your Telegram bot token, database connection string, and Redis connection string stay separate from the codebase. After deployment, the bot starts automatically and keeps running as a Railway service.

The bot uses long polling, so you do not need to configure a webhook or public domain. Once the `BOT_TOKEN` variable is added, the bot can respond to commands, normal text messages, and menu button interactions.

PostgreSQL and Redis are optional. If `DATABASE_URL` and `REDIS_URL` are available, the bot will connect to them on startup. If they are missing, empty, or unreachable, the bot logs a warning and continues running with that backend disabled. This makes the template simple for quick testing, but still flexible enough for production-oriented bot development.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| python-telegram-bot | [codestorm-official/python-telegram-bot](https://github.com/codestorm-official/python-telegram-bot) | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `BOT_TOKEN` | python-telegram-bot | (secret) | - |
| `LOG_LEVEL` | python-telegram-bot | INFO | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/python-telegram-bot)
