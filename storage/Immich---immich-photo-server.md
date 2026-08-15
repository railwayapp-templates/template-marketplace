# Deploy Immich on Railway

Google Photos alternative. Self-hosted photo and video library

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich-photo-server)

## About

Immich is a high-performance, self-hosted photo and video library — an open-source alternative to Google Photos that keeps your camera roll on infrastructure you control. You get automatic phone backup through native iOS and Android apps, a timeline, albums, shared links, face grouping, a map of geotagged shots, and natural-language search that finds "sunset over the harbour" without you tagging anything.

Self-host Immich on Railway and you get the production topology upstream recommends, already wired together. Four services are provisioned: the **Immich server**, serving the web app, the mobile API and the background job workers; a **machine learning** service running CLIP, face-detection and OCR models; **PostgreSQL 14 with the VectorChord extension**, holding metadata and the vector embeddings behind semantic search; and **Redis**, carrying the job queues that move an upload through metadata extraction, thumbnailing, transcoding and indexing. Only the server is exposed publicly. Media lands on a persistent volume attached to the server, and the models cache on a volume of their own.

![Immich Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786745112/2c6acc23-027f-4787-a5c8-027edbda8dee.png)

Phone cameras produce more data every year than any free cloud tier will hold. Self-hosting Immich puts the originals on storage you own, at original quality, with no per-gigabyte pricing.

Key features:

- Automatic background backup from iOS and Android, including motion photos
- Natural-language smart search powered by CLIP, plus OCR search inside images
- Face detection and grouping, so people can be named and browsed
- Albums, shared albums and public links with optional passwords and expiry
- A map view built from photo GPS metadata, with reverse-geocoded place names
- Multi-user accounts with storage quotas, plus read-only external libraries

The **server** answers every web and mobile request and runs the workers that process uploads. The **machine learning** container is separate so model loading never blocks the API. **PostgreSQL** stores all metadata and, thanks to VectorChord, the search embeddings themselves — search is a database query, not a separate search engine. **Redis** holds the job queues, so a large import processes steadily in the background instead of timing out a request.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| immich-machine-learning | `ghcr.io/immich-app/immich-machine-learning:v3` | Database |
| immich-server | `ghcr.io/immich-app/immich-server:v3` | Web service |
| immich-postgres | `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `TZ` | immich-machine-learning | Etc/UTC | Timezone for logs |
| `PORT` | immich-machine-learning | 3003 | Health check port |
| `IMMICH_HOST` | immich-machine-learning | 0.0.0.0 | Listen on all interfaces |
| `IMMICH_PORT` | immich-machine-learning | 3003 | Inference service port |
| `IMMICH_LOG_LEVEL` | immich-machine-learning | log | Application log verbosity |
| `MACHINE_LEARNING_CACHE_FOLDER` | immich-machine-learning | /cache | Model cache directory on the volume |
| `MACHINE_LEARNING_REQUEST_THREADS` | immich-machine-learning | 8 | Request thread pool size |
| `TZ` | immich-server | Etc/UTC | Timezone for jobs and logs |
| `PORT` | immich-server | 2283 | Health check and proxy port |
| `DB_PORT` | immich-server | 5432 | Postgres port |
| `IMMICH_ENV` | immich-server | production | Runtime environment |
| `REDIS_PORT` | immich-server | - | Redis port |
| `DB_HOSTNAME` | immich-server | - | Private Postgres hostname |
| `DB_PASSWORD` | immich-server | (secret) | Database password |
| `DB_USERNAME` | immich-server | (secret) | Database user |
| `IMMICH_HOST` | immich-server | 0.0.0.0 | Listen on all interfaces |
| `IMMICH_PORT` | immich-server | 2283 | Application listening port |
| `REDIS_HOSTNAME` | immich-server | - | Redis private hostname |
| `REDIS_PASSWORD` | immich-server | (secret) | Redis password |
| `DB_DATABASE_NAME` | immich-server | - | Database name |
| `IMMICH_LOG_LEVEL` | immich-server | log | Application log verbosity |
| `IMMICH_HELMET_FILE` | immich-server | true | Enable bundled security headers |
| `IMMICH_TRUSTED_PROXIES` | immich-server | 169.254.0.0/16,fe80::/10,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,fc00::/7,100.64.0.0/10 | Trusted proxy ranges for HTTPS detection |
| `IMMICH_MACHINE_LEARNING_URL` | immich-server | - | Private inference service URL |
| `TZ` | immich-postgres | Etc/UTC | Timezone for logs |
| `DB_PASSWORD` | immich-postgres | (secret) | Database password |
| `DB_USERNAME` | immich-postgres | (secret) | Database superuser |
| `DB_STORAGE_TYPE` | immich-postgres | SSD | Tune IO settings for SSD storage |
| `DB_DATABASE_NAME` | immich-postgres | immich | Database created on first boot |
| `POSTGRES_INITDB_ARGS` | immich-postgres | --data-checksums | Enable page checksums at init |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/ping`
- **Volume:** `/cache`
- **Healthcheck:** `/api/server/ping`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/local/bin/immich-docker-entrypoint.sh postgres -c config_file=/etc/postgresql/postgresql.conf -c dynamic_shared_memory_type=mmap`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/immich-photo-server)
