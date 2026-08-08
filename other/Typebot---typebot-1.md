# Deploy Typebot on Railway

Self-hosted chatbot builder with a visual drag-and-drop editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-1)

## About

Typebot is an open-source, self-hosted chatbot and conversational form builder. It features a visual drag-and-drop editor for building chat flows, native integrations, and a hosted results dashboard — a fully self-hosted Typeform or Landbot alternative with no per-response fees.

Hosting Typebot requires running its builder and viewer Node.js services alongside PostgreSQL, MinIO (S3-compatible object storage for file uploads), and Redis (session and queue management). Postgres stores flows, submissions, and workspace data. MinIO handles file and image uploads within chat flows. The app reads its database connection, storage credentials, and auth secrets from environment variables at startup. Railway provisions and networks all services automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| builder | [Amritasha/typebot-railway](https://github.com/Amritasha/typebot-railway) (root: /builder) | Web service |
| viewer | [Amritasha/typebot-railway](https://github.com/Amritasha/typebot-railway) (root: /viewer) | Web service |
| valkey | `valkey/valkey:latest` | Database |
| Console | `railwayapp-templates/minio-console` | Database |
| Bucket | `minio/mc:RELEASE.2025-04-16T18-13-26Z` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `HOSTNAME` | builder | 0.0.0.0 |
| `NEXTAUTH_SECRET` | builder | (secret) |
| `ENCRYPTION_SECRET` | builder | (secret) |
| `NEXTAUTH_SECRET` | viewer | (secret) |
| `ENCRYPTION_SECRET` | viewer | (secret) |
| `PORT` | Console | 9001 |
| `PASSWORD` | Console | (secret) |
| `USERNAME` | Console | (secret) |
| `MINIO_ROOT_USER` | Bucket | (secret) |
| `MINIO_PUBLIC_PORT` | Bucket | 443 |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/typebot-1)
