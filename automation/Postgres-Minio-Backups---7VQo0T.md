# Deploy Postgres Minio Backups on Railway

A Docker to backup your PostgreSQL database to Minio via a cron.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/7VQo0T)

## About

# Postgres Minio backups

A Docker to backup your PostgreSQL database to Minio via a cron.

## Overview

The template use Docker and Bash Scripting to dump your PostgreSQL data to a file and then upload the file to Minio.

## Configuration

- `MINIO_ENDPOINT` - Minio endpoint. Example: `http://minio:9000`.

- `ACCESS_KEY` - Minio access key.

- `SECRET_KEY` - Minio secret key.

- `MINIO_BUCKET` - Minio bucket. Example `my-bucket`.

- `BACKUP_DATABASE_URL` - The connection string of the database to backup. Example: `"postgresql://username:password@host:port/database"`

- `CRON_SCHEDULE` - The cron schedule to run the backup on. Example: `0 5 * * *` the cron runs at 5 AM every day

## Restore data

Restore your data to the target database with pg_restore

```bash
pg_restore -v -d postgres_connection_string filename.bak
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backup Job | `ghcr.io/nelsondev19/postgres-minio-backups:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ACCESS_KEY` | your-access-key |
| `SECRET_KEY` | (secret) |
| `DATABASE_URL` | postgresql://username:password@host:port/database |
| `MINIO_BUCKET` | my-bucket |
| `CRON_SCHEDULE` | 0 5 * * * |
| `MINIO_ENDPOINT` | http://minio:9000 |

**Category:** Automation

[View on Railway →](https://railway.com/deploy/7VQo0T)
