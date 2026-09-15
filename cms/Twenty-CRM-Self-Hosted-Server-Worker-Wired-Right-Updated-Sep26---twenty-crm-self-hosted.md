# Deploy Twenty CRM — Self-Hosted, Server + Worker Wired Right [Updated Sep'26] on Railway

Self-host Twenty CRM — Salesforce alternative, no per-seat fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-self-hosted)

## About

Twenty is a modern open-source CRM — a self-hosted Salesforce alternative for managing companies, contacts, opportunities, and custom objects, with a clean Notion-like interface, Kanban pipelines, and a full REST and GraphQL API. This template deploys it the way Twenty is built to run: the server and background worker wired together over Redis with a shared secret, the public URL set to avoid the login-loop trap, and Postgres and file storage configured — so you get a working CRM, not a half-deployed one that can't log in or run workflows.

---

Twenty is a two-process application, and getting that architecture right is the difference between a CRM that works and one that half-loads — this template handles it.

**Server and worker are one image doing two jobs — with one shared secret.** Twenty runs the same image as a server (the API, React frontend, and migrations) and a separate worker (email sync, workflow runs, and cron via BullMQ). The worker isn't optional: without it, background jobs, email, and automations silently never run. Both must share an identical `APP_SECRET`/`ENCRYPTION_KEY` — it encrypts secrets at rest and signs sessions, so a mismatch breaks logins and data. This template generates one secret and wires it to both.

**`SERVER_URL` must match your domain — or login loops forever.** This is the most common Twenty failure: if `SERVER_URL` (and the frontend base URL) don't exactly match the HTTPS domain you access Twenty on, the login page redirects in an infinite loop. This template sets it to your Railway public domain, so authentication works on the first try instead of trapping you at the sign-in screen.

**Redis is required — the worker won't run without it.** Twenty's background queue runs on Redis (BullMQ), so a missing `REDIS_URL` makes the worker exit immediately and email sync, workflows, and scheduled jobs never fire. This template wires Redis over the private network, so the queue works out of the box.

**File storage — local volume or S3.** Avatars and attachments need somewhere to live: this template configures storage (a persistent volume with `STORAGE_TYPE=local`, or S3-compatible object storage via `STORAGE_TYPE=s3` and the `STORAGE_S3_*` variables — MinIO or a Railway Bucket work without extra config). Either way, uploads survive redeploys. There's no env-var admin: open your Railway domain and Twenty presents a Get Started wizard to create the workspace admin; members join by invite. Logs are set to `error,warn`, since Twenty's default verbosity floods a platform's log rate limit on a quiet instance.

Typical cost: **~$10–20/month** on Railway for the four services — server and worker use ~0.5 GB RAM each at idle, so a small team fits a modest plan; scale up past 10 active users. Twenty is AGPL-3.0 and free, with no user, record, or feature caps — versus Twenty's own cloud at $9+/user/month and Salesforce's per-seat pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Twenty | `twentycrm/twenty:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Twenty Worker | `twentycrm/twenty:latest` | Worker |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Twenty | - | PORT |
| `NODE_PORT` | Twenty | 3000 | NODE_PORT |
| `REDIS_URL` | Twenty | - | REDIS_URL |
| `APP_SECRET` | Twenty | (secret) | APP_SECRET |
| `SERVER_URL` | Twenty | - | SERVER_URL |
| `STORAGE_TYPE` | Twenty | s3 | STORAGE_TYPE |
| `PG_DATABASE_URL` | Twenty | - | PG_DATABASE_URL |
| `STORAGE_S3_NAME` | Twenty | - | STORAGE_S3_NAME |
| `STORAGE_S3_REGION` | Twenty | - | STORAGE_S3_REGION |
| `STORAGE_LOCAL_PATH` | Twenty | data | STORAGE_LOCAL_PATH |
| `STORAGE_S3_ENDPOINT` | Twenty | - | STORAGE_S3_ENDPOINT |
| `DISABLE_DB_MIGRATIONS` | Twenty | false | DISABLE_DB_MIGRATIONS |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty | - | STORAGE_S3_ACCESS_KEY_ID |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) | STORAGE_S3_SECRET_ACCESS_KEY |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty | false | DISABLE_CRON_JOBS_REGISTRATION |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty | true | ENABLE_ALPINE_PRIVATE_NETWORKING |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDIS_URL` | Twenty Worker | - | REDIS_URL |
| `APP_SECRET` | Twenty Worker | (secret) | APP_SECRET |
| `SERVER_URL` | Twenty Worker | - | SERVER_URL |
| `STORAGE_TYPE` | Twenty Worker | - | STORAGE_TYPE |
| `PG_DATABASE_URL` | Twenty Worker | - | PG_DATABASE_URL |
| `STORAGE_S3_NAME` | Twenty Worker | - | STORAGE_S3_NAME |
| `STORAGE_S3_REGION` | Twenty Worker | - | STORAGE_S3_REGION |
| `STORAGE_LOCAL_PATH` | Twenty Worker | - | STORAGE_LOCAL_PATH |
| `STORAGE_S3_ENDPOINT` | Twenty Worker | - | STORAGE_S3_ENDPOINT |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | DISABLE_DB_MIGRATIONS |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Worker | - | STORAGE_S3_ACCESS_KEY_ID |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | STORAGE_S3_SECRET_ACCESS_KEY |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | DISABLE_CRON_JOBS_REGISTRATION |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty Worker | true | ENABLE_ALPINE_PRIVATE_NETWORKING |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/app/packages/twenty/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/twenty-crm-self-hosted)
