# Deploy fortunate-achievement on Railway

Visual no-code platform for building and running Telegram bots.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fortunate-achievement)

## About

The template deploys the React + Express application together with the Python runtime used by generated bots. A shared worker-pool architecture runs multiple bots efficiently while the application provides live logs, launch history, analytics, broadcasts, and project collaboration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| telegram-bot-builder-_E3U | [fedorabakumets/telegram-bot-builder](https://github.com/fedorabakumets/telegram-bot-builder) | Web service |
| Postgres-QrUo | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | telegram-bot-builder-_E3U | 5000 |
| `ADMIN_API_KEY` | telegram-bot-builder-_E3U | (secret) |
| `SESSION_SECRET` | telegram-bot-builder-_E3U | (secret) |
| `TELEGRAM_BOT_TOKEN` | telegram-bot-builder-_E3U | (secret) |
| `TELEGRAM_CLIENT_SECRET` | telegram-bot-builder-_E3U | (secret) |
| `VITE_TELEGRAM_BOT_USERNAME` | telegram-bot-builder-_E3U | (secret) |
| `POSTGRES_DB` | Postgres-QrUo | postgres |
| `POSTGRES_USER` | Postgres-QrUo | (secret) |
| `POSTGRES_PASSWORD` | Postgres-QrUo | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Bots · **Languages:** TypeScript, Jinja, Python, CSS, JavaScript, PowerShell, Batchfile, Dockerfile, Shell, HTML

[View on Railway →](https://railway.com/deploy/fortunate-achievement)
