# Deploy Twenty (Self-Hosted Salesforce Alternative) on Railway

Open-source CRM. Self-host a Salesforce alternative. [Updated Aug '26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-self-hosted-salesforce-alternativ)

## About

Twenty is an open-source CRM — a self-hosted Salesforce or HubSpot alternative that you fully own. Manage companies, people, opportunities and deals in a fast, keyboard-driven interface; build custom objects and fields; track activity with tasks, notes and a kanban pipeline; and automate work through its GraphQL and REST APIs, webhooks and workflows. This template deploys the complete Twenty stack — the application server, a background worker, PostgreSQL, Redis and an S3-compatible MinIO object store — each pinned to a verified upstream image and wired over Railway's private network so it comes up working on the first deploy.

Twenty runs as a NestJS server plus a separate worker that processes background jobs and scheduled crons, backed by three data services: PostgreSQL for all CRM records, Redis for the job queue and cache, and MinIO for uploaded files and attachments. Because Railway volumes cannot be shared across services, this template uses MinIO S3 storage so the server and worker read and write the same files. It configures every connection string, generates a unique APP_SECRET and ENCRYPTION_KEY on each deploy, points the public URL at your Railway domain, runs all database migrations automatically on first boot, and attaches persistent volumes to Postgres, Redis and MinIO. When the app loads you create the first user, who becomes the workspace owner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio | `minio/minio:RELEASE.2025-04-08T15-41-24Z` | Database |
| postgres | `postgres:16` | Database |
| redis | `redis:7-alpine` | Database |
| twenty | `twentycrm/twenty:v2.14.3` | Web service |
| twenty-worker | `twentycrm/twenty:v2.14.3` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO root access key used by Twenty as the S3 access key ID. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Auto-generated MinIO root secret used by Twenty as the S3 secret access key. |
| `POSTGRES_DB` | postgres | default | Database name. Must stay 'default' — Twenty targets /default in its connection URL. |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser role Twenty connects as. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated Postgres password (alphanumeric so it is URL-safe in the connection string). |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password (alphanumeric so it is URL-safe in the Redis URL). |
| `PORT` | twenty | 3000 | Port Railway routes the public domain to; must match NODE_PORT. |
| `NODE_PORT` | twenty | 3000 | Port the Twenty server listens on inside the container. |
| `REDIS_URL` | twenty | - | Redis connection string for the job queue and cache. |
| `APP_SECRET` | twenty | (secret) | Auto-generated secret used to sign tokens and sessions. |
| `SERVER_URL` | twenty | - | Public base URL of this Twenty instance, set to your Railway domain. |
| `STORAGE_TYPE` | twenty | s3 | Use S3-compatible object storage (MinIO) so the server and worker share uploaded files. |
| `ENCRYPTION_KEY` | twenty | - | Auto-generated key that encrypts sensitive fields at rest. Keep it stable across deploys. |
| `PG_DATABASE_URL` | twenty | - | PostgreSQL connection string over Railway's private network. |
| `STORAGE_S3_NAME` | twenty | twenty | S3 bucket name used for file storage. |
| `STORAGE_S3_REGION` | twenty | us-east-1 | S3 region label required by the client; any value works with MinIO. |
| `STORAGE_S3_ENDPOINT` | twenty | - | Private MinIO endpoint for object storage. |
| `DISABLE_DB_MIGRATIONS` | twenty | false | Server runs database migrations on boot. Leave false on the server. |
| `STORAGE_S3_ACCESS_KEY_ID` | twenty | minio | S3 access key, matching the MinIO root user. |
| `STORAGE_S3_SECRET_ACCESS_KEY` | twenty | (secret) | S3 secret key, referencing the MinIO root password. |
| `DISABLE_CRON_JOBS_REGISTRATION` | twenty | false | Server registers scheduled cron jobs. Leave false on the server. |
| `NODE_PORT` | twenty-worker | 3000 | Port label for the worker process (no public domain is exposed). |
| `REDIS_URL` | twenty-worker | - | Same Redis connection string as the server. |
| `APP_SECRET` | twenty-worker | (secret) | References the server's app secret so tokens validate across both. |
| `SERVER_URL` | twenty-worker | - | Public URL of the Twenty server, referenced so links in emails/jobs are correct. |
| `STORAGE_TYPE` | twenty-worker | s3 | Use the same S3 storage backend as the server. |
| `ENCRYPTION_KEY` | twenty-worker | - | References the server's encryption key so both decrypt the same data. |
| `PG_DATABASE_URL` | twenty-worker | - | Same PostgreSQL connection string as the server. |
| `STORAGE_S3_NAME` | twenty-worker | twenty | S3 bucket name, matching the server. |
| `STORAGE_S3_REGION` | twenty-worker | us-east-1 | S3 region label, matching the server. |
| `STORAGE_S3_ENDPOINT` | twenty-worker | - | Private MinIO endpoint, matching the server. |
| `DISABLE_DB_MIGRATIONS` | twenty-worker | true | Worker must NOT run migrations; only the server does. |
| `STORAGE_S3_ACCESS_KEY_ID` | twenty-worker | minio | S3 access key, matching the server. |
| `STORAGE_S3_SECRET_ACCESS_KEY` | twenty-worker | (secret) | S3 secret key, matching the server. |
| `DISABLE_CRON_JOBS_REGISTRATION` | twenty-worker | true | Worker processes jobs but does not register crons; the server does. |

## Configuration

- **Start command:** `sh -c 'mkdir -p /data/twenty && minio server --address ":9000" --console-address ":9001" /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --maxmemory-policy noeviction'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `yarn worker:prod`

**Category:** Other

[View on Railway →](https://railway.com/deploy/twenty-self-hosted-salesforce-alternativ)
