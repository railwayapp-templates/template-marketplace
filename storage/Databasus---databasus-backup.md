# Deploy Databasus on Railway

Backup tool for PostgreSQL, MySQL, MariaDB and MongoDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/databasus-backup)

## About

Databasus is an open-source backup tool for PostgreSQL, MySQL, MariaDB and MongoDB. It replaces the cron jobs and `pg_dump` scripts most teams call a backup strategy with one web interface that schedules dumps, enforces retention, ships files to storage you control, and — the part almost nobody does by hand — restores them to prove they work.

Self-host Databasus on Railway and the template gives you one service, `databasus`, with a persistent volume and a companion object-storage bucket. The service runs the interface and scheduler and carries an embedded PostgreSQL cluster on the volume for its metadata, so there is no separate database to operate. The `databasus-backups` bucket is Railway-managed object storage, and its endpoint, bucket, region and keys arrive as variables ready to register as a backup destination. Your databases stay where they are: Databasus dials out over Railway's private network, the public internet, or an SSH tunnel.

Backups look solved until the day they matter. A dump that ran is not a dump that restores, and a retention rule in a cron comment is not one that is enforced. Databasus closes both gaps, and self-hosting keeps credentials and files on infrastructure you control.

- **Logical and physical backups.** Native dumps for all four engines, plus full and incremental physical backups for PostgreSQL.
- **Point-in-time recovery.** Continuous WAL streaming, so you restore to a moment rather than to last night.
- **Restore verification.** A real restore into a throwaway container, reporting every table with its row count.
- **Retention that is enforced.** Fixed periods, fixed counts, or grandfather-father-son tiers, plus per-backup and total size caps.
- **Storage you choose.** Local disk, S3 and compatibles, R2, Azure Blob, Google Drive, FTP, SFTP, NAS or Rclone.
- **AES-256-GCM encryption at rest,** plus notifications to email, Slack, Discord, Teams, Mattermost or a webhook.
- **Workspaces and roles,** with audit logs and optional OpenTelemetry export.

The Railway architecture is small on purpose. `databasus` is the only container: interface, scheduler, and an embedded PostgreSQL 17 cluster at `/databasus-data/pgdata` holding metadata, the encryption key and any local-storage backups. Backups belong in the `databasus-backups` bucket in production, because a volume is finite and a bucket is not.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| databasus | [gridalpha/databasus-railway](https://github.com/gridalpha/databasus-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4005 | Health-check port; app listener is fixed |
| `DATABASUS_URL` | - | Base URL used in outgoing email links |
| `DATABASUS_S3_BUCKET` | - | Bucket name for the storage form |
| `DATABASUS_S3_REGION` | - | Bucket region for the storage form |
| `DATABASUS_S3_ENDPOINT` | - | Bucket endpoint for the storage form |
| `DATABASUS_ADMIN_PASSWORD` | (secret) | Password for the built-in admin account |
| `DATABASUS_S3_ACCESS_KEY_ID` | - | Bucket access key |
| `DATABASUS_S3_SECRET_ACCESS_KEY` | (secret) | Bucket secret key |
| `IS_DISABLE_ANONYMOUS_TELEMETRY` | false | Set true to stop the version ping |

## Configuration

- **Healthcheck:** `/api/v1/system/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/databasus-data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/databasus-backup)
