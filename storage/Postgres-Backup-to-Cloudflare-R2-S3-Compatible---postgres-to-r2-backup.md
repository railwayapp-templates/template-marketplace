# Deploy Postgres Backup to Cloudflare R2 (S3-Compatible) on Railway

Automated PostgreSQL backups to S3-compatible storage with encryption

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-to-r2-backup)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg-r2-backup | [BigDaddyAman/pg-r2-backup](https://github.com/BigDaddyAman/pg-r2-backup) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BACKUP_TIME` | 00:00 | Daily backup time (UTC, HH:MM) |
| `DUMP_FORMAT` | dump | Backup format: sql, plain, dump, custom, tar |
| `MAX_BACKUPS` | 7 | Number of backups to keep before auto-deletion |
| `R2_ENDPOINT` | - | Your Cloudflare R2 endpoint URL |
| `DATABASE_URL` | - | Your private PostgreSQL connection URL (eg: ${{ Postgres.DATABASE_URL }}) |
| `R2_ACCESS_KEY` | - | Cloudflare R2 access key |
| `R2_SECRET_KEY` | (secret) | Cloudflare R2 secret key |
| `R2_BUCKET_NAME` | - | Cloudflare R2 bucket name |
| `USE_PUBLIC_URL` | false | Set to true to use DATABASE_PUBLIC_URL instead of DATABASE_URL |
| `BACKUP_PASSWORD` | (secret) | Optional: Password for 7z encryption |
| `FILENAME_PREFIX` | backup | Prefix for backup filenames |
| `KEEP_LOCAL_BACKUP` | false | Keep backup file locally after upload (default: false) |
| `DATABASE_PUBLIC_URL` | - | Public PostgreSQL URL (optional, only if you enable USE_PUBLIC_URL) |

**Category:** Storage · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-to-r2-backup)
