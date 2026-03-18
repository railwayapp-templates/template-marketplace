# Deploy Kan on Railway

The open source alternative to Trello

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kan)

## About

Kan is an open-source alternative to Trello—a powerful, flexible kanban app that helps you organize work, track progress, and deliver results. It provides simple, visual task management with drag-and-drop cards, team collaboration, and essential features without unnecessary complexity.

Hosting Kan requires a PostgreSQL database for data storage, which Railway provides as a managed service. Optional dependencies include Redis for rate limiting and S3-compatible storage for file uploads (avatars and attachments). The application runs as a Next.js application with automatic database migrations on startup. Railway simplifies deployment by handling infrastructure, environment variables, and scaling automatically, so you can focus on using Kan rather than managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Web | `ghcr.io/kanbn/kan:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis server hostname/IP |
| `REDISPORT` | Redis | 6379 | Redis server port (default: 6379) |
| `REDISUSER` | Redis | default | Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Redis password (alternative name) |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `REDIS_URL` | Web | - | Redis connection URL |
| `S3_REGION` | Web | - | S3 storage region |
| `SMTP_HOST` | Web | - | SMTP server hostname |
| `SMTP_PORT` | Web | - | SMTP server port |
| `SMTP_USER` | Web | (secret) | SMTP username/email |
| `EMAIL_FROM` | Web | - | Sender email address |
| `S3_ENDPOINT` | Web | - | S3_ENDPOINT |
| `SMTP_SECURE` | Web | - | SMTP connection (defaults to true if not set) |
| `POSTGRES_URL` | Web | - | PostgreSQL connection URL |
| `SMTP_PASSWORD` | Web | (secret) | SMTP password/token |
| `GOOGLE_CLIENT_ID` | Web | - | Google OAuth client ID |
| `S3_ACCESS_KEY_ID` | Web | - | S3_ACCESS_KEY_ID |
| `KAN_ADMIN_API_KEY` | Web | (secret) | Admin API key for stats and admin endpoints |
| `TRELLO_APP_SECRET` | Web | (secret) | Trello app API secret |
| `BETTER_AUTH_SECRET` | Web | (secret) | BETTER_AUTH_SECRET |
| `TRELLO_APP_API_KEY` | Web | (secret) | Trello app API key |
| `GOOGLE_CLIENT_SECRET` | Web | (secret) | Google OAuth client secret |
| `NEXT_PUBLIC_BASE_URL` | Web | - | NEXT_PUBLIC_BASE_URL |
| `S3_SECRET_ACCESS_KEY` | Web | (secret) | S3_ACCESS_KEY_ID |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Web | - | Allowed callback origins |
| `NEXT_PUBLIC_DISABLE_SIGN_UP` | Web | - | NEXT_PUBLIC_DISABLE_SIGN_UP |
| `NEXT_PUBLIC_ALLOW_CREDENTIALS` | Web | (secret) | Allow email & password login |
| `NEXT_PUBLIC_AVATAR_BUCKET_NAME` | Web | - | S3 bucket name for avatars |
| `NEXT_PUBLIC_ATTACHMENTS_BUCKET_NAME` | Web | - | S3 bucket name for attachments |
| `POSTGRES_DB` | Postgres | kan_db | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kan)
