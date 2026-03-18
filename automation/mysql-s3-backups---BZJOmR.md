# Deploy mysql-s3-backups on Railway

Backup your MySQL or MariaDB database to S3 via a cron.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/BZJOmR)

## About

## Overview

The template uses node-cron or Railway cron, written in TypeScript to dump your MySQL or MariaDB data to a file and then upload the file to S3.

## Highlights

- Configurable backup schedule: By default, the cron runs at 5 AM every day but is configurable via the BACKUP_CRON_SCHEDULE environment variable.

- Support for custom buckets: The script also supports using a AWS_S3_ENDPOINT environment variable to use any S3 compliant storage bucket (eg: Wasabi).

## Configuration

- `AWS_ACCESS_KEY_ID` - AWS access key ID.

- `AWS_SECRET_ACCESS_KEY` - AWS secret access key, sometimes also called an application key.

- `AWS_S3_BUCKET` - The name of the bucket that the access key ID and secret access key are authorized to access.

- `AWS_S3_REGION` - The name of the region your bucket is located in, set to `auto` if unknown.

- `BACKUP_DATABASE_HOST` - The host of the database to backup.

- `BACKUP_DATABASE_PORT` - The port of the database to backup.

- `BACKUP_DATABASE_NAME` - The name of the database to backup.

- `BACKUP_DATABASE_USERNAME` - The username of the database to backup.

- `BACKUP_DATABASE_PASSWORD` - The password of the database to backup.

- `BACKUP_CRON_SCHEDULE` - The cron schedule to run the backup on. Example: `0 5 * * *`

- `AWS_S3_ENDPOINT` - The S3 custom endpoint you want to use. Applicable for 3-rd party S3 services such as Cloudflare R2 or Backblaze R2.

- `AWS_S3_FORCE_PATH_STYLE` - Use path style for the endpoint instead of the default subdomain style, useful for MinIO. Default `false`

- `RUN_ON_STARTUP` - Run a backup on startup of this application then proceed with making backups on the set schedule.

- `BACKUP_FILE_PREFIX` - Add a prefix to the file name.

- `BUCKET_SUBFOLDER` - Define a subfolder to place the backup files in.

- `SINGLE_SHOT_MODE` - Run a single backup on start and exit when completed. Useful with the platform's native CRON schedular.

- `SUPPORT_OBJECT_LOCK` - Enables support for buckets with object lock by providing an MD5 hash with the backup file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql-s3-backups | [PenguinOfWar/mysql-s3-backups](https://github.com/PenguinOfWar/mysql-s3-backups) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AWS_S3_BUCKET` | - | The name of the bucket that the access key ID and secret access key are authorized to access. |
| `AWS_S3_REGION` | - | The name of the region your bucket is located in, set to `auto` if unknown. |
| `AWS_ACCESS_KEY_ID` | - | AWS access key ID |
| `BACKUP_DATABASE_HOST` | - | The host of the database to backup. |
| `BACKUP_DATABASE_NAME` | - | The name of the database to backup. |
| `BACKUP_DATABASE_PORT` | - | The port of the database to backup. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | AWS secret access key, sometimes also called an application key. |
| `BACKUP_DATABASE_PASSWORD` | (secret) | The password of the database to backup. |
| `BACKUP_DATABASE_USERNAME` | (secret) | The username of the database to backup. |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/BZJOmR)
