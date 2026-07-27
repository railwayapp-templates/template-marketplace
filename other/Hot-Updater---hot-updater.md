# Deploy Hot Updater on Railway

Self-host Hot Updater on Railway in minutes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hot-updater)

## About

Hot Updater is an open-source over-the-air update system for React Native. This template deploys a complete self-hosted Hot Updater stack built with Bun, Hono, and Drizzle, including a PostgreSQL database and a Railway S3-compatible Object Storage Bucket.

This template provisions everything needed to run Hot Updater on Railway: the API server, PostgreSQL database, and object storage bucket. Database and bucket variables are connected and prefilled automatically. The server applies committed Drizzle migrations before startup and listens on port 8080.

Public routes allow React Native clients to check for app-version or fingerprint updates. Bundle and channel management routes are protected by bearer authentication. The only value you need to provide is your own secure `HOT_UPDATER_AUTH_TOKEN`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hot-updater | [slvssb/custom-hotupdater-server](https://github.com/slvssb/custom-hotupdater-server) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | hot-updater | 8080 | - |
| `S3_SECRET_ACCESS_KEY` | hot-updater | (secret) | - |
| `HOT_UPDATER_AUTH_TOKEN` | hot-updater | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/hot-updater)
