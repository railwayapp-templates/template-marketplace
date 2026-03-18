# Deploy Unthread Discord Bot Extension on Railway

Integrate Discord with Unthread.io for seamless ticket support. 🎫🤖

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nVHIjj)

## About

### What is Unthread Discord Bot Extension?

Unthread Discord Bot Extension is an official integration that brings support ticket management into your Discord server. It enables users to create, track, and manage support tickets directly through slash commands and forum posts—fully integrated with the Unthread.io platform.

Hosting the Unthread Discord Bot Extension allows Discord communities and teams to offer a professional support system within their servers. The bot is built with Node.js and TypeScript and connects directly to the Unthread API for seamless ticket synchronization. With features like automatic forum-to-ticket conversion and two-way message syncing, the bot provides a native support experience inside Discord. Deploying it on Railway makes setup simple and scalable, with support for environment variables, Redis integration, and continuous deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord Bot | `wgtechlabs/unthread-discord-bot:1.1.0` | Worker |
| Webhook Server | `wgtechlabs/unthread-webhook-server:1.0.0-beta.7` | Web service |
| Postgres (Platform) | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis (Webhook) | `redis:8-alpine` | Database |
| Redis (Platform) | `redis:8-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `GUILD_ID` | Discord Bot | - | Discord Server ID (enable developer mode and copy) - REQUIRED |
| `NODE_ENV` | Discord Bot | production | Environment mode (keep as production for Railway) |
| `CLIENT_ID` | Discord Bot | - | Discord Application ID from Developer Portal - REQUIRED |
| `POSTGRES_URL` | Discord Bot | - | Auto-configured PostgreSQL connection URL |
| `SLACK_TEAM_ID` | Discord Bot | - | Slack workspace ID (Team ID) for file downloads, format: T + 10 characters - OPTIONAL |
| `UNTHREAD_API_KEY` | Discord Bot | (secret) | Get from Unthread dashboard API settings - REQUIRED |
| `DISCORD_BOT_TOKEN` | Discord Bot | (secret) | Get from Discord Developer Portal → Bot → Token - REQUIRED |
| `FORUM_CHANNEL_IDS` | Discord Bot | - | Forum channel IDs (comma-separated) for auto-ticket creation - REQUIRED |
| `WEBHOOK_REDIS_URL` | Discord Bot | - | Redis URL for webhook processing - REQUIRED for agent responses |
| `DUMMY_EMAIL_DOMAIN` | Discord Bot | discord.invalid | Default email domain for auto-generated emails |
| `PLATFORM_REDIS_URL` | Discord Bot | - | Auto-configured Redis for bot data storage |
| `DATABASE_SSL_VALIDATE` | Discord Bot | full | Enable secure database connections (recommended for Railway) |
| `UNTHREAD_WEBHOOK_SECRET` | Discord Bot | (secret) | Webhook secret from Unthread dashboard - REQUIRED |
| `UNTHREAD_SLACK_CHANNEL_ID` | Discord Bot | - | Target Slack channel ID from Unthread - REQUIRED |
| `PORT` | Webhook Server | 3000 | Server port for webhook endpoints |
| `NODE_ENV` | Webhook Server | - | Environment mode (keep as production for Railway) |
| `REDIS_URL` | Webhook Server | - | Auto-configured Redis for webhook event storage |
| `TARGET_PLATFORM` | Webhook Server | discord | Platform integration: "discord" or "telegram" - REQUIRED |
| `UNTHREAD_WEBHOOK_SECRET` | Webhook Server | (secret) | Webhook secret from Unthread dashboard - REQUIRED |
| `POSTGRES_DB` | Postgres (Platform) | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres (Platform) | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres (Platform) | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres (Platform) | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres (Platform) | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis (Webhook) | 6379 | - |
| `REDISUSER` | Redis (Webhook) | default | - |
| `REDIS_URL` | Redis (Webhook) | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis (Webhook) | (secret) | - |
| `REDIS_PASSWORD` | Redis (Webhook) | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis (Webhook) | - | Connection string for connecting to redis externally |
| `REDISPORT` | Redis (Platform) | 6379 | - |
| `REDISUSER` | Redis (Platform) | default | - |
| `REDIS_URL` | Redis (Platform) | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis (Platform) | (secret) | - |
| `REDIS_PASSWORD` | Redis (Platform) | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis (Platform) | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/nVHIjj)
