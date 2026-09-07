# Deploy Posta on Railway

Self-hosted email delivery platform — send, receive, and track via API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/posta)

## About

Posta is a self-hosted email delivery platform that gives applications a REST API for sending, templating, and tracking email, with inbound parsing, SMTP relay, campaigns, and webhooks. This template deploys the pinned upstream image with a dedicated background worker, Railway-managed PostgreSQL 18, and Redis 8.

Posta runs as a single Go binary in two modes. The server serves the HTTP API on port 9000, the dashboard, and the health endpoint. The worker consumes Asynq queues from Redis to deliver email, retry failures, run campaigns, and deliver webhooks. Both modes are stateless: emails, templates, contacts, and logs live in PostgreSQL, queue state lives in Redis, and attachments and raw inbound messages stay in PostgreSQL by default or move to S3-compatible storage when blob settings are provided.

The Posta server service owns the public Railway HTTPS domain. The worker, PostgreSQL, and Redis are reachable only through Railway private networking. The first administrator is created automatically on an empty database from `POSTA_ADMIN_EMAIL` and the generated `POSTA_ADMIN_PASSWORD`; production mode refuses placeholder values, so sign in with the generated password shown in the server's variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Posta | `jkaninda/posta:0.14.0` | Web service |
| Redis | `redis:8.2` | Database |
| Worker | `jkaninda/posta:0.14.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Posta | 9000 | Port Railway routes the dashboard domain and healthcheck to. Posta listens on it. |
| `POSTA_ENV` | Posta | production | Posta runtime environment. Keep production. |
| `POSTA_DB_HOST` | Posta | - | PostgreSQL host on Railway private networking. Managed by the Postgres service. |
| `POSTA_DB_NAME` | Posta | - | PostgreSQL database name. Managed by the Postgres service. |
| `POSTA_DB_PORT` | Posta | - | PostgreSQL port. Managed by the Postgres service. |
| `POSTA_DB_USER` | Posta | (secret) | PostgreSQL user. Managed by the Postgres service. |
| `POSTA_WEB_URL` | Posta | - | Public dashboard URL used in emails and tracking links. |
| `POSTA_REDIS_URL` | Posta | - | Password-authenticated Redis URL for Asynq queues. Managed by the Redis service. |
| `POSTA_JWT_SECRET` | Posta | (secret) | Signs dashboard sessions and email links. Generated at deploy. |
| `POSTA_ADMIN_EMAIL` | Posta | admin@example.com | Initial platform administrator email. Seeded only on an empty database. |
| `POSTA_DB_PASSWORD` | Posta | (secret) | PostgreSQL password. Managed by the Postgres service. |
| `POSTA_DB_SSL_MODE` | Posta | disable | TLS mode for the database connection. Private networking is plaintext by design. |
| `POSTA_CORS_ORIGINS` | Posta | - | Browser origin allowed to call the API. Scoped to the dashboard domain. |
| `POSTA_ADMIN_PASSWORD` | Posta | (secret) | Initial administrator password, generated at deploy. Sign in with it, then change it in the dashboard. |
| `POSTA_ENCRYPTION_KEY` | Posta | - | AES-256-GCM key used to encrypt stored SMTP credentials at rest. |
| `REDISHOST` | Redis | - | Private hostname mirrored for clients. |
| `REDISPORT` | Redis | 6379 | Redis listen port. |
| `REDISUSER` | Redis | default | Redis ACL username (default). |
| `REDIS_URL` | Redis | - | Standard connection string over private networking. |
| `REDISPASSWORD` | Redis | (secret) | Password mirrored for clients. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password. Generated at deploy. |
| `POSTA_ENV` | Worker | production | Posta runtime environment. Keep production. |
| `POSTA_DB_HOST` | Worker | - | PostgreSQL host on Railway private networking. Managed by the Postgres service. |
| `POSTA_DB_NAME` | Worker | - | PostgreSQL database name. Managed by the Postgres service. |
| `POSTA_DB_PORT` | Worker | - | PostgreSQL port. Managed by the Postgres service. |
| `POSTA_DB_USER` | Worker | (secret) | PostgreSQL user. Managed by the Postgres service. |
| `POSTA_REDIS_URL` | Worker | - | Password-authenticated Redis URL for Asynq queues. Managed by the Redis service. |
| `POSTA_JWT_SECRET` | Worker | (secret) | Must match the Posta server value; the worker validates it since 0.14.0. Referenced from the Posta service. |
| `POSTA_DB_PASSWORD` | Worker | (secret) | PostgreSQL password. Managed by the Postgres service. |
| `POSTA_DB_SSL_MODE` | Worker | disable | TLS mode for the database connection. Private networking is plaintext by design. |
| `POSTA_ENCRYPTION_KEY` | Worker | - | Must match the Posta server value so workers can decrypt SMTP credentials. Referenced from the Posta service. |
| `POSTA_WORKER_CONCURRENCY` | Worker | 5 | Asynq jobs processed concurrently. Scale the service up for higher volume. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Standard connection string over private networking. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL superuser password. Generated at deploy. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/posta worker`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/posta)
