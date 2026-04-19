# Deploy Immich | Open Source Google Photos Alternative on Railway

Self-host Immich. Facial recognition, mobile backup, smart search & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich-gphotos-alternative)

## About

Deploy Immich on Railway to run a self-hosted Google Photos alternative with full privacy control. Immich is an open-source photo and video management platform with automatic mobile backup, facial recognition, smart search, and a polished web interface that rivals commercial cloud services.

This Railway template pre-configures four services: **Immich-Server** (API + web UI + background workers), **Immich-ML** (machine learning for facial recognition and smart search), **PostgreSQL** with pgvector/VectorChord extensions for vector embeddings, and **Valkey** (Redis-compatible cache). All services communicate over Railway's private network with volumes attached for persistent media and database storage.

![Immich Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776530008/immich-railwa-arch_rhrpdb.png)

Immich is a high-performance, self-hosted photo and video management solution built with Node.js (server) and Python (machine learning). It provides a complete replacement for Google Photos with full data ownership.

- **Automatic mobile backup** with background sync on iOS and Android
- **AI-powered features** — facial recognition, object detection, CLIP-based smart search, OCR
- **Timeline and map views** with reverse geocoding
- **Multi-user support** with sharing, albums, and granular permissions
- **External library scanning** for existing photo collections
- **REST API** with OpenAPI specs for automation and integrations
- **Memory feature** — resurface photos from past dates

The architecture separates the API/web server from the ML pipeline, allowing independent scaling. PostgreSQL stores metadata and vector embeddings for similarity search; Valkey handles caching and job queues.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0` | Database |
| Redis | `valkey/valkey:9` | Database |
| Immich-ML | `ghcr.io/immich-app/immich-machine-learning:release` | Database |
| Immich-Server | `ghcr.io/immich-app/immich-server:release` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | immich | Default database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database superuser password |
| `POSTGRES_INITDB_ARGS` | Postgres | --data-checksums | Enable data checksums |
| `PORT` | Immich-Server | 2283 | HTTP server listening port |
| `DB_PORT` | Immich-Server | 5432 | Postgres port |
| `REDIS_PORT` | Immich-Server | 6379 | Valkey/Redis port |
| `DB_HOSTNAME` | Immich-Server | - | Postgres host via private network |
| `DB_PASSWORD` | Immich-Server | (secret) | Database password |
| `DB_USERNAME` | Immich-Server | (secret) | Database username |
| `REDIS_HOSTNAME` | Immich-Server | - | Valkey/Redis host via private network |
| `DB_DATABASE_NAME` | Immich-Server | - | Database name |
| `IMMICH_LOG_LEVEL` | Immich-Server | log | Log verbosity level |
| `IMMICH_MACHINE_LEARNING_URL` | Immich-Server | - | ML service endpoint |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/cache`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/immich-gphotos-alternative)
