# Deploy One Time PostgreSQL S3 Backup on Railway

Backup your PostgreSQL database into a S3 bucket using Railway CRON

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/UGKaB8)

## About

## Overview

Simple template to backup in one time your PostgreSQL database using the Railway CRON feature. The code is a basic script to dump your PostgreSQL data to a file and then upload the file to S3.

## Highlights

- Runs one time, so the cost is really low
- Use the Railway CRON feature to schedule the backup
- Configure custom S3 URL

## Usage

Fill the template environment variables and configure the CRON job in the service settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| onetime-pg-s3-backup | [MatteoGauthier/pg-backup-s3-one-time](https://github.com/MatteoGauthier/pg-backup-s3-one-time) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AWS_S3_BUCKET` | - | The name of the S3 bucket. |
| `AWS_S3_REGION` | - | The region the S3 bucket is in. |
| `AWS_S3_ENDPOINT` | - | A custom S3 endpoint if using a separate S3 compatible service. |
| `AWS_ACCESS_KEY_ID` | - | The access key ID for the IAM user. |
| `BACKUP_DATABASE_URL` | - | The database url for the database to backup. Set to ${{ DATABASE_URL }} if the database is in the same project. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | The secret access key for the IAM user. |

**Category:** Storage · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/UGKaB8)
