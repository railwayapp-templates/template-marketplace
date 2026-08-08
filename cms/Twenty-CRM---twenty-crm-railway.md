# Deploy Twenty CRM on Railway

Salesforce Alternative: Build your Enterprise CRM at AI Speed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-railway)

## About

Twenty is an open-source CRM built to replace Salesforce and HubSpot: a fast React interface over a metadata-driven Postgres model, where a custom object added in the UI instantly gains REST and GraphQL endpoints, no migration needed. Teams self-host Twenty CRM because the customer database is the asset and AGPL-3.0 means no per-seat licence.

Run Twenty CRM on Railway from the official `twentycrm/twenty:v2.26.1` image, split into the two processes upstream expects. **`twenty`** is the API server with the frontend bundled in — the only public service, binding `NODE_PORT` 3000, health-checked at `/healthz`. **`twenty-worker`** runs the same image as a BullMQ queue worker, with no domain. Behind them: managed **Postgres**, managed **Redis** and a **`twenty-storage`** bucket. No volumes anywhere.

![Twenty CRM Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786164354/abe120aa-7182-43ee-ac42-49ff89ede7d2.png)

Self-host Twenty CRM when contact data is regulated, when per-seat pricing scales worse than headcount, or when the CRM must be queryable like any service you run.

- **Custom objects and fields with no SQL migration** — the GraphQL schema regenerates at runtime.
- **Table, Kanban and record views** with filters, sorts and saved views.
- **Workflow automation** on record changes, schedules, manual runs or webhooks.
- **Email and calendar sync** from Google Workspace or Microsoft 365 onto records.
- **REST and GraphQL APIs, webhooks, OAuth and roles**, generated per workspace.

Server and worker are one image doing two jobs: the server owns schema setup and migrations, the worker owns email sync, workflow runs and cron. Both need one identical `ENCRYPTION_KEY` — it encrypts secrets at rest and signs sessions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| twenty-worker | `twentycrm/twenty:v2.26.1` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| twenty | `twentycrm/twenty:v2.26.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | twenty-worker | - | Same queue backend |
| `SERVER_URL` | twenty-worker | - | Public URL for generated links |
| `NODE_OPTIONS` | twenty-worker | --max-old-space-size=4096 | Cap V8 heap at half the container |
| `STORAGE_TYPE` | twenty-worker | s3 | Use object storage, not disk |
| `ENCRYPTION_KEY` | twenty-worker | - | Must match the server exactly |
| `PG_DATABASE_URL` | twenty-worker | - | Same database as the server |
| `STORAGE_S3_NAME` | twenty-worker | - | Bucket name |
| `STORAGE_S3_REGION` | twenty-worker | - | Bucket region |
| `STORAGE_S3_ENDPOINT` | twenty-worker | - | Bucket S3 endpoint |
| `DISABLE_DB_MIGRATIONS` | twenty-worker | true | Server owns migrations |
| `STORAGE_S3_ACCESS_KEY_ID` | twenty-worker | - | Bucket access key id |
| `STORAGE_S3_SECRET_ACCESS_KEY` | twenty-worker | (secret) | Bucket secret access key |
| `DISABLE_CRON_JOBS_REGISTRATION` | twenty-worker | true | Server owns cron registration |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | twenty | 3000 | Matches NODE_PORT for health checks |
| `NODE_PORT` | twenty | 3000 | Port the server actually binds |
| `REDIS_URL` | twenty | - | BullMQ queues and cache |
| `SERVER_URL` | twenty | - | Public base URL for links |
| `TRUST_PROXY` | twenty | loopback, linklocal, uniquelocal, 100.64.0.0/10, fd00::/8 | Trust the Railway edge |
| `NODE_OPTIONS` | twenty | --max-old-space-size=4096 | Cap V8 heap at half the container |
| `STORAGE_TYPE` | twenty | s3 | Use object storage, not disk |
| `ENCRYPTION_KEY` | twenty | - | Encrypts secrets, signs sessions |
| `PG_DATABASE_URL` | twenty | - | Workspace database connection |
| `STORAGE_S3_NAME` | twenty | - | Bucket name |
| `STORAGE_S3_REGION` | twenty | - | Bucket region |
| `STORAGE_S3_ENDPOINT` | twenty | - | Bucket S3 endpoint |
| `STORAGE_S3_ACCESS_KEY_ID` | twenty | - | Bucket access key id |
| `STORAGE_S3_SECRET_ACCESS_KEY` | twenty | (secret) | Bucket secret access key |

## Configuration

- **Start command:** `/app/entrypoint.sh node dist/queue-worker/queue-worker`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/deploy/twenty-crm-railway)
