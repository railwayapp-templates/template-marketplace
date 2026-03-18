# Deploy immich on Railway

Self-hosted Google Photos alternative with AI-powered search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich)

## About

Immich is an open-source, self-hosted photo and video backup solution. It provides a Google Photos-like experience with automatic mobile backup, facial recognition, object detection, and album sharing ΓÇö all running on your own infrastructure.

Hosting Immich on Railway gives you a fully managed environment for your personal media library without maintaining servers. Railway handles infrastructure provisioning, networking, and persistent storage so you can focus on using Immich rather than running it. The template wires together the Immich server, the machine-learning sidecar (for smart search and facial recognition), a PostgreSQL database, and a Redis cache ΓÇö all on Railway's private network. Volumes are attached automatically so your photos, thumbnails, and ML model cache survive restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| immich-server | [c-treinta/railway-immich](https://github.com/c-treinta/railway-immich) (root: server/) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| immich-ml | [c-treinta/railway-immich](https://github.com/c-treinta/railway-immich) (root: ml/) | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | immich-server | 2283 | Port the Immich server listens on |
| `REDIS_PORT` | immich-server | - | Redis port |
| `DATABASE_URL` | immich-server | - | PostgreSQL connection string |
| `REDIS_HOSTNAME` | immich-server | - | Redis host for job queues and caching |
| `UPLOAD_LOCATION` | immich-server | /usr/src/app/upload | Path where uploaded photos and videos are stored |
| `IMMICH_MACHINE_LEARNING_URL` | immich-server | - | Internal URL for the machine learning service |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MACHINE_LEARNING_CACHE_FOLDER` | immich-ml | /cache | Path where ML models are cached |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/usr/src/app/upload`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/cache`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage · **Languages:** Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/immich)
