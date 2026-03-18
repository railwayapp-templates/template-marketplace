# Deploy Side App Tasks on Railway

Deploy and Host Side App Tasks with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/side-app-tasks)

## About

Web3 Tasks Side App is an open-source task management platform that enables Web3 projects to quickly integrate quest/task systems into their main dApps without building from scratch. It handles social media task verification (Twitter, Telegram, Discord) and sends webhooks to your main application.

Hosting Side App Tasks on Railway involves deploying a full-stack Next.js application with PostgreSQL database and Redis for background job processing. The application consists of three main components: an admin panel for task management, a user interface for task completion, and a server API with worker jobs for task verification. The system automatically creates users when they connect their wallets, manages OAuth connections to social platforms, verifies task completion through API calls, and sends webhook events to your main application when tasks are completed. Railway simplifies this deployment by providing managed PostgreSQL and Redis services, automatic HTTPS, and seamless environment variable management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Frontend | [nierdna/sa-task-frontend](https://github.com/nierdna/sa-task-frontend) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| TelegramBotVerifier | [nierdna/sa-task-telegram-bot-server](https://github.com/nierdna/sa-task-telegram-bot-server) | Worker |
| ApiServer | [nierdna/sa-task-api-server](https://github.com/nierdna/sa-task-api-server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXT_PUBLIC_SOLANA_NETWORK` | Frontend | mainnet | - |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Frontend | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | TelegramBotVerifier | production | - |
| `TELEGRAM_BOT_TOKEN` | TelegramBotVerifier | (secret) | - |
| `TELEGRAM_BOT_USERNAME` | TelegramBotVerifier | (secret) | - |
| `DB_SYNC` | ApiServer | true | - |
| `JWT_SECRET` | ApiServer | (secret) | - |
| `RAPID_API_KEY` | ApiServer | (secret) | - |
| `RAPID_API_HOST` | ApiServer | twitter-api45.p.rapidapi.com | - |
| `MAIN_APP_API_KEY` | ApiServer | (secret) | - |
| `RAPID_API_BASE_URL` | ApiServer | https://twitter-api45.p.rapidapi.com | - |
| `TELEGRAM_BOT_TOKEN` | ApiServer | (secret) | - |
| `TWITTER_CLIENT_SECRET` | ApiServer | (secret) | - |
| `RAPID_CRAWL_TWEET_HOST` | ApiServer | twttrapi.p.rapidapi.com | - |
| `ENABLE_MOCK_VERIFICATION` | ApiServer | false | - |
| `RAPID_CRAWL_TWEET_V2_HOST` | ApiServer | twitter241.p.rapidapi.com | - |
| `RAPID_CRAWL_TWEET_BASE_URL` | ApiServer | https://twttrapi.p.rapidapi.com | - |
| `USE_TELEGRAM_DB_VERIFICATION` | ApiServer | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/side-app-tasks)
