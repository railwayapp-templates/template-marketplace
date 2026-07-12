# Deploy Twenty CRM Production on Railway

Open-source Salesforce alternative: CRM with worker, S3 files, workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-production?utm_medium=integration&utm_source=button&utm_campaign=twenty)

[Twenty](https://twenty.com/) is the open-source CRM: pipelines, contacts, companies, notes, tasks, email sync, and workflow automation in a fast modern UI — a self-hosted alternative to Salesforce and Pipedrive, built by one of the most active open-source teams (50K+ GitHub stars).

This template runs Twenty v2 as four Railway services: the server (API + web app, runs migrations and cron registration on boot), a dedicated BullMQ worker (emails, imports, workflow runs — kept off the request path), PostgreSQL 16, and Redis tuned with `noeviction` as upstream requires for its queues. File attachments go to a **Railway bucket over S3** — Twenty's storage driver checks the specific bucket with `headBucket`, which works cleanly with Railway's bucket-scoped credentials, and it also solves the shared-volume problem (upstream's compose shares a local-storage volume between server and worker, which Railway services can't do). The Redis URL carries `?family=0` for Railway's IPv6-only private networking. First boot migrates the database in a minute or two; then create your workspace at the server's domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [nomideusz/twenty-railway](https://github.com/nomideusz/twenty-railway) (root: /postgres) | Database |
| worker | [nomideusz/twenty-railway](https://github.com/nomideusz/twenty-railway) (root: /worker) | Worker |
| redis | [nomideusz/twenty-railway](https://github.com/nomideusz/twenty-railway) (root: /redis) | Database |
| server | [nomideusz/twenty-railway](https://github.com/nomideusz/twenty-railway) (root: /server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. |
| `REDIS_URL` | worker | - | Redis URI for BullMQ. The family=0 suffix is required on Railway (IPv6) — don't remove it. |
| `APP_SECRET` | worker | (secret) | Session-signing secret, shared from the server. Wired automatically — don't change. |
| `SERVER_URL` | worker | - | Public URL of this Twenty instance. Wired automatically — don't change. |
| `PG_DATABASE_URL` | worker | - | Postgres connection string. Wired automatically — don't change. |
| `STORAGE_S3_NAME` | worker | - | Bundled Railway bucket name. Wired automatically — don't change. |
| `STORAGE_S3_ENDPOINT` | worker | - | Bundled Railway bucket endpoint. Wired automatically — don't change. |
| `STORAGE_S3_ACCESS_KEY_ID` | worker | - | Bundled Railway bucket access key. Wired automatically — don't change. |
| `STORAGE_S3_SECRET_ACCESS_KEY` | worker | (secret) | Bundled Railway bucket secret key. Wired automatically — don't change. |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated queue password. |
| `PORT` | server | 3000 | Server listen port. Must stay 3000 — Railway would otherwise inject 8080. |
| `REDIS_URL` | server | - | Redis URI for BullMQ. The family=0 suffix is required on Railway (IPv6) — don't remove it. |
| `APP_SECRET` | server | (secret) | Signs sessions and tokens. The worker references this value — must match. |
| `SERVER_URL` | server | - | Public URL of this Twenty instance. Wired automatically — don't change. |
| `PG_DATABASE_URL` | server | - | Postgres connection string. Wired automatically — don't change. |
| `STORAGE_S3_NAME` | server | - | Bundled Railway bucket name. Wired automatically — don't change. |
| `STORAGE_S3_ENDPOINT` | server | - | Bundled Railway bucket endpoint. Wired automatically — don't change. |
| `STORAGE_S3_ACCESS_KEY_ID` | server | - | Bundled Railway bucket access key. Wired automatically — don't change. |
| `STORAGE_S3_SECRET_ACCESS_KEY` | server | (secret) | Bundled Railway bucket secret key. Wired automatically — don't change. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/twenty-crm-production)
