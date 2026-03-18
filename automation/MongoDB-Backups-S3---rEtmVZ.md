# Deploy MongoDB Backup's S3 on Railway

Automated MongoDB database backups and uploading them to S3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rEtmVZ)

## About

# MongoDB Backup to S3

Automated MongoDB backup solution that creates regular database backups and uploads them to S3-compatible storage.

## Features

- Automatic MongoDB database backups using native `mongodump`
- Direct upload to S3-compatible storage (AWS S3, Cloudflare R2, etc.)
- Configurable backup schedule via cron expressions
- Automatic cleanup of old local backups
- Proper error handling and logging



## Example Configuration

```env
# MongoDB Configuration
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_AUTH_SOURCE=
DB_NAME=

# S3 Configuration (Cloudflare R2)
S3_BUCKET=
S3_ENDPOINT=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=

# Backup Settings
BACKUP_CRON=0 */6 * * *  # Run every 6 hours
BACKUP_RETENTION_DAYS=30  # Keep local backups for 30 days
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB Backups | [lassejlv/mongodb-backup-s3](https://github.com/lassejlv/mongodb-backup-s3) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_USER` | (secret) | - |
| `S3_REGION` | - | Set to 'auto' if you don't know the region |
| `BACKUP_CRON` | 0 */6 * * * | - |
| `DB_AUTH_SOURCE` | admin | - |
| `S3_SECRET_ACCESS_KEY` | (secret) | - |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/rEtmVZ)
