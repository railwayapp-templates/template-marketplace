# Deploy PocketBase on Railway

Single-file backend with database, auth, file storage, and admin UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-3)

## About

PocketBase is an open-source backend in a single file—database (SQLite), authentication, file storage, and admin dashboard included. No configuration required, deploy instantly.

Deploying PocketBase on Railway is straightforward with a containerized setup. The template includes a Dockerfile that downloads the official PocketBase binary, exposes port 8080, and configures the service to accept connections from any host. Data is stored persistently on Railway's volume system. After deployment, you create your first superuser via the admin panel or through the deploy logs. No external database or additional services are required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase-template | [Xorgentur/pocketbase-template](https://github.com/Xorgentur/pocketbase-template) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `GOMEMLIMIT` | Memory limit to prevent OOM crashes in MB (e.g. `512`, `1024`) |
| `PB_ENCRYPTION_KEY` | 32-character key to encrypt sensitive settings (e.g. SMTP passwords) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/pocketbase-3)
