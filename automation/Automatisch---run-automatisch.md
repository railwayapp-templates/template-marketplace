# Deploy Automatisch on Railway

No-code visual workflow builder that connects your apps and automates tasks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/run-automatisch)

## About

Automatisch is an open-source business automation tool — a self-hosted Zapier alternative that connects services like Slack, GitHub, Google Sheets, Telegram and Stripe into workflows you build visually, with no code. Pick a trigger, chain actions onto it, map data between steps, and publish. Teams self-host Automatisch when the data in those workflows cannot leave their own infrastructure — customer records, invoices, support tickets — which is why it turns up in healthcare, finance and GDPR-bound European companies. It is AGPL-licensed, so there is no per-task pricing and no lock-in.

This template runs Automatisch in the shape its own production docs describe, not one all-in-one container. `automatisch` serves the web UI, the REST API and the public webhook endpoint. `automatisch-worker` is a separate BullMQ worker that executes flows, polls triggers and sends mail, so a slow third-party API never blocks a page load. `Postgres` stores flows, encrypted credentials, execution history and the built-in datastore; `Redis` carries the job queues; `mailpit` captures password-reset and invitation mail so those flows work on the first deploy with no SMTP account. Only the app and the inbox get public URLs.

![Automatisch web and worker services beside Postgres, Redis and Mailpit](https://res.cloudinary.com/rroe4rtk/image/upload/v1788862895/automatisch-architecture.png)

Automatisch is narrower than a general-purpose workflow engine: it connects service A to service B when something happens, with a UI a non-developer can drive. Self-host it when the workflows carry data you would rather not hand to a vendor, or when per-task pricing has become the dominant cost.

- Visual flow editor with a variable picker that maps data between steps
- Around 80 integrations, plus helpers: Formatter, Filter, Delay, HTTP Request, Datastore
- Incoming webhooks with a per-flow URL; instant or polled triggers
- Encrypted storage of every connected account's credentials
- Execution history with per-step input and output, so a failed run is debuggable
- Multi-user support with an admin role

The split matters before you scale. `automatisch` handles HTTP, enqueues work and runs migrations on boot; `automatisch-worker` consumes the queues and runs the flow steps. Both build from the same image and must stay on the same version, since they share one schema and queue format.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| automatisch-worker | [gridalpha/automatisch-railway](https://github.com/gridalpha/automatisch-railway) | Worker |
| automatisch | [gridalpha/automatisch-railway](https://github.com/gridalpha/automatisch-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `HOST` | automatisch-worker | - | Public hostname of the app |
| `PORT` | automatisch-worker | 3000 | Port for the worker health endpoint |
| `WORKER` | automatisch-worker | true | Selects the queue worker role |
| `API_URL` | automatisch-worker | - | Public API base URL |
| `APP_ENV` | automatisch-worker | production | Application environment |
| `PROTOCOL` | automatisch-worker | https | Scheme used in generated URLs |
| `SMTP_HOST` | automatisch-worker | - | Outbound mail host |
| `SMTP_PORT` | automatisch-worker | 1025 | Mailpit plain SMTP port |
| `FROM_EMAIL` | automatisch-worker | - | Sender address for app mail |
| `REDIS_HOST` | automatisch-worker | - | Private Redis hostname |
| `REDIS_PORT` | automatisch-worker | 6379 | Redis port |
| `SMTP_SECURE` | automatisch-worker | false | Plain listener advertises no TLS |
| `WEBHOOK_URL` | automatisch-worker | - | Base URL for per-flow webhooks |
| `WEB_APP_URL` | automatisch-worker | - | Public web app URL |
| `POSTGRES_HOST` | automatisch-worker | - | Private Postgres hostname |
| `POSTGRES_PORT` | automatisch-worker | 5432 | Postgres port |
| `APP_SECRET_KEY` | automatisch-worker | (secret) | Must match the app exactly |
| `ENCRYPTION_KEY` | automatisch-worker | - | Must match the app exactly |
| `REDIS_PASSWORD` | automatisch-worker | (secret) | Redis password |
| `REDIS_USERNAME` | automatisch-worker | (secret) | Redis username |
| `POSTGRES_DATABASE` | automatisch-worker | - | Database name |
| `POSTGRES_PASSWORD` | automatisch-worker | (secret) | Database password |
| `POSTGRES_USERNAME` | automatisch-worker | (secret) | Database user |
| `TELEMETRY_ENABLED` | automatisch-worker | false | Disables upstream usage reporting |
| `WEBHOOK_SECRET_KEY` | automatisch-worker | (secret) | Must match the app exactly |
| `POSTGRES_ENABLE_SSL` | automatisch-worker | false | Private network needs no TLS |
| `HOST` | automatisch | - | Public hostname |
| `PORT` | automatisch | 3000 | HTTP port the web server binds |
| `API_URL` | automatisch | - | Public API base URL |
| `APP_ENV` | automatisch | production | Application environment |
| `PROTOCOL` | automatisch | https | Scheme used in generated URLs |
| `SMTP_HOST` | automatisch | - | Outbound mail host |
| `SMTP_PORT` | automatisch | 1025 | Mailpit plain SMTP port |
| `FROM_EMAIL` | automatisch | - | Sender address for app mail |
| `REDIS_HOST` | automatisch | - | Private Redis hostname |
| `REDIS_PORT` | automatisch | 6379 | Redis port |
| `ADMIN_EMAIL` | automatisch | admin@example.com | Email of the first administrator |
| `SMTP_SECURE` | automatisch | false | Plain listener advertises no TLS |
| `WEBHOOK_URL` | automatisch | - | Base URL for per-flow webhooks |
| `WEB_APP_URL` | automatisch | - | Public web app URL and CORS origin |
| `POSTGRES_HOST` | automatisch | - | Private Postgres hostname |
| `POSTGRES_PORT` | automatisch | 5432 | Postgres port |
| `ADMIN_PASSWORD` | automatisch | (secret) | Password of the first administrator |
| `APP_SECRET_KEY` | automatisch | (secret) | Application signing key |
| `ENCRYPTION_KEY` | automatisch | - | Encrypts stored app credentials |
| `REDIS_PASSWORD` | automatisch | (secret) | Redis password |
| `REDIS_USERNAME` | automatisch | (secret) | Redis username |
| `ADMIN_FULL_NAME` | automatisch | Admin | Display name of the first administrator |
| `POSTGRES_DATABASE` | automatisch | - | Database name |
| `POSTGRES_PASSWORD` | automatisch | (secret) | Database password |
| `POSTGRES_USERNAME` | automatisch | (secret) | Database user |
| `TELEMETRY_ENABLED` | automatisch | false | Disables upstream usage reporting |
| `WEBHOOK_SECRET_KEY` | automatisch | (secret) | Signs per-flow webhook URLs |
| `POSTGRES_ENABLE_SSL` | automatisch | false | Private network needs no TLS |
| `ENABLE_BULLMQ_DASHBOARD` | automatisch | true | Serves the queue dashboard at /admin/queues |
| `BULLMQ_DASHBOARD_PASSWORD` | automatisch | (secret) | Queue dashboard basic-auth password |
| `BULLMQ_DASHBOARD_USERNAME` | automatisch | (secret) | Queue dashboard basic-auth user |
| `PORT` | mailpit | 8025 | Web inbox port Railway probes |
| `MP_UI_AUTH` | mailpit | - | Basic auth on the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for private SMTP |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Automation · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/run-automatisch)
