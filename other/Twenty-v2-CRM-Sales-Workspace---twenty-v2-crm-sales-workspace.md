# Deploy Twenty v2 CRM Sales Workspace on Railway

Open-source CRM with background workers and S3 storage. Own your data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-v2-crm-sales-workspace)

## About

Twenty is an open-source CRM for managing companies, people, opportunities and workflows, with a fast spreadsheet-style interface and a full API. This community template runs Twenty v2 on Railway with a dedicated background worker, Postgres, Redis and a Railway Bucket for files, so your customer data stays in your own project.

Twenty is a NestJS server that also serves the web app, plus a worker process that handles background jobs: e-mail and calendar synchronisation, workflow runs, imports and webhooks. It needs Postgres for data, Redis for cache and job queues, and file storage for attachments. This template wires those pieces together on Railway's private network, keeps attachments in a Railway Bucket so the server stays stateless, runs database migrations as a pre-deploy step, and generates every secret at deploy time. SMTP and Google or Microsoft mail/calendar sync are prepared as optional variables and can also be set later in Twenty's Admin Panel.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Twenty | `twentycrm/twenty:v2.45.8` | Web service |
| Twenty Worker | `twentycrm/twenty:v2.45.8` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Twenty | 3000 | Port Railway routes to and healthchecks (must equal NODE_PORT). |
| `NODE_PORT` | Twenty | 3000 | Port the Twenty server listens on. |
| `REDIS_URL` | Twenty | - | Redis for cache and BullMQ queues. family=0 lets ioredis use IPv4 or IPv6 on the private network. |
| `APP_SECRET` | Twenty | (secret) | Legacy application secret, kept for compatibility and as fallback key. Do not change after first boot. |
| `SERVER_URL` | Twenty | - | Public URL of this instance (links, OAuth callbacks). Update it when you add a custom domain. |
| `EMAIL_DRIVER` | Twenty | LOGGER | LOGGER writes e-mails to the logs. Set SMTP (and the EMAIL_SMTP_* values) to send invitations and password resets. Can also be set in Settings > Admin Panel. |
| `STORAGE_TYPE` | Twenty | S_3 | File storage driver. S_3 keeps attachments in the Railway Bucket so server and worker share them and the server stays stateless. |
| `ENCRYPTION_KEY` | Twenty | - | Primary key for at-rest encryption of stored secrets (connected-account tokens, API keys). Never change it without a rotation (see FALLBACK_ENCRYPTION_KEY in Twenty docs). |
| `EMAIL_FROM_NAME` | Twenty | Twenty CRM | Sender display name for system e-mails. |
| `EMAIL_SMTP_HOST` | Twenty | - | SMTP host, e.g. smtp.gmail.com or smtp.office365.com. Optional. |
| `EMAIL_SMTP_PORT` | Twenty | 587 | SMTP port (587 STARTTLS, 465 TLS). |
| `EMAIL_SMTP_USER` | Twenty | (secret) | SMTP username. Optional. |
| `PG_DATABASE_URL` | Twenty | - | Postgres connection string (private network). |
| `STORAGE_S3_NAME` | Twenty | - | Bucket name (Railway Bucket). |
| `STORAGE_S3_REGION` | Twenty | - | Bucket region (Railway Bucket). |
| `EMAIL_FROM_ADDRESS` | Twenty | - | Sender address for system e-mails, e.g. crm@yourcompany.com. Optional. |
| `AUTH_GOOGLE_ENABLED` | Twenty | false | Allow 'Sign in with Google' (needs the Google client below). |
| `EMAIL_SMTP_PASSWORD` | Twenty | (secret) | SMTP password or app password. Optional. |
| `LOGIC_FUNCTION_TYPE` | Twenty | DISABLED | Logic functions / workflow code steps. LOCAL runs user code unsandboxed inside the container: enable only if every workspace member is trusted. |
| `STORAGE_S3_ENDPOINT` | Twenty | - | S3 endpoint (Railway Bucket). |
| `AUTH_GOOGLE_CLIENT_ID` | Twenty | - | Google OAuth client ID (Google Cloud console). Optional. |
| `DISABLE_DB_MIGRATIONS` | Twenty | true | Migrations run in the pre-deploy command, not at container start, so replicas never migrate concurrently. |
| `AUTH_MICROSOFT_ENABLED` | Twenty | false | Allow 'Sign in with Microsoft' (needs the Microsoft app below). |
| `AUTH_GOOGLE_CALLBACK_URL` | Twenty | - | Authorised redirect URI for Google sign-in. Register it in Google Cloud. |
| `AUTH_MICROSOFT_CLIENT_ID` | Twenty | - | Microsoft Entra app (client) ID. Optional. |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty | - | Bucket access key. |
| `AUTH_GOOGLE_CLIENT_SECRET` | Twenty | (secret) | Google OAuth client secret. Optional. |
| `AUTH_MICROSOFT_CALLBACK_URL` | Twenty | - | Redirect URI for Microsoft sign-in. Register it in Entra ID. |
| `AUTH_MICROSOFT_CLIENT_SECRET` | Twenty | (secret) | Microsoft Entra client secret. Optional. |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) | Bucket secret key. |
| `AUTH_GOOGLE_APIS_CALLBACK_URL` | Twenty | - | Authorised redirect URI for Gmail/Calendar sync. Register it in Google Cloud. |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty | false | The server registers Twenty's background cron jobs on start (idempotent). |
| `AUTH_MICROSOFT_APIS_CALLBACK_URL` | Twenty | - | Redirect URI for Microsoft mail/calendar sync. Register it in Entra ID. |
| `CALENDAR_PROVIDER_GOOGLE_ENABLED` | Twenty | false | Enable Google Calendar sync (needs the Google client below). |
| `MESSAGING_PROVIDER_GMAIL_ENABLED` | Twenty | false | Enable Gmail sync (needs the Google client below). |
| `CALENDAR_PROVIDER_MICROSOFT_ENABLED` | Twenty | false | Enable Microsoft 365 calendar sync. |
| `MESSAGING_PROVIDER_MICROSOFT_ENABLED` | Twenty | false | Enable Outlook / Microsoft 365 mail sync. |
| `REDIS_URL` | Twenty Worker | - | Shared with the server: references Twenty.REDIS_URL (edit it there). |
| `APP_SECRET` | Twenty Worker | (secret) | Shared with the server: references Twenty.APP_SECRET (edit it there). |
| `SERVER_URL` | Twenty Worker | - | Shared with the server: references Twenty.SERVER_URL (edit it there). |
| `EMAIL_DRIVER` | Twenty Worker | - | Shared with the server: references Twenty.EMAIL_DRIVER (edit it there). |
| `STORAGE_TYPE` | Twenty Worker | - | Shared with the server: references Twenty.STORAGE_TYPE (edit it there). |
| `ENCRYPTION_KEY` | Twenty Worker | - | Shared with the server: references Twenty.ENCRYPTION_KEY (edit it there). |
| `EMAIL_FROM_NAME` | Twenty Worker | - | Shared with the server: references Twenty.EMAIL_FROM_NAME (edit it there). |
| `EMAIL_SMTP_HOST` | Twenty Worker | - | Shared with the server: references Twenty.EMAIL_SMTP_HOST (edit it there). |
| `EMAIL_SMTP_PORT` | Twenty Worker | - | Shared with the server: references Twenty.EMAIL_SMTP_PORT (edit it there). |
| `EMAIL_SMTP_USER` | Twenty Worker | (secret) | Shared with the server: references Twenty.EMAIL_SMTP_USER (edit it there). |
| `PG_DATABASE_URL` | Twenty Worker | - | Shared with the server: references Twenty.PG_DATABASE_URL (edit it there). |
| `STORAGE_S3_NAME` | Twenty Worker | - | Shared with the server: references Twenty.STORAGE_S3_NAME (edit it there). |
| `STORAGE_S3_REGION` | Twenty Worker | - | Shared with the server: references Twenty.STORAGE_S3_REGION (edit it there). |
| `EMAIL_FROM_ADDRESS` | Twenty Worker | - | Shared with the server: references Twenty.EMAIL_FROM_ADDRESS (edit it there). |
| `AUTH_GOOGLE_ENABLED` | Twenty Worker | - | Shared with the server: references Twenty.AUTH_GOOGLE_ENABLED (edit it there). |
| `EMAIL_SMTP_PASSWORD` | Twenty Worker | (secret) | Shared with the server: references Twenty.EMAIL_SMTP_PASSWORD (edit it there). |
| `LOGIC_FUNCTION_TYPE` | Twenty Worker | - | Shared with the server: references Twenty.LOGIC_FUNCTION_TYPE (edit it there). |
| `STORAGE_S3_ENDPOINT` | Twenty Worker | - | Shared with the server: references Twenty.STORAGE_S3_ENDPOINT (edit it there). |
| `AUTH_GOOGLE_CLIENT_ID` | Twenty Worker | - | Shared with the server: references Twenty.AUTH_GOOGLE_CLIENT_ID (edit it there). |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | The worker never runs migrations. |
| `AUTH_MICROSOFT_ENABLED` | Twenty Worker | - | Shared with the server: references Twenty.AUTH_MICROSOFT_ENABLED (edit it there). |
| `AUTH_GOOGLE_CALLBACK_URL` | Twenty Worker | - | Shared with the server: references Twenty.AUTH_GOOGLE_CALLBACK_URL (edit it there). |
| `AUTH_MICROSOFT_CLIENT_ID` | Twenty Worker | - | Shared with the server: references Twenty.AUTH_MICROSOFT_CLIENT_ID (edit it there). |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Worker | - | Shared with the server: references Twenty.STORAGE_S3_ACCESS_KEY_ID (edit it there). |
| `AUTH_GOOGLE_CLIENT_SECRET` | Twenty Worker | (secret) | Shared with the server: references Twenty.AUTH_GOOGLE_CLIENT_SECRET (edit it there). |
| `AUTH_MICROSOFT_CALLBACK_URL` | Twenty Worker | - | Shared with the server: references Twenty.AUTH_MICROSOFT_CALLBACK_URL (edit it there). |
| `AUTH_MICROSOFT_CLIENT_SECRET` | Twenty Worker | (secret) | Shared with the server: references Twenty.AUTH_MICROSOFT_CLIENT_SECRET (edit it there). |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | Shared with the server: references Twenty.STORAGE_S3_SECRET_ACCESS_KEY (edit it there). |
| `AUTH_GOOGLE_APIS_CALLBACK_URL` | Twenty Worker | - | Shared with the server: references Twenty.AUTH_GOOGLE_APIS_CALLBACK_URL (edit it there). |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | Cron jobs are registered by the server. |
| `AUTH_MICROSOFT_APIS_CALLBACK_URL` | Twenty Worker | - | Shared with the server: references Twenty.AUTH_MICROSOFT_APIS_CALLBACK_URL (edit it there). |
| `CALENDAR_PROVIDER_GOOGLE_ENABLED` | Twenty Worker | - | Shared with the server: references Twenty.CALENDAR_PROVIDER_GOOGLE_ENABLED (edit it there). |
| `MESSAGING_PROVIDER_GMAIL_ENABLED` | Twenty Worker | - | Shared with the server: references Twenty.MESSAGING_PROVIDER_GMAIL_ENABLED (edit it there). |
| `CALENDAR_PROVIDER_MICROSOFT_ENABLED` | Twenty Worker | - | Shared with the server: references Twenty.CALENDAR_PROVIDER_MICROSOFT_ENABLED (edit it there). |
| `MESSAGING_PROVIDER_MICROSOFT_ENABLED` | Twenty Worker | - | Shared with the server: references Twenty.MESSAGING_PROVIDER_MICROSOFT_ENABLED (edit it there). |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `yarn worker:prod`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --maxmemory-policy noeviction"`
- **Volume:** `/data`

**Category:** Other · **Tags:** twenty, crm, sales, open-source, salesforce-alternative

[View on Railway →](https://railway.com/deploy/twenty-v2-crm-sales-workspace)
