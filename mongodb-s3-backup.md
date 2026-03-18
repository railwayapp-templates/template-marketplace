# Deploy mongodb S3 Backup on Railway

Deploy and Host mongodb S3 Backup with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mongodb-s3-backup)

## About

mongodb S3 Backup is an automated backup service that creates compressed backups of MongoDB databases and stores them securely on S3-compatible storage with configurable retention policies and scheduling.

Deploying mongodb S3 Backup on Railway provides a reliable, serverless solution for automated database backups. The service connects to your MongoDB instance, creates compressed JSON backups of all databases and collections (including indexes), uploads them to S3-compatible storage, and manages retention automatically. Railway's infrastructure ensures your backup service runs continuously with minimal configuration. The application uses environment variables for secure credential management and supports custom cron scheduling for backup frequency. Railway's built-in monitoring and logging help track backup operations and troubleshoot any issues that arise.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongodb-s3-backup | [CasaZurigo/mongodb-s3-backup](https://github.com/CasaZurigo/mongodb-s3-backup) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | - | S3 Bucket name |
| `S3_REGION` | - | Region of the of S3 Bucket https://<region>.s3-example.com |
| `MONGODB_URI` | - | URI pointing towards your MongoDB |
| `S3_ENDPOINT` | - | Fully written S3 Bucket endpoint https://ch.s3-example.com |
| `S3_KEY_PATH` | - | Path to where the backup should be stored |
| `CRON_SCHEDULE` | - | Cron description: 5 4 * * * -> At 04:05 |
| `RETENTION_DAYS` | - | In Days, how long the oldest backup can be |
| `S3_ACCESS_KEY_ID` | - | S3 Key ID/Username |
| `S3_SECRET_ACCESS_KEY` | (secret) | S3 Secret Access Key/Password |

## Configuration

- **Start command:** `bun run start`

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/mongodb-s3-backup)
