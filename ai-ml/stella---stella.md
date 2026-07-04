# Deploy stella on Railway

Self-host stella with web, API, Postgres, Redis, and object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stella)

## About

stella is an open-source legal workspace for matters, documents, review tables,
research, chat, and local desktop document editing. This template deploys a
self-hosted stella stack with a web app, API, Postgres, Redis, private
Gotenberg document conversion, and S3-compatible file storage.

Hosting stella gives a legal team control over its own workspace and data while
keeping the application stack deployable as one Railway project. The web service
serves the TanStack Start SSR app, the API service handles authentication,
workspace data, document workflows, uploads, background jobs, and desktop
handoffs, and the supporting services provide database, queue, conversion, and
file-storage infrastructure.

The template uses Railway private networking for service-to-service traffic and
public HTTP domains only for the web and API services. Gotenberg is kept private
because it is an internal document conversion dependency.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| web | [stella/stella](https://github.com/stella/stella) | Web service |
| api | [stella/stella](https://github.com/stella/stella) | Web service |
| gotenberg | `gotenberg/gotenberg:8` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Configured by the Stella Railway template. |
| `REDISPORT` | Redis | 6379 | Configured by the Stella Railway template. |
| `REDISUSER` | Redis | default | Configured by the Stella Railway template. |
| `REDIS_URL` | Redis | - | Configured by the Stella Railway template. |
| `REDISPASSWORD` | Redis | (secret) | Configured by the Stella Railway template. |
| `REDIS_PASSWORD` | Redis | (secret) | Configured by the Stella Railway template. |
| `REDIS_PUBLIC_URL` | Redis | - | Configured by the Stella Railway template. |
| `PUBLIC_API_URL` | web | - | Configured by the Stella Railway template. |
| `PUBLIC_APP_URL` | web | - | Configured by the Stella Railway template. |
| `REDIS_URL` | api | - | Configured by the Stella Railway template. |
| `S3_BUCKET` | api | - | Configured by the Stella Railway template. |
| `S3_REGION` | api | - | Configured by the Stella Railway template. |
| `SMTP_HOST` | api | smtp.resend.com | Configured by the Stella Railway template. |
| `SMTP_PORT` | api | 587 | Configured by the Stella Railway template. |
| `PUBLIC_URL` | api | - | Configured by the Stella Railway template. |
| `S3_ENDPOINT` | api | - | Configured by the Stella Railway template. |
| `DATABASE_URL` | api | - | Configured by the Stella Railway template. |
| `FRONTEND_URL` | api | - | Configured by the Stella Railway template. |
| `GOTENBERG_URL` | api | - | Configured by the Stella Railway template. |
| `SMTP_PASSWORD` | api | (secret) | SMTP password or API key for sign-in and invitation emails. |
| `SMTP_USERNAME` | api | (secret) | Configured by the Stella Railway template. |
| `BETTER_AUTH_URL` | api | - | Configured by the Stella Railway template. |
| `S3_ACCESS_KEY_ID` | api | - | Configured by the Stella Railway template. |
| `BETTER_AUTH_SECRET` | api | (secret) | Configured by the Stella Railway template. |
| `GOTENBERG_PASSWORD` | api | (secret) | Configured by the Stella Railway template. |
| `GOTENBERG_USERNAME` | api | (secret) | Configured by the Stella Railway template. |
| `S3_SECRET_ACCESS_KEY` | api | (secret) | Configured by the Stella Railway template. |
| `CONTENT_ENCRYPTION_KEY` | api | - | Configured by the Stella Railway template. |
| `TRANSACTIONAL_EMAIL_FROM` | api | - | From address for transactional emails. |
| `API_ENABLE_BASIC_AUTH` | gotenberg | true | Configured by the Stella Railway template. |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | gotenberg | (secret) | Configured by the Stella Railway template. |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | gotenberg | (secret) | Configured by the Stella Railway template. |
| `POSTGRES_DB` | Postgres | railway | Configured by the Stella Railway template. |
| `DATABASE_URL` | Postgres | - | Configured by the Stella Railway template. |
| `POSTGRES_USER` | Postgres | (secret) | Configured by the Stella Railway template. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Configured by the Stella Railway template. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Configured by the Stella Railway template. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, HTML, Rust, CSS, Astro, Shell, Dockerfile, Python, PLpgSQL, YARA, JavaScript

[View on Railway →](https://railway.com/deploy/stella)
