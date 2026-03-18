# Deploy Unthread Telegram Bot Extension on Railway

Support ticket bot for Telegram groups powered by Unthread.io. 🎫🤖

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/unthread-telegram-bot)

## About

### What is Unthread Telegram Bot?

Unthread Telegram Bot is the official integration that connects your private Telegram groups to Unthread.io’s ticketing system. It enables seamless support ticket creation and real-time updates, directly inside Telegram chats between your team, customers, and partners.

Hosting the Unthread Telegram Bot allows you to turn your internal Telegram groups into support ticket hubs with bidirectional updates. Built with Node.js and TypeScript, it securely bridges your Telegram support conversations with the Unthread platform. Users can create, view, and manage tickets without ever leaving Telegram. This setup is ideal for businesses or teams managing private Telegram support or partner channels, not public community groups. Hosting on Railway ensures quick deployment, environment variable setup, and scalable infrastructure without the complexity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres (Platform) | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Webhook Server | `wgtechlabs/unthread-webhook-server` | Web service |
| Redis (Platform) | `redis:8-alpine` | Database |
| Telegram Bot | `wgtechlabs/unthread-telegram-bot` | Worker |
| Redis (Webhook) | `redis:8-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres (Platform) | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres (Platform) | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres (Platform) | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres (Platform) | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres (Platform) | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Webhook Server | 3000 | Server port for webhook endpoints |
| `NODE_ENV` | Webhook Server | - | Environment mode (keep as production for Railway) |
| `REDIS_URL` | Webhook Server | - | Auto-configured Redis for webhook event storage |
| `TARGET_PLATFORM` | Webhook Server | telegram | Platform integration: "discord" or "telegram" - REQUIRED |
| `UNTHREAD_WEBHOOK_SECRET` | Webhook Server | (secret) | Webhook secret from Unthread dashboard - REQUIRED |
| `REDISHOST` | Redis (Platform) | - | Railway Private Domain Name. |
| `REDISPORT` | Redis (Platform) | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis (Platform) | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis (Platform) | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis (Platform) | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis (Platform) | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis (Platform) | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis (Platform) | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis (Platform) | no | Disable writing to AOF file. |
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
| `WEBHOOK_POLL_INTERVAL` | Telegram Bot | 1000 | How often to check for agent replies (milliseconds) |
| `UNTHREAD_WEBHOOK_SECRET` | Telegram Bot | (secret) | Webhook secret from Unthread dashboard - REQUIRED |
| `UNTHREAD_DEFAULT_PRIORITY` | Telegram Bot | - | Default priority for new tickets: 3 (low), 5 (medium), 7 (high), 9 (critical) |
| `UNTHREAD_SLACK_CHANNEL_ID` | Telegram Bot | - | Target Slack channel ID from Unthread - REQUIRED |
| `REDISHOST` | Redis (Webhook) | - | Railway Private Domain Name. |
| `REDISPORT` | Redis (Webhook) | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis (Webhook) | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis (Webhook) | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis (Webhook) | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis (Webhook) | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis (Webhook) | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis (Webhook) | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis (Webhook) | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Bots

[View on Railway →](https://railway.com/template/unthread-telegram-bot)
