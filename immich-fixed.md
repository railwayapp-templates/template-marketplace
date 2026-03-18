# Deploy Immich (fixed) on Railway

Open Source Google Photos alternative. Fixed and Simplified.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/immich-fixed)

## About

Immich is a high performance self-hosted photo and video backup solution. And an alternative to Google Photos.

Immich offers seamless backup and access to your media from mobile and web clients, providing a privacy-focused alternative to cloud services.

This template deploys a monolithic Docker image for Immich, removing Redis and machine learning components, making it lightweight, cost-effective.

Other templates that attempt to deploy Redis will bug out because Railway's internal networking utilizes IPv6 and Immich's Redis connection does not support IPv6.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.3.0-pgvectors0.2.0` | Database |
| immich | `ghcr.io/imagegenius/immich:noml` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | immich | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | immich | Etc/UTC | - |
| `PGID` | immich | 1000 | - |
| `PORT` | immich | 8080 | - |
| `PUID` | immich | 1000 | - |
| `REDIS_PORT` | immich | 6379 | - |
| `DB_PASSWORD` | immich | (secret) | - |
| `DB_USERNAME` | immich | (secret) | - |
| `DOCKER_MODS` | immich | imagegenius/mods:universal-redis | - |
| `REDIS_HOSTNAME` | immich | localhost | - |
| `UPLOAD_LOCATION` | immich | /home/uploads | - |
| `TRANSFORMERS_CACHE` | immich | /home/config/machine-learning/models | - |
| `IMMICH_MEDIA_LOCATION` | immich | /home/photos | - |
| `MACHINE_LEARNING_CACHE_FOLDER` | immich | /home/config/machine-learning/models | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home`

**Category:** Storage

[View on Railway →](https://railway.com/template/immich-fixed)
