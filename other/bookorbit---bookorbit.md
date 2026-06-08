# Deploy bookorbit on Railway

Self-hosted digital library and reader with Kobo/OPDS sync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookorbit)

## About

BookOrbit runs on Railway as a Docker-image based self-hosted digital library platform. The template uses the official BookOrbit GHCR image, a pgvector-enabled PostgreSQL service, public HTTPS routing, and persistent storage for app data and database files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg18` | Database |
| app | `ghcr.io/bookorbit/bookorbit:1.8.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `DEPLOY_STAMP` | Postgres | 1780722470 |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PGID` | app | 1000 |
| `PORT` | app | 3000 |
| `PUID` | app | 1000 |
| `NODE_ENV` | app | production |
| `LOG_LEVEL` | app | info |
| `JWT_SECRET` | app | (secret) |
| `APP_DATA_PATH` | app | /data |
| `POSTGRES_PORT` | app | 5432 |
| `POSTGRES_USER` | app | (secret) |
| `POSTGRES_PASSWORD` | app | (secret) |
| `SETUP_BOOTSTRAP_TOKEN` | app | (secret) |
| `NODE_MAX_OLD_SPACE_SIZE` | app | 2048 |
| `OIDC_ALLOW_LOCAL_ISSUERS` | app | false |
| `BOOKORBIT_FIX_PERMISSIONS` | app | true |
| `CSP_ALLOW_CLOUDFLARE_INSIGHTS` | app | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bookorbit)
