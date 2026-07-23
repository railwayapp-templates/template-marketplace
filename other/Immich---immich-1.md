# Deploy Immich on Railway

Open source alternative to google photos. Demo for myownsuite.org

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immich-1)

## About

Immich is a high-performance, self-hosted photo and video backup platform, an open-source alternative to Google Photos and iCloud Photos. It automatically backs up your phone's camera roll, then organizes everything with facial recognition, object and scene detection, albums, and lightning-fast search, all while keeping every image on infrastructure you control instead of a big-tech cloud.

Immich is not a single container. A working deployment runs four coordinated services: the Immich **server** (API and web UI), a **machine-learning** service that powers facial recognition and smart search, a **PostgreSQL 14** database with the **VectorChord** vector extension for similarity search, and a **Valkey** (Redis-compatible) cache. It also needs persistent storage for the photo library, the database, thumbnails, and the ML model cache, plus generated secrets for the database password and JWT signing. This template wires all of that together on Railway so you don't have to assemble the stack by hand. The machine-learning service performs best on a CPU with AVX2 support, and the first startup takes a few minutes while the database initializes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Immich-valkey | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/immich) | Database |
| Immich | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/immich) | Web service |
| Immich-postgres | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/immich) | Database |
| Immich-ml | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/immich) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Immich-valkey | 6379 |
| `REDISUSER` | Immich-valkey | default |
| `REDISPASSWORD` | Immich-valkey | (secret) |
| `REDIS_PASSWORD` | Immich-valkey | (secret) |
| `TZ` | Immich | UTC |
| `DB_PORT` | Immich | 5432 |
| `DB_PASSWORD` | Immich | (secret) |
| `DB_USERNAME` | Immich | (secret) |
| `REDIS_PASSWORD` | Immich | (secret) |
| `UPLOAD_LOCATION` | Immich | /usr/src/app/upload |
| `POSTGRES_DB` | Immich-postgres | immich |
| `POSTGRES_USER` | Immich-postgres | (secret) |
| `POSTGRES_PASSWORD` | Immich-postgres | (secret) |
| `POSTGRES_INITDB_ARGS` | Immich-postgres | --data-checksums |

## Configuration

- **Start command:** `sh -lc 'valkey-server --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/upload`
- **Start command:** `/usr/local/bin/immich-docker-entrypoint.sh postgres -c config_file=/etc/postgresql/postgresql.conf -c shared_preload_libraries=vchord.so,vectors.so`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, TypeScript, CSS, Astro, MDX, Shell, PowerShell, Dockerfile, HTML, Standard ML

[View on Railway →](https://railway.com/deploy/immich-1)
