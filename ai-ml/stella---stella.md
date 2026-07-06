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
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| api | [stella/stella](https://github.com/stella/stella) | Web service |
| Redis | `redis:8.2.1` | Database |
| gotenberg | `gotenberg/gotenberg:8` | Worker |
| web | [stella/stella](https://github.com/stella/stella) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `BETTER_AUTH_SECRET` | api | (secret) | - |
| `GOTENBERG_PASSWORD` | api | (secret) | - |
| `GOTENBERG_USERNAME` | api | (secret) | - |
| `S3_SECRET_ACCESS_KEY` | api | (secret) | - |
| `SELFHOST_BOOTSTRAP_TOKEN` | api | (secret) | - |
| `SELFHOST_LOCAL_PASSWORD_AUTH` | api | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `API_ENABLE_BASIC_AUTH` | gotenberg | true | Require basic auth on the internal Gotenberg API. |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | gotenberg | (secret) | - |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | gotenberg | (secret) | Generated basic auth user for the internal Gotenberg API. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, HTML, Rust, Astro, Shell, CSS, Dockerfile, PLpgSQL, YARA, JavaScript

[View on Railway →](https://railway.com/deploy/stella)
