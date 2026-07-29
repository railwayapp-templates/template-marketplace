# Deploy PocketBase on Railway

Single-file backend with database, auth, realtime APIs, and storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-6)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-6)

**Published on the Railway marketplace:** https://railway.com/deploy/pocketbase-6

PocketBase is an open-source backend in a single executable. It combines an embedded SQLite database, authentication, realtime subscriptions, file storage, a dashboard UI, and REST-style APIs, making it useful for prototypes, mobile apps, SaaS products, and compact production services without a separate database server.

Hosting PocketBase requires one public container and one persistent volume. This template pins the Umbrel-tested PocketBase 0.39.9 image and exposes its documented port `8090` through Railway HTTPS. PocketBase binds to `0.0.0.0`, stores its SQLite database, uploads, settings, and backups under `/pb_data`, and reports readiness through `/api/health`. A generated 32-character key encrypts stored application settings, while a generated superuser password protects the dashboard before the public server starts. The initial email is `admin@pocketbase.invalid`; change it to an address you control after signing in. No external database or cache is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PocketBase | `ghcr.io/muchobien/pocketbase:0.39.9@sha256:c0667fe6c5197ff226ff642120ab1ad870c3f2f27300940a61e5a7fa082b6816` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8090 |
| `PB_HOST` | 0.0.0.0 |
| `PB_PORT` | 8090 |
| `PB_ADMIN_EMAIL` | admin@pocketbase.invalid |
| `PB_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; /usr/local/bin/pocketbase superuser upsert "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir=/pb_data; exec /usr/local/bin/pocketbase serve --http="$PB_HOST:$PB_PORT" --dir=/pb_data --publicDir=/pb_public --hooksDir=/pb_hooks --encryptionEnv=ENCRYPTION'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb_data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/pocketbase-6)
