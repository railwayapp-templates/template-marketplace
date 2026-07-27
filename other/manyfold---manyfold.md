# Deploy manyfold on Railway

A self-hosted digital asset manager for 3d print files

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/manyfold)

## About

Manyfold is a self-hosted digital asset manager for 3D print files. Browse models
in interactive 3D, organise by tags, creators, and collections, share privately
or on the Fediverse, and keep STL/3MF libraries tidy on disk.

This template runs the standard Manyfold stack: the app (web UI plus background
workers), PostgreSQL for metadata, and Redis 8 for cache and Sidekiq jobs. Only
the app is public; the database and Redis stay on private networking. Persist a
single volume at `/models` for your library (Railway allows one volume per
service). First boot runs database prepare and may take a minute before
`/health` is ready. After deploy, create an admin account, point a library at
`/models`, and upload a small model to confirm storage and workers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| redis | `redis:8.2.1` | Database |
| app | [osbytes/template-manyfold](https://github.com/osbytes/template-manyfold) (root: /services/app) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | manyfold | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDIS_URL` | redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `REDIS_PUBLIC_URL` | redis | - | Connection string for connecting to redis externally |
| `PGID` | app | 1000 | - |
| `PORT` | app | 3214 | - |
| `PUID` | app | 1000 | - |
| `MULTIUSER` | app | enabled | - |
| `HTTPS_ONLY` | app | enabled | - |
| `DATABASE_PORT` | app | 5432 | - |
| `DATABASE_USER` | app | (secret) | - |
| `SECRET_KEY_BASE` | app | (secret) | - |
| `WEB_CONCURRENCY` | app | 2 | - |
| `DATABASE_ADAPTER` | app | postgresql | - |
| `DATABASE_PASSWORD` | app | (secret) | - |
| `RAILS_MAX_THREADS` | app | 8 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/models`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/manyfold)
