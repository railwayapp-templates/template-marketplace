# Deploy Ever Gauzy on Railway

Business platform for employees, projects, time tracking and invoicing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gauzy)

## About

Ever Gauzy is an open-source business management platform folding ERP, CRM, HRM, ATS and project management into one application. Agencies and product teams use it to keep employees, clients, projects, tasks, timesheets, expenses and invoices in one database rather than across a time tracker, a spreadsheet and an accounting tool. It is multi-tenant, so one installation can serve several companies, each with its own organizations and permissions.

Deploy Ever Gauzy on Railway and you get four services wired together. **webapp** serves the Angular front end through nginx and rewrites its API origin at container start. **api** is the NestJS server that runs every migration and seeds the first administrator before it opens its port. **Postgres** stores every record; **Redis** backs the session store, the two-layer cache and the API's atomic counters. Uploads go to an object storage bucket and come back through presigned URLs, keeping both app services stateless.

![Gauzy web app and API services over Postgres and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789595551/ever-gauzy-architecture.webp)

Most teams reach for Gauzy when three or four SaaS subscriptions stop talking to each other: hours logged in one tool, invoices raised in another, headcount in a third. Self-hosting puts employee records, client contracts and financial data on infrastructure you control, which matters when a privacy rule covers it.

Key features:

- Employee directory with levels, positions, employment types and time off
- Projects and tasks with teams, sprints, estimates and statuses
- Time tracking, timesheets and activity reports that feed billing
- Invoices, estimates, expenses, income, payments and recurring expenses
- Sales pipelines, deals, contacts, leads and candidate tracking
- Goals, KPIs and organization-wide reporting
- Multi-tenant, with a per-role permission matrix

