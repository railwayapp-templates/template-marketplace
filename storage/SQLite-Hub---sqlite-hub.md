# Deploy SQLite Hub on Railway

A centralized SQLite storage service for internal Railway workloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sqlite-hub)

## About

SQLite Hub is a self-hosted SQLite management service with a built-in admin studio. Each database is a single `.db` file served over HTTP. Other services connect using a per-database service secret — no Postgres or external database needed.

Hosting SQLite Hub on Railway requires a single service backed by a persistent volume mounted at `/data`. All `.db` files live on that volume and survive deploys. The service exposes an admin dashboard protected by an `ADMIN_TOKEN` (login only) and a `SESSION_SECRET` for encrypted cookies. Each database gets its own `service_secret` that external services use as a Bearer token. The app runs as a standalone Next.js server behind a Railway-generated HTTPS URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SQLite Hub | `ghcr.io/mesahub-db/mesahub-core:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_TOKEN` | (secret) | Admin Token |
| `SESSION_SECRET` | (secret) | Secret Session Key |
| `CORS_ALLOWED_ORIGINS` | * | CORS allowed origins for cross-origin browser integrations. |
| `FILE_TOKEN_SIGNING_SECRET` | (secret) | File Token Signing Key |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/sqlite-hub)
