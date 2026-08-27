# Deploy Baserow on Railway

Spreadsheet-style database your team edits together in a browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baserow-railway)

## About

Baserow is an open-source no-code database — spreadsheet-style tables that are really PostgreSQL tables underneath, with grid, kanban and calendar views, forms, an application builder and a REST API. Teams use it the way they use Airtable: an inventory list, a lightweight CRM, a form colleagues submit to. Self-host Baserow and the per-seat pricing disappears, along with any question about where the rows live.

This deploys Baserow in the split-role shape its maintainers document for production, not the all-in-one container: the Django API (`baserow/backend`), the Nuxt interface (`baserow/web-frontend`), three Celery tiers, a router giving both one domain, managed PostgreSQL and Redis, an object-storage bucket, and a mail inbox so password resets work as soon as the deploy is green. Source: [github.com/bram2w/baserow](https://github.com/bram2w/baserow).

![Diagram of the nine Baserow services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787713738/baserow-architecture.png)

Baserow stores every user table as a genuine PostgreSQL table, so a database built in the UI is queryable, indexable and backed up like any other schema — the reason to self-host it rather than use a closed SaaS.

- Grid, gallery, kanban, calendar and form views, edited collaboratively in real time
- 25+ field types: formulas, rollups, link-to-table, files, select fields
- REST API per table, scoped database tokens, webhooks on row events
- Application builder and automations over the same data
- Row history, trash, snapshots, workspace permissions, 150+ templates

Architecturally it is a Django ASGI backend serving HTTP and WebSockets, a Nuxt server rendering the UI, and three Celery roles: a worker for notifications and webhooks, an export worker for slow jobs, and a beat scheduler. Redis carries the broker, schedule, cache and realtime channel layer. A Caddy router in front sends `/api`, `/ws`, `/mcp` and `/assistant` to the backend and everything else to the frontend, so the browser only talks to one origin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `baserow/backend:2.3.3` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| baserow | [gridalpha/baserow-railway](https://github.com/gridalpha/baserow-railway) | Web service |
| Redis | `redis:8.2` | Database |
| web-frontend | `baserow/web-frontend:2.3.3` | Worker |
| celery-beat | `baserow/backend:2.3.3` | Worker |
| celery-worker | `baserow/backend:2.3.3` | Worker |
| mailpit | `axllent/mailpit:latest` | Web service |
| celery-export-worker | `baserow/backend:2.3.3` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | backend | 8000 | Port Railway health-checks |
| `REDIS_URL` | backend | - | Redis connection string |
| `EMAIL_SMTP` | backend | yes | Enable the SMTP mail backend |
| `FROM_EMAIL` | backend | - | Sender address |
| `SECRET_KEY` | backend | (secret) | Django signing key, must stay stable |
| `DATABASE_URL` | backend | - | PostgreSQL connection string |
| `AWS_DEFAULT_ACL` | backend | private | Upload objects privately |
| `EMAIL_SMTP_HOST` | backend | - | SMTP host |
| `EMAIL_SMTP_PORT` | backend | 1025 | SMTP port |
| `AWS_ACCESS_KEY_ID` | backend | - | Bucket access key |
| `AWS_S3_REGION_NAME` | backend | - | Bucket region |
| `BASEROW_PUBLIC_URL` | backend | - | Public app URL |
| `MIGRATE_ON_STARTUP` | backend | true | Run migrations on boot |
| `AWS_S3_ENDPOINT_URL` | backend | - | S3-compatible endpoint |
| `PRIVATE_BACKEND_URL` | backend | http://backend.railway.internal:8000 | Own private address |
| `AWS_QUERYSTRING_AUTH` | backend | true | Serve files as presigned URLs |
| `BASEROW_BACKEND_PORT` | backend | 8000 | Gunicorn listen port |
| `AWS_SECRET_ACCESS_KEY` | backend | (secret) | Bucket secret key |
| `AWS_S3_ADDRESSING_STYLE` | backend | path | Path-style addressing for browser reads |
| `AWS_STORAGE_BUCKET_NAME` | backend | - | Bucket for user files |
| `BASEROW_JWT_SIGNING_KEY` | backend | - | Signs access and refresh tokens |
| `AWS_S3_SIGNATURE_VERSION` | backend | s3v4 | SigV4 request signing |
| `BASEROW_AMOUNT_OF_WORKERS` | backend | 2 | Celery concurrency ceiling |
| `SYNC_TEMPLATES_ON_STARTUP` | backend | true | Queue the built-in template import |
| `BASEROW_EXTRA_ALLOWED_HOSTS` | backend | healthcheck.railway.app,backend.railway.internal | Extra Django allowed hosts |
| `BASEROW_BACKEND_BIND_ADDRESS` | backend | [::] | Dual-stack bind for private callers |
| `BASEROW_ENABLE_SECURE_PROXY_SSL_HEADER` | backend | true | Trust X-Forwarded-Proto from the edge |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | baserow | 80 | Public HTTP listener port |
| `PRIVATE_BACKEND_URL` | baserow | - | Django API upstream |
| `PRIVATE_WEB_FRONTEND_URL` | baserow | - | Nuxt UI upstream |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | web-frontend | 3000 | Port Railway health-checks |
| `BASEROW_PUBLIC_URL` | web-frontend | - | Public app URL |
| `PRIVATE_BACKEND_URL` | web-frontend | - | Server-side API calls |
| `BASEROW_WEBFRONTEND_PORT` | web-frontend | 3000 | Nitro listen port |
| `BASEROW_WEBFRONTEND_BIND_ADDRESS` | web-frontend | :: | Dual-stack bind for private callers |
| `BASEROW_FRONTEND_SAME_SITE_COOKIE` | web-frontend | lax | SameSite policy for the session cookie |
| `REDIS_URL` | celery-beat | - | Broker and RedBeat schedule store |
| `EMAIL_SMTP` | celery-beat | yes | Enable the SMTP mail backend |
| `FROM_EMAIL` | celery-beat | - | Sender address |
| `SECRET_KEY` | celery-beat | (secret) | Must match the API |
| `DATABASE_URL` | celery-beat | - | PostgreSQL connection string |
| `AWS_DEFAULT_ACL` | celery-beat | private | Upload objects privately |
| `EMAIL_SMTP_HOST` | celery-beat | - | SMTP host |
| `EMAIL_SMTP_PORT` | celery-beat | 1025 | SMTP port |
| `AWS_ACCESS_KEY_ID` | celery-beat | - | Bucket access key |
| `AWS_S3_REGION_NAME` | celery-beat | - | Bucket region |
| `BASEROW_PUBLIC_URL` | celery-beat | - | Public app URL |
| `MIGRATE_ON_STARTUP` | celery-beat | false | Only the API migrates |
| `AWS_S3_ENDPOINT_URL` | celery-beat | - | S3-compatible endpoint |
| `PRIVATE_BACKEND_URL` | celery-beat | - | Private API address |
| `AWS_QUERYSTRING_AUTH` | celery-beat | true | Serve files as presigned URLs |
| `AWS_SECRET_ACCESS_KEY` | celery-beat | (secret) | Bucket secret key |
| `AWS_S3_ADDRESSING_STYLE` | celery-beat | path | Path-style addressing |
| `AWS_STORAGE_BUCKET_NAME` | celery-beat | - | Bucket for user files |
| `BASEROW_JWT_SIGNING_KEY` | celery-beat | - | Must match the API |
| `TINI_KILL_PROCESS_GROUP` | celery-beat | 1 | Forward SIGTERM to child processes |
| `AWS_S3_SIGNATURE_VERSION` | celery-beat | s3v4 | SigV4 request signing |
| `SYNC_TEMPLATES_ON_STARTUP` | celery-beat | true | Matches the API setting |
| `BASEROW_ENABLE_SECURE_PROXY_SSL_HEADER` | celery-beat | true | HTTPS links in generated content |
| `REDIS_URL` | celery-worker | - | Celery broker and result backend |
| `EMAIL_SMTP` | celery-worker | yes | Enable the SMTP mail backend |
| `FROM_EMAIL` | celery-worker | - | Sender address |
| `SECRET_KEY` | celery-worker | (secret) | Must match the API |
| `DATABASE_URL` | celery-worker | - | PostgreSQL connection string |
| `AWS_DEFAULT_ACL` | celery-worker | private | Upload objects privately |
| `EMAIL_SMTP_HOST` | celery-worker | - | SMTP host |
| `EMAIL_SMTP_PORT` | celery-worker | 1025 | SMTP port |
| `AWS_ACCESS_KEY_ID` | celery-worker | - | Bucket access key |
| `AWS_S3_REGION_NAME` | celery-worker | - | Bucket region |
| `BASEROW_PUBLIC_URL` | celery-worker | - | Public app URL |
| `MIGRATE_ON_STARTUP` | celery-worker | false | Only the API migrates |
| `AWS_S3_ENDPOINT_URL` | celery-worker | - | S3-compatible endpoint |
| `PRIVATE_BACKEND_URL` | celery-worker | - | Private API address |
| `AWS_QUERYSTRING_AUTH` | celery-worker | true | Serve files as presigned URLs |
| `AWS_SECRET_ACCESS_KEY` | celery-worker | (secret) | Bucket secret key |
| `AWS_S3_ADDRESSING_STYLE` | celery-worker | path | Path-style addressing |
| `AWS_STORAGE_BUCKET_NAME` | celery-worker | - | Bucket for user files |
| `BASEROW_JWT_SIGNING_KEY` | celery-worker | - | Must match the API |
| `TINI_KILL_PROCESS_GROUP` | celery-worker | 1 | Forward SIGTERM to child processes |
| `AWS_S3_SIGNATURE_VERSION` | celery-worker | s3v4 | SigV4 request signing |
| `BASEROW_AMOUNT_OF_WORKERS` | celery-worker | 2 | Celery concurrency ceiling |
| `SYNC_TEMPLATES_ON_STARTUP` | celery-worker | true | Matches the API setting |
| `BASEROW_ENABLE_SECURE_PROXY_SSL_HEADER` | celery-worker | true | HTTPS links in generated content |
| `PORT` | mailpit | 8025 | Inbox UI port, health-checked at /livez |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Ring-buffer size |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack inbox listener |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack SMTP listener |
| `REDIS_URL` | celery-export-worker | - | Celery broker and result backend |
| `EMAIL_SMTP` | celery-export-worker | yes | Enable the SMTP mail backend |
| `FROM_EMAIL` | celery-export-worker | - | Sender address |
| `SECRET_KEY` | celery-export-worker | (secret) | Must match the API |
| `DATABASE_URL` | celery-export-worker | - | PostgreSQL connection string |
| `AWS_DEFAULT_ACL` | celery-export-worker | private | Upload objects privately |
| `EMAIL_SMTP_HOST` | celery-export-worker | - | SMTP host |
| `EMAIL_SMTP_PORT` | celery-export-worker | 1025 | SMTP port |
| `AWS_ACCESS_KEY_ID` | celery-export-worker | - | Bucket access key |
| `AWS_S3_REGION_NAME` | celery-export-worker | - | Bucket region |
| `BASEROW_PUBLIC_URL` | celery-export-worker | - | Public app URL |
| `MIGRATE_ON_STARTUP` | celery-export-worker | false | Only the API migrates |
| `AWS_S3_ENDPOINT_URL` | celery-export-worker | - | S3-compatible endpoint |
| `PRIVATE_BACKEND_URL` | celery-export-worker | - | Private API address |
| `AWS_QUERYSTRING_AUTH` | celery-export-worker | true | Serve files as presigned URLs |
| `AWS_SECRET_ACCESS_KEY` | celery-export-worker | (secret) | Bucket secret key |
| `AWS_S3_ADDRESSING_STYLE` | celery-export-worker | path | Path-style addressing |
| `AWS_STORAGE_BUCKET_NAME` | celery-export-worker | - | Bucket for exports and files |
| `BASEROW_JWT_SIGNING_KEY` | celery-export-worker | - | Must match the API |
| `TINI_KILL_PROCESS_GROUP` | celery-export-worker | 1 | Forward SIGTERM to child processes |
| `AWS_S3_SIGNATURE_VERSION` | celery-export-worker | s3v4 | SigV4 request signing |
| `BASEROW_AMOUNT_OF_WORKERS` | celery-export-worker | 1 | Celery concurrency ceiling |
| `SYNC_TEMPLATES_ON_STARTUP` | celery-export-worker | true | This worker runs the template import |
| `BASEROW_ENABLE_SECURE_PROXY_SSL_HEADER` | celery-export-worker | true | HTTPS links in generated content |

## Configuration

- **Healthcheck:** `/api/_health/`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/_health/`
- **Start command:** `/usr/bin/tini -s -- /bin/bash /baserow/backend/docker/docker-entrypoint.sh celery-beat`
- **Start command:** `/usr/bin/tini -s -- /bin/bash /baserow/backend/docker/docker-entrypoint.sh celery-worker`
- **Healthcheck:** `/livez`
- **Start command:** `/usr/bin/tini -s -- /bin/bash /baserow/backend/docker/docker-entrypoint.sh celery-exportworker`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/baserow-railway)
