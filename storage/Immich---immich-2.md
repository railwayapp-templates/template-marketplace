# Deploy Immich on Railway

High-performance photo and video backup with search and sharing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich-2)

## About

Immich is a high-performance, self-hosted photo and video management platform. It backs up media from mobile devices, presents a fast timeline, and adds albums, sharing, metadata, facial recognition, object detection, and semantic search while keeping the library on infrastructure you control.

Hosting Immich requires four coordinated containers: the Immich server for the API and web interface, Immich Machine Learning for facial recognition and semantic search, PostgreSQL with VectorChord and pgvector for metadata and vector indexes, and Valkey as a Redis-compatible cache and job broker. The server, database, model cache, and Valkey data each use persistent Railway volumes. Only the Immich server is public; all dependency traffic uses Railway private domains. The template pins every image to the Umbrel-tested Immich v3.0.3 graph and configures the supported `/api/server/ping` health endpoint.

> **Warning:** Immich is under very active development. Expect bugs and changes. Do not use it as the only way to store your photos and videos!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Immich ML | `ghcr.io/immich-app/immich-machine-learning:v3.0.3` | Database |
| Redis | `valkey/valkey:8-bookworm` | Database |
| Postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0` | Database |
| Immich | `ghcr.io/immich-app/immich-server:v3.0.3` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `IMMICH_ENV` | Immich ML | production |
| `IMMICH_PORT` | Immich ML | 3003 |
| `IMMICH_LOG_LEVEL` | Immich ML | log |
| `MACHINE_LEARNING_CACHE_FOLDER` | Immich ML | /cache |
| `POSTGRES_DB` | Postgres | immich |
| `POSTGRES_USER` | Postgres | (secret) |
| `DB_STORAGE_TYPE` | Postgres | SSD |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `POSTGRES_INITDB_ARGS` | Postgres | --data-checksums |
| `PORT` | Immich | 2283 |
| `DB_PORT` | Immich | 5432 |
| `IMMICH_ENV` | Immich | production |
| `JWT_SECRET` | Immich | (secret) |
| `REDIS_PORT` | Immich | 6379 |
| `DB_PASSWORD` | Immich | (secret) |
| `DB_USERNAME` | Immich | (secret) |
| `IMMICH_PORT` | Immich | 2283 |
| `IMMICH_LOG_LEVEL` | Immich | log |

## Configuration

- **Volume:** `/cache`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/server/ping`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/immich-2)