The **api** service owns all business logic and is the only thing that talks to Postgres; it exposes a REST API under `/api` that the browser calls with a bearer token. The **webapp** service ships only static files and an nginx config, so it restarts instantly. **Redis** holds Passport sessions, the cache in front of hot queries and the API's atomic counters. Object storage takes every upload, so neither application service needs a volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| webapp | `ghcr.io/ever-co/gauzy-webapp:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| api | `ghcr.io/ever-co/gauzy-api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `DEMO` | webapp | false | Hides demo-mode banners |
| `PORT` | webapp | 4200 | Port Railway health-checks |
| `API_HOST` | webapp | - | Private API hostname |
| `API_PORT` | webapp | 3000 | API port |
| `NODE_ENV` | webapp | production | Production runtime mode |
| `WEB_HOST` | webapp | 0.0.0.0 | nginx bind address |
| `WEB_PORT` | webapp | 4200 | nginx listener port |
| `API_BASE_URL` | webapp | - | API origin baked into the bundle at boot |
| `COMPANY_NAME` | webapp | Ever Co. LTD | Footer company name |
| `FILE_PROVIDER` | webapp | DIGITALOCEAN | Matches the API storage driver |
| `CLIENT_BASE_URL` | webapp | - | Public web app origin |
| `DEFAULT_COUNTRY` | webapp | US | Default country in new organizations |
| `POSTHOG_ENABLED` | webapp | false | Disables browser analytics |
| `DEFAULT_CURRENCY` | webapp | USD | Default currency in new organizations |
| `COMPANY_SITE_NAME` | webapp | Gauzy | Footer site name |
| `GOOGLE_PLACE_AUTOCOMPLETE` | webapp | false | Address autocomplete needs a Maps key |
| `SENTRY_TRACES_SAMPLE_RATE` | webapp | 0 | Disables browser tracing |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `DEMO` | api | false | Disables demo data seeding |
| `PORT` | api | 3000 | Port Railway health-checks |
| `DB_ORM` | api | typeorm | ORM selector |
| `DB_HOST` | api | - | Private Postgres hostname |
| `DB_NAME` | api | - | Database name |
| `DB_PASS` | api | - | Database password |
| `DB_PORT` | api | - | Postgres port |
| `DB_TYPE` | api | postgres | Database driver |
| `DB_USER` | api | (secret) | Database user |
| `API_HOST` | api | 0.0.0.0 | Bind address, not a hostname |
| `API_PORT` | api | 3000 | HTTP listener port |
| `APP_LINK` | api | - | Link used in emails |
| `APP_LOGO` | api | - | Logo used in emails |
| `APP_NAME` | api | Gauzy | Product name in emails and UI |
| `NODE_ENV` | api | production | Production runtime mode |
| `MAIL_HOST` | api | - | SMTP relay hostname |
| `MAIL_PORT` | api | 587 | SMTP relay port |
| `REDIS_URL` | api | - | Private Redis connection string |
| `DB_LOGGING` | api | error | Log only failed queries |
| `JWT_SECRET` | api | (secret) | Access token signing key |
| `CORP_POLICY` | api | cross-origin | Lets the web app load API assets |
| `DB_SSL_MODE` | api | false | Private network, no TLS |
| `API_BASE_URL` | api | - | Public API origin |
| `DB_POOL_SIZE` | api | 20 | TypeORM pool size |
| `NODE_OPTIONS` | api | --max-old-space-size=3584 | Node heap ceiling |
| `OTEL_ENABLED` | api | false | Disables OpenTelemetry export |
| `THROTTLE_TTL` | api | 60000 | Throttle window in ms |
| `APP_SIGNATURE` | api | Gauzy | Email signature |
| `FILE_PROVIDER` | api | DIGITALOCEAN | S3-compatible storage driver |
| `MAIL_PASSWORD` | api | (secret) | SMTP password |
| `MAIL_USERNAME` | api | (secret) | SMTP username |
| `REDIS_ENABLED` | api | true | Enables sessions and cache |
| `DB_SYNCHRONIZE` | api | false | False is what runs migrations |
| `THROTTLE_LIMIT` | api | 600 | Requests per window |
| `ALLOWED_ORIGINS` | api | - | CORS allow-list |
| `CLIENT_BASE_URL` | api | - | Public web app origin |
| `POSTHOG_ENABLED` | api | false | Disables product analytics |
| `DEMO_ADMIN_EMAIL` | api | org.admin@example.com | Seeded organization admin email |
| `THROTTLE_ENABLED` | api | true | Per-IP request throttling |
| `DB_POOL_SIZE_KNEX` | api | 5 | Knex pool size |
| `MAIL_FROM_ADDRESS` | api | - | From address on outgoing mail |
| `APP_MAGIC_SIGN_URL` | api | - | Magic sign-in landing page |
| `DEMO_ADMIN_PASSWORD` | api | (secret) | Seeded organization admin password |
| `DEMO_EMPLOYEE_EMAIL` | api | employee@example.com | Seeded employee email |
| `DIGITALOCEAN_REGION` | api | - | Bucket region |
| `WORKER_QUEUE_ENABLED` | api | false | No separate worker service |
| `DB_CONNECTION_TIMEOUT` | api | 10000 | Connect timeout in ms |
| `ALLOW_SUPER_ADMIN_ROLE` | api | true | Enables the super admin role |
| `DEMO_EMPLOYEE_PASSWORD` | api | (secret) | Seeded employee password |
| `DEMO_SUPER_ADMIN_EMAIL` | api | admin@example.com | First owner account email |
| `DIGITALOCEAN_S3_BUCKET` | api | - | Bucket name |
| `EXPRESS_SESSION_SECRET` | api | (secret) | Session cookie signing key |
| `DIGITALOCEAN_SERVICE_URL` | api | - | Bucket endpoint |
| `JWT_REFRESH_TOKEN_SECRET` | api | (secret) | Refresh token signing key |
| `SENTRY_PROFILING_ENABLED` | api | false | Disables Sentry profiling |
| `DEMO_SUPER_ADMIN_PASSWORD` | api | (secret) | First owner account password |
| `APP_EMAIL_CONFIRMATION_URL` | api | - | Email confirmation landing page |
| `DIGITALOCEAN_ACCESS_KEY_ID` | api | - | Bucket access key |
| `MAGIC_CODE_EXPIRATION_TIME` | api | 600 | Magic sign-in code lifetime |
| `SENTRY_HTTP_TRACING_ENABLED` | api | false | Disables Sentry HTTP tracing |
| `JWT_VERIFICATION_TOKEN_SECRET` | api | (secret) | Verification token signing key |
| `DIGITALOCEAN_SECRET_ACCESS_KEY` | api | (secret) | Bucket secret key |
| `DIGITALOCEAN_S3_FORCE_PATH_STYLE` | api | true | Path-style addressing, required |
| `SENTRY_POSTGRES_TRACKING_ENABLED` | api | false | Disables Sentry query tracing |
| `JWT_REFRESH_TOKEN_EXPIRATION_TIME` | api | (secret) | Refresh token lifetime, seconds |
| `JWT_VERIFICATION_TOKEN_EXPIRATION_TIME` | api | (secret) | Verification token lifetime, seconds |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gauzy)
