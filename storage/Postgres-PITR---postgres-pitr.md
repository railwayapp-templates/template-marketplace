# Deploy Postgres PITR on Railway

Postgres with WAL archiving to a bucket for PITR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-pitr)

## About

PostgreSQL with point-in-time recovery powered by pgBackRest. Every committed transaction is continuously archived to a Railway Bucket, letting you restore your database to any specific timestamp within your retention window — down to the second.

Hosting Postgres PITR on Railway provisions a Railway Bucket alongside your existing Postgres service and streams WAL (Write-Ahead Log) segments to it continuously using pgBackRest's async archiver. pgBackRest ships pre-installed in the Postgres image and activates automatically when \`WAL_ARCHIVE_BUCKET\` is detected on startup — no manual installation or configuration needed. Railway's Backups panel handles the full restore workflow: pick a target timestamp, and Railway provisions a new volume from the nearest base snapshot, replays WAL to your target, and promotes the database. Residual failover RPO is 60 seconds (\`archive_timeout\`) plus failover-detection time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `WAL_ARCHIVE_PATH` | /pgbackrest | - |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `WAL_ARCHIVE_SECRET` | (secret) | - |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgres-pitr)
