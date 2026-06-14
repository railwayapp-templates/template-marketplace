# Deploy GritCMS on Railway

GritCMS — The Open-Source Creator Operating System

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gritcms)

## About

GritCMS is a free, open-source Creator Operating System built for course creators, coaches, and digital product sellers. It combines the tools you'd normally pay $700–1,500/month for courses, email, pages, funnels, and digital products into a single self-hosted platform.

GritCMS is a monorepo consisting of three services: a high-performance Go API backend, a Next.js admin dashboard, and a Next.js public-facing website. It requires PostgreSQL for data storage and Redis for caching. Media uploads are handled via Railway's built-in S3-compatible Storage Buckets, with public file serving provided by the S3 Public Presigner service. Outbound email is handled via Resend. All five services run together in a single Railway project with automatic private networking between them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GritCMS Web | [MUKE-coder/gritcms](https://github.com/MUKE-coder/gritcms) | Web service |
| GritCMS Admin | [MUKE-coder/gritcms](https://github.com/MUKE-coder/gritcms) | Web service |
| Redis | `redis:8.2.1` | Database |
| GritCMS Files | [timomeh/s3-public-presigner](https://github.com/timomeh/s3-public-presigner) | Worker |
| GritCMS API | [MUKE-coder/gritcms](https://github.com/MUKE-coder/gritcms) (root: apps/api) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | GritCMS Web | 3000 | Port the Web Next.js server listens on. Do not change this. |
| `NEXT_PUBLIC_API_URL` | GritCMS Web | - | URL of the GritCMS API service. Auto-populated from the API service. Required at build time. |
| `PORT` | GritCMS Admin | 3001 | Port the Admin Next.js server listens on. Do not change this. |
| `NEXT_PUBLIC_API_URL` | GritCMS Admin | - | URL of the GritCMS API service. Auto-populated from the API service. Required at build time. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `S3_BUCKET` | GritCMS Files | - | Railway Bucket name. Auto-populated from the Bucket service. |
| `S3_REGION` | GritCMS Files | - | Railway Bucket region. Auto-populated from the Bucket service. |
| `S3_ENDPOINT` | GritCMS Files | - | Railway Bucket endpoint. Auto-populated from the Bucket service. |
| `S3_ACCESS_KEY_ID` | GritCMS Files | - | Railway Bucket access key. Auto-populated from the Bucket service. |
| `USE_NICE_NOT_FOUND` | GritCMS Files | 1 | Returns a clean "File not found" error instead of a raw S3 XML error when a file doesn't exist. |
| `S3_SECRET_ACCESS_KEY` | GritCMS Files | (secret) | Railway Bucket secret key. Auto-populated from the Bucket service. |
| `PRESIGNED_URL_EXPIRATION_SECONDS` | GritCMS Files | 3600 | How long the presigned redirect URL stays valid. Default is 1 hour. Increase if users share direct file links. |
| `PORT` | GritCMS API | 8080 | Port the Go API server listens on. Do not change this. |
| `APP_ENV` | GritCMS API | production | Application environment. Set to production for all Railway deployments. |
| `APP_URL` | GritCMS API | - | The public URL of this API service. Auto-populated by Railway. |
| `AI_MODEL` | GritCMS API | claude-sonnet-4-5-20250929 | The specific AI model to use. Optional — only required if AI_PROVIDER is set. |
| `MAIL_FROM` | GritCMS API | - | The sender email address for all outgoing emails. Must be a domain verified in your Resend account. |
| `R2_BUCKET` | GritCMS API | - | Railway Bucket name. Auto-populated from the Bucket service. |
| `R2_REGION` | GritCMS API | - | Railway Bucket region. Auto-populated from the Bucket service — will be auto. |
| `REDIS_URL` | GritCMS API | - | Redis connection string. Auto-populated from the Redis service. |
| `AI_API_KEY` | GritCMS API | (secret) | API key for your chosen AI provider. For Claude use an Anthropic key, for OpenAI use an sk- key. Optional. |
| `JWT_SECRET` | GritCMS API | (secret) | Secret key used to sign authentication tokens. Auto-generated on deploy — never share this value. |
| `AI_PROVIDER` | GritCMS API | claude | AI provider for content generation features. Options: claude, openai, gemini. Optional — leave blank to disable AI features. |
| `R2_ENDPOINT` | GritCMS API | - | Public URL of the presigner service. All media files are served publicly through this. Auto-populated from the GritCMS Files service. |
| `CORS_ORIGINS` | GritCMS API | - | Required. Comma-separated list of your Web and Admin service public URLs. Set with a generic URL for inital deployment, then change after. Example: https://web.up.railway.app,https://admin.up.railway.app. Without setting this and redpolying the API service logins will fail. Note: No trailing slashes in the URLs. |
| `DATABASE_URL` | GritCMS API | - | PostgreSQL connection string. Auto-populated from the Postgres service. |
| `PULSE_ENABLED` | GritCMS API | false | Enable the Pulse performance monitoring dashboard at /pulse. Set to true once your site is live. |
| `R2_ACCESS_KEY` | GritCMS API | - | Railway Bucket access key used to upload files. Auto-populated from the Bucket service. |
| `R2_SECRET_KEY` | GritCMS API | (secret) | Railway Bucket secret key used to upload files. Auto-populated from the Bucket service. |
| `PULSE_PASSWORD` | GritCMS API | (secret) | Password to access the Pulse dashboard. Only required if PULSE_ENABLED is true. |
| `PULSE_USERNAME` | GritCMS API | (secret) | Username to access the Pulse dashboard. Only required if PULSE_ENABLED is true. |
| `RESEND_API_KEY` | GritCMS API | (secret) | API key for sending emails via Resend. Get yours at resend.com — free tier supports 3,000 emails/month. |
| `STORAGE_DRIVER` | GritCMS API | r2 | Storage provider. Railway Buckets are S3/R2-compatible. Do not change this. |
| `SENTINEL_ENABLED` | GritCMS API | false | Enable the Sentinel WAF and rate-limiting dashboard at /sentinel. Set to true once your site is live. |
| `SENTINEL_PASSWORD` | GritCMS API | (secret) | Password to access the Sentinel dashboard. Only required if SENTINEL_ENABLED is true. |
| `SENTINEL_USERNAME` | GritCMS API | (secret) | Username to access the Sentinel dashboard. Only required if SENTINEL_ENABLED is true. |
| `GORM_STUDIO_ENABLED` | GritCMS API | false | Enable the GORM Studio database browser at /studio. Disable in production unless actively needed. |
| `NEXT_PUBLIC_API_URL` | GritCMS API | - | Public API URL used by the Next.js frontends at build time. Auto-populated by Railway. |
| `SENTINEL_SECRET_KEY` | GritCMS API | (secret) | Secret key used internally by Sentinel. Auto-generated on deploy. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Go, CSS, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/gritcms)
