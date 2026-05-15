# Deploy Unthread Telegram Bot Extension on Railway

Deploy the official Unthread extension for Telegram. 🎫🤖

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unthread-telegram-bot)

## About

### What is Unthread Telegram Bot?

Unthread Telegram Bot is the official integration that connects your private Telegram groups to Unthread.io’s ticketing system. It enables seamless support ticket creation and real-time updates, directly inside Telegram chats between your team, customers, and partners.

Hosting the Unthread Telegram Bot allows you to turn your internal Telegram groups into support ticket hubs with bidirectional updates. Built with Node.js and TypeScript, it securely bridges your Telegram support conversations with the Unthread platform. Users can create, view, and manage tickets without ever leaving Telegram. This setup is ideal for businesses or teams managing private Telegram support or partner channels, not public community groups. Hosting on Railway ensures quick deployment, environment variable setup, and scalable infrastructure without the complexity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis — Webhook | `redis:8.2.1` | Database |
| Redis — Platform | `redis:8.2.1` | Database |
| Webhook Server | `wgtechlabs/unthread-webhook-server` | Web service |
| Telegram Bot | `wgtechlabs/unthread-telegram-bot` | Worker |
| Postgres — Platform | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis — Webhook | 6379 | - |
| `REDISUSER` | Redis — Webhook | default | - |
| `REDIS_URL` | Redis — Webhook | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis — Webhook | (secret) | - |
| `REDIS_PASSWORD` | Redis — Webhook | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis — Webhook | - | Connection string for connecting to redis externally |
| `REDISPORT` | Redis — Platform | 6379 | - |
| `REDISUSER` | Redis — Platform | default | - |
| `REDIS_URL` | Redis — Platform | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis — Platform | (secret) | - |
| `REDIS_PASSWORD` | Redis — Platform | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis — Platform | - | Connection string for connecting to redis externally |
| `PORT` | Webhook Server | 3000 | Server port for webhook endpoints |
| `NODE_ENV` | Webhook Server | - | Environment mode (keep as production for Railway) |
| `REDIS_URL` | Webhook Server | - | Auto-configured Redis for webhook event storage |
| `TARGET_PLATFORM` | Webhook Server | telegram | Platform integration: "discord" or "telegram" - REQUIRED |
| `UNTHREAD_WEBHOOK_SECRET` | Webhook Server | (secret) | Webhook secret from Unthread dashboard - REQUIRED |
| `NODE_ENV` | Telegram Bot | production | Environment mode (keep as production for Railway) |
| `ADMIN_USERS` | Telegram Bot | - | Get from @userinfobot on Telegram (comma-separated user IDs) - REQUIRED |
| `BOT_USERNAME` | Telegram Bot | (secret) | Your bot's username (optional but HIGHLY RECOMMENDED for performance) |
| `POSTGRES_URL` | Telegram Bot | - | Auto-configured PostgreSQL connection URL |
| `POSTGRES_USER` | Telegram Bot | (secret) | Auto-configured database username |
| `SLACK_TEAM_ID` | Telegram Bot | - | Target Slack Team ID |
| `MY_COMPANY_NAME` | Telegram Bot | - | Your company name, used for creating customer ID based on group chat title |
| `UNTHREAD_API_KEY` | Telegram Bot | (secret) | Get from Unthread dashboard API settings - REQUIRED |
| `POSTGRES_PASSWORD` | Telegram Bot | (secret) | Auto-configured database password |
| `WEBHOOK_REDIS_URL` | Telegram Bot | - | Redis URL for webhook processing - REQUIRED for agent responses |
| `PLATFORM_REDIS_URL` | Telegram Bot | - | Auto-configured Redis for bot data storage |
| `TELEGRAM_BOT_TOKEN` | Telegram Bot | (secret) | Get from @BotFather on Telegram - REQUIRED |
| `DATABASE_SSL_VALIDATE` | Telegram Bot | true | Enable secure database connections (recommended) |
| `UNTHREAD_WEBHOOK_SECRET` | Telegram Bot | (secret) | Webhook secret from Unthread dashboard - REQUIRED |
| `UNTHREAD_DEFAULT_PRIORITY` | Telegram Bot | - | Default priority for new tickets: 3 (low), 5 (medium), 7 (high), 9 (critical) |
| `UNTHREAD_SLACK_CHANNEL_ID` | Telegram Bot | - | Target Slack channel ID from Unthread - REQUIRED |
| `POSTGRES_DB` | Postgres — Platform | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres — Platform | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres — Platform | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres — Platform | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres — Platform | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/unthread-telegram-bot)
