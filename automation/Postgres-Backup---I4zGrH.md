# Deploy Postgres Backup on Railway

Cron-based PostgreSQL backup to bucket storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/I4zGrH)

## About

PostgreSQL S3 Backups is an automated backup service that uses node-cron or Railway cron to dump PostgreSQL data and upload it to S3-compatible storage. The service is written in TypeScript and provides configurable scheduling and storage options.

PostgreSQL S3 Backups runs as a Node.js application that executes pg_dump operations on a schedule and uploads compressed database dumps to S3 storage. You'll need to manage cron job reliability, monitor backup success/failure rates, and handle S3 storage costs as backup data accumulates. The service requires database connection management, S3 authentication, and error handling for network failures during uploads. Storage lifecycle policies become important for managing backup retention and costs over time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backup CRON | [railwayapp-templates/postgres-s3-backups](https://github.com/railwayapp-templates/postgres-s3-backups) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PG_VERSION` | 17 | - |
| `NODE_VERSION` | 22 | - |
| `AWS_S3_BUCKET` | - | The name of the S3 bucket. |
| `AWS_S3_REGION` | auto | The region the S3 bucket is in. |
| `AWS_S3_ENDPOINT` | - | A custom S3 endpoint if using a separate S3 compatible service. |
| `SINGLE_SHOT_MODE` | true | Run a backup once at start. |
| `AWS_ACCESS_KEY_ID` | - | The access key ID for the IAM user. |
| `BACKUP_DATABASE_URL` | - | The database url for the database to backup. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | The secret access key for the IAM user. |
| `AWS_S3_FORCE_PATH_STYLE` | false | - |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/I4zGrH)
