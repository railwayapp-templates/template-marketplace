# Deploy Immich (Self-Hosted Google Photos) on Railway

Self-hosted photo & video backup, a Google Photos alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich-self-hosted-google-photos)

## About

Immich is an open-source, self-hosted photo and video backup solution and a privacy-first alternative to Google Photos. This template deploys the full Immich stack on Railway with generated secrets, private networking, and persistent volumes.

This template runs the complete Immich stack: the server (web UI, API, and background workers) on port 2283, a CPU machine-learning service for smart search and face recognition, a Valkey queue, and the required VectorChord/pgvecto-rs PostgreSQL database. Services communicate over Railway's private network, all secrets are generated automatically, and the photo library, model cache, and database each sit on persistent volumes so nothing is lost across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MachineLearning | `ghcr.io/immich-app/immich-machine-learning:v3.1.0` | Database |
| Immich | `ghcr.io/immich-app/immich-server:v3.1.0` | Web service |
| Redis | `valkey/valkey:9` | Database |
| Postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `IMMICH_HOST` | MachineLearning | :: | Fallback bind address for the ML service (all interfaces). |
| `MACHINE_LEARNING_HOST` | MachineLearning | :: | Address the machine-learning service binds to (all interfaces). |
| `TZ` | Immich | Etc/UTC | Timezone (IANA) for the Immich server. |
| `DB_PORT` | Immich | 5432 | PostgreSQL port on the private network. |
| `REDIS_PORT` | Immich | 6379 | Redis/Valkey port on the private network. |
| `DB_HOSTNAME` | Immich | - | Private hostname of the Postgres service. |
| `DB_PASSWORD` | Immich | (secret) | Postgres password (auto-generated; shared with the database). |
| `DB_USERNAME` | Immich | (secret) | Postgres username. |
| `IMMICH_HOST` | Immich | :: | Address the Immich server binds to (all interfaces). |
| `IMMICH_PORT` | Immich | 2283 | Port the Immich server and web UI listen on. |
| `REDIS_HOSTNAME` | Immich | - | Private hostname of the Redis/Valkey service. |
| `DB_DATABASE_NAME` | Immich | immich | Postgres database name. |
| `IMMICH_MACHINE_LEARNING_URL` | Immich | - | Internal URL of the machine-learning service. |
| `POSTGRES_DB` | Postgres | immich | Database name created on first boot. |
| `POSTGRES_USER` | Postgres | (secret) | Database user name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (auto-generated). |
| `POSTGRES_INITDB_ARGS` | Postgres | --data-checksums | Enables data checksums when the database cluster is initialized. |

## Configuration

- **Volume:** `/cache`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/immich-self-hosted-google-photos)
