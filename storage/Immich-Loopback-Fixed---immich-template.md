# Deploy Immich (Loopback Fixed) on Railway

Self-hosted Google Photos alt, full ML+Redis, loopback bug fixed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich-template)

## About

[Immich](https://immich.app) is a high-performance, self-hosted photo and
video backup solution — a fully open-source alternative to Google Photos,
with automatic mobile backup, facial recognition, object detection, smart
search, and album sharing.

This template includes a fix for a real, currently-open upstream bug
([immich-app/immich#26663](https://github.com/immich-app/immich/issues/26663))
where the Immich server binds to loopback (`127.0.0.1`) regardless of the
`IMMICH_HOST` setting, making it unreachable from outside its own container on
standard Linux infrastructure (confirmed during testing: zero HTTP requests
ever reached the app externally, even with `IMMICH_HOST=0.0.0.0` explicitly
set). This template's `immich-server` image adds a small `socat` relay
sidecar that forwards external traffic to the loopback-bound app, verified
working end-to-end — public URL, health checks, database, Redis, and machine
learning all confirmed live.

Hosting Immich gives you a complete self-managed photo library with
automatic backup from the Immich mobile app, AI-powered facial recognition
and object detection, duplicate detection, reverse geocoding for photo
locations, and full album/sharing features — without handing your photos to
a third-party cloud provider.

This template runs the full feature set (not a stripped-down "no-ML"
variant): a dedicated machine-learning service for smart search and facial
recognition, Redis for job queues and caching, and a Postgres database built
with the VectorChord/pgvector extensions Immich requires for vector search —
Railway's standard managed Postgres does **not** include these extensions,
so this template deploys a purpose-built Postgres image instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| immich-postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0` | Database |
| immich-machine-learning | `ghcr.io/immich-app/immich-machine-learning:release` | Database |
| immich-server | `gowardipemanish95/immich-server-proxied:release` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_USER` | immich-postgres | (secret) | - |
| `POSTGRES_PASSWORD` | immich-postgres | (secret) | - |
| `DB_PORT` | immich-server | - | Postgres port - wired automatically to the bundled Postgres service. |
| `REDIS_PORT` | immich-server | - | Redis port - wired automatically to the bundled Redis service. |
| `DB_HOSTNAME` | immich-server | - | Postgres host - wired automatically to the bundled Immich Postgres service (includes vector search extensions) over Railway's private network. |
| `DB_PASSWORD` | immich-server | (secret) | Postgres password - wired automatically to the bundled Postgres service. |
| `DB_USERNAME` | immich-server | (secret) | Postgres username - wired automatically to the bundled Postgres service. |
| `IMMICH_HOST` | immich-server | - | Bind address for the Immich server process. Set to 0.0.0.0 for deterministic behavior — this template's image includes a proxy sidecar that forwards external traffic to it regardless of the upstream loopback-binding bug. |
| `REDIS_HOSTNAME` | immich-server | - | Redis host - wired automatically to the bundled Redis service, used for job queues and caching. |
| `REDIS_PASSWORD` | immich-server | (secret) | Redis password - wired automatically to the bundled Redis service. |
| `DB_DATABASE_NAME` | immich-server | - | Postgres database name used by Immich. |
| `IMMICH_MACHINE_LEARNING_URL` | immich-server | - | Internal URL of the bundled machine-learning service, used for smart search, facial recognition, and duplicate detection. Wired automatically over Railway's private network. |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/cache`
- **Healthcheck:** `/api/server/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/immich-template)
