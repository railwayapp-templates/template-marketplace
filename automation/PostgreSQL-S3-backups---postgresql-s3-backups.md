# Deploy PostgreSQL S3 backups on Railway

A simple utility to backup Postgres databases to S3 using Bun.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-s3-backups)

## About

PostgreSQL S3 backups is a lightweight service that creates compressed PostgreSQL backups and uploads them to AWS S3, Cloudflare R2, MinIO, or another S3-compatible storage provider. Run it continuously with Bun's native scheduler or once per deployment with [Railway Cron](https://docs.railway.com/cron-jobs).

Hosting PostgreSQL S3 backups involves connecting the service to a PostgreSQL database and an S3-compatible bucket through Railway variables. For each execution, the service streams `pg_dump` into a Gzip-compressed tar archive, validates it, uploads it, and removes the temporary local file. It supports automatic multipart uploads, configurable retention, custom `pg_dump` options, and PostgreSQL client versions 14 through 18. You can use Railway Cron to start one single-shot deployment per schedule or keep the service running with Bun's native scheduler. No persistent volume or separate Bun runtime installation is required in the final Docker image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgreSQL S3 Backups | [ncontiero/postgres-s3-backups](https://github.com/ncontiero/postgres-s3-backups) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | - | The name of your S3 bucket. |
| `S3_REGION` | - | The region of your S3 bucket. |
| `PG_VERSION` | 18 | The version of PostgreSQL to use when installing `pg_dump`. |
| `S3_ENDPOINT` | - | The endpoint for your S3-compatible service (optional). |
| `DATABASE_URL` | - | The connection URL for your PostgreSQL database. |
| `BACKUP_OPTIONS` | - | Extra options to pass to the `pg_dump` command (optional). |
| `RUN_ON_STARTUP` | false | Whether to run a backup on startup. |
| `BUCKET_SUBFOLDER` | - | A subfolder within the bucket to store backups (optional). |
| `SINGLE_SHOT_MODE` | false | Whether to run a single backup and then exit. |
| `AWS_ACCESS_KEY_ID` | - | Your S3 access key ID. |
| `BACKUP_FILE_PREFIX` | backup | The prefix for the backup file name. |
| `BACKUP_CRON_SCHEDULE` | 0 0 * * * | The cron schedule for backups. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Your S3 secret access key. |
| `BACKUP_RETENTION_DAYS` | - | Number of days to keep backups before automatically deleting them. |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/postgresql-s3-backups)
