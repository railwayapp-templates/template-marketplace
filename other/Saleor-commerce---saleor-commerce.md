# Deploy Saleor commerce on Railway

Saleor commerce with Dashboard, worker, PostgreSQL, Valkey, and media.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saleor-commerce)

## About

Deploy Saleor Core and Dashboard with a background worker, PostgreSQL, Valkey, and durable S3-compatible media storage. The template keeps data services private, generates installation secrets, applies database migrations, and creates the first administrator.

Saleor is a headless commerce platform built around a GraphQL API. This topology separates the browser Dashboard, API, and Celery worker while sharing PostgreSQL, Valkey, and object storage through Railway-managed resources.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Saleor Valkey | `valkey/valkey:8.1-alpine@sha256:a038175878d66b9d274fbf8be73c0305e93798b83917647f167e18cef3c71eec` | Database |
| Saleor PostgreSQL | `postgres:15-alpine@sha256:3d0f7584ed7d04e27fa050d6683a74746608faf21f202be78460d679cc56461f` | Database |
| Saleor Worker | [tech-progress/railway-template-saleor](https://github.com/tech-progress/railway-template-saleor) (branch: release-v1) (root: /) | Worker |
| Saleor Dashboard | `ghcr.io/saleor/saleor-dashboard:3.23.20@sha256:c1ce2f625316bf1e02dd8070335bf3bdbaeaa388e14b094d35dd5db2f9b60cf3` | Web service |
| Saleor API | [tech-progress/railway-template-saleor](https://github.com/tech-progress/railway-template-saleor) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Saleor PostgreSQL | saleor | - |
| `POSTGRES_USER` | Saleor PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Saleor PostgreSQL | (secret) | Generated password for the private Saleor database. |
| `DEBUG` | Saleor Worker | False | - |
| `EMAIL_URL` | Saleor Worker | - | Optional dj-email-url SMTP connection string shared with the API. |
| `SECRET_KEY` | Saleor Worker | (secret) | Must match the API Django signing secret. |
| `ADMIN_EMAIL` | Saleor Worker | - | Must match the API administrator email. |
| `ALLOWED_HOSTS` | Saleor Worker | * | - |
| `ADMIN_PASSWORD` | Saleor Worker | (secret) | Must match the API first-boot administrator password. |
| `PLAYGROUND_ENABLED` | Saleor Worker | True | - |
| `ALLOWED_CLIENT_HOSTS` | Saleor Worker | * | - |
| `AWS_QUERYSTRING_AUTH` | Saleor Worker | True | - |
| `SEND_USAGE_TELEMETRY` | Saleor Worker | False | - |
| `AWS_SECRET_ACCESS_KEY` | Saleor Worker | (secret) | - |
| `AWS_AUTO_CREATE_BUCKET` | Saleor Worker | false | - |
| `AWS_QUERYSTRING_EXPIRE` | Saleor Worker | 3600 | - |
| `HTTP_IP_FILTER_ENABLED` | Saleor Worker | True | - |
| `TELEMETRY_TRACER_CLASS` | Saleor Worker | saleor.webhook.circuit_breaker.tracer.NoopTelemetryTracer | - |
| `CELERY_WORKER_CONCURRENCY` | Saleor Worker | 2 | - |
| `CELERY_MAX_TASKS_PER_CHILD` | Saleor Worker | 1000 | - |
| `HTTP_IP_FILTER_ALLOW_LOOPBACK_IPS` | Saleor Worker | True | - |
| `PORT` | Saleor Dashboard | 80 | Internal HTTP port used by Railway health checks and routing. |
| `API_URL` | Saleor Dashboard | - | Public Saleor GraphQL endpoint injected into the Dashboard at startup. |
| `APP_MOUNT_URI` | Saleor Dashboard | / | - |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | Saleor Dashboard | 1 | - |
| `PORT` | Saleor API | 8000 | - |
| `DEBUG` | Saleor API | False | - |
| `EMAIL_URL` | Saleor API | - | Optional dj-email-url SMTP connection string for transactional email. |
| `SECRET_KEY` | Saleor API | (secret) | Generated Django signing secret shared with the worker. |
| `ADMIN_EMAIL` | Saleor API | admin@example.com | Email address for the administrator created on the first boot. |
| `ALLOWED_HOSTS` | Saleor API | * | - |
| `ADMIN_PASSWORD` | Saleor API | (secret) | Generated first-boot administrator password; changing it later does not rotate the account. |
| `WEB_CONCURRENCY` | Saleor API | 2 | - |
| `DEFAULT_FROM_EMAIL` | Saleor API | noreply@example.com | - |
| `PLAYGROUND_ENABLED` | Saleor API | True | - |
| `ALLOWED_CLIENT_HOSTS` | Saleor API | * | - |
| `AWS_QUERYSTRING_AUTH` | Saleor API | True | - |
| `SEND_USAGE_TELEMETRY` | Saleor API | False | - |
| `AWS_MEDIA_BUCKET_NAME` | Saleor API | - | Railway Bucket name used for durable Saleor media. |
| `AWS_SECRET_ACCESS_KEY` | Saleor API | (secret) | - |
| `AWS_AUTO_CREATE_BUCKET` | Saleor API | false | - |
| `AWS_QUERYSTRING_EXPIRE` | Saleor API | 3600 | - |
| `HTTP_IP_FILTER_ENABLED` | Saleor API | True | - |
| `TELEMETRY_TRACER_CLASS` | Saleor API | saleor.webhook.circuit_breaker.tracer.NoopTelemetryTracer | - |
| `CELERY_WORKER_CONCURRENCY` | Saleor API | 2 | - |
| `CELERY_MAX_TASKS_PER_CHILD` | Saleor API | 1000 | - |
| `AWS_MEDIA_PRIVATE_BUCKET_NAME` | Saleor API | - | Railway Bucket name used for protected Saleor files. |
| `HTTP_IP_FILTER_ALLOW_LOOPBACK_IPS` | Saleor API | True | - |

## Configuration

- **Start command:** `valkey-server --appendonly yes`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/template/start-worker.sh`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health/`

**Category:** Other · **Languages:** Shell, Python, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/saleor-commerce)
