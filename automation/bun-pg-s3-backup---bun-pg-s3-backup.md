# Deploy bun-pg-s3-backup on Railway

A simple Bun cron job to backup PostgreSQL databases to an S3 bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bun-pg-s3-backup)

## About

A simple Bun script with a Railway bucket to enable blazingly fast automatic backups for your Postgres databases. Run this with a Railway cron schedule and configure the backup retention duration for a fast, easy and cost-efficient backup solution.

This is a fork of Railway's [postgres-s3-backups](https://github.com/railwayapp-templates/postgres-s3-backups) repository which replaces Node with Bun and interacts with the Railway bucket using Bun's native S3 bindings for the best performance.

Set up your Postgres database in your Railway project, then deploy this template into your project with the internal database URL set. Finally, set a cron schedule on the Bun service and let the cron job takes care of everything by itself.

The service has a default backup retention duration of 7 days. Customize this in the variables section.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-backups-cron | [logic-pad/postgres-s3-backups](https://github.com/logic-pad/postgres-s3-backups) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AWS_S3_BUCKET` | - | S3 bucket name |
| `AWS_S3_REGION` | - | S3 region |
| `BACKUP_OPTIONS` | - | Any valid pg_dump options |
| `AWS_S3_ENDPOINT` | - | Custom S3 endpoint |
| `BUCKET_SUBFOLDER` | - | An optional subfolder to place the backups in |
| `AWS_ACCESS_KEY_ID` | - | S3 access key ID |
| `BACKUP_FILE_PREFIX` | - | An optional prefix to the file name |
| `BACKUP_DATABASE_URL` | - | URL of the Postgres database you want to backup |
| `AWS_SECRET_ACCESS_KEY` | (secret) | S3 secret access key |
| `BACKUP_RETENTION_DAYS` | 7 | Number of days the backups should be retained for. Leave empty to retain indefinitely |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/bun-pg-s3-backup)
