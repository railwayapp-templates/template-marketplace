# Deploy pocketbase-railway on Railway

Deploy a full backend in 60s🪄: PocketBase with auth, storage, admin UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-railway)

## About

[![PocketBase](https://avatars.githubusercontent.com/u/101000011?v=4)](https://pocketbase.io)
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/pocketbase-railway?referralCode=qVHjLS)

PocketBase is the open-source, single-binary alternative to Supabase and Firebase — one ~12MB Go executable that gives you a SQLite database, REST API, authentication, file storage, realtime subscriptions, and an admin dashboard. This template deploys it to Railway with a persistent volume, a pre-seeded sample collection, and auto-created admin access so it works the moment it's online.

Hosting pocketbase-railway is a single-container deploy: Railway builds a multi-arch Alpine image pinned to a specific PocketBase release, then runs the binary with a persistent volume mounted at `/pb/pb_data` so your database, uploads, and settings survive redeploys and restarts.

An entrypoint script handles first-boot setup — it creates the admin superuser from environment variables (`PB_ADMIN_EMAIL` / `PB_ADMIN_PASSWORD`) — and a healthcheck on `/api/health` keeps the service honest. Versioned JS migrations and hooks are copied into the image, so schema changes and custom logic deploy automatically with each push.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase | [8u9i/pocketbase-railway](https://github.com/8u9i/pocketbase-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | port |
| `PB_ADMIN_EMAIL` | admin@example.com | CHANGE ME |
| `PB_ADMIN_PASSWORD` | (secret) | CHANGE ME PASS |

## Configuration

- **Start command:** `/pb/entrypoint.sh`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Starters · **Languages:** JavaScript, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/pocketbase-railway)
