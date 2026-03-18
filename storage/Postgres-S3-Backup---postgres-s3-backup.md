# Deploy Postgres S3 Backup on Railway

A simple method for postgres backups to a S3 instance on railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgres-s3-backup)

## About

Postgres S3 Backups is a lightweight Bun application that dumps your PostgreSQL database and uploads compressed backups to any S3-compatible storage. It runs a single backup on startup and exits—pair it with Railway Cron for automated, scheduled backups.

Deploying this template gives you a service that performs full PostgreSQL backups (pg_dump) and stores them in S3-compatible object storage. The service runs once per invocation, making it ideal for cron-triggered deployments. You'll need a Postgres database to backup and S3 credentials (AWS S3, Cloudflare R2, Backblaze B2, or any S3-compatible provider). Configure environment variables for your storage provider, link your Postgres database, and set up Railway Cron to run backups on your preferred schedule (e.g., daily at 5 AM).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres S3 Backup | [ItsNoxius/railway-postgres-s3-backups](https://github.com/ItsNoxius/railway-postgres-s3-backups) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | - | The name of the bucket that the access key ID and secret access key are authorized to access. |
| `S3_REGION` | us-east-1 | The name of the region your bucket is located in, set to `us-east-1` if unknown. |
| `PG_VERSION` | 17 | Specify a custom PostgreSQL version to override the default version set in the Dockerfile. |
| `BUN_VERSION` | 1.3 | Specify a custom Bun version to override the default version set in the Dockerfile. |
| `MAX_BACKUPS` | 10 | Maximum number of backups to keep in S3. Oldest backups are deleted when exceeded. 0 = unlimited. Default `0`. |
| `S3_ENDPOINT` | - | The S3 custom endpoint you want to use. Applicable for 3-rd party S3 services such as Cloudflare R2 or Backblaze R2. |
| `DATABASE_URL` | - | The connection string of the database to backup. |
| `S3_ACCESS_KEY` | - | S3 Access Key |
| `S3_SECRET_KEY` | (secret) | S3 secret key |
| `BACKUP_OPTIONS` | - | Add any valid pg_dump option, supported pg_dump options can be found [here](https://www.postgresql.org/docs/current/app-pgdump.html). Example: `--exclude-table=pattern` |
| `BACKUP_FILE_PREFIX` | backup_ | Add a prefix to the file name. |
| `DISCORD_WEBHOOK_URL` | - | An optional Discord Webhook to notify of backup status |
| `S3_FORCE_PATH_STYLE` | - | Use path style for the endpoint instead of the default subdomain style, useful for MinIO. Default `false` |
| `SUPPORT_OBJECT_LOCK` | - | Enables support for buckets with object lock by providing an MD5 hash with the backup file. |

**Category:** Storage · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/postgres-s3-backup)
