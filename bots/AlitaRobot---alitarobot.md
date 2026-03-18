# Deploy Alita_Robot on Railway

Template for Alita Robot Telegram Group Management Bot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alitarobot)

## About

Alita Robot is a high-performance Telegram group management bot built with Go and gotgbot. It provides comprehensive moderation tools including user management, anti-spam protection, CAPTCHA verification, content filtering, custom greetings, and multi-language support—engineered for speed and reliability at scale.

Deploying Alita Robot requires a PostgreSQL database for persistent storage and Redis for distributed caching. The bot supports two operation modes: **polling** (simpler, suitable for development) and **webhook** (real-time, production-ready). Railway's one-click deployment auto-provisions both database services and configures health checks automatically. The bot features automatic database migrations on startup, connection pooling, dual-layer caching with stampede protection, and built-in Prometheus metrics. Configuration is handled entirely through environment variables, with sensible defaults for most settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Alita_Robot | [Divkix/Alita_Robot](https://github.com/Divkix/Alita_Robot) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `OWNER_ID` | Alita_Robot | - | Your user id, take by sending `/id` to @Alita_Robot in Telegram. |
| `BOT_TOKEN` | Alita_Robot | (secret) | Bot Token from Bot Faher |
| `AUTO_MIGRATE` | Alita_Robot | true | - |
| `MESSAGE_DUMP` | Alita_Robot | - | A Group for sending logs |
| `USE_WEBHOOKS` | Alita_Robot | false | - |
| `REDIS_PASSWORD` | Alita_Robot | (secret) | - |
| `ENABLED_LOCALES` | Alita_Robot | en,es | - |
| `DROP_PENDING_UPDATES` | Alita_Robot | true | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** Go, PLpgSQL, Shell, Makefile

[View on Railway →](https://railway.com/deploy/alitarobot)
