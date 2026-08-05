# Deploy PostgreSQL Backups to GCS on Railway

Scheduled PostgreSQL backups to Google Cloud Storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-backups-to-gcs)

## About

PostgreSQL Backups to GCS is a Railway Cron Job that creates compressed PostgreSQL archives and stores them in Google Cloud Storage. Connect it to a Railway Postgres service with a reference variable, provide a bucket and service-account credentials, and schedule automated backups. This Railway template intentionally supports GCS only.

This template deploys a short-lived Node.js backup service as a Railway Cron Job. On each scheduled run, it connects to the database defined by `BACKUP_DATABASE_URL`, detects the server’s PostgreSQL major version, selects a compatible `pg_dump` client, and creates a compressed `.tar.gz` archive. The archive is uploaded to your Google Cloud Storage bucket under an environment and date-based folder, then removed from temporary local storage. Configure the schedule in Railway’s Cron Schedule setting; the service runs once and exits after each backup. No public domain, health check, or persistent Railway volume is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-gcp-postgres-backup | [Ayko-Technologies/railway-gcp-postgres-backup](https://github.com/Ayko-Technologies/railway-gcp-postgres-backup) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GCP_BUCKET` | your-gcs-bucket-name | Google Cloud Storage bucket where backups are stored. |
| `GCP_PROJECT_ID` | your-gcp-project-id | Google Cloud project ID that owns the backup bucket. |
| `BACKUP_DATABASE_URL` | - | PostgreSQL connection string for the database to back up. |
| `GCP_SERVICE_ACCOUNT_KEY` | your-base64-encoded-service-account-json | Base64-encoded service-account JSON with permission to write to the bucket. |

**Category:** Storage · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/postgresql-backups-to-gcs)
