# Deploy Telegram S3 Uploader on Railway

Private Telegram bot that uploads files to S3-compatible storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/telegram-s3-uploader)

## About

Telegram S3 Uploader is a private Telegram bot that uploads files to any
S3-compatible storage (AWS S3, Cloudflare R2, MinIO, Railway Bucket) and optionally
returns temporary presigned download links. It is designed for personal backups
and private file storage.

Hosting Telegram S3 Uploader involves running a lightweight Python bot that
listens for private Telegram messages, downloads incoming files temporarily, and
uploads them to S3-compatible storage. The bot does not require a database and
stores no permanent data locally. Railway handles the runtime environment,
process management, and environment variables, making deployment simple and
maintenance minimal.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| telegram-s3-uploader | [BigDaddyAman/telegram-s3-uploader](https://github.com/BigDaddyAman/telegram-s3-uploader) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_ID` | - | Your Telegram API ID from https://my.telegram.org |
| `API_HASH` | - | Your Telegram API hash from https://my.telegram.org |
| `BOT_TOKEN` | (secret) | Bot token from @BotFather |
| `S3_BUCKET` | - | Name of the bucket where files will be uploaded |
| `S3_ENDPOINT` | - | Custom S3 endpoint URL  Leave empty for AWS S3  Required for Cloudflare R2, MinIO, Railway Bucket |
| `ALLOWED_USERS` | - | Comma-separated Telegram user IDs allowed to use the bot Example: 123456789,987654321 Leave empty to allow all users (not recommended) |
| `S3_ACCESS_KEY` | - | Access key for your S3-compatible storage |
| `S3_SECRET_KEY` | (secret) | Secret key for your S3-compatible storage |
| `S3_MAX_CONCURRENCY` | 4 | Number of parts uploaded in parallel for a single large file. Higher values can increase upload speed but also use more CPU. |
| `ENABLE_PRESIGNED_URL` | false | Enable or disable temporary download links  true → return presigned download link (default)  false → upload only (backup mode) |
| `MAX_PARALLEL_UPLOADS` | 3 | Maximum number of files uploading at the same time across all users. Extra uploads are queued automatically. |
| `S3_MULTIPART_CHUNK_MB` | 50 | Size (in MB) of each multipart chunk. Larger chunks reduce overhead but use more memory. |
| `PRESIGNED_EXPIRE_SECONDS` | 3600 | How long presigned download links remain valid (in seconds) Example: 3600 = 1 hour |
| `S3_MULTIPART_THRESHOLD_MB` | 100 | File size (in MB) at which multipart uploads start. Smaller files are uploaded in one request. |

**Category:** Bots · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/telegram-s3-uploader)
