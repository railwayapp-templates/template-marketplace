# Deploy solidtime ⁂ Postgres, Redis, S3 on Railway

Open-source time-tracking tool designed for freelancers and teams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/WaxghR)

## About

Deploy a complete, production-ready solidtime time-tracking stack on Railway in one click. This template includes the solidtime web service, scheduler and worker containers for background jobs, Postgres for data persistence, and Redis for caching and session storage—all configured with private networking so your database is never exposed to the internet.

Solidtime is an open-source, self-hosted time-tracking tool designed for freelancers and teams. It offers features like granular roles and permissions, cross-platform compatibility via a PWA, and system notifications. Users can import data from other time trackers like Toggl and Clockify. The platform also plans to include billing and invoicing features soon. Solidtime can be used as a hosted SaaS solution or set up on-premise, with support for enterprise installations.

This Railway template deploys a complete, production-ready solidtime stack:
- **solidtime** web service (HTTP frontend + API)
- **solidtime-scheduler** background service (task scheduling)
- **solidtime-worker** background service (email, queued jobs)
- **Postgres** database (primary data store)
- **Redis** cache/session store

All services run on Railway's private network, eliminating the need to expose your database to the public internet.

For more information about Solidtime, visit [Solidtime](https://www.solidtime.io/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| solidtime-worker | `solidtime/solidtime:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| solidtime-scheduler | `solidtime/solidtime:latest` | Worker |
| solidtime | `solidtime/solidtime:latest` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `APP_KEY` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `APP_URL` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_HOST` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_PORT` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `APP_DEBUG` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `LOG_LEVEL` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_SSLMODE` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `REDIS_HOST` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `REDIS_PORT` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_DATABASE` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_PASSWORD` | solidtime-worker | (secret) | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_USERNAME` | solidtime-worker | (secret) | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `LOG_CHANNEL` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `CACHE_DRIVER` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_CONNECTION` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `CONTAINER_MODE` | solidtime-worker | worker | Which role this container plays. Fixed to "worker" so this instance processes the background job queue instead of serving HTTP traffic. |
| `REDIS_PASSWORD` | solidtime-worker | (secret) | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `SESSION_DRIVER` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `AUTO_DB_MIGRATE` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `FILESYSTEM_DISK` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `QUEUE_CONNECTION` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `PASSPORT_PUBLIC_KEY` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `PASSPORT_PRIVATE_KEY` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `PUBLIC_FILESYSTEM_DISK` | solidtime-worker | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot. |
| `DATABASE_URL` | Postgres | - | Full Postgres connection string for private networking (use this from other services on Railway). |
| `POSTGRES_USER` | Postgres | (secret) | Superuser role created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the Postgres superuser role. Auto-generated — do not share. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Full Postgres connection string reachable from outside Railway's private network. Only needed for external clients. |
| `APP_ENV` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `APP_KEY` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `APP_URL` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_HOST` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_PORT` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `APP_DEBUG` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `LOG_LEVEL` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_SSLMODE` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `REDIS_HOST` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `REDIS_PORT` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_DATABASE` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_PASSWORD` | solidtime-scheduler | (secret) | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_USERNAME` | solidtime-scheduler | (secret) | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `LOG_CHANNEL` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `CACHE_DRIVER` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `DB_CONNECTION` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `CONTAINER_MODE` | solidtime-scheduler | scheduler | Which role this container plays. Fixed to "scheduler" so this instance runs Laravel's task scheduler instead of serving HTTP traffic. |
| `REDIS_PASSWORD` | solidtime-scheduler | (secret) | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `SESSION_DRIVER` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `AUTO_DB_MIGRATE` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `FILESYSTEM_DISK` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `QUEUE_CONNECTION` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `PASSPORT_PUBLIC_KEY` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `PASSPORT_PRIVATE_KEY` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `PUBLIC_FILESYSTEM_DISK` | solidtime-scheduler | - | Mirrors the solidtime service's own variable of the same name via a service reference — configure it there; this copy stays in sync automatically. |
| `INFO` | solidtime | - | For info, go to my Github page: https://github.com/hellocory/railway-solidtime-one-click-install [YOU MAY DELETE THIS VARIABLE] |
| `PORT` | solidtime | 8000 | Port the app listens on inside the container. |
| `APP_ENV` | solidtime | production | "production" or "development". |
| `APP_KEY` | solidtime | - | Laravel's encryption key. Auto-generated — don't change this after deploy or existing sessions/encrypted data break. |
| `APP_URL` | solidtime | - | Public URL of this service. Defaults to Railway's generated domain — override only if you attach a custom domain. |
| `DB_HOST` | solidtime | - | Postgres hostname, wired to the bundled Postgres service. |
| `DB_PORT` | solidtime | - | Postgres port, wired to the bundled Postgres service. |
| `APP_NAME` | solidtime | solidtime | Display name shown in the app and in emails. |
| `APP_DEBUG` | solidtime | false | Keep false in production — true exposes stack traces to visitors. |
| `LOG_LEVEL` | solidtime | debug | Minimum log severity written to the service logs. |
| `MAIL_HOST` | solidtime | - | SMTP server hostname, only used when MAIL_MAILER is "smtp". |
| `MAIL_PORT` | solidtime | 587 | SMTP server port, only used when MAIL_MAILER is "smtp". |
| `S3_BUCKET` | solidtime | mybucket | Change filesystem (public or private) to "s3" if you use this. |
| `S3_REGION` | solidtime | us-west-2 | Change filesystem (public or private) to "s3" if you use this. |
| `APP_DOMAIN` | solidtime | - | Hostname portion of APP_URL, used for cookie scoping and CORS. Should match the domain in APP_URL without the scheme. |
| `DB_SSLMODE` | solidtime | require | Postgres SSL mode; "require" matches Railway's managed Postgres. |
| `REDIS_HOST` | solidtime | - | Redis hostname, wired to the bundled Redis service. |
| `REDIS_PORT` | solidtime | - | Redis port, wired to the bundled Redis service. |
| `DB_DATABASE` | solidtime | - | Postgres database name, wired to the bundled Postgres service. |
| `DB_PASSWORD` | solidtime | (secret) | Postgres password, wired to the bundled Postgres service. |
| `DB_USERNAME` | solidtime | (secret) | Postgres username, wired to the bundled Postgres service. |
| `LOG_CHANNEL` | solidtime | stderr | Where logs are written; "stderr" is correct for a container platform like Railway. |
| `MAIL_MAILER` | solidtime | log | Email transport. Defaults to "log" (prints emails to this service's logs) so first boot doesn't need SMTP configured. Set to "smtp" and fill in the MAIL_* fields for real email delivery. |
| `S3_ENDPOINT` | solidtime | us-west-2.amazonaws.com | Change filesystem (public or private) to "s3" if you use this. |
| `CACHE_DRIVER` | solidtime | redis | Cache backend. "redis" uses the bundled Redis service instead of the slower default file-based cache. |
| `SUPER_ADMINS` | solidtime | some@admin.com,someother@admin.com | Admins by email separated by commas. |
| `DB_CONNECTION` | solidtime | pgsql | Database driver; solidtime requires "pgsql". |
| `MAIL_PASSWORD` | solidtime | (secret) | SMTP password, only used when MAIL_MAILER is "smtp". |
| `MAIL_USERNAME` | solidtime | (secret) | SMTP username, only used when MAIL_MAILER is "smtp". |
| `OCTANE_SERVER` | solidtime | frankenphp | Which Octane application server to run. Required now that the image's own startup script handles process launching — this image is built on FrankenPHP. |
| `VITE_APP_NAME` | solidtime | solidtime | App name baked into the frontend build at build time; keep in sync with APP_NAME. |
| `CONTAINER_MODE` | solidtime | http | Which role this container plays: "http" serves the web app. Don't change this on this service — the scheduler and worker services in this template run the other roles. |
| `MAIL_FROM_NAME` | solidtime | solidtime | Display name on outgoing emails. |
| `REDIS_PASSWORD` | solidtime | (secret) | Redis password, wired to the bundled Redis service. |
| `SESSION_DRIVER` | solidtime | redis | Session storage backend. "redis" uses the bundled Redis service instead of the default database-backed sessions. |
| `APP_FORCE_HTTPS` | solidtime | true | Forces HTTPS redirects and URLs; correct behind Railway's HTTPS-terminating proxy. |
| `AUTO_DB_MIGRATE` | solidtime | true | Runs pending database migrations automatically on boot. Safe to leave true — migrations are idempotent. |
| `FILESYSTEM_DISK` | solidtime | local | "local" by default. |
| `MAIL_ENCRYPTION` | solidtime | tls | SMTP encryption mode, only used when MAIL_MAILER is "smtp". |
| `TRUSTED_PROXIES` | solidtime | 0.0.0.0/0,2000:0:0:0:0:0:0:0/3 | IP ranges trusted to set forwarding headers. Trusting all ranges is correct here because Railway's edge is the only way to reach this container. |
| `QUEUE_CONNECTION` | solidtime | database | Where queued jobs (emails, exports) are stored; "database" is processed by this template's separate worker service. |
| `S3_ACCESS_KEY_ID` | solidtime | 123456 | Change filesystem (public or private) to "s3" if you use this. |
| `MAIL_FROM_ADDRESS` | solidtime | no-reply@your-domain.com | Sender address on outgoing emails, only used when MAIL_MAILER is "smtp". |
| `PASSPORT_PUBLIC_KEY` | solidtime | - | RSA keypair solidtime uses to sign OAuth/API tokens. Required before the app works. Generate both by running 'docker run --rm solidtime/solidtime:latest php artisan self-host:generate-keys' and pasting the two PEM values here, then redeploy this service — see README. |
| `PASSPORT_PRIVATE_KEY` | solidtime | - | RSA keypair solidtime uses to sign OAuth/API tokens. Required before the app works. Generate both by running 'docker run --rm solidtime/solidtime:latest php artisan self-host:generate-keys' and pasting the two PEM values here, then redeploy this service — see README. |
| `S3_SECRET_ACCESS_KEY` | solidtime | (secret) | Change filesystem (public or private) to "s3" if you use this. |
| `PUBLIC_FILESYSTEM_DISK` | solidtime | public | "public" by default. |
| `PAGINATION_PER_PAGE_DEFAULT` | solidtime | 500 | Default number of rows per page in list views. |
| `REDISHOST` | Redis | - | Internal hostname the Redis instance listens on. |
| `REDISPORT` | Redis | 6379 | Internal port the Redis instance listens on. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | Full Redis connection string for private networking (use this from other services on Railway). |
| `REDISPASSWORD` | Redis | (secret) | Password for the Redis instance. Auto-generated — do not share. |
| `REDIS_PASSWORD` | Redis | (secret) | Password for the Redis instance. Auto-generated — do not share. |
| `REDIS_PUBLIC_URL` | Redis | - | Redis connection string reachable from outside Railway's private network. Only needed for external clients. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health-check/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/app`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/WaxghR)
