# Deploy VaultS3 on Railway

Lightweight, S3-compatible object storage server with web dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaults3)

## About

VaultS3 is a lightweight, S3-compatible object storage server with a built-in web dashboard. It ships as a single
binary with low memory usage and AES-256-GCM encryption at rest. Since it speaks the S3 API, existing tools like the
AWS CLI or boto3 connect to it without changes.

VaultS3 runs as a single container exposing one port (9000) that serves the S3 API, the web dashboard, metrics, and health endpoints. Hosting requires a persistent volume mounted at /data for object data and BoltDB metadata, plus two environment variables that set the admin credentials. Optional variables enable scheduled full or incremental backups to a local directory. Because it is S3-compatible, migration means pointing your existing S3 client at the Railway app URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VaultS3 | [Lima-e-Silva/VaultS3-railway-template](https://github.com/Lima-e-Silva/VaultS3-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VAULTS3_ACCESS_KEY` | admin | Admin access key |
| `VAULTS3_SECRET_KEY` | (secret) | Admin secret key |
| `VAULTS3_BACKUP_PATH` | /data/backups | Backups path |
| `VAULTS3_BACKUP_ENABLED` | false | Enable backups |
| `VAULTS3_BACKUP_SCHEDULE` | 0 2 * * * | Backup cron rule |
| `VAULTS3_BACKUP_INCREMENTAL` | false | Incremental backups |
| `VAULTS3_BACKUP_RETENTION_DAYS` | 30 | Default backup retention days |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vaults3)
