# Deploy mongo-s3-backup on Railway

A simple NodeJS app to back up your MongoDB database to S3 via a cron.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/VkrypE)

## About

### Overview
The template uses node-cron or Railway cron, written in TypeScript to dump your MongoDB data to a file and then upload the file to S3.

### Highlights
Configurable backup schedule: By default, the cron runs at 00 AM every day but is configurable via the `BACKUP_CRON_SCHEDULE` environment variable.

Support for custom buckets: The script also supports using a `AWS_S3_ENDPOINT` environment variable to use any S3 compliant storage bucket.

### Configuration
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `AWS_S3_REGION`
- `BACKUP_MONGO_URI`
- `BACKUP_CRON_SCHEDULE`
- `AWS_S3_ENDPOINT`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo-s3-backup | [andresfiloso/mongo-s3-backup](https://github.com/andresfiloso/mongo-s3-backup) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AWS_SECRET_ACCESS_KEY` | (secret) |

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/VkrypE)
