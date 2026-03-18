# Deploy MYSQL Backup to S3 Service on Railway

Quick backup your mysql to any S3 service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mysql-backup-to-s3-service)

## About

MYSQL Backup to S3 Service is a simple service that automatically backs up a MySQL database and uploads the compressed dump to any S3-compatible storage. It creates `.sql.gz` backups and stores them safely outside your application environment.

This service runs as a small Node.js worker that connects to a MySQL database, generates SQL dumps, compresses them, and uploads the backup to an S3 bucket.

It is designed to be easy to deploy and maintain. The service is stateless and works perfectly with Railway cron jobs, making it ideal for scheduled daily or hourly backups. All configuration is handled using environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql-backup-to-s3 | [poziomekk/mysql-backup-to-s3](https://github.com/poziomekk/mysql-backup-to-s3) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | 0 | Output mysql/mysqldump commands to console. 0/1 |
| `AWS_S3_BUCKET` | - | The S3 bucket where the backups will be stored. (only name) |
| `AWS_S3_REGION` | - | The AWS region where the S3 bucket is located. (try auto) |
| `AWS_S3_ENDPOINT` | - | S3 endpoint URL, withOUT bucket name. |
| `AWS_ACCESS_KEY_ID` | - | The AWS access key ID for accessing S3. |
| `BACKUP_CRON_SCHEDULE` | 0 1 * * * | The cron schedule for automatic backups. |
| `BACKUP_DATABASE_HOST` | - | The hostname or IP address of the database server. |
| `BACKUP_DATABASE_NAME` | - | Name of the database to backup. Leave empty to backup all databases. |
| `BACKUP_DATABASE_PORT` | - | The port number on which the database server is listening. |
| `BACKUP_DATABASE_USER` | (secret) | The username to connect to the database server. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | The AWS secret access key associated with the access key ID. |
| `BACKUP_DATABASE_PASSWORD` | (secret) | The password to connect to the database server. |

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/mysql-backup-to-s3-service)
