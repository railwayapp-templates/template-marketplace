# Deploy Postgres 🥇 Daily Backups on Railway

Deploy and Host Postgres 🥇 Daily Backups with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-daily-backups)

## About

Postgres 🥇 Daily Backups is a production-ready automated backup service for PostgreSQL databases. It orchestrates scheduled backups to S3 or Google Cloud Storage with built-in version compatibility, monitoring, and retention management - ensuring your data is always safe.

Postgres 🥇 Daily Backups seamlessly integrates with Railway's PostgreSQL databases to provide enterprise-grade backup capabilities. It automatically detects your PostgreSQL version (15-17), performs efficient backups using the correct pg_dump version, and stores them with organized date-based directory structures. The service includes respawn protection to prevent excessive backups, Prometheus metrics for monitoring, health endpoints, and automatic cleanup of old backups based on your retention policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres Backup | [imedwei/railway-postgres-backup](https://github.com/imedwei/railway-postgres-backup) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | - | S3 bucket name for storing backups |
| `S3_PREFIX` | - | Prefix/folder for backup files in S3 bucket (optional) |
| `AWS_REGION` | us-east-1 | AWS region for S3 bucket (default: us-east-1) |
| `GCS_BUCKET` | - | Google Cloud Storage bucket name (when using GCS) |
| `GCS_PREFIX` | - | Prefix/folder for backup files in GCS bucket (optional) |
| `S3_ENDPOINT` | - | Custom S3 endpoint for S3-compatible storage (optional) |
| `DATABASE_URL` | - | PostgreSQL connection string from Railway PostgreSQL service |
| `FORCE_BACKUP` | false | Override respawn protection and force backup (true/false) |
| `METRICS_PORT` | - | Port for Prometheus metrics and health endpoints (optional, e.g., 8080) |
| `S3_PATH_STYLE` | false | Use path-style URLs for S3 (needed for MinIO/custom endpoints) |
| `RETENTION_DAYS` | 7 | Number of days to keep old backups, 0 to disable cleanup (default: 7) |
| `PG_DUMP_OPTIONS` | - | Additional pg_dump command options (e.g., --verbose --no-owner) |
| `STORAGE_PROVIDER` | S3 | Storage backend - either 'S3' or 'GCS' |
| `AWS_ACCESS_KEY_ID` | - | AWS access key for S3 authentication |
| `GOOGLE_PROJECT_ID` | - | Google Cloud project ID (when using GCS) |
| `BACKUP_FILE_PREFIX` | backup | Prefix for backup filenames (default: backup) |
| `AWS_SECRET_ACCESS_KEY` | (secret) | AWS secret access key for S3 authentication |
| `RESPAWN_PROTECTION_HOURS` | 23 | Minimum hours between backups to prevent frequent restarts (default: 23) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | - | Service account JSON for GCS authentication (when using GCS) |

**Category:** Storage · **Languages:** Go, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-daily-backups)
