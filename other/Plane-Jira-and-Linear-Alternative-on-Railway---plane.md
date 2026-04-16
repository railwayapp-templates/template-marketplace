# Deploy Plane | Jira and Linear Alternative on Railway on Railway

Self Host Plane. AI-native project management with issues, sprints & triage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane)

## About

Deploy Plane on Railway to get a fully self-hosted, open-source project management platform running in minutes. Self-host Plane as an alternative to Jira, Linear, Monday, or ClickUp — with full control over your data and zero per-seat licensing costs.

This Railway template deploys the Plane All-In-One (AIO) container alongside PostgreSQL for data storage, Redis for caching, RabbitMQ for background job queues, and MinIO for S3-compatible file storage. Everything is pre-wired so the stack starts working immediately.

![Plane Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776266349/plane-arch_pskdwk.png)

Plane is an AI-native project management platform with 47,800+ GitHub stars, licensed under AGPL v3.0. It combines three products in one workspace: Projects, Wiki, and AI.

- **Work Items** — track tasks, bugs, features, and stories with rich text, file uploads, and sub-items
- **Cycles** — time-boxed sprints with burn-down charts for sustainable progress tracking
- **Modules** — group related work items across projects for complex initiatives
- **Pages** — built-in wiki and documentation with AI assistance
- **Views** — five layout options (List, Board, Spreadsheet, Gantt, Calendar) with saved filters
- **Intake** — triage incoming requests before they become tracked work items
- **Integrations** — GitHub, GitLab, Slack, Sentry; import from Jira, Linear, Asana, ClickUp, Monday

The AIO architecture bundles all Plane services (web frontend, API, worker, beat scheduler, live server, space, admin, and Caddy proxy) into a single container managed by supervisord.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Plane | `makeplane/plane-aio-community:stable` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| RabbitMQ | `rabbitmq:3.13.6-management-alpine` | Database |
| MinIO | `minio/minio:latest` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Plane | 80 | HTTP server listening port |
| `WEB_URL` | Plane | - | Public web application URL |
| `AMQP_URL` | Plane | - | RabbitMQ connection string for queues |
| `REDIS_URL` | Plane | - | Redis connection string |
| `USE_MINIO` | Plane | 1 | Enable MinIO as storage backend |
| `AWS_REGION` | Plane | us-east-1 | S3 region for storage |
| `SECRET_KEY` | Plane | (secret) | Application secret key for security |
| `BUCKET_NAME` | Plane | uploads | Storage bucket name reference |
| `DOMAIN_NAME` | Plane | - | Public domain name for instance |
| `APP_PROTOCOL` | Plane | https | Application protocol scheme |
| `DATABASE_URL` | Plane | - | Postgres connection string |
| `NODE_OPTIONS` | Plane | --max-old-space-size=512 | Node memory allocation settings |
| `FILE_SIZE_LIMIT` | Plane | 5242880 | Maximum upload file size bytes |
| `GUNICORN_WORKERS` | Plane | 1 | Number of Gunicorn worker processes |
| `AWS_ACCESS_KEY_ID` | Plane | - | S3 access key identifier |
| `API_KEY_RATE_LIMIT` | Plane | (secret) | API key rate limiting rule |
| `AWS_S3_BUCKET_NAME` | Plane | uploads | S3 bucket name for uploads |
| `AWS_S3_ENDPOINT_URL` | Plane | - | S3 endpoint for MinIO service |
| `CORS_ALLOWED_ORIGINS` | Plane | - | Allowed CORS origins for requests |
| `AWS_SECRET_ACCESS_KEY` | Plane | (secret) | S3 secret access key |
| `LIVE_SERVER_SECRET_KEY` | Plane | (secret) | Secret key for live server auth |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Default user password credential |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Default username for authentication |
| `RABBITMQ_DEFAULT_VHOST` | RabbitMQ | plane | Default virtual host namespace |
| `MINIO_ROOT_USER` | MinIO | (secret) | Root username for MinIO access |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Root password for MinIO access |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `minio server /data --console-address :9001`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/plane)
