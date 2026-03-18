# Deploy GlitchTip on Railway

Official GlitchTip open source error tracking https://glitchtip.com/

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/glitchtip)

## About

GlitchTip is an open-source, Sentry-compatible error tracking and uptime monitoring platform. It offers a simple, affordable alternative to proprietary solutions, allowing you to collect error reports, monitor application performance, and track uptime using standard Sentry SDKs.

Hosting GlitchTip involves deploying a Python (Django) web application along with integrated background worker for processing event data. The architecture requires a PostgreSQL database to store issues, events, and user data, and a Redis instance to handle caching and the asynchronous task queue.

The application is container-native and configured entirely via environment variables, making it highly suitable for Railway. While GlitchTip is lightweight enough for small teams, it can be scaled horizontally by increasing the number of replicas to handle high-volume event ingestion.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| GlitchTip Web | `glitchtip/glitchtip:6` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | GlitchTip Web | 8000 | - |
| `EMAIL_URL` | GlitchTip Web | consolemail:// | SMTP connection string. Format: smtp://user:pass@host:port. Default outputs email to logs. |
| `SECRET_KEY` | GlitchTip Web | (secret) | - |
| `ENABLE_ADMIN` | GlitchTip Web | False | Set to True to enable Django Admin at /admin/. Requires a superuser account. |
| `ENABLE_OPENAPI` | GlitchTip Web | False | OpenAPI spec at /api/docs |
| `GRANIAN_WORKERS` | GlitchTip Web | 1 | Web server worker processes. Increase to 2–4 for more throughput. |
| `DEFAULT_FROM_EMAIL` | GlitchTip Web | - | Sender address for outgoing emails. Change to your actual email. |
| `VTASKS_CONCURRENCY` | GlitchTip Web | 20 | Concurrent async background tasks |
| `DEFAULT_FILE_STORAGE` | GlitchTip Web | storages.backends.s3boto3.S3Boto3Storage | - |
| `I_PAID_FOR_GLITCHTIP` | GlitchTip Web | paas | - |
| `AWS_SECRET_ACCESS_KEY` | GlitchTip Web | (secret) | - |
| `DATABASE_POOL_MAX_SIZE` | GlitchTip Web | 20 | Postgres connection pool size |
| `ENABLE_USER_REGISTRATION` | GlitchTip Web | False | Set to True to allow public signups. When False, only the first user can self-register; others must be invited. |
| `ENABLE_ORGANIZATION_CREATION` | GlitchTip Web | False | When False, only superusers can create new organizations. |
| `GLITCHTIP_MAX_EVENT_LIFE_DAYS` | GlitchTip Web | 90 | Events older than this (in days) are automatically deleted. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `bin/run-all-in-one.sh`
- **Healthcheck:** `/_health/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/glitchtip)
