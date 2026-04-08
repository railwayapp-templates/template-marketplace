# Deploy Locker on Railway

The self-hostable alternative to Dropbox and Google Drive.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/locker-1)

## About

The self-hostable alternative to Dropbox and Google Drive. Upload, organize, and share files from your own infrastructure.

Locker is an open-source, self-hostable file storage platform. Source code available here: https://github.com/zmeyer44/Locker

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Locker | [valtlfelipe/Locker](https://github.com/valtlfelipe/Locker) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Locker | production | node env |
| `BETTER_AUTH_URL` | Locker | - | public url |
| `BETTER_AUTH_SECRET` | Locker | (secret) | Better Auth Secret |
| `NEXT_PUBLIC_APP_URL` | Locker | - | public url |
| `AWS_SECRET_ACCESS_KEY` | Locker | (secret) | - |
| `BLOB_STORAGE_PROVIDER` | Locker | s3 | default storage type |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `pnpm start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** JavaScript, TypeScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/locker-1)
