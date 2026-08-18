# Deploy Dump Keep on Railway

Encrypted PostgreSQL backups to Google Drive or S3. Runs on a cron.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dump-keep)

## About

Encrypted PostgreSQL backups shipped to Google Drive or any S3-compatible storage. Runs as a cron, encrypts with age, retains by tier.

Dump-Keep is a **one-shot CLI tool** — it starts, backs up all databases, uploads encrypted dumps, prunes old backups, and exits. It is not a long-running daemon. Railway's cron scheduler triggers it on schedule (default: nightly at 03:17 UTC).

Each invocation:
1. Connects to PostgreSQL, enumerates all non-template databases
2. Dumps globals and each database
3. Streams each dump through age encryption directly to storage — no unencrypted data touches disk
4. Prunes old backup folders based on tier retention
5. Sends notifications on failure (and weekly/monthly success heartbeats)
6. Exits

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dump Keep | `ghcr.io/pecatatoshev/dump-keep:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RETENTION` | 7d,4w,24m | Retention durations as daily,weekly,monthly (e.g. 7d,4w,24m). none disables pruning. |
| `S3_BUCKET` | - | Bucket name (must already exist). Required when STORAGE_BACKEND=s3. |
| `S3_PREFIX` | - | Key prefix for all backups (e.g. backups/postgres/). |
| `S3_REGION` | us-east-1 | Region (e.g. us-east-1). Required when STORAGE_BACKEND=s3. |
| `S3_ENDPOINT` | https://s3.amazonaws.com | S3 endpoint URL (e.g. https://s3.amazonaws.com). Required when STORAGE_BACKEND=s3. |
| `POSTGRES_URL` | - | PostgreSQL superuser connection string. If using Railway Postgres, add it to your project first, then reference it with ${{Postgres.DATABASE_URL}} here. |
| `AGE_RECIPIENT` | - | age public key (age1...). Generate with age-keygen. |
| `S3_ACCESS_KEY` | - | S3 access key. Required when STORAGE_BACKEND=s3. |
| `S3_PATH_STYLE` | false | Use path-style addressing (true for MinIO). Default: false. |
| `S3_SECRET_KEY` | (secret) | S3 secret key. Required when STORAGE_BACKEND=s3. |
| `GDRIVE_SA_JSON` | - | Google service account JSON (full file content). Required when STORAGE_BACKEND=gdrive. |
| `SKIP_DATABASES` | postgres | Comma-separated database names to skip (e.g. postgres,test_db). Default is disabling postgres db, as all services write to railway db. |
| `HEALTHCHECK_URL` | - | healthchecks.io ping URL for failure alerts. |
| `STORAGE_BACKEND` | s3 | Storage backend: gdrive or s3. |
| `GDRIVE_FOLDER_ID` | - | Parent folder ID for backups. Unset = drive root. |
| `SLACK_WEBHOOK_URL` | - | Slack webhook for failure/heartbeat notifications. |
| `DISCORD_WEBHOOK_URL` | - | Discord webhook for failure/heartbeat notifications. |
| `GDRIVE_SHARED_DRIVE_ID` | - | Shared Drive ID from the folder URL. Required when STORAGE_BACKEND=gdrive. |

**Category:** Automation

[View on Railway →](https://railway.com/deploy/dump-keep)
