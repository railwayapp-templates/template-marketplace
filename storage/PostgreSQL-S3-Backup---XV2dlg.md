# Deploy PostgreSQL & S3 Backup on Railway

PostgreSQL database with a CRON job that uploads a backup to S3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/XV2dlg)

## About

# PostgreSQL & S3 Backup

This template contains a PostgreSQL database and a CRON job that automatically creates a backup and uploads it to S3.

## What you need

- AWS Account with Access Key
- S3 Bucket

## Variables

| Name                 | Description                                                                                                                                                                                                                | Optional | Default value |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------------|
| SCHEDULE             | CRON schedule at which the backup is run. The schedule also supports non standard values like @hourly, @daily, @weekly, @monthly and @yearly. If left empty the backup will be run immediately and the container will stop | Yes      |               |
| BACKUP_KEEP_DAYS     | The number of days to keep a backup file for. If left empty backups will NEVER be automatically deleted                                                                                                                    | Yes      |               |
| Passphrase           | Passphrase to be used when encrypting the backup using GPG. If left empty NO encryption will be done                                                                                                                       | Yes      |               |
| S3_REGION            | The region the AWS S3 bucket was created in                                                                                                                                                                                | No       |               |
| S3_BUCKET            | The name of the bucket to upload your files into                                                                                                                                                                           | No       |               |
| S3_ACCESS_KEY        | The ID of the your access key used to upload files into the S3 bucket                                                                                                                                                      | No       |               |
| S3_SECRET_ACCESS_KEY | The secret key of your AWS access key                                                                                                                                                                                      | No       |               |
| S3_PREFIX            | The prefix to be used when uploading the backup to S3. If left empty the backup will be uploaded to the root of the bucket                                                                                                 | No       | backup        |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| S3 Backup | `eeshugerman/postgres-backup-s3:16` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SCHEDULE` | S3 Backup | - | CRON schedule at which the backup is run. The schedule also supports non standard values like @hourly, @daily, @weekly, @monthly and @yearly. If left empty the backup will be run immediately and the container will stop |
| `S3_BUCKET` | S3 Backup | - | The name of the bucket to upload your files into |
| `S3_PREFIX` | S3 Backup | backup | The file name prefix to be used for backup files |
| `S3_REGION` | S3 Backup | - | The region the AWS S3 bucket was created in |
| `PASSPHRASE` | S3 Backup | - | Passphrase to be used when encrypting the backup using GPG. If left empty NO encryption will be done |
| `POSTGRES_HOST` | S3 Backup | - | The URL to the database |
| `POSTGRES_PORT` | S3 Backup | - | The port the database is listening on |
| `POSTGRES_USER` | S3 Backup | (secret) | The user used to connect to the database |
| `BACKUP_KEEP_DAYS` | S3 Backup | - | The number of days to keep a backup file for. If left empty backups will NEVER be automatically deleted |
| `S3_ACCESS_KEY_ID` | S3 Backup | - | The ID of the your access key used to upload files into the S3 bucket |
| `POSTGRES_DATABASE` | S3 Backup | - | The database to pull a backup from |
| `POSTGRES_PASSWORD` | S3 Backup | (secret) | The password used for authenticating the database user |
| `S3_SECRET_ACCESS_KEY` | S3 Backup | (secret) | The secret key of your AWS access key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/XV2dlg)
