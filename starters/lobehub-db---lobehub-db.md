# Deploy lobehub-db on Railway

Multi-user LobeChat with Postgres persistence, bundled S3, zero-config auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobehub-db)

## About

Hosting LobeChat through this template gives you the server database deployment on Railway: the Next.js app container, a ParadeDB Postgres 17 with vector and full-text extensions, and MinIO object storage, each with persistent volumes on a private network. Railway generates the public domain, TLS, and per-deployment secrets; the app wires itself together through referenced variables (`DATABASE_URL`, `S3_ENDPOINT`, `APP_URL`) so there is nothing to copy-paste. The app image is pinned to a specific LobeHub release — upgrades are a one-line tag change in the repo's Dockerfile, and migrations run automatically on boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `paradedb/paradedb:latest-pg17` | Database |
| lobehub | [lNamelessl/lobechat-railway-template](https://github.com/lNamelessl/lobechat-railway-template) | Web service |
| minio | `minio/minio:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `AUTH_SECRET` | lobehub | (secret) |
| `KEY_VAULTS_SECRET` | lobehub | (secret) |
| `S3_SECRET_ACCESS_KEY` | lobehub | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |

## Configuration

- **Start command:** `sh -c 'export PGDATA=/var/lib/postgresql/data/pgdata POSTGRES_DB=lobehub POSTGRES_USER=postgres; exec docker-entrypoint.sh postgres -c shared_preload_libraries=pg_search'`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/version`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'export MINIO_ROOT_USER=lobeadmin; exec minio server /data --console-address :9001'`
- **Volume:** `/data`

**Category:** Starters · **Languages:** JavaScript, TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/lobehub-db)
