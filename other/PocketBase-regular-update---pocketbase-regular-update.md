# Deploy PocketBase (regular update) on Railway

Open Source realtime backend in one service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-regular-update)

## About

PocketBase is an open-source backend solution delivered as a single executable file. It combines an embedded SQLite database, realtime subscriptions, built-in authentication, file storage, and an admin dashboard UI with a simple REST API—all in one portable package.

Deploying PocketBase on Railway is straightforward since it's packaged as a single binary or Docker container. The deployment includes the database, API server, and admin dashboard in one unified service. PocketBase stores data in a SQLite file, making it perfect for small to medium applications and prototypes. Railway's persistent volumes ensure your database and uploaded files are preserved across deployments. You can configure environment variables for the admin email, password, port settings, and enable realtime features without complex infrastructure setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PocketBase | `ghcr.io/muchobien/pocketbase@sha256:ab3f2357cce759aa8ccd4863ac49f07060ce4a12097d3cac52ac519d6ca68ecc` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8090 | port |
| `PB_HOST` | 0.0.0.0 | host |
| `PB_ADMIN_EMAIL` | changeme@domain.tld | admin's email |
| `PB_ADMIN_PASSWORD` | (secret) | password |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pocketbase-regular-update)
