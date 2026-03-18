# Deploy CrawlChat 2026.02.05 on Railway

Power up your documentation with AI - CrawlChat.app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crawlchat-20260205)

## About

CrawlChat is a platform to power up your tech documentation with AI. It manages central Knowledge Base supporting different types of sources and you can integrate the answering engine to multiple channels such as your website, Discord bot, Slack app, MCP, API, Github bot and more. It specializes in handling complex technical documentation, offering features like citations to source material and analytics to identify gaps in documentation.

It consists on multiple services that are created when you deploy it. Here is a brief list

- `front` - A front-end application
- `server` - Responsible for generating answers using AI
- `source-sync` - Responsible for fetching multiple sources and turning them into Knowledge Base

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| crawlchat-mongo | `ghcr.io/crawlchat/crawlchat-mongo:latest` | Database |
| Redis | `redis:8.2.1` | Database |
| crawlchat-marker | `ghcr.io/crawlchat/crawlchat-marker:v0.1.5` | Worker |
| update-kb | `ghcr.io/crawlchat/crawlchat-source-sync:latest` | Web service |
| pgvector | `pgvector/pgvector:pg18` | Database |
| crawlchat-server | `ghcr.io/crawlchat/crawlchat-server:latest` | Web service |
| cleanup-messages | `ghcr.io/crawlchat/crawlchat-server:latest` | Web service |
| crawlchat-front | `ghcr.io/crawlchat/crawlchat-front:latest` | Web service |
| weekly-update | `ghcr.io/crawlchat/crawlchat-server:latest` | Web service |
| crawlchat-source-sync | `ghcr.io/crawlchat/crawlchat-source-sync:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Host |
| `REDISPORT` | Redis | - | Port |
| `REDISUSER` | Redis | - | User |
| `REDIS_URL` | Redis | - | Redis URL |
| `REDISPASSWORD` | Redis | (secret) | Password |
| `REDIS_PASSWORD` | Redis | (secret) | Password |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL |
| `API_KEY` | crawlchat-marker | (secret) | A secret key |
| `REDIS_URL` | update-kb | - | Redis URL |
| `SELF_HOSTED` | update-kb | true | Self hosted flag. Should be true |
| `SERVER_HOST` | update-kb | - | Server app host |
| `ADMIN_EMAILS` | update-kb | - | Comma separated admin emails |
| `DATABASE_URL` | update-kb | - | Database URL |
| `GITHUB_TOKEN` | update-kb | (secret) | Required for Github issues, discussions, etc. |
| `PGVECTOR_URL` | update-kb | - | pgvector database URL |
| `ITEM_QUEUE_NAME` | update-kb | item | Queue name for pages |
| `SOURCE_SYNC_URL` | update-kb | - | source-sync app URL |
| `GROUP_QUEUE_NAME` | update-kb | group | Queue name for groups |
| `OPENROUTER_API_KEY` | update-kb | (secret) | OpenRouter API Key |
| `SCRAPECREATORS_API_KEY` | update-kb | (secret) | ScrapeCreator for Youtube video fetching |
| `POSTGRES_DB` | pgvector | railway | Database specific. No need to update |
| `DATABASE_URL` | pgvector | - | Database specific. No need to update |
| `POSTGRES_USER` | pgvector | (secret) | Database specific. No need to update |
| `PGHOST_PRIVATE` | pgvector | - | Database specific. No need to update |
| `PGPORT_PRIVATE` | pgvector | 5432 | Database specific. No need to update |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Database specific. No need to update |
| `DATABASE_URL_PRIVATE` | pgvector | - | Database specific. No need to update |
| `JWT_SECRET` | crawlchat-server | (secret) | A secret key |
| `SELF_HOSTED` | crawlchat-server | true | Should be true |
| `SERVER_HOST` | crawlchat-server | - | server app host |
| `ADMIN_EMAILS` | crawlchat-server | - | Comma separated admin emails |
| `DATABASE_URL` | crawlchat-server | - | Database URL |
| `PGVECTOR_URL` | crawlchat-server | - | pgvector database URL |
| `GITHUB_APP_ID` | crawlchat-server | - | For Github bot installation |
| `OPENAI_API_KEY` | crawlchat-server | (secret) | Deprecated |
| `SOURCE_SYNC_URL` | crawlchat-server | - | source-sync app URL |
| `OPENROUTER_API_KEY` | crawlchat-server | (secret) | OpenRouter API Key |
| `GITHUB_WEBHOOK_SECRET` | crawlchat-server | (secret) | For Github bot |
| `GITHUB_APP_PRIVATE_KEY` | crawlchat-server | - | For Github bot |
| `JWT_SECRET` | cleanup-messages | (secret) | A secret key |
| `SELF_HOSTED` | cleanup-messages | true | Should be true |
| `SERVER_HOST` | cleanup-messages | - | server app host |
| `ADMIN_EMAILS` | cleanup-messages | - | Comma separated admin emails |
| `DATABASE_URL` | cleanup-messages | - | Database URL |
| `PGVECTOR_URL` | cleanup-messages | - | pgvector database URL |
| `GITHUB_APP_ID` | cleanup-messages | - | Required for Github issues, discussions, etc. |
| `OPENAI_API_KEY` | cleanup-messages | (secret) | Deprecated |
| `SOURCE_SYNC_URL` | cleanup-messages | - | source-sync app URL |
| `OPENROUTER_API_KEY` | cleanup-messages | (secret) | OpenRouter API Key |
| `GITHUB_WEBHOOK_SECRET` | cleanup-messages | (secret) | For Github bot |
| `GITHUB_APP_PRIVATE_KEY` | cleanup-messages | - | For Github bot |
| `JWT_SECRET` | crawlchat-front | (secret) | A secret key |
| `RESEND_KEY` | crawlchat-front | - | Used for emails |
| `MARKER_HOST` | crawlchat-front | - | marker app host |
| `SELF_HOSTED` | crawlchat-front | true | Should be true |
| `SERVER_HOST` | crawlchat-front | - | server app host |
| `ADMIN_EMAILS` | crawlchat-front | - | Comma separated admin emails |
| `DATABASE_URL` | crawlchat-front | - | Database URL |
| `DODO_API_KEY` | crawlchat-front | (secret) | Not required |
| `VITE_APP_URL` | crawlchat-front | - | Public front URL |
| `MARKER_API_KEY` | crawlchat-front | (secret) | API Key for marker app |
| `DEFAULT_INDEXER` | crawlchat-front | earth | Should be earth for pgvector |
| `SOURCE_SYNC_URL` | crawlchat-front | - | source-sync app URL |
| `VITE_SERVER_URL` | crawlchat-front | - | Public server URL |
| `DATAFAST_API_KEY` | crawlchat-front | (secret) | Not required |
| `GOOGLE_CLIENT_ID` | crawlchat-front | - | For Google login |
| `VITE_DATAFAST_ID` | crawlchat-front | - | Not required |
| `RESEND_FROM_EMAIL` | crawlchat-front | - | Used for emails |
| `OPENROUTER_API_KEY` | crawlchat-front | (secret) | OpenRouter API Key |
| `VITE_SERVER_WS_URL` | crawlchat-front | - | Public server websocket URL |
| `DODO_WEBHOOK_SECRET` | crawlchat-front | (secret) | Not required |
| `GOOGLE_REDIRECT_URI` | crawlchat-front | - | For Google login |
| `GOOGLE_CLIENT_SECRET` | crawlchat-front | (secret) | For Google login |
| `TURNSTILE_SECRET_KEY` | crawlchat-front | (secret) | Cloudflare Turnstile Secret for Login page |
| `VITE_SOURCE_SYNC_URL` | crawlchat-front | - | Public source-sync app URL |
| `DEFAULT_SIGNUP_PLAN_ID` | crawlchat-front | accelerate-yearly | This plan gets activated for all signups |
| `VITE_TURNSTILE_SITE_KEY` | crawlchat-front | - | Cloudflare Turnstile Key for Login page |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | crawlchat-front | (secret) | Not required |
| `VITE_GITHUB_APP_INSTALL_URL` | crawlchat-front | - | Public Github bot installation URL |
| `JWT_SECRET` | weekly-update | (secret) | A secret key |
| `SELF_HOSTED` | weekly-update | true | Should be true |
| `SERVER_HOST` | weekly-update | - | server app host |
| `ADMIN_EMAILS` | weekly-update | - | Comma separated admin emails |
| `DATABASE_URL` | weekly-update | - | Database URL |
| `PGVECTOR_URL` | weekly-update | - | pgvector database URL |
| `GITHUB_APP_ID` | weekly-update | - | For Github bot |
| `OPENAI_API_KEY` | weekly-update | (secret) | Deprecated |
| `SOURCE_SYNC_URL` | weekly-update | - | source-sync app URL |
| `OPENROUTER_API_KEY` | weekly-update | (secret) | OpenRouter API Key |
| `GITHUB_WEBHOOK_SECRET` | weekly-update | (secret) | For Github bot |
| `GITHUB_APP_PRIVATE_KEY` | weekly-update | - | For Github bot |
| `REDIS_URL` | crawlchat-source-sync | - | Redis URL |
| `JWT_SECRET` | crawlchat-source-sync | (secret) | A secret key |
| `SELF_HOSTED` | crawlchat-source-sync | true | Should be true |
| `SERVER_HOST` | crawlchat-source-sync | - | server app host |
| `ADMIN_EMAILS` | crawlchat-source-sync | - | Comma separated admin emails |
| `DATABASE_URL` | crawlchat-source-sync | - | Database URL |
| `GITHUB_TOKEN` | crawlchat-source-sync | (secret) | For Github bot |
| `PGVECTOR_URL` | crawlchat-source-sync | - | pgvector database URL |
| `ITEM_QUEUE_NAME` | crawlchat-source-sync | item | Queue name for pages |
| `SOURCE_SYNC_URL` | crawlchat-source-sync | - | source-sync app URL |
| `GROUP_QUEUE_NAME` | crawlchat-source-sync | group | Queue name for groups |
| `OPENROUTER_API_KEY` | crawlchat-source-sync | (secret) | OpenRouter API Key |
| `SCRAPECREATORS_API_KEY` | crawlchat-source-sync | (secret) | ScrapeCreator for Youtube video fetching |

## Configuration

- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `npm run cron -- --job-name update-knowledge-base`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `npm run cron -- --job-name cleanup-messages`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/crawlchat-20260205)
