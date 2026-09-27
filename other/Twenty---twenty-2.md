# Deploy Twenty on Railway

Twenty CRM with worker, Postgres and file storage, admin set at deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-2)

## About

[Twenty](https://github.com/twentyhq/twenty) is an open-source CRM: companies, people, opportunities, notes and tasks, custom objects and fields, email and calendar sync, workflows, and a GraphQL and REST API.

This template runs the official image (v2.42.6) the way upstream's Docker Compose file does, as a server and a background worker, with Postgres, Redis and a private Railway Bucket for files.

On a fresh Twenty, the first person who signs up creates the workspace and becomes the server admin. On a public URL that can be anyone. This template does it for you: the deploy form asks for your email, a password is generated into `TWENTY_ADMIN_PASSWORD`, and a start step creates your account and the workspace as soon as the server answers. After that, signing up needs an invitation. Open `TWENTY_URL` and sign in with that email and password.

Upstream's compose file has the server and the worker share a disk for uploaded files. Railway can't share a volume between two services, so files go to a Railway Bucket instead. Twenty streams files through its own server, so the bucket stays private.

Twenty is heavy for a 1 GB service. With Node's default heap limit, the server ran out of memory while starting, so `NODE_OPTIONS` raises the limit to 640 MB. My first start step was a small Node script; it cost about 100 MB, so it's now a shell script using the image's own curl and jq. The worker runs `node` directly instead of through yarn, which saved another 0.3 GB.

Before publishing I tested the final version on a fresh deploy. The start step reported the account and workspace as created, and a sign-up from another address was refused with "New workspace setup is disabled". The admin signed in as server admin with the workspace active, created a company and a person in it, and uploaded a file that read back byte for byte from the bucket. After a restart the start step left everything alone, and the company, the person and the file were still there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Twenty | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /twenty) | Web service |
| Twenty Worker | `twentycrm/twenty:v2.42.6` | Worker |
| Redis | `redis:7.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | twenty | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | Twenty | 3000 | Port Railway routes to |
| `NODE_PORT` | Twenty | 3000 | Twenty's port |
| `REDIS_URL` | Twenty | - | Redis over the private network (family=0 lets the client use IPv6) |
| `APP_SECRET` | Twenty | (secret) | Signs sessions and tokens (generated). Keep it |
| `SERVER_URL` | Twenty | - | Public URL of Twenty. Change it when you add a custom domain |
| `TWENTY_URL` | Twenty | - | Open this and sign in with TWENTY_ADMIN_EMAIL and TWENTY_ADMIN_PASSWORD |
| `NODE_OPTIONS` | Twenty | --max-old-space-size=640 | Node heap limit. Twenty needs more than Node's default on a 1 GB service; raise it on bigger plans |
| `STORAGE_TYPE` | Twenty | s3 | Files go to the Railway Bucket |
| `ENCRYPTION_KEY` | Twenty | - | Encrypts stored secrets such as OAuth tokens (generated). Keep it; changing it needs Twenty's key rotation |
| `TWENTY_VERSION` | Twenty | v2.42.6 | Image tag the server is built from. To upgrade, change it here and in the worker's image |
| `PG_DATABASE_URL` | Twenty | - | Postgres over the private network |
| `STORAGE_S3_NAME` | Twenty | - | Bucket name |
| `STORAGE_S3_REGION` | Twenty | - | Bucket region |
| `TELEMETRY_ENABLED` | Twenty | false | Usage telemetry to Twenty off |
| `TWENTY_ADMIN_EMAIL` | Twenty | - | Email of the admin account, created with the workspace on first start. Sign in with it and TWENTY_ADMIN_PASSWORD |
| `STORAGE_S3_ENDPOINT` | Twenty | - | Bucket endpoint |
| `TWENTY_ADMIN_PASSWORD` | Twenty | (secret) | Password of the admin account (generated) |
| `TWENTY_WORKSPACE_NAME` | Twenty | My Workspace | Name of the workspace created on first start; you can rename it in the settings |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty | - | Bucket access key |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) | Bucket secret key |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty | true | Lets the Alpine-based image resolve Railway private domains |
| `REDIS_URL` | Twenty Worker | - | Redis over the private network (family=0 lets the client use IPv6) |
| `APP_SECRET` | Twenty Worker | (secret) | Signs sessions and tokens (generated). Keep it |
| `SERVER_URL` | Twenty Worker | - | Public URL of Twenty. Change it when you add a custom domain |
| `NODE_OPTIONS` | Twenty Worker | --max-old-space-size=640 | Node heap limit. Twenty needs more than Node's default on a 1 GB service; raise it on bigger plans |
| `STORAGE_TYPE` | Twenty Worker | s3 | Files go to the Railway Bucket |
| `ENCRYPTION_KEY` | Twenty Worker | - | Encrypts stored secrets such as OAuth tokens (generated). Keep it; changing it needs Twenty's key rotation |
| `PG_DATABASE_URL` | Twenty Worker | - | Postgres over the private network |
| `STORAGE_S3_NAME` | Twenty Worker | - | Bucket name |
| `STORAGE_S3_REGION` | Twenty Worker | - | Bucket region |
| `TELEMETRY_ENABLED` | Twenty Worker | false | Usage telemetry to Twenty off |
| `STORAGE_S3_ENDPOINT` | Twenty Worker | - | Bucket endpoint |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | The server runs the migrations |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Worker | - | Bucket access key |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | Bucket secret key |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | The server registers the background jobs |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty Worker | true | Lets the Alpine-based image resolve Railway private domains |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (generated) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `node dist/queue-worker/queue-worker`
- **Start command:** `/bin/sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --maxmemory-policy noeviction --appendonly yes --dir /data'`
- **Volume:** `/data`

**Category:** Other · **Tags:** twenty, crm, salesforce-alternative, sales, postgres, open-source · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/twenty-2)
