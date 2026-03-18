# Deploy Telegram File To Link Bot on Railway

Telegram bot that turns file uploads into secure public download links

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/telegram-file-to-link-bot)

## About

Hosting Telegram File To Link Bot involves running a Python-based backend that integrates Telegram (via Pyrogram), FastAPI for public downloads, PostgreSQL for metadata storage, and Redis for caching and rate limiting. Railway simplifies this by providing managed PostgreSQL, Redis, HTTPS networking, and environment variable configuration, allowing you to deploy the full stack without manual server setup or maintenance.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| telegram-file-link-bot | [BigDaddyAman/telegram-file-to-link-bot](https://github.com/BigDaddyAman/telegram-file-to-link-bot) | Web service |
| Postgres-l5gt | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_ID` | telegram-file-link-bot | - | Telegram API ID (get from https://my.telegram.org) |
| `API_HASH` | telegram-file-link-bot | - | Telegram API hash (get from https://my.telegram.org) |
| `BASE_URL` | telegram-file-link-bot | - | Public HTTPS URL where generated download links point to. Example: https://files.example.com Must match the domain serving this app. |
| `BOT_TOKEN` | telegram-file-link-bot | (secret) | Telegram bot token (get from @BotFather) |
| `REDIS_URL` | telegram-file-link-bot | - | Redis connection string |
| `ADMIN_EMAIL` | telegram-file-link-bot | - | Admin login email address. Example: admin@example.com Required only if ADMIN_ENABLED=true. |
| `MAX_FILE_MB` | telegram-file-link-bot | 4096 | Maximum allowed file size (in MB) for uploads handled by the bot. Files larger than this limit will be rejected. Example values: 100, 500, 2048. |
| `DATABASE_URL` | telegram-file-link-bot | - | DATABASE_URL – PostgreSQL connection string  |
| `ADMIN_ENABLED` | telegram-file-link-bot | false | Enable admin dashboard. Set to true or false. Default: false. Dashboard available at /admin when enabled. |
| `ADMIN_PASSWORD` | telegram-file-link-bot | (secret) | Admin login password. Example: change_me Required only if ADMIN_ENABLED=true. |
| `SESSION_SECRET` | telegram-file-link-bot | (secret) | Random secret key used to sign admin sessions. Example: replace_with_random_secret Required only if ADMIN_ENABLED=true. |
| `STORAGE_BACKEND` | telegram-file-link-bot | s3 | Storage backend for uploaded files. Use s3 on Railway (recommended) to ensure persistent storage via Storage Buckets. Using local on Railway is NOT persistent and data will be lost on redeploy. The s3 backend also supports any S3-compatible storage such as AWS S3, Cloudflare R2, MinIO, and similar services. |
| `ALLOWED_USER_IDS` | telegram-file-link-bot | - | Comma-separated Telegram numeric user IDs allowed to upload files. Example: 123456789,987654321 Leave empty to allow everyone.  To get your user ID: open Telegram → search @userinfobot → press Start. |
| `AWS_ENDPOINT_URL` | telegram-file-link-bot | - | S3-compatible storage endpoint URL (e.g. Railway Storage, Cloudflare R2, MinIO) |
| `AWS_ACCESS_KEY_ID` | telegram-file-link-bot | - | Access key ID for authenticating with the S3-compatible storage |
| `AWS_DEFAULT_REGION` | telegram-file-link-bot | - | Region for the S3-compatible storage service (auto on Railway) |
| `AWS_S3_BUCKET_NAME` | telegram-file-link-bot | - | Name of the S3 bucket used to store uploaded files |
| `AWS_SECRET_ACCESS_KEY` | telegram-file-link-bot | (secret) | Secret access key for authenticating with the S3-compatible storage |
| `GLOBAL_RATE_LIMIT_WINDOW` | telegram-file-link-bot | 10 | Time window in seconds |
| `MAX_CONCURRENT_TRANSFERS` | telegram-file-link-bot | - | Maximum number of concurrent file uploads/downloads. Default: 3. |
| `GLOBAL_RATE_LIMIT_REQUESTS` | telegram-file-link-bot | 60 | Max requests per IP |
| `POSTGRES_DB` | Postgres-l5gt | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres-l5gt | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres-l5gt | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres-l5gt | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres-l5gt | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Bots · **Languages:** Python, HTML, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/telegram-file-to-link-bot)
