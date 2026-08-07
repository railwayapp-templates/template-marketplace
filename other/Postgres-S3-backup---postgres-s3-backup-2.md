# Deploy Postgres S3 backup on Railway

Deploy and Host Postgres S3 backup with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-s3-backup-2)

## About

Postgres S3 Backup is a lightweight backup utility that creates compressed SQL dumps of one or more PostgreSQL databases and uploads them to an S3-compatible object storage bucket. It also supports automatic retention policies, allowing old backups to be removed after a configurable number of days.

Hosting Postgres S3 Backup on Railway allows you to automate PostgreSQL backups without managing your own infrastructure. The service connects to one or more PostgreSQL databases using connection URLs, runs `pg_dump` to generate compressed SQL backups, and uploads them to any S3-compatible object storage provider, including AWS S3, Cloudflare R2, MinIO, Backblaze B2, and others. Retention policies can automatically remove expired backups, reducing storage usage. The container can be scheduled using Railway's Cron feature to perform backups at regular intervals, providing a simple and reliable disaster recovery solution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg-backup-cron | [moonLight-7k/pg-backup-cron](https://github.com/moonLight-7k/pg-backup-cron) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DATABASE_URLS` | postgresql://user:password@host:5432/database1,postgresql://user:password@host:5432/database1 |
| `AWS_SECRET_ACCESS_KEY` | (secret) |
| `BACKUP_RETENTION_DAYS` | 30 |
| `PG_DUMP_TIMEOUT_SECONDS` | 3600 |

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-s3-backup-2)
