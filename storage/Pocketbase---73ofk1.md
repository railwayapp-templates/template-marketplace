# Deploy Pocketbase on Railway

Backend in 1 file: auth, database, file storage, realtime and backups.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/73ofk1)

## About

PocketBase is an open source backend packed into a single Go binary. It bundles an embedded SQLite database with realtime subscriptions, user authentication with OAuth2, file storage, an auto-generated REST API, and an admin dashboard — replacing the database, auth provider, file bucket, and API server you would otherwise wire together yourself.

Hosting PocketBase means running a single container with a persistent volume attached. The SQLite database, uploaded files, and instance settings all live in one directory, so the job is keeping that directory intact across restarts and redeploys. This template mounts a Railway volume at `/pb/pb_data` and points PocketBase at it explicitly, builds the image from the included Dockerfile, assigns a public HTTPS domain, and restarts the container if it fails. There is no reverse proxy to configure and no TLS certificate to renew. PocketBase uses SQLite on a single volume, so run one replica and scale vertically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pocketbase | [laguillo/pocketbase](https://github.com/laguillo/pocketbase) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/73ofk1)
