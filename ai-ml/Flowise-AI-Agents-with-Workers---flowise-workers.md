# Deploy Flowise | AI Agents with Workers on Railway

Flowise queue mode: main + worker, Postgres (pgvector), Redis, S3 bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-workers)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/flowise-workers?utm_medium=integration&utm_source=button&utm_campaign=flowise-workers)

This template runs [Flowise](https://flowiseai.com/) in **queue mode**: the main instance serves the UI and API, and a separate worker service executes predictions, document upserts and scheduled runs. Postgres (with pgvector), Redis and a Railway storage bucket come pre-wired. Scale workers up when your agents get busy, without touching the UI.

Four services and one bucket:

- **flowise** — UI + API on port 3000, enqueues jobs to Redis (BullMQ)
- **worker** — consumes the queue; add replicas for more throughput
- **postgres** — pgvector image, so the built-in Postgres vector store works out of the box
- **redis** — the queue, persisted on a small volume
- **storage** bucket — uploads and document-store files, shared by main and worker via S3

Credentials are encrypted with `FLOWISE_SECRETKEY_OVERWRITE`, generated once and referenced by the worker so both sides agree. Auth is Flowise's built-in accounts: the first visit asks you to create the admin user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | [nomideusz/flowise-railway](https://github.com/nomideusz/flowise-railway) (root: /worker) | Worker |
| redis | [nomideusz/flowise-railway](https://github.com/nomideusz/flowise-railway) (root: /redis) | Database |
| flowise | [nomideusz/flowise-railway](https://github.com/nomideusz/flowise-railway) (root: /main) | Web service |
| postgres | [nomideusz/flowise-railway](https://github.com/nomideusz/flowise-railway) (root: /postgres) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | worker | 5566 | Worker healthcheck port. Do not change. |
| `REDIS_URL` | worker | - | Same queue as main. |
| `DATABASE_HOST` | worker | - | Postgres host on the private network. |
| `S3_ENDPOINT_URL` | worker | - | Bucket S3 endpoint. |
| `DATABASE_PASSWORD` | worker | (secret) | Postgres password. |
| `S3_STORAGE_REGION` | worker | - | Bucket region. |
| `WORKER_CONCURRENCY` | worker | 100 | Jobs one worker runs at once. Flows are I/O-bound; raise or add replicas for throughput. |
| `S3_STORAGE_BUCKET_NAME` | worker | - | Railway bucket for uploads and document stores (shared by main and worker). |
| `S3_STORAGE_ACCESS_KEY_ID` | worker | - | Bucket access key. |
| `FLOWISE_SECRETKEY_OVERWRITE` | worker | (secret) | Must equal the main instance key. |
| `S3_STORAGE_SECRET_ACCESS_KEY` | worker | (secret) | Bucket secret key. |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated queue password. |
| `PORT` | flowise | 3000 | Port Flowise listens on and Railway probes. Do not change. |
| `APP_URL` | flowise | - | Public URL, used in invite/reset links. |
| `REDIS_URL` | flowise | - | BullMQ connection. ?family=0 makes ioredis dual-stack (Railway private DNS is IPv6-only). |
| `DATABASE_HOST` | flowise | - | Postgres host on the private network. |
| `S3_ENDPOINT_URL` | flowise | - | Bucket S3 endpoint. |
| `DATABASE_PASSWORD` | flowise | (secret) | Postgres password. |
| `S3_STORAGE_REGION` | flowise | - | Bucket region. |
| `TOKEN_HASH_SECRET` | flowise | (secret) | API key hashing secret. |
| `JWT_AUTH_TOKEN_SECRET` | flowise | (secret) | Auth token secret. |
| `EXPRESS_SESSION_SECRET` | flowise | (secret) | Session secret. |
| `S3_STORAGE_BUCKET_NAME` | flowise | - | Railway bucket for uploads and document stores (shared by main and worker). |
| `JWT_REFRESH_TOKEN_SECRET` | flowise | (secret) | Refresh token secret. |
| `S3_STORAGE_ACCESS_KEY_ID` | flowise | - | Bucket access key. |
| `FLOWISE_SECRETKEY_OVERWRITE` | flowise | (secret) | Encryption key for stored credentials. Must match the worker; changing it orphans saved API keys. |
| `S3_STORAGE_SECRET_ACCESS_KEY` | flowise | (secret) | Bucket secret key. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/flowise-workers)
