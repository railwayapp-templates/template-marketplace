# Deploy Twenty CRM | Open Source Salesforce Alternative on Railway

Self Host Twenty CRM. Manage Your Customer Relationships. Own Your Data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-open-source-crm)

## About

Twenty is a modern, open-source CRM built as a community-powered alternative to Salesforce — giving developers full control over their customer data with a customizable data model, GraphQL/REST API, pipeline management, email sync, and workflow automation. It's Y Combinator-backed, TypeScript-native, and actively maintained by 300+ contributors on [github.com/twentyhq/twenty](https://github.com/twentyhq/twenty).

Self-host Twenty on Railway with one click. It pre-wires five services: **PostgreSQL** (primary database), **Redis** (BullMQ job queue and cache), **MinIO** (S3-compatible file storage — no AWS account needed), **twenty-server** (API + React frontend on port 3000), and **twenty-worker** (background jobs). Private networking between services is configured out of the box — no manual connection strings or Docker networking to figure out.

![Twenty CRM Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1775205081/Railwaay_architecture_twenty_crm_kizqoy.png)

Twenty is a full CRM platform: contacts, companies, deal pipelines, tasks, notes, email/calendar sync, role-based permissions, and workflow automation with webhooks. Its key differentiator is a **flexible metadata layer** — you can create custom objects and fields at runtime, making it adaptable to any sales or ops workflow without code changes.

**Key features:**
- Custom objects and fields — extend the data model from the UI
- Kanban, table, and filter views across all objects
- GraphQL and REST APIs for every object
- Workflow automation with triggers and webhooks
- Email and calendar sync (Gmail/IMAP)
- Role-based permissions with custom roles
- Dark mode, keyboard shortcuts, command palette

**Architecture:** `twenty-server` handles the NestJS API and React frontend. `twenty-worker` processes background jobs (email sync, calendar, workflow triggers) via BullMQ over Redis. All file uploads (avatars, attachments) are written to MinIO over private networking using the S3 protocol — `forcePathStyle` is hardcoded in Twenty's S3 driver, so MinIO works without extra config.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Twenty Server | `twentycrm/twenty:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| MinIO | `minio/minio` | Database |
| Twenty Worker | `twentycrm/twenty:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis internal hostname |
| `REDISPORT` | Redis | 6379 | Redis service port |
| `REDISUSER` | Redis | default | Redis default username |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password reference |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `NODE_PORT` | Twenty Server | 3000 | Node server listening port |
| `REDIS_URL` | Twenty Server | - | Redis connection string |
| `APP_SECRET` | Twenty Server | (secret) | Application secret key for auth |
| `SERVER_URL` | Twenty Server | - | Public server base URL |
| `STORAGE_TYPE` | Twenty Server | S_3 | Storage backend type selection |
| `PG_DATABASE_URL` | Twenty Server | - | Postgres connection string |
| `STORAGE_S3_NAME` | Twenty Server | twenty | S3 bucket name for storage |
| `STORAGE_S3_REGION` | Twenty Server | us-east-1 | S3 region for bucket |
| `STORAGE_S3_ENDPOINT` | Twenty Server | - | S3 endpoint for storage service |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Server | - | S3 access key identifier |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Server | (secret) | S3 secret access key |
| `IS_CONFIG_VARIABLES_IN_DB_ENABLED` | Twenty Server | false | Store config variables in database |
| `POSTGRES_DB` | Postgres | railway | Initial database name created |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres user password credential |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection URL |
| `MINIO_ROOT_USER` | MinIO | (secret) | Root username for MinIO access |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Root password for MinIO access |
| `REDIS_URL` | Twenty Worker | - | Redis connection string |
| `APP_SECRET` | Twenty Worker | (secret) | Shared application secret key |
| `SERVER_URL` | Twenty Worker | - | Server URL reference for worker |
| `STORAGE_TYPE` | Twenty Worker | S_3 | Storage backend type selection |
| `PG_DATABASE_URL` | Twenty Worker | - | Postgres connection string |
| `STORAGE_S3_NAME` | Twenty Worker | twenty | S3 bucket name for storage |
| `STORAGE_S3_REGION` | Twenty Worker | us-east-1 | S3 region for bucket |
| `STORAGE_S3_ENDPOINT` | Twenty Worker | - | S3 endpoint for storage service |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | Disable database migrations on startup |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Worker | - | S3 access key identifier |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | S3 secret access key |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | Disable cron jobs in worker |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'mkdir -p /data/twenty && minio server --address ":9000" --console-address ":9001" /data'`
- **Start command:** `yarn worker:prod`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/twenty-open-source-crm)
