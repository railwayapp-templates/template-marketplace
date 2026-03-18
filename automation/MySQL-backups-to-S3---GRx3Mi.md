# Deploy MySQL backups to S3 on Railway

A simple NodeJS application to backup your MySQL database to S3 via a cron.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/GRx3Mi)

## About

## Overview

This template starts a small Node.js app that automatically creates a database dump and saves it to an S3 bucket by schedule.

## Setup

To start the app just need to add environment variables to specify the database (DB name, host, user, password), the S3 bucket you want the dump to be saved to (access ID, secret ID, bucket name, bucket region), and cron schedule.

By default, the cron is running daily at 5 am.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL backups to S3 | [Natuz/mysql-s3-backup](https://github.com/Natuz/mysql-s3-backup) (root: /) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AWS_S3_BUCKET` | - | S3 bucket name. |
| `AWS_S3_REGION` | - | S3 bucket region name. |
| `AWS_S3_ENDPOINT` | - | Specify the S3 custom endpoint if you want to use it. |
| `AWS_ACCESS_KEY_ID` | - | Access key ID. |
| `BACKUP_CRON_SCHEDULE` | 0 5 * * * | The cron schedule to run the backup on. |
| `BACKUP_DATABASE_HOST` | - | Database host. |
| `BACKUP_DATABASE_NAME` | - | Database name. |
| `BACKUP_DATABASE_PORT` | 3306 | Database port. |
| `BACKUP_DATABASE_USER` | (secret) | Database user name. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Secret access key. |
| `BACKUP_DATABASE_PASSWORD` | (secret) | Database password. |

## Configuration

- **Start command:** `npm run start`
- **Healthcheck:** `/`

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/GRx3Mi)
