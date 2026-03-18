# Deploy PG Backup on Railway

A container for creating & uploading postgres backups to s3 compat. buckets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ZJn5OO)

## About

This template includes a container for andriotisnikos1/pg-backup.

It allows you to input:
- S3 credentials
- (Optional) Sentry credentials
- A PostgreSQL connection URL
- A Cron schedule
- (Optional) A backup limit

Then, every time cron hits, a backup is made, and uploaded to s3. If the total backups are more than the limit, the older ones are automatically removed

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg-backup | `andriotisnikos1/pg_backup` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | - | "development" | "production" (optional: defaults to "production") |
| `S3_BUCKET` | - | Backups Configuration |
| `SENTRY_DSN` | - | required if SENTRY_ENABLED=true |
| `POSTGRES_URL` | - | required |
| `S3_AUTH_KEY_ID` | (secret) | - |
| `S3_AUTH_SECRET` | (secret) | - |
| `SENTRY_ENABLED` | - | "true" | "false" |
| `SENTRY_MONITOR_SLUG` | - | required if SENTRY_ENABLED=true |
| `BACKUPS_CRON_SCHEDULE` | - | "0 0 * * *" (required) |
| `BACKUPS_MAX_KEEP_COUNT` | - | the number of latest backups to keep (defaults to 5) |
| `BACKUPS_FILE_IDENTIFIER` | - | optional |

**Category:** Automation

[View on Railway →](https://railway.com/template/ZJn5OO)
