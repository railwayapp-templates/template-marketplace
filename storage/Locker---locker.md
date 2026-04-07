# Deploy Locker on Railway

The self-hostable alternative to Dropbox and Google Drive, BYO bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/locker)

## About

Locker is an open-source file storage platform and a self-hostable alternative to Dropbox or Google Drive. This Railway template deploys Locker with PostgreSQL and persistent local file storage, giving you a simple way to run your own private cloud drive.

This template is configured for a one-click deployment on Railway using local file storage backed by a persistent volume. It is designed to work out of the box for a single deployment without requiring external object storage or additional infrastructure.

Locker includes a modern web interface for uploading, organizing, sharing, and managing files, along with built-in user accounts and authentication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Locker | [zmeyer44/Locker](https://github.com/zmeyer44/Locker) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | Locker | production | - |
| `LOCAL_BLOB_DIR` | Locker | /data/blobs | - |
| `BETTER_AUTH_SECRET` | Locker | (secret) | - |
| `BLOB_STORAGE_PROVIDER` | Locker | local | - |
| `PLUGIN_ENCRYPTION_SECRET` | Locker | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter @locker/web start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/blobs`

**Category:** Storage · **Languages:** JavaScript, TypeScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/locker)
