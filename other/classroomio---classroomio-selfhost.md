# Deploy classroomio on Railway

Deploy and Host classroomio selfhost with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/classroomio-selfhost)

## About

ClassroomIO is an open-source learning management system (LMS) for building and teaching courses — lessons, quizzes, certificates, student management, and an AI tutor. The self-hosted edition runs the entire platform on your own infrastructure, so your data and branding stay fully under your control, with no per-seat pricing.

Hosting ClassroomIO means running three application services together: the **API** (backend, auth, business logic), the **Dashboard** (the web UI teachers and students use), and a **Jobs worker** that processes video, transcription, AI course generation, and email in the background. They depend on a **PostgreSQL** database and a **Redis** queue, plus S3-compatible object storage for media uploads and an SMTP provider for email. On Railway, Postgres and Redis are one-click plugins, and the three services build straight from the repository's Dockerfiles. Database schema setup runs automatically on the API's first boot — there's no manual migration step. Only the dashboard is exposed publicly; the API and worker stay on the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cio-minio | `minio/minio` | Database |
| db-studio | `ghcr.io/drizzle-team/gateway:1.3.0` | Worker |
| cio-dashboard | [classroomio/classroomio](https://github.com/classroomio/classroomio) | Worker |
| cio-jobs | [classroomio/classroomio](https://github.com/classroomio/classroomio) (root: /apps/jobs) | Worker |
| Redis | `redis:8.2.1` | Database |
| cio-api | [classroomio/classroomio](https://github.com/classroomio/classroomio) (root: /apps/api) | Worker |
| db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | cio-minio | (secret) | - |
| `MINIO_ROOT_PASSWORD` | cio-minio | (secret) | Optional, silences console redirect warnings behind the proxy: |
| `PORT` | db-studio | 4983 | - |
| `STORE_PATH` | db-studio | /app | - |
| `AUTH_BEARER_TOKEN` | cio-dashboard | (secret) | - |
| `PRIVATE_SERVER_KEY` | cio-dashboard | - | same value as cio-api |
| `PUBLIC_IS_SELFHOSTED` | cio-dashboard | true | - |
| `PRIVATE_APP_SUBDOMAINS` | cio-dashboard | app | Optional |
| `ALLOWED_EXTERNAL_DOMAINS` | cio-dashboard | https://*.yourdomain.com,https://fonts.googleapis.com | or per-directive: CSP_SCRIPT_SRC_DOMAINS, CSP_MEDIA_SRC_DOMAINS, … |
| `REDIS_URL` | cio-jobs | - | Object storage → cio-minio (same as cio-api) |
| `SMTP_USER` | cio-jobs | (secret) | - |
| `SMTP_PASSWORD` | cio-jobs | (secret) | - |
| `OPENAI_API_KEY` | cio-jobs | (secret) | transcription + AI course generation |
| `OBJECT_STORAGE_PUBLIC_ENDPOINT` | cio-jobs | https://storage.yourdomain.com | - |
| `OBJECT_STORAGE_FORCE_PATH_STYLE` | cio-jobs | true | - |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | cio-jobs | (secret) | - |
| `OBJECT_STORAGE_MEDIA_PUBLIC_BASE_URL` | cio-jobs | https://storage.yourdomain.com/media | Optional bucket overrides (defaults videos/documents/media): |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `SMTP_USER` | cio-api | (secret) | - |
| `SMTP_SENDER` | cio-api | - | Object storage → cio-minio |
| `SMTP_PASSWORD` | cio-api | (secret) | - |
| `OPENAI_API_KEY` | cio-api | (secret) | - |
| `DASHBOARD_ORIGIN` | cio-api | - | Auth secrets (from Step 2) |
| `UNSPLASH_API_KEY` | cio-api | (secret) | - |
| `AUTH_BEARER_TOKEN` | cio-api | (secret) | - |
| `PUBLIC_SERVER_URL` | cio-api | https://api.yourdomain.com | only if api is public |
| `BETTER_AUTH_SECRET` | cio-api | (secret) | - |
| `PRIVATE_SERVER_KEY` | cio-api | <openssl rand -hex 32> | identical in cio-dashboard |
| `GOOGLE_CLIENT_SECRET` | cio-api | (secret) | - |
| `PUBLIC_IS_SELFHOSTED` | cio-api | true | Reference the dashboard service's Railway domain (custom domain? hardcode https://app.yourdomain.com) |
| `OBJECT_STORAGE_PUBLIC_ENDPOINT` | cio-api | https://storage.yourdomain.com | - |
| `OBJECT_STORAGE_FORCE_PATH_STYLE` | cio-api | true | - |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | cio-api | (secret) | - |
| `OBJECT_STORAGE_MEDIA_PUBLIC_BASE_URL` | cio-api | https://storage.yourdomain.com/media | Optional |
| `POSTGRES_DB` | db | railway | Default database created when image is started. |
| `DATABASE_URL` | db | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | db | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | db | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | db | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Svelte, HTML, MDX, CSS, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/classroomio-selfhost)
