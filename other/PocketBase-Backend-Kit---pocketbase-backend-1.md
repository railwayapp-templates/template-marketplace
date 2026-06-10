# Deploy PocketBase Backend Kit on Railway

The easiest way to run PocketBase on Railway, production-ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-backend-1)

## About

A one-click PocketBase template that gives you a complete production backend — SQLite database, authentication, file storage, admin dashboard, and auto-generated REST API. Zero configuration required. Deploy in under 2 minutes.

PocketBase is an open-source backend as a single binary. This template wraps it with a lightweight Node.js proxy that adds a landing page, system status dashboard, health monitoring, and Railway-native health checks. PocketBase runs securely on an internal port behind the proxy. Your data is stored on a persistent Railway Volume at `/pb_data`, surviving all redeploys and restarts. No external database needed — everything runs in one container. Perfect for SaaS, mobile apps, bots, and internal tools.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PocketBase-Railway-Kit | [ggmmwwqq/PocketBase-Railway-Kit](https://github.com/ggmmwwqq/PocketBase-Railway-Kit) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PB_ADMIN_EMAIL` | - | Auto-create admin account on first deploy (requires PB_ADMIN_PASSWORD) |
| `PB_ADMIN_PASSWORD` | (secret) | Admin password (requires PB_ADMIN_EMAIL) |
| `PB_ENCRYPTION_KEY` | - | Encryption key for stored secrets. Generate with: openssl rand -base64 32 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb_data`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pocketbase-backend-1)
