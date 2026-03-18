# Deploy PocketBase on Railway

Railway-ready PocketBase with auto setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-2)

## About

PocketBase is an open-source backend-in-a-box that provides authentication, a built-in SQLite database, file storage, admin dashboard, and realtime subscriptions in a single lightweight binary. It enables developers to quickly build MVPs, internal tools, and full-stack applications without managing complex backend infrastructure.

Hosting PocketBase involves running the PocketBase service as a continuously available process, exposing it to the internet through a public port, and ensuring its local database and uploaded files are stored persistently. Since PocketBase uses SQLite by default, its data is stored in the `/pb_data` directory, which must be mounted to persistent storage to avoid data loss during restarts or redeployments.

This template uses Docker for consistent deployments and is configured to bind automatically to Railway’s dynamic `$PORT` environment variable. It also provisions a superuser automatically on first startup using environment variables, making the initial setup seamless and production-ready.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase-railway | [RevivalDigital/pocketbase-railway](https://github.com/RevivalDigital/pocketbase-railway) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ADMIN_EMAIL` | admin@demo.demo |
| `ADMIN_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/pb_data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pocketbase-2)
