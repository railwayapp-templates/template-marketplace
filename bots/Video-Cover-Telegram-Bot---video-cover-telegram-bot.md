# Deploy Video-Cover-Telegram-Bot on Railway

Video cover Telegram bot with Redis queue and background worker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/video-cover-telegram-bot)

## About

Video-Cover-Telegram-Bot is a Telegram bot that lets users send multiple videos followed by one cover image. The bot applies the same cover to each video and processes them through a Redis-backed background queue with controlled delivery delays. It is designed for larger self-hosted deployments and production use.

Hosting Video-Cover-Telegram-Bot on Railway requires a bot service and a Redis service. The bot uses Redis to temporarily store incoming video batches and manage the background queue. A persistent Redis volume can be configured so Redis data can survive service restarts and redeployments.

The Railway template sets up the required services automatically. After deployment, you only need to provide your Telegram bot token, which can be generated using `@BotFather` on Telegram. The application runs with Docker and uses a single Telegram polling instance with a background worker for queued video delivery.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bot | [BigDaddyAman/Video-Cover-Telegram-Bot](https://github.com/BigDaddyAman/Video-Cover-Telegram-Bot) | Worker |
| Redis | `redis:8.10.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BOT_TOKEN` | Bot | (secret) | Enter your Telegram bot token. Generate a bot token using @BotFather on Telegram. |
| `REDIS_URL` | Bot | - | Internal Redis connection URL used by the bot to connect to the Redis service. |
| `REDISHOST` | Redis | - | Internal Redis hostname used by the Redis service connection. |
| `REDISPORT` | Redis | 6379 | Internal Redis port used by the Redis service connection. |
| `REDISUSER` | Redis | default | Redis username used for authenticated connections. |
| `REDIS_URL` | Redis | - | Redis connection URL used by services connected to this Redis instance. |
| `REDISPASSWORD` | Redis | (secret) | Redis password used for authenticated connections. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password used by the Redis server and connected services. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Bots · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/video-cover-telegram-bot)
