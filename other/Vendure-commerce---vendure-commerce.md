# Deploy Vendure commerce on Railway

Vendure commerce with Dashboard, Redis workers, and durable assets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vendure-commerce)

## About

Vendure is a headless commerce platform with Shop and Admin GraphQL APIs, a modern operator Dashboard, extensible catalog and order models, and asynchronous workers.

This template runs Vendure 3.7.2 with a public API and compiled Dashboard, a private BullMQ worker, PostgreSQL, authenticated Redis, and a private Railway Bucket for original assets and previews.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vendure Worker | [tech-progress/railway-template-vendure](https://github.com/tech-progress/railway-template-vendure) (branch: release-v1) (root: /) | Worker |
| Vendure PostgreSQL | `postgres:17-alpine@sha256:742f40ea20b9ff2ff31db5458d127452988a2164df9e17441e191f3b72252193` | Database |
| Vendure | [tech-progress/railway-template-vendure](https://github.com/tech-progress/railway-template-vendure) (branch: release-v1) (root: /) | Web service |
| Vendure Redis | `redis:7.2.4-alpine@sha256:c8bb255c3559b3e458766db810aa7b3c7af1235b204cfdb304e79ff388fe1a5a` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Vendure Worker | 3020 | Private worker health listener used by Railway. |
| `REDIS_PORT` | Vendure Worker | 6379 | - |
| `COOKIE_SECRET` | Vendure Worker | (secret) | Reference to the API cookie signing secret. |
| `POSTGRES_PORT` | Vendure Worker | 5432 | - |
| `POSTGRES_USER` | Vendure Worker | (secret) | - |
| `API_HEALTH_URL` | Vendure Worker | - | Private database-aware API health gate that prevents first-boot migration races. |
| `REDIS_PASSWORD` | Vendure Worker | (secret) | - |
| `POSTGRES_PASSWORD` | Vendure Worker | (secret) | - |
| `WORKER_CONCURRENCY` | Vendure Worker | 3 | Maximum BullMQ jobs processed concurrently by this worker. |
| `WORKER_HEALTH_PORT` | Vendure Worker | 3020 | - |
| `SUPERADMIN_PASSWORD` | Vendure Worker | (secret) | Reference to the API first-boot administrator password. |
| `SUPERADMIN_USERNAME` | Vendure Worker | (secret) | - |
| `S3_SECRET_ACCESS_KEY` | Vendure Worker | (secret) | - |
| `POSTGRES_DB` | Vendure PostgreSQL | vendure | - |
| `POSTGRES_USER` | Vendure PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Vendure PostgreSQL | (secret) | Generated password for the private Vendure database. |
| `PORT` | Vendure | 3000 | - |
| `S3_BUCKET` | Vendure | - | Private Railway Bucket that stores original assets and generated previews. |
| `PUBLIC_URL` | Vendure | - | Public API and Dashboard origin used to generate durable asset URLs. |
| `REDIS_PORT` | Vendure | 6379 | - |
| `COOKIE_SECRET` | Vendure | (secret) | Generated signing secret shared with the worker. |
| `POSTGRES_PORT` | Vendure | 5432 | - |
| `POSTGRES_USER` | Vendure | (secret) | - |
| `REDIS_PASSWORD` | Vendure | (secret) | - |
| `ALLOWED_ORIGINS` | Vendure | - | Comma-separated browser origins allowed to send credentialed API requests. |
| `POSTGRES_PASSWORD` | Vendure | (secret) | - |
| `SUPERADMIN_PASSWORD` | Vendure | (secret) | Generated first-boot administrator password; rotate the account in Vendure after initialization. |
| `SUPERADMIN_USERNAME` | Vendure | (secret) | Identifier for the administrator created only on the first database boot. |
| `S3_SECRET_ACCESS_KEY` | Vendure | (secret) | - |
| `REDIS_PASSWORD` | Vendure Redis | (secret) | Generated password required by the queue and shared cache. |

## Configuration

- **Start command:** `node dist/index-worker.js`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec redis-server --appendonly yes --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vendure-commerce)
