# Deploy Typebot on Railway

Self-hosted chatbot builder with a visual drag-and-drop editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-1)

## About

Typebot is an open-source, self-hosted chatbot and conversational form builder. It features a visual drag-and-drop editor for building chat flows, native integrations, and a hosted results dashboard — a fully self-hosted Typeform or Landbot alternative with no per-response fees.

Hosting Typebot requires running its builder and viewer Node.js services alongside PostgreSQL, MinIO (S3-compatible object storage for file uploads), and Redis (session and queue management). Postgres stores flows, submissions, and workspace data. MinIO handles file and image uploads within chat flows. The app reads its database connection, storage credentials, and auth secrets from environment variables at startup. Railway provisions and networks all services automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| builder | `baptistearno/typebot-builder:latest` | Web service |
| bucket-init | `minio/mc:RELEASE.2025-04-16T18-13-26Z` | Database |
| valkey | `valkey/valkey:latest` | Database |
| Console | `railwayapp-templates/minio-console` | Database |
| Bucket | `minio/minio:RELEASE.2025-04-22T22-12-26Z` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| viewer | `baptistearno/typebot-viewer:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | builder | 3000 |
| `SCOPE` | builder | builder |
| `S3_PORT` | builder | 443 |
| `HOSTNAME` | builder | 0.0.0.0 |
| `S3_BUCKET` | builder | typebot |
| `SMTP_PORT` | builder | 465 |
| `SMTP_SECURE` | builder | true |
| `S3_SECRET_KEY` | builder | (secret) |
| `SMTP_PASSWORD` | builder | (secret) |
| `SMTP_USERNAME` | builder | (secret) |
| `DISABLE_SIGNUP` | builder | false |
| `ENCRYPTION_SECRET` | builder | (secret) |
| `SMTP_AUTH_DISABLED` | builder | false |
| `DEFAULT_WORKSPACE_PLAN` | builder | UNLIMITED |
| `NEXT_PUBLIC_BOT_FILE_UPLOAD_MAX_SIZE` | builder | 10 |
| `MINIO_BUCKET` | bucket-init | typebot |
| `MINIO_ROOT_USER` | bucket-init | (secret) |
| `MINIO_ROOT_PASSWORD` | bucket-init | (secret) |
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
| `PORT` | viewer | 3000 |
| `SCOPE` | viewer | viewer |
| `S3_PORT` | viewer | 443 |
| `HOSTNAME` | viewer | 0.0.0.0 |
| `S3_BUCKET` | viewer | typebot |
| `S3_SECRET_KEY` | viewer | (secret) |
| `SMTP_PASSWORD` | viewer | (secret) |
| `SMTP_USERNAME` | viewer | (secret) |
| `ENCRYPTION_SECRET` | viewer | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "until mc alias set railway $MINIO_ENDPOINT $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD; do sleep 3; done; mc mb --ignore-existing railway/$MINIO_BUCKET; mc anonymous set public railway/$MINIO_BUCKET"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/typebot-1)
