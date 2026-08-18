# Deploy Immich | (Just Updated) Google Photos Alternative Nobody Can Hijack on Railway

Google Photos alternative: admin pre-seeded so nobody can hijack it, AI on

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich-or-just-updated-google-photos-alt)

## About

Immich is the self-hosted Google Photos alternative: a fast photo and video library with a
timeline, albums, shared links, mobile apps for iOS and Android with automatic backup, and
AI-powered features — semantic search, face detection and People grouping, OCR text search and
duplicate detection — all running on your own domain and your own storage.

This template deploys Immich **with the administrator account already created and machine
learning switched on**. On a stock Immich deployment the setup endpoint
`POST /api/auth/admin-sign-up` has no authentication of its own — the first person to reach the
public URL becomes the admin, permanently, and Immich ships no environment variable or headless
command to seed one, so the deployer is locked out with no working reset. Here the admin is
seeded from the deploy's own generated secret **before the public port ever opens**, the password
is re-applied on every boot, and the server refuses to start with an empty admin password.

Immich is a Node.js server backed by PostgreSQL (with the VectorChord vector extension) and
Redis, plus a separate machine-learning service that runs the CLIP, face-recognition and OCR
models. Photos and videos are written to disk, so the server needs a persistent volume; the
database and Redis each get their own. The server migrates its schema forward on boot — Immich
does not support downgrades — so this template pins every image to a known release rather than a
moving tag.

Four services deploy together: the Immich server (a thin wrapper on the pinned upstream
`v3.1.0`), the official machine-learning container on a model-cache volume, PostgreSQL on a
volume, and Redis (Valkey) on a volume with append-only persistence and a password. The wrapper
seeds and rotates the admin, binds Immich to loopback and fronts it with a small nginx that opens
the platform's injected `PORT` only after the admin exists, and passes very large uploads and the
realtime websocket through untouched.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `valkey/valkey:9` | Database |
| immich-machine-learning | `ghcr.io/immich-app/immich-machine-learning:v3.1.0` | Database |
| postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0` | Database |
| immich-server | `ghcr.io/bon5co/immich-railway:3.1.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `DB_PASSWORD` | immich-server | (secret) |
| `DB_USERNAME` | immich-server | (secret) |
| `REDIS_PASSWORD` | immich-server | (secret) |
| `IMMICH_ADMIN_PASSWORD` | immich-server | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'chown -R valkey:valkey /data && exec docker-entrypoint.sh valkey-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/cache`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/immich-or-just-updated-google-photos-alt)
