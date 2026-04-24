# Deploy Formbricks Experience Management | Open Source Typeform Alternative on Railway

Self Host Formbricks. In-app surveys, NPS, CSAT, and feedback collection

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks-survey-platform)

## About

Deploy Formbricks on Railway to self-host a privacy-first survey and experience management platform. Formbricks is an open-source alternative to Typeform, SurveyMonkey, and Qualtrics that gives you full control over your survey data with unlimited responses.

This Railway template pre-configures Formbricks with PostgreSQL (pgvector-enabled) for data storage and Redis for caching and rate limiting, giving you a production-ready survey platform in minutes.

Formbricks is an open-source experience management suite built on Next.js, designed for product teams that need granular control over user feedback collection. It handles the full survey lifecycle — creation, targeting, distribution, and analytics — in a single self-hosted platform.

- **In-app surveys** with precise user targeting based on attributes, events, and segments
- **Website surveys** embeddable via a lightweight JavaScript snippet
- **Link surveys** with custom branding and shareable URLs
- **20+ question types** including NPS, CES, CSAT, matrix, ranking, and file upload
- **Skip logic and conditional branching** for dynamic survey flows
- **Built-in analytics** with response summaries, charts, and CSV/JSON export
- **Webhooks and integrations** with Slack, Notion, Google Sheets, Airtable, and Zapier
- **Multi-language support** for international survey distribution

The template deploys three services: Formbricks (Next.js app), PostgreSQL with pgvector for vector-enabled data storage, and Redis for caching and rate limiting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | Web service |
| Redis | `redis:8.2.1` | Database |
| MinIO | `minio/minio:latest` | Database |
| Formbricks | `ghcr.io/formbricks/formbricks:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pgvector | formbricks | Name of the database created on startup. |
| `DATABASE_URL` | pgvector | - | Full public connection string for Postgres. |
| `POSTGRES_USER` | pgvector | (secret) | Postgres superuser name. |
| `PGHOST_PRIVATE` | pgvector | - | Private internal domain for Postgres in Railway. |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private internal port for Postgres. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password for the Postgres superuser. |
| `DATABASE_URL_PRIVATE` | pgvector | - | Full private connection string for internal services. |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `PORT` | MinIO | 9000 | S3 API port |
| `MINIO_SCHEME` | MinIO | https | Protocol scheme |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO admin username |
| `MINIO_SERVER_URL` | MinIO | - | Public URL for presigned URLs |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO admin password |
| `MINIO_BROWSER_REDIRECT_URL` | MinIO | - | Console redirect URL |
| `PORT` | Formbricks | 3000 | HTTP server port |
| `MAIL_FROM` | Formbricks | - | Sender email address |
| `REDIS_URL` | Formbricks | - | Redis connection string |
| `S3_REGION` | Formbricks | us-east-1 | S3 region (MinIO default) |
| `SMTP_HOST` | Formbricks | - | SMTP provider host |
| `SMTP_PORT` | Formbricks | - | SMTP port (587 or 465) |
| `SMTP_USER` | Formbricks | (secret) | SMTP auth username |
| `WEBAPP_URL` | Formbricks | - | Public-facing app URL |
| `CRON_SECRET` | Formbricks | (secret) | Cron job API secret |
| `DATABASE_URL` | Formbricks | - | PostgreSQL connection string |
| `NEXTAUTH_URL` | Formbricks | - | NextAuth callback URL |
| `S3_ACCESS_KEY` | Formbricks | - | MinIO access key reference |
| `S3_SECRET_KEY` | Formbricks | (secret) | MinIO secret key reference |
| `SMTP_PASSWORD` | Formbricks | (secret) | SMTP auth password |
| `ENCRYPTION_KEY` | Formbricks | - | 2FA and link survey encryption |
| `MAIL_FROM_NAME` | Formbricks | Formbricks | Sender display name |
| `S3_BUCKET_NAME` | Formbricks | formbricks | Upload bucket name |
| `NEXTAUTH_SECRET` | Formbricks | (secret) | Session signing key |
| `S3_ENDPOINT_URL` | Formbricks | - | MinIO public endpoint |
| `SMTP_AUTHENTICATED` | Formbricks | 1 | Require SMTP auth |
| `S3_FORCE_PATH_STYLE` | Formbricks | 1 | Required for MinIO |
| `SMTP_SECURE_ENABLED` | Formbricks | 0 | Enable TLS (1 for port 465) |
| `PASSWORD_RESET_DISABLED` | Formbricks | (secret) | Disable password reset |
| `EMAIL_VERIFICATION_DISABLED` | Formbricks | 1 | Disable email verification |
| `SMTP_REJECT_UNAUTHORIZED_TLS` | Formbricks | 1 | Validate TLS certificates |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** ` /bin/sh -c 'minio server /bitnami/minio/data --console-address :9001 & MINIO_PID=$!; sleep 8; mc alias set local http://localhost:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" && mc mb --ignore-existing local/formbricks && mc anonymous set download local/formbricks; wait $MINIO_PID'`
- **Volume:** `/bitnami/minio/data`
- **Healthcheck:** `/health`
- **Volume:** `/home/nextjs/apps/web/uploads`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/formbricks-survey-platform)
