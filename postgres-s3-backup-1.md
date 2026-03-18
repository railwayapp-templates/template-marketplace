# Deploy Postgres S3 Backup (Fastest) on Railway

A simple Bun app to back up your PostgreSQL database to S3 via a cron

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgres-s3-backup-1)

## About

PostgreSQL S3 Backup is an automated backup service that uses Railway cron to dump PostgreSQL data and upload it to S3-compatible storage. The service is written in TypeScript and provides configurable scheduling and storage options.

PostgreSQL S3 Backups runs as a Bun application that executes pg_dump operations on a schedule and uploads compressed database dumps to S3 storage. You'll need to manage cron job reliability, monitor backup success/failure rates, and handle S3 storage costs as backup data accumulates. The service requires database connection management, S3 authentication, and error handling for network failures during uploads. Storage lifecycle policies become important for managing backup retention and costs over time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres S3 Backup | [slvssb/railway-postgres-s3-backup](https://github.com/slvssb/railway-postgres-s3-backup) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | - | The name of the bucket that the access key ID and secret access key are authorized to access |
| `S3_REGION` | - | The name of the region your bucket is located in, set to auto if unknown. |
| `PG_VERSION` | 17 | Specify a custom PostgreSQL version to override the default version set in the Dockerfile |
| `S3_ENDPOINT` | - | The S3 custom endpoint you want to use. Applicable for 3rd party S3 services such as Cloudflare R2 or Backblaze R2 |
| `DATABASE_URL` | - | The connection string of the database to backup |
| `BACKUP_OPTIONS` | - | Add any valid pg_dump option. Example: --exclude-table=pattern |
| `BUCKET_SUBFOLDER` | - | Define a subfolder to place the backup files in |
| `AWS_ACCESS_KEY_ID` | - | AWS access key ID |
| `BACKUP_FILE_PREFIX` | backup | Add a prefix to the file name |
| `S3_FORCE_PATH_STYLE` | false | Use path style for the endpoint instead of the default subdomain style, useful for MinIO |
| `BUCKET_STORAGE_CLASS` | STANDARD | Storage class of the Bucket |
| `AWS_SECRET_ACCESS_KEY` | (secret) | AWS secret access key, sometimes also called an application key |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/postgres-s3-backup-1)
