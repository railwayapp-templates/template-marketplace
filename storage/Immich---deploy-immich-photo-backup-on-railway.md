# Deploy Immich on Railway

Self-hosted Google Photos alternative with AI search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-immich-photo-backup-on-railway)

## About

This template runs Immich v3.3.3 with CPU machine learning, VectorChord Postgres and Valkey. Image tags are pinned, four volumes are created and every password is generated, so your photo server starts with no extra input. Built for moving a big family library off Google Photos.

This template runs the Immich v3.3.3 server and CPU machine-learning images, the VectorChord Postgres database Immich needs, and Valkey for the job queue. Four persistent volumes keep the library, database, model cache, and queue data across deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| immich-server | `ghcr.io/immich-app/immich-server:v3.3.3@sha256:bae7664ff3aa4c2c1fcbdcdd86b40b105643c5f861f3e6a770fc760089f25862` | Web service |
| immich-machine-learning | `ghcr.io/immich-app/immich-machine-learning:v3.3.3@sha256:73915f07e1f4289ba45b174c58443db74cef47ddf502613f475fc5e52458ea42` | Database |
| Valkey | `valkey/valkey:9.1.2@sha256:c123e3715db63d06d4ad6964884037aa0d5d4d703939b9929954112889708e1d` | Database |
| Postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0@sha256:bcf63357191b76a916ae5eb93464d65c07511da41e3bf7a8416db519b40b1c23` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | immich-server | Etc/UTC | Server timezone used for dates and scheduled jobs; set to your own if you like |
| `PORT` | immich-server | 2283 | Port Railway routes the public domain and healthcheck to; keep 2283 |
| `DB_PORT` | immich-server | 5432 | Postgres port |
| `REDIS_PORT` | immich-server | 6379 | Valkey port |
| `DB_HOSTNAME` | immich-server | - | Private hostname of the VectorChord Postgres service |
| `DB_PASSWORD` | immich-server | (secret) | Database password, referenced from Postgres (alphanumeric) |
| `DB_USERNAME` | immich-server | (secret) | Database user, referenced from Postgres |
| `IMMICH_PORT` | immich-server | 2283 | Port the Immich server listens on; must match PORT |
| `REDIS_HOSTNAME` | immich-server | - | Private hostname of the Valkey job-queue service |
| `REDIS_PASSWORD` | immich-server | (secret) | Valkey password, referenced from Valkey |
| `DB_DATABASE_NAME` | immich-server | - | Database name, referenced from Postgres |
| `IMMICH_MACHINE_LEARNING_URL` | immich-server | - | Private URL of the machine-learning service for smart search, faces and OCR |
| `PORT` | immich-machine-learning | 3003 | Port Railway healthchecks the ML service on; keep 3003 |
| `IMMICH_HOST` | immich-machine-learning | [::] | Bind address; [::] listens dual-stack on Railway's private network |
| `IMMICH_PORT` | immich-machine-learning | 3003 | Port the ML server listens on; must match PORT |
| `MACHINE_LEARNING_WORKERS` | immich-machine-learning | 1 | Number of inference worker processes; each loads its own models |
| `MACHINE_LEARNING_MODEL_TTL` | immich-machine-learning | 300 | Seconds an idle model stays in RAM before it is unloaded |
| `MACHINE_LEARNING_CACHE_FOLDER` | immich-machine-learning | /cache | Model download cache, on the /cache volume so models survive redeploys |
| `REDISHOST` | Valkey | - | Private hostname of Valkey |
| `REDISPORT` | Valkey | 6379 | Valkey port |
| `REDISUSER` | Valkey | default | Valkey user name |
| `REDIS_URL` | Valkey | - | Full private Valkey connection URL |
| `REDISPASSWORD` | Valkey | (secret) | Valkey password for clients |
| `REDIS_PASSWORD` | Valkey | (secret) | Generated alphanumeric Valkey password, passed to --requirepass |
| `POSTGRES_DB` | Postgres | immich | Database Immich uses |
| `DATABASE_URL` | Postgres | - | Full private Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name |
| `DB_STORAGE_TYPE` | Postgres | SSD | Tells Immich's Postgres image to tune for SSD storage |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated alphanumeric Postgres password (Immich requires A-Z, a-z, 0-9) |
| `POSTGRES_INITDB_ARGS` | Postgres | --data-checksums | Extra initdb flags on first boot; enables data checksums as upstream does |

## Configuration

- **Healthcheck:** `/api/server/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/ping`
- **Volume:** `/cache`
- **Start command:** `/bin/sh -c "rm -rf /data/lost+found && exec docker-entrypoint.sh valkey-server --requirepass $REDIS_PASSWORD --save 60 1 --dir /data --maxmemory-policy noeviction --bind '* -::*'"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/deploy-immich-photo-backup-on-railway)
