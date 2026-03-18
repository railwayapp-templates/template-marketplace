# Deploy postgres-s3-backup on Railway

Automated PostgreSQL backups to S3 with restore verification

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sparkling-creation)

## About

PostgreSQL Backup & Restore Verification is an automated backup system that dumps your database on a configurable schedule, compresses and optionally encrypts it with AES-256, then uploads to any S3-compatible storage. It includes a dedicated restore verification service that periodically restores backups to a separate database to prove they actually work — because a backup you've never tested is a backup you can't trust.

This template deploys two services on Railway:

**Backup Service** — Runs `pg_dump` on a configurable interval (default: every hour), compresses the output with gzip, and uploads to your S3 bucket. Supports automatic retention management that cleans up backups older than your configured threshold (default: 7 days). Failed uploads are retried with exponential backoff. Optional AES-256-CBC encryption protects sensitive data at rest.

**Verify Service** — Performs automated restore drills on a separate schedule (default: every 24 hours). Downloads the latest backup from S3, restores it to an isolated verification database, runs integrity checks (table counts, row validation, custom SQL queries), then cleans up. Built-in safety checks prevent accidental restores to your production database.

Both services are lightweight containers built on `postgres:16-alpine` with minimal dependencies. You provide your own S3-compatible storage — AWS S3, Backblaze B2, Cloudflare R2, DigitalOcean Spaces, Wasabi, or MinIO all work out of the box. Configure your database connection and S3 credentials as environment variables and the services start working immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-s3-backup | [Kjudeh/railway-postgres-backups](https://github.com/Kjudeh/railway-postgres-backups) (root: /) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | false | Enable verbose debug logging |
| `S3_BUCKET` | - | S3 bucket name for storing backups |
| `S3_REGION` | us-east-1 | AWS region |
| `RETRY_DELAY` | 5 | Initial retry delay in seconds (exponential backoff) |
| `S3_ENDPOINT` | - | S3-compatible endpoint URL (e.g. https://s3.amazonaws.com) |
| `WEBHOOK_URL` | - | Webhook URL for notifications (Slack/Discord) |
| `DATABASE_URL` | - | PostgreSQL connection string (postgresql://user:pass@host:port/db) |
| `BACKUP_PREFIX` | postgres-backups | S3 key prefix for organizing backups |
| `RETRY_ATTEMPTS` | 3 | Number of S3 upload retry attempts |
| `BACKUP_INTERVAL` | 3600 | Backup frequency in seconds |
| `S3_ACCESS_KEY_ID` | - | S3 access key ID |
| `BACKUP_ENCRYPTION` | false | Enable AES-256 encryption (true/false) |
| `COMPRESSION_LEVEL` | 6 | Gzip compression level (1-9) |
| `WEBHOOK_ON_FAILURE` | true | Send notification on failed backup |
| `WEBHOOK_ON_SUCCESS` | false | Send notification on successful backup |
| `S3_SECRET_ACCESS_KEY` | (secret) | S3 secret access key |
| `BACKUP_ENCRYPTION_KEY` | - | Encryption key (required if encryption enabled, 32+ chars) |
| `BACKUP_RETENTION_DAYS` | 7 | Days to retain backups |

**Category:** Automation · **Languages:** Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/sparkling-creation)
