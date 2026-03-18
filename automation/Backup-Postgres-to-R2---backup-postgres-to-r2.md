# Deploy Backup Postgres to R2 on Railway

Backup Postgres to R2 (or S3) using Railway's Cron

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/backup-postgres-to-r2)

## About

This backup job runs a single time, to be scheduled with [Railway's native Cron feature](https://docs.railway.com/reference/cron-jobs). This should save some compute cost over a long-running job (like the official Railway template).

This template was created for [Cloudflare R2](https://developers.cloudflare.com/r2/), but it uses [rclone](https://rclone.org/) under the hood, so it can back up to virtually anywhere with a little tweaking.

To set up properly:

1. Configure environment variables for your database &amp; R2 bucket
2. Disable restarts
3. Set a Cron schedule to back up as often as you'd like in settings

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rclone-postgres-backup | [dbanty/rclone-postgres-backup](https://github.com/dbanty/rclone-postgres-backup) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `R2_PATH` | - | A path within the R2 bucket to upload the .tar to, defaults to "postgres-backup.tar" |
| `R2_BUCKET` | - | The name of the bucket to upload to |
| `R2_ENDPOINT` | - | The S3 API URL for your R2 account |
| `R2_ACCESS_KEY_ID` | - | An S3-compatible access key |
| `R2_SECRET_ACCESS_KEY` | (secret) | An S3-compatible access key |

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/backup-postgres-to-r2)
