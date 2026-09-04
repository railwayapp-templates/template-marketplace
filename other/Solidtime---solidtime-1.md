# Deploy Solidtime on Railway

Open source time tracking for freelancers and agencies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/solidtime-1)

## About

solidtime is a modern open-source time tracker for freelancers and agencies who need to know exactly where billable hours went. It covers time entries, projects, tasks, clients, billable rates, multiple organizations under one login, roles and permissions, and reporting exported as CSV or PDF. It is a Laravel 12 app with a Vue/Inertia front end on FrankenPHP and Laravel Octane, licensed AGPL-3.0, with a REST API, a desktop app and browser extensions. Self-host solidtime and every timestamp, client name and rate stays on infrastructure you control.

Deploy solidtime on Railway and you get the full production topology, not one container. `solidtime` is the public web service on port 8000, `worker` runs the Laravel queue worker, `scheduler` runs recurring jobs under supercronic, `gotenberg` renders report PDFs, and `mailpit` captures outgoing mail so invitations and password resets are readable straight away. Managed `Postgres` holds the schema, sessions and job queue; managed `Redis` holds the cache. A `solidtime-files` bucket stores exports and imports, and a volume keeps profile photos. Only the web app and the inbox face the internet.

![Railway services behind solidtime, from web tier to Postgres](https://res.cloudinary.com/rroe4rtk/image/upload/v1788408435/solidtime-architecture.png)

Hosted trackers charge per seat and keep your client list, rates and hours on someone else's servers. Self-hosted solidtime removes both: the AGPL-3.0 core is free for any number of users and the data sits in your own Postgres. Teams run it for data residency, client confidentiality, or to stop paying per seat.

- Live timer, manual entry and bulk editing of time entries
- Projects, tasks and clients with per-project and per-member billable rates
- Reporting with grouping and filtering, exported to CSV, PDF, XLSX or ODS
- Imports from Toggl, Clockify and generic CSV
- A documented REST API, a desktop app and browser extensions

solidtime is a queue-backed Laravel app, which is why the template is more than one box: Octane answers requests, the worker drains jobs such as exports and mail, and the scheduler fires Laravel's recurring tasks each minute.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| gotenberg | `gotenberg/gotenberg:8` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| worker | [gridalpha/solidtime-railway](https://github.com/gridalpha/solidtime-railway) | Worker |
| mailpit | `axllent/mailpit:latest` | Web service |
| solidtime | [gridalpha/solidtime-railway](https://github.com/gridalpha/solidtime-railway) | Web service |
| scheduler | [gridalpha/solidtime-railway](https://github.com/gridalpha/solidtime-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias |
| `REDISPORT` | Redis | 6379 | Data panel alias |
| `REDISUSER` | Redis | default | Data panel alias |
| `REDIS_URL` | Redis | - | Private connection URL |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias |
| `REDIS_PASSWORD` | Redis | (secret) | Redis auth password |
| `PORT` | gotenberg | 3000 | API port, also the health check port |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection URL |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | worker | 8080 | Port for the wrapper's liveness endpoint |
| `APP_ENV` | worker | production | Matches the web service |
| `APP_URL` | worker | - | Base URL for links in queued mail |
| `DB_HOST` | worker | - | Private Postgres hostname |
| `DB_PORT` | worker | - | Postgres port |
| `APP_NAME` | worker | solidtime | Product name used in queued mail |
| `APP_DEBUG` | worker | false | Never true on a public instance |
| `LOG_LEVEL` | worker | info | Minimum level written to the log |
| `MAIL_HOST` | worker | - | Private SMTP host |
| `MAIL_PORT` | worker | 1025 | Private SMTP port |
| `REDIS_URL` | worker | - | Private Redis URL used for the cache |
| `S3_BUCKET` | worker | - | Bucket name |
| `S3_REGION` | worker | - | Bucket region |
| `DB_DATABASE` | worker | - | Database name |
| `DB_PASSWORD` | worker | (secret) | Database password |
| `DB_USERNAME` | worker | (secret) | Database user |
| `LOG_CHANNEL` | worker | stderr | Send logs to the deploy log |
| `MAIL_MAILER` | worker | smtp | Send mail over SMTP |
| `S3_ENDPOINT` | worker | - | S3-compatible endpoint URL |
| `CACHE_DRIVER` | worker | redis | Shared cache across roles |
| `DB_CONNECTION` | worker | pgsql | solidtime supports PostgreSQL only |
| `GOTENBERG_URL` | worker | - | PDF rendering service |
| `CONTAINER_MODE` | worker | worker | Runs the Laravel queue worker role |
| `MAIL_FROM_NAME` | worker | solidtime | From name on outgoing mail |
| `SESSION_DRIVER` | worker | database | Matches the web service |
| `WORKER_COMMAND` | worker | php /var/www/html/artisan queue:work --queue=default --sleep=3 --tries=3 --timeout=300 --max-time=3600 | Command supervised in worker mode |
| `APP_FORCE_HTTPS` | worker | true | Generate https URLs |
| `FILESYSTEM_DISK` | worker | s3 | Exports written here are downloaded through the web service |
| `MAIL_ENCRYPTION` | worker | null | The bundled inbox advertises no STARTTLS |
| `QUEUE_CONNECTION` | worker | database | Queue backed by Postgres |
| `S3_ACCESS_KEY_ID` | worker | - | Bucket access key |
| `MAIL_FROM_ADDRESS` | worker | - | From address on outgoing mail |
| `S3_SECRET_ACCESS_KEY` | worker | (secret) | Bucket secret key |
| `PUBLIC_FILESYSTEM_DISK` | worker | public | Matches the web service |
| `S3_USE_PATH_STYLE_ENDPOINT` | worker | true | Path-style addressing, required here |
| `TZ` | mailpit | UTC | Timestamps in the inbox |
| `PORT` | mailpit | 8025 | Inbox web UI port |
| `SMTP_HOST` | mailpit | mailpit.railway.internal | Private SMTP hostname for solidtime |
| `SMTP_PORT` | mailpit | 1025 | Private SMTP port for solidtime |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web UI listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, dual-stack for private callers |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `PORT` | solidtime | 8000 | Port the image's supervisor gives Octane |
| `APP_ENV` | solidtime | production | Enables the production config and the API rate limits |
| `APP_URL` | solidtime | - | Base URL for links and the Host check |
| `DB_HOST` | solidtime | - | Private Postgres hostname |
| `DB_PORT` | solidtime | - | Postgres port |
| `APP_NAME` | solidtime | solidtime | Product name shown in the UI and in mail |
| `APP_DEBUG` | solidtime | false | Never true on a public instance |
| `LOG_LEVEL` | solidtime | info | Minimum level written to the log |
| `MAIL_HOST` | solidtime | - | Private SMTP host |
| `MAIL_PORT` | solidtime | 1025 | Private SMTP port |
| `REDIS_URL` | solidtime | - | Private Redis URL used for the cache |
| `S3_BUCKET` | solidtime | - | Bucket name |
| `S3_REGION` | solidtime | - | Bucket region |
| `ADMIN_NAME` | solidtime | Admin User | First administrator's display name |
| `ADMIN_EMAIL` | solidtime | admin@example.com | First administrator, created on first boot |
| `DB_DATABASE` | solidtime | - | Database name |
| `DB_PASSWORD` | solidtime | (secret) | Database password |
| `DB_USERNAME` | solidtime | (secret) | Database user |
| `LOG_CHANNEL` | solidtime | stderr | Send logs to the deploy log rather than a file |
| `MAIL_MAILER` | solidtime | smtp | Send mail over SMTP |
| `S3_ENDPOINT` | solidtime | - | S3-compatible endpoint URL |
| `CACHE_DRIVER` | solidtime | redis | Shared cache across the web, worker and scheduler roles |
| `SUPER_ADMINS` | solidtime | - | Comma separated emails that reach the admin panel at /admin |
| `DB_CONNECTION` | solidtime | pgsql | solidtime supports PostgreSQL only |
| `GOTENBERG_URL` | solidtime | - | PDF rendering service |
| `OCTANE_SERVER` | solidtime | frankenphp | Application server the image ships |
| `TRUSTED_HOSTS` | solidtime | healthcheck.railway.app | Extra hostnames accepted besides APP_URL |
| `ADMIN_PASSWORD` | solidtime | (secret) | First administrator's password, change after login |
| `CONTAINER_MODE` | solidtime | http | Runs the FrankenPHP web server role |
| `MAIL_FROM_NAME` | solidtime | solidtime | From name on outgoing mail |
| `SESSION_DRIVER` | solidtime | database | Sessions survive a redeploy and are shared across replicas |
| `APP_FORCE_HTTPS` | solidtime | true | Generate https URLs behind Railway's edge |
| `FILESYSTEM_DISK` | solidtime | s3 | Private files (report exports, imports) live in the bucket |
| `MAIL_ENCRYPTION` | solidtime | null | The bundled inbox advertises no STARTTLS |
| `TRUSTED_PROXIES` | solidtime | 0.0.0.0/0,::/0 | Trust every hop, so the leftmost X-Forwarded-For entry wins |
| `AUDITING_ENABLED` | solidtime | true | Record an audit trail of model changes |
| `QUEUE_CONNECTION` | solidtime | database | Queue backed by Postgres, drained by the worker service |
| `S3_ACCESS_KEY_ID` | solidtime | - | Bucket access key |
| `SESSION_LIFETIME` | solidtime | 120 | Session lifetime in minutes |
| `MAIL_FROM_ADDRESS` | solidtime | - | From address on outgoing mail |
| `TELESCOPE_ENABLED` | solidtime | false | Laravel Telescope stays off in production |
| `S3_SECRET_ACCESS_KEY` | solidtime | (secret) | Bucket secret key |
| `PUBLIC_FILESYSTEM_DISK` | solidtime | public | Profile photos stay on the volume, which is served over HTTP |
| `APP_ENABLE_REGISTRATION` | solidtime | invite-only | on, invite-only or off |
| `S3_USE_PATH_STYLE_ENDPOINT` | solidtime | true | Path-style addressing, required here |
| `PORT` | scheduler | 8080 | Port for the wrapper's liveness endpoint |
| `APP_ENV` | scheduler | production | Matches the web service |
| `APP_URL` | scheduler | - | Base URL for links in scheduled mail |
| `DB_HOST` | scheduler | - | Private Postgres hostname |
| `DB_PORT` | scheduler | - | Postgres port |
| `APP_NAME` | scheduler | solidtime | Product name used in scheduled mail |
| `APP_DEBUG` | scheduler | false | Never true on a public instance |
| `LOG_LEVEL` | scheduler | info | Minimum level written to the log |
| `MAIL_HOST` | scheduler | - | Private SMTP host |
| `MAIL_PORT` | scheduler | 1025 | Private SMTP port |
| `REDIS_URL` | scheduler | - | Private Redis URL used for the cache |
| `S3_BUCKET` | scheduler | - | Bucket name |
| `S3_REGION` | scheduler | - | Bucket region |
| `DB_DATABASE` | scheduler | - | Database name |
| `DB_PASSWORD` | scheduler | (secret) | Database password |
| `DB_USERNAME` | scheduler | (secret) | Database user |
| `LOG_CHANNEL` | scheduler | stderr | Send logs to the deploy log |
| `MAIL_MAILER` | scheduler | smtp | Send mail over SMTP |
| `S3_ENDPOINT` | scheduler | - | S3-compatible endpoint URL |
| `CACHE_DRIVER` | scheduler | redis | Shared cache across roles |
| `DB_CONNECTION` | scheduler | pgsql | solidtime supports PostgreSQL only |
| `GOTENBERG_URL` | scheduler | - | PDF rendering service |
| `CONTAINER_MODE` | scheduler | scheduler | Runs artisan schedule:run every minute |
| `MAIL_FROM_NAME` | scheduler | solidtime | From name on outgoing mail |
| `SESSION_DRIVER` | scheduler | database | Matches the web service |
| `APP_FORCE_HTTPS` | scheduler | true | Generate https URLs |
| `FILESYSTEM_DISK` | scheduler | s3 | Matches the web service |
| `MAIL_ENCRYPTION` | scheduler | null | The bundled inbox advertises no STARTTLS |
| `QUEUE_CONNECTION` | scheduler | database | Scheduled work is dispatched onto the same queue |
| `S3_ACCESS_KEY_ID` | scheduler | - | Bucket access key |
| `MAIL_FROM_ADDRESS` | scheduler | - | From address on outgoing mail |
| `S3_SECRET_ACCESS_KEY` | scheduler | (secret) | Bucket secret key |
| `PUBLIC_FILESYSTEM_DISK` | scheduler | public | Matches the web service |
| `S3_USE_PATH_STYLE_ENDPOINT` | scheduler | true | Path-style addressing, required here |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/login`
- **Volume:** `/var/www/html/storage/app/public`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/solidtime-1)
