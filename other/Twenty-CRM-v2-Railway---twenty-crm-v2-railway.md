# Deploy Twenty CRM v2 Railway on Railway

Twenty v2 CRM with worker, PostgreSQL, Redis, and object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-v2-railway)

## About

Twenty is a modern open-source CRM for managing companies, contacts, opportunities, tasks, notes, workflows, dashboards, email, and calendars. It provides a fast configurable alternative to conventional per-seat CRM platforms.

This template runs Twenty `v2.24.0` as a production-style stack: a public server, a dedicated background worker, PostgreSQL 16, authenticated Redis with `noeviction`, and a Railway object-storage bucket. The server performs database migrations and cron registration. The worker handles asynchronous imports, email synchronization, and workflow execution.

Attachments use Twenty's S3 driver because Railway services cannot share one filesystem volume. PostgreSQL and Redis each retain their own data on persistent volumes. Encryption and legacy application secrets are generated once and shared automatically between the server and worker.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | [monotykamary/railway-template-twenty](https://github.com/monotykamary/railway-template-twenty) (root: /redis) | Database |
| worker | [monotykamary/railway-template-twenty](https://github.com/monotykamary/railway-template-twenty) (root: /worker) | Worker |
| postgres | [monotykamary/railway-template-twenty](https://github.com/monotykamary/railway-template-twenty) (root: /postgres) | Database |
| server | [monotykamary/railway-template-twenty](https://github.com/monotykamary/railway-template-twenty) (root: /server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | redis | (secret) | Generated Redis password. |
| `REDIS_URL` | worker | - | Authenticated Redis queue URL; family=0 supports Railway private networking. |
| `APP_SECRET` | worker | (secret) | Must match the server signing secret. |
| `SERVER_URL` | worker | - | Canonical public Twenty URL. |
| `STORAGE_TYPE` | worker | S_3 | Use object storage so server and worker share attachments. |
| `ENCRYPTION_KEY` | worker | - | Must match the server encryption key. |
| `PG_DATABASE_URL` | worker | - | PostgreSQL connection shared by server and worker. |
| `STORAGE_S3_NAME` | worker | - | Bundled Railway bucket name. |
| `STORAGE_S3_REGION` | worker | auto | Railway bucket uses an S3-compatible automatic region. |
| `STORAGE_S3_ENDPOINT` | worker | - | Bundled Railway bucket endpoint. |
| `DISABLE_DB_MIGRATIONS` | worker | true | The server owns migrations. |
| `STORAGE_S3_ACCESS_KEY_ID` | worker | - | Bundled Railway bucket access key. |
| `STORAGE_S3_SECRET_ACCESS_KEY` | worker | (secret) | Bundled Railway bucket secret key. |
| `DISABLE_CRON_JOBS_REGISTRATION` | worker | true | The server owns cron registration. |
| `POSTGRES_DB` | postgres | default | Twenty database name. |
| `POSTGRES_USER` | postgres | (secret) | Database user. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated PostgreSQL password. |
| `PORT` | server | 3000 | Railway public port. |
| `NODE_PORT` | server | 3000 | Twenty Node listen port. |
| `REDIS_URL` | server | - | Authenticated Redis queue URL; family=0 supports Railway private networking. |
| `APP_SECRET` | server | (secret) | Legacy signing secret retained for compatibility. |
| `SERVER_URL` | server | - | Canonical public Twenty URL. |
| `STORAGE_TYPE` | server | S_3 | Use object storage so server and worker share attachments. |
| `ENCRYPTION_KEY` | server | - | Primary at-rest encryption and session key. |
| `PG_DATABASE_URL` | server | - | PostgreSQL connection shared by server and worker. |
| `STORAGE_S3_NAME` | server | - | Bundled Railway bucket name. |
| `STORAGE_S3_REGION` | server | auto | Railway bucket uses an S3-compatible automatic region. |
| `STORAGE_S3_ENDPOINT` | server | - | Bundled Railway bucket endpoint. |
| `STORAGE_S3_ACCESS_KEY_ID` | server | - | Bundled Railway bucket access key. |
| `STORAGE_S3_SECRET_ACCESS_KEY` | server | (secret) | Bundled Railway bucket secret key. |

## Configuration

- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/twenty-crm-v2-railway)
