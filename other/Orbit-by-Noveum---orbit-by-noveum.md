# Deploy Orbit by Noveum on Railway

Open-source task management with Postgres, Redis and private file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orbit-by-noveum)

## About

Orbit is a free, open-source task manager for people and AI agents. Manage issues, projects, sprints, documents and files in your own workspace, with no per-seat software fees.

The template configures Orbit, PostgreSQL, Redis and private S3-compatible file storage. Password sign-in is enabled. Back up both PostgreSQL and the object bucket: the database stores metadata, while the bucket stores uploaded files. Configure verified email delivery for invitations and password recovery. Railway infrastructure charges apply. Choose a plan that supports two persistent volumes, one for PostgreSQL and one for Redis; the current Free plan cannot deploy this template.

### Finish setup

Open the generated Orbit domain, create your account and complete workspace onboarding. Before uploading files from the browser, configure the private bucket CORS policy to allow your Orbit origin and PUT requests, following [Railway’s bucket CORS instructions](https://docs.railway.com/storage-buckets/uploading-serving#upload-files-with-presigned-urls). Keep S3_FORCE_PATH_STYLE=false. Configure email delivery before inviting teammates or using password recovery.

Test document creation, an authenticated file upload and download, and persistence after restarting services before relying on the deployment.

### Deployment limitations

This template currently omits realtime WebSocket updates and scheduled maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| orbit | [Noveum/orbit](https://github.com/Noveum/orbit) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | orbit | 3000 | Internal HTTP port; keep 3000 to match the public service port. |
| `HOSTNAME` | orbit | 0.0.0.0 | Listen on all container interfaces so Railway can reach the app. |
| `NODE_ENV` | orbit | production | Production mode for the Node web server. |
| `REDIS_URL` | orbit | - | Private Redis connection supplied by the Redis service. |
| `S3_BUCKET` | orbit | - | Private object bucket holding uploads; provisioned by the Bucket service. |
| `S3_REGION` | orbit | - | S3 signing region supplied by the Bucket service. |
| `DIRECT_URL` | orbit | - | Direct PostgreSQL connection used for schema migrations. |
| `S3_ENDPOINT` | orbit | - | Base S3 endpoint supplied by the Bucket service. |
| `DATABASE_URL` | orbit | - | Private PostgreSQL connection supplied by the Postgres service. |
| `BETTER_AUTH_URL` | orbit | - | Public HTTPS origin for sign-in and OAuth callbacks. |
| `S3_ACCESS_KEY_ID` | orbit | - | S3 access identifier supplied by the private Bucket service. |
| `BETTER_AUTH_SECRET` | orbit | (secret) | Generated authentication secret. Preserve it across redeployments. |
| `RAILPACK_BUILD_CMD` | orbit | bun run --filter @orbit/web build | Build the Orbit web workspace with Bun. |
| `NEXT_PUBLIC_APP_URL` | orbit | - | Public HTTPS origin embedded in the web application. |
| `ORBIT_PASSWORD_AUTH` | orbit | (secret) | Enable password sign-in for this evaluation deployment. |
| `ORBIT_PREVIEW_BUILD` | orbit | 1 | Limit Next.js build workers for the preview deployment. |
| `S3_FORCE_PATH_STYLE` | orbit | false | Use virtual-hosted addressing required by new Railway buckets. |
| `S3_SECRET_ACCESS_KEY` | orbit | (secret) | S3 signing secret supplied by the private Bucket service. |
| `RAILPACK_NODE_VERSION` | orbit | 22 | Use Node 22 for the web runtime. |
| `NEXT_TELEMETRY_DISABLED` | orbit | 1 | Disable Next.js build telemetry. |
| `DATABASE_PREPARED_STATEMENTS` | orbit | true | Enable prepared statements for the direct PostgreSQL connection. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node apps/web/.next/standalone/apps/web/start.mjs`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, PLpgSQL, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/orbit-by-noveum)
