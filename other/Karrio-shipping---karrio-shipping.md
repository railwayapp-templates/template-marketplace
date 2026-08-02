# Deploy Karrio shipping on Railway

Karrio shipping API and dashboard with durable PostgreSQL and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karrio-shipping)

## About

Deploy the Karrio community shipping API and dashboard with a detached worker, PostgreSQL, and authenticated Redis. Railway generates the administrator and service secrets and keeps both data services private.

Karrio provides a unified API for carrier rates, shipping labels, tracking, webhooks, and connection management. This template packages the open-source community deployment as two public applications and three private supporting services, with durable PostgreSQL and Redis storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Karrio PostgreSQL | `postgres:17-alpine@sha256:742f40ea20b9ff2ff31db5458d127452988a2164df9e17441e191f3b72252193` | Database |
| Karrio Redis | `redis:8-alpine@sha256:e8eb6f2980c06c6a25c08f62cb2e00dc7d2fead9aa492cfdd8b54a42109ae0f2` | Database |
| Karrio Dashboard | `karrio/dashboard:2026.1.32@sha256:0533a3509e19a0e26a465ce992ab4224c155f6a1250f454f2852e8aaa22bbad0` | Web service |
| Karrio Worker | `karrio/server:2026.1.32@sha256:4516bf3c83179de0513b008f5d756a674f15d556e340c732528285b4d3433eac` | Worker |
| Karrio API | `karrio/server:2026.1.32@sha256:4516bf3c83179de0513b008f5d756a674f15d556e340c732528285b4d3433eac` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Karrio PostgreSQL | karrio | - |
| `POSTGRES_USER` | Karrio PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Karrio PostgreSQL | (secret) | Generated password for Karrio's private database. |
| `REDIS_PASSWORD` | Karrio Redis | (secret) | Generated password for the private durable task queue. |
| `PORT` | Karrio Dashboard | 3002 | - |
| `KARRIO_URL` | Karrio Dashboard | - | Private server-side Karrio API URL. |
| `DASHBOARD_PORT` | Karrio Dashboard | 3002 | - |
| `AUTH_TRUST_HOST` | Karrio Dashboard | true | - |
| `NEXTAUTH_SECRET` | Karrio Dashboard | (secret) | Generated dashboard session signing secret. |
| `NEXT_PUBLIC_DASHBOARD_URL` | Karrio Dashboard | - | Public dashboard URL. |
| `NEXT_PUBLIC_KARRIO_PUBLIC_URL` | Karrio Dashboard | - | Public browser-facing Karrio API URL. |
| `USE_HTTPS` | Karrio Worker | True | - |
| `DEBUG_MODE` | Karrio Worker | False | - |
| `REDIS_HOST` | Karrio Worker | - | Private authenticated Redis task queue. |
| `REDIS_PORT` | Karrio Worker | 6379 | - |
| `SECRET_KEY` | Karrio Worker | (secret) | Django and JWT signing secret shared with the API. |
| `ALLOW_SIGNUP` | Karrio Worker | false | - |
| `ALLOWED_HOSTS` | Karrio Worker | * | - |
| `DATABASE_HOST` | Karrio Worker | - | Private PostgreSQL hostname. |
| `DATABASE_PORT` | Karrio Worker | 5432 | - |
| `REDIS_PASSWORD` | Karrio Worker | (secret) | - |
| `DATABASE_ENGINE` | Karrio Worker | postgresql_psycopg2 | - |
| `DETACHED_WORKER` | Karrio Worker | True | - |
| `DATABASE_PASSWORD` | Karrio Worker | (secret) | - |
| `DATABASE_USERNAME` | Karrio Worker | (secret) | - |
| `OTEL_SDK_DISABLED` | Karrio Worker | true | - |
| `PORT` | Karrio API | 5002 | - |
| `USE_HTTPS` | Karrio API | True | - |
| `DEBUG_MODE` | Karrio API | False | - |
| `REDIS_HOST` | Karrio API | - | Private Redis hostname used by the background task queue. |
| `REDIS_PORT` | Karrio API | 6379 | - |
| `SECRET_KEY` | Karrio API | (secret) | Generated Django and JWT signing secret shared with the worker. |
| `ADMIN_EMAIL` | Karrio API | admin@example.com | Initial administrator email; change it after first sign-in. |
| `ALLOW_SIGNUP` | Karrio API | false | - |
| `ALLOWED_HOSTS` | Karrio API | * | - |
| `DATABASE_HOST` | Karrio API | - | Private PostgreSQL hostname. |
| `DATABASE_PORT` | Karrio API | 5432 | - |
| `ADMIN_PASSWORD` | Karrio API | (secret) | Generated password for the initial administrator. |
| `REDIS_PASSWORD` | Karrio API | (secret) | - |
| `DATABASE_ENGINE` | Karrio API | postgresql_psycopg2 | - |
| `DETACHED_WORKER` | Karrio API | True | - |
| `KARRIO_HTTP_PORT` | Karrio API | 5002 | - |
| `DATABASE_PASSWORD` | Karrio API | (secret) | - |
| `DATABASE_USERNAME` | Karrio API | (secret) | - |
| `KARRIO_PUBLIC_URL` | Karrio API | - | Public API URL used in instance metadata and callbacks. |
| `OTEL_SDK_DISABLED` | Karrio API | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -ec 'exec redis-server --appendonly yes --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Start command:** `/bin/sh ./entrypoint`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -ec 'until karrio migrate --check; do sleep 3; done; exec /bin/bash ./worker'`
- **Start command:** `/bin/bash ./entrypoint`
- **Healthcheck:** `/status/`

**Category:** Other

[View on Railway →](https://railway.com/deploy/karrio-shipping)
