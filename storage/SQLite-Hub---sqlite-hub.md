# Deploy SQLite Hub on Railway

A centralized SQLite storage service for internal Railway workloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sqlite-hub)

## About

SQLite Hub is a self-hosted SQLite management service with a built-in admin studio. Each database is a single `.db` file served over HTTP. Other services connect using a per-database service secret — no Postgres or external database needed.

Hosting SQLite Hub on Railway requires a single service backed by a persistent volume mounted at `/data`. All `.db` files live on that volume and survive deploys. The service exposes an admin dashboard protected by an `ADMIN_TOKEN` (login only) and a `SESSION_SECRET` for encrypted cookies. Each database gets its own `service_secret` that external services use as a Bearer token. The app runs as a standalone Next.js server behind a Railway-generated HTTPS URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sqlite-hub | [0xdps/sqlite-hub](https://github.com/0xdps/sqlite-hub) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_PATH` | /db | Absolute path where .db files are stored. Must match your Railway volume mount path, e.g. /data. |
| `ADMIN_TOKEN` | (secret) | Password to log in to the admin dashboard at /login. Does not grant API access. |
| `SESSION_SECRET` | (secret) | Signing secret for encrypted session cookies. Minimum 32 characters |
| `MAX_VOLUME_USAGE_PERCENT` | 85 | Blocks new database creation once the volume exceeds this % of used space. |

## Configuration

- **Start command:** `node server.js`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/sqlite-hub)
