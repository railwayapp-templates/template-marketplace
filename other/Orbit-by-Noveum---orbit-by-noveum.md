# Deploy Orbit by Noveum on Railway

Open-source task management with Postgres, Redis and private file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orbit-by-noveum)

## About

Orbit is a free, open-source task manager for people and AI agents. Manage issues, projects, sprints, documents and files in your own workspace, with no per-seat software fees.

This template includes the Orbit web service, a realtime WebSocket service, one maintenance scheduler, a public gateway, PostgreSQL, Redis and a private S3-compatible bucket. Application services use the published 2026.09.24 images. Database migrations run before the web service starts. Password sign-in is enabled.

### Finish setup

1. Open the generated **gateway** HTTPS domain. Use this domain for the app and MCP because it routes both web requests and realtime WebSockets. The orbit service is the web backend.
2. Create your account and complete workspace onboarding.
3. Before browser file uploads, configure the private bucket CORS policy for the gateway HTTPS origin. Allow GET, HEAD and PUT, and the Content-Type and S3 signing/checksum headers used by the browser. Keep S3_FORCE_PATH_STYLE=false. See [Railway file-upload guidance](https://docs.railway.com/storage-buckets/uploading-serving#upload-files-with-presigned-urls) and [Orbit storage configuration](https://github.com/Noveum/orbit/blob/main/docs/object-storage.md). Bucket CORS is a post-deployment step because the template editor does not expose bucket settings.
4. Configure RESEND_API_KEY and a verified EMAIL_FROM on the orbit service for email invitations and password recovery.
5. Verify sign-in, private document access, realtime updates between two browsers, file upload/download, scheduled jobs and persistence after restarting services before relying on the deployment.

Keep one scheduler replica. Preserve BETTER_AUTH_SECRET and CRON_SECRET across upgrades. Back up PostgreSQL and the object bucket together. For a custom domain, update BETTER_AUTH_URL and NEXT_PUBLIC_APP_URL on orbit to that gateway origin, and update bucket CORS. The realtime service references these values.

The release images passed local full-stack acceptance tests. A completed deployment of this exact Railway template has not yet been acceptance-tested. Railway infrastructure charges apply, and the selected plan must support the two persistent volumes used by PostgreSQL and Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scheduler | `ghcr.io/noveum/orbit-runtime:2026.09.24` | Worker |
| gateway | `ghcr.io/noveum/orbit-gateway:2026.09.24` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| realtime | `ghcr.io/noveum/orbit-runtime:2026.09.24` | Worker |
| orbit | `ghcr.io/noveum/orbit-runtime:2026.09.24` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CRON_SECRET` | scheduler | (secret) | Shared secret authorizing scheduled maintenance. Preserve across upgrades. |
| `ORBIT_INTERNAL_URL` | scheduler | - | Private web-service URL used for scheduled jobs. |
| `PORT` | gateway | 3000 | Service HTTP listening port. |
| `ORBIT_WEB_UPSTREAM` | gateway | - | Private web-service host and port. |
| `ORBIT_TRUSTED_PROXIES` | gateway | private_ranges | Trust forwarded client addresses only from private ingress proxies. |
| `ORBIT_REALTIME_UPSTREAM` | gateway | - | Private realtime-service host and port. |
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
| `NODE_ENV` | realtime | production | Production runtime mode. |
| `REDIS_URL` | realtime | - | Private Redis connection shared by web and realtime. |
| `S3_BUCKET` | realtime | - | Private bucket for files and document attachments. |
| `S3_REGION` | realtime | - | S3 signing region supplied by the Bucket. |
| `DIRECT_URL` | realtime | - | Direct database connection for migrations. |
| `S3_ENDPOINT` | realtime | - | S3 API endpoint supplied by the private Bucket. |
| `DATABASE_URL` | realtime | - | Private PostgreSQL connection supplied by Postgres. |
| `BETTER_AUTH_URL` | realtime | - | Public gateway HTTPS origin for sign-in and OAuth callbacks. |
| `S3_ACCESS_KEY_ID` | realtime | - | Bucket access key reference, not a public credential. |
| `ORBIT_SELF_HOSTED` | realtime | true | Enable self-hosted runtime behavior. |
| `BETTER_AUTH_SECRET` | realtime | (secret) | Authentication and realtime signing secret. Preserve across upgrades. |
| `NEXT_PUBLIC_APP_URL` | realtime | - | Public gateway HTTPS origin used by the application. |
| `ORBIT_PASSWORD_AUTH` | realtime | (secret) | Enable password sign-in for the self-hosted installation. |
| `S3_FORCE_PATH_STYLE` | realtime | false | False uses the virtual-hosted addressing required by Railway buckets. |
| `S3_SECRET_ACCESS_KEY` | realtime | (secret) | Bucket signing secret reference. Keep private. |
| `DATABASE_PREPARED_STATEMENTS` | realtime | true | Enable prepared statements for the direct database connection. |
| `PORT` | orbit | 3000 | Service HTTP listening port. |
| `HOSTNAME` | orbit | 0.0.0.0 | Listen on all IPv4 interfaces in a new Railway environment. |
| `NODE_ENV` | orbit | production | Production runtime mode. |
| `REDIS_URL` | orbit | - | Private Redis connection shared by web and realtime. |
| `S3_BUCKET` | orbit | - | Private bucket for files and document attachments. |
| `S3_REGION` | orbit | - | S3 signing region supplied by the Bucket. |
| `DIRECT_URL` | orbit | - | Direct database connection for migrations. |
| `EMAIL_FROM` | orbit | Orbit <auth@orbit.local> | Set a verified sender along with RESEND_API_KEY to enable email delivery. |
| `CRON_SECRET` | orbit | (secret) | Shared secret authorizing scheduled maintenance. Preserve across upgrades. |
| `S3_ENDPOINT` | orbit | - | S3 API endpoint supplied by the private Bucket. |
| `DATABASE_URL` | orbit | - | Private PostgreSQL connection supplied by Postgres. |
| `SLACK_ENABLED` | orbit | false | Slack integration remains off until configured. |
| `BETTER_AUTH_URL` | orbit | - | Public gateway HTTPS origin for sign-in and OAuth callbacks. |
| `S3_ACCESS_KEY_ID` | orbit | - | Bucket access key reference, not a public credential. |
| `ORBIT_SELF_HOSTED` | orbit | true | Enable self-hosted runtime behavior. |
| `BETTER_AUTH_SECRET` | orbit | (secret) | Authentication and realtime signing secret. Preserve across upgrades. |
| `NEXT_PUBLIC_APP_URL` | orbit | - | Public gateway HTTPS origin used by the application. |
| `ORBIT_PASSWORD_AUTH` | orbit | (secret) | Enable password sign-in for the self-hosted installation. |
| `S3_FORCE_PATH_STYLE` | orbit | false | False uses the virtual-hosted addressing required by Railway buckets. |
| `S3_SECRET_ACCESS_KEY` | orbit | (secret) | Bucket signing secret reference. Keep private. |
| `NEXT_TELEMETRY_DISABLED` | orbit | 1 | Disable Next.js telemetry. |
| `DATABASE_PREPARED_STATEMENTS` | orbit | true | Enable prepared statements for the direct database connection. |

## Configuration

- **Start command:** `node apps/web/scheduler.mjs`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node apps/web/realtime.mjs`
- **Start command:** `node apps/web/start.mjs`

**Category:** Other

[View on Railway →](https://railway.com/deploy/orbit-by-noveum)
