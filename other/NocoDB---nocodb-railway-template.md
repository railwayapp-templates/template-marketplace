# Deploy NocoDB on Railway

Airtable Alternative. The no-code database with Postgres, Redis & Worker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-railway-template)

## About

NocoDB puts a spreadsheet interface on top of a real relational database. Teams use it much like Airtable — grid, kanban, gallery, calendar, form and map views over their records — except the data sits in Postgres, MySQL, SQLite or SQL Server that you control, and every table is instantly available over a REST API, webhooks and an SDK. CRMs, roadmaps, inventory and applicant trackers get a friendly UI without anyone writing a CRUD app, while developers keep SQL access and API tokens underneath.

Self-host NocoDB on Railway and you get upstream's production topology rather than a lone container. The template runs the `nocodb/nocodb:2026.08.0` image twice — a public **nocodb** app on port 8080 and a private **nocodb-worker** with `NC_WORKER_CONTAINER=true` — plus managed **Postgres** for metadata, managed **Redis** for cache, pub/sub and the BullMQ job queue, and a private **object storage bucket** for attachments. Browser traffic reaches only the app, which writes records to Postgres and pushes long-running work — imports, exports, webhook deliveries, thumbnails — onto Redis for the worker to drain. Attachment bytes go straight to the bucket and come back as short-lived signed URLs.

![NocoDB Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786459120/af57ab70-099b-4ef5-86f2-1e1e55d14dad.png)

NocoDB is a database UI layer, not a database. Point it at an existing Postgres or MySQL schema and it renders those tables as editable views with filters, sorts, grouping and formulas, without copying data anywhere — or let it manage its own tables as a standalone Airtable replacement. Self-hosting makes sense when the records are customer, financial or HR data that cannot leave your infrastructure, or when per-seat SaaS pricing stops adding up.

- Six view types over one table: grid, gallery, kanban, calendar, form and map
- Rich fields — links, lookups, rollups, formulas, attachments, currency, QR/barcode
- Auto-generated REST API (v1 and v2) plus webhooks on create, update and delete

**Redis** becomes mandatory once the worker role exists: a worker container refuses to start without `NC_REDIS_URL`. The **bucket** matters for a subtler reason — upstream's Compose file shares one data volume between app and worker, which Railway cannot do because a volume belongs to exactly one service. Routing attachments to object storage removes that requirement: metadata lives in Postgres, bytes live in the bucket, and neither container keeps anything durable on local disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nocodb | `nocodb/nocodb:2026.08.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nocodb-worker | `nocodb/nocodb:2026.08.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | nocodb | 8080 | Health-check target port |
| `DATABASE_URL` | nocodb | - | Metadata store connection string |
| `NC_REDIS_URL` | nocodb | - | Cache, pub/sub and job queue |
| `NC_S3_REGION` | nocodb | - | Attachment bucket region |
| `NODE_OPTIONS` | nocodb | --max-old-space-size=4096 | Cap Node heap to container limit |
| `NC_PUBLIC_URL` | nocodb | - | Public base URL for links and webhooks |
| `NC_ADMIN_EMAIL` | nocodb | admin@example.com | First super-admin email |
| `NC_S3_ENDPOINT` | nocodb | - | Object storage endpoint |
| `NC_DISABLE_TELE` | nocodb | true | Disable usage telemetry |
| `NC_S3_ACCESS_KEY` | nocodb | - | Object storage access key |
| `NC_ADMIN_PASSWORD` | nocodb | (secret) | First super-admin password |
| `NC_S3_BUCKET_NAME` | nocodb | - | Attachment bucket name |
| `NC_AUTH_JWT_SECRET` | nocodb | (secret) | Signs user sessions |
| `NC_S3_ACCESS_SECRET` | nocodb | (secret) | Object storage secret key |
| `NC_SECURE_ATTACHMENTS` | nocodb | true | Serve attachments as signed URLs |
| `NC_DISABLE_SUPPORT_CHAT` | nocodb | true | Disable third-party support widget |
| `NC_CONNECTION_ENCRYPT_KEY` | nocodb | - | Encrypts external data-source credentials |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | nocodb-worker | 8080 | Internal listen port |
| `DATABASE_URL` | nocodb-worker | - | Metadata store connection string |
| `NC_REDIS_URL` | nocodb-worker | - | Required — worker will not start without it |
| `NC_S3_REGION` | nocodb-worker | - | Attachment bucket region |
| `NODE_OPTIONS` | nocodb-worker | --max-old-space-size=4096 | Cap Node heap to container limit |
| `NC_PUBLIC_URL` | nocodb-worker | - | Public base URL for generated links |
| `NC_S3_ENDPOINT` | nocodb-worker | - | Object storage endpoint |
| `NC_DISABLE_TELE` | nocodb-worker | true | Disable usage telemetry |
| `NC_S3_ACCESS_KEY` | nocodb-worker | - | Object storage access key |
| `NC_S3_BUCKET_NAME` | nocodb-worker | - | Attachment bucket name |
| `NC_AUTH_JWT_SECRET` | nocodb-worker | (secret) | Must match the app service |
| `NC_S3_ACCESS_SECRET` | nocodb-worker | (secret) | Object storage secret key |
| `NC_WORKER_CONTAINER` | nocodb-worker | true | Run this container in worker role |
| `NC_SECURE_ATTACHMENTS` | nocodb-worker | true | Serve attachments as signed URLs |
| `NC_DISABLE_SUPPORT_CHAT` | nocodb-worker | true | Disable third-party support widget |
| `NC_CONNECTION_ENCRYPT_KEY` | nocodb-worker | - | Must match the app service |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nocodb-railway-template)
