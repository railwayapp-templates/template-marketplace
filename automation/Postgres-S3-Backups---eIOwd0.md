# Deploy Postgres S3 Backups on Railway

Backup your Postgres DB to any S3 storage (Backblaze/Cloudflare)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eIOwd0)

## About

A simple script to backup your Postgres database to any S3-compatible storage, including Backblaze B2 and Cloudflare R2, on any schedule.

All the configuration options can be found on our [GitHub repo](https://github.com/OtterlySpace/railway-postgres-s3-backups)

Based on [Railway's Postgres S3 Backups](https://github.com/railwayapp-templates/postgres-s3-backups) script.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backup CRON | [OtterlySpace/railway-postgres-s3-backups](https://github.com/OtterlySpace/railway-postgres-s3-backups) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PG_VERSION` | 17 | The Posgres version to use for making the database dump. Defaults to 17 |
| `AWS_S3_BUCKET` | - | The name of the S3 bucket. |
| `AWS_S3_REGION` | - | The region the S3 bucket is in. |
| `AWS_S3_ENDPOINT` | - | A custom S3 endpoint if using a separate S3 compatible service. |
| `AWS_ACCESS_KEY_ID` | - | The access key ID for the IAM user. |
| `BACKUP_DATABASE_URL` | - | The database url for the database to backup. |
| `BACKUP_CRON_SCHEDULE` | 0 5 * * * | How often should backups be created. Defaults to daily at 5 AM. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | The secret access key for the IAM user. |
| `DISABLE_S3_CHECKSUM_VALIDATION` | false | Disables default S3 request checksum validation which is not supported by some S3 providers like Backblaze B2 and Cloudflare R2. This only impacts the communication between the application and the S3 service, not the backup itself. Set this to true if you use any of those services. |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/eIOwd0)
