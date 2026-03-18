# Deploy PostgreSQL S3 backups on Railway

A simple utility to backup Postgres databases to S3 using Bun.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgresql-s3-backups)

## About

PostgreSQL S3 Backups is an automated backup service that uses [node-cron](https://github.com/kelektiv/node-cron) or [Railway cron](https://docs.railway.com/reference/cron-jobs) to dump PostgreSQL data and upload it to [S3-compatible storage](https://bun.sh/docs/api/s3#support-for-s3-compatible-services). The service is written in TypeScript and provides configurable scheduling and storage options.

PostgreSQL S3 Backups runs as a Bun application that executes `pg_dump` operations on a schedule and uploads compressed database dumps to S3 storage. You'll need to manage cron job reliability, monitor backup success/failure rates, and handle S3 storage costs as backup data accumulates. The service requires database connection management, S3 authentication, and error handling for network failures during uploads. Storage lifecycle policies become important for managing backup retention and costs over time.

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

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/postgresql-s3-backups)
