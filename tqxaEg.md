# Deploy Postgres Backup to GCS on Railway

Postgres backups to Google Cloud Storage (GCS)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tqxaEg)

## About

Specify environment variable config to get automated backups of your Postgres database using pg_dump, compressed, and uploaded to Google Cloud Storage.

Requires:
- Google Service Account key JSON
- A postgres DB URL connection string (with authentication)
- Minimal resources for a tiny node app

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres Backup to GCS | [drmarshall/postgres-gcs-backups](https://github.com/drmarshall/postgres-gcs-backups) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GCS_BUCKET` | - | Your GCS bucket name (you must create it first) |
| `BACKUP_PREFIX` | - | Prefix for the backup file name. |
| `RUN_ON_STARTUP` | - | Run a backup on startup of this application |
| `GOOGLE_PROJECT_ID` | - | The ID of your Google Cloud Project |
| `BACKUP_DATABASE_URL` | - | The connection string for the database you want to backup |
| `BACKUP_CRON_SCHEDULE` | 0 5 * * * | The cron schedule to run the backup on. |
| `SERVICE_ACCOUNT_JSON` | - | JSON string of the service account .json key. See: https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/tqxaEg)
