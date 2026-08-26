# Deploy Bugsink on Railway

Error tracking that shows you the stacktrace behind every crash

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bugsink-error-tracking)

## About

Bugsink is self-hosted error tracking that speaks the Sentry protocol. Point any Sentry SDK — Python, JavaScript, PHP, Go, Ruby, Java, Rust — at a Bugsink DSN instead of Sentry's, and exceptions arrive with the full stacktrace, the source line that raised, tags, breadcrumbs and release. Teams pick this Sentry alternative when they want crash reports on their own infrastructure without Sentry's forty-container install. It is a small Django application: one web process, one background worker, one database.

Deploying Bugsink on Railway gives you three services wired together and ready to receive events. **Bugsink** serves the web UI and the ingest API behind a public HTTPS domain, with its background task runner in the same container. **PostgreSQL** stores issues, event metadata, tags, users and sessions. **Mailpit** captures the alert email sent on each new issue, so notifications work the moment the deploy finishes and can later relay to a real provider. A volume holds event payloads and uploaded artifacts as flat files.

![Diagram of the Bugsink, Postgres and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787619656/bugsink-architecture.png)

Error tracking answers one question well: what broke, where, and how often. Bugsink does that and stops there — no tracing, no session replay, no metrics — which is why it fits in one container while Sentry's self-hosted distribution needs Kafka, ClickHouse, Snuba, Relay and a fleet of consumers. Crash reports carry stack frames, local variables, request URLs and user identifiers, and self-hosting keeps that off third-party servers.

Key features:

- Full compatibility with the open-source Sentry SDKs — migration is a DSN change
- Stacktraces with source context, local variables and column-accurate frames
- Grouping that ignores variable values such as IDs and IP addresses
- Email alerts on new and regressed issues, with a per-hour limit
- Tags, search, releases, sourcemaps and a REST API with auth tokens

Of the Sentry-compatible trackers, Bugsink is the smallest:

| | Bugsink | Sentry (self-hosted) | GlitchTip |
|---|---|---|---|
| Containers | 1 | 40+ | 4 |
| RAM (documented) | 512 MB | 16 GB | 256 MB |
| Scope | Errors | Errors, tracing, replay | Errors, uptime |

The architecture is deliberately flat. Snappea, Bugsink's task runner, uses a container-local queue and its authors require one web process, one task runner and one container per instance, so there is no worker tier to scale. The volume at `/data` takes event payloads and uploads, which is what Bugsink recommends once ingestion grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| bugsink | [gridalpha/bugsink-railway](https://github.com/gridalpha/bugsink-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | bugsink | 8000 | HTTP port gunicorn binds |
| `BASE_URL` | bugsink | - | Public URL used in DSNs and mail |
| `TIME_ZONE` | bugsink | UTC | Default display time zone |
| `EMAIL_HOST` | bugsink | - | SMTP host for alert mail |
| `EMAIL_PORT` | bugsink | 1025 | Mailpit plain SMTP port |
| `SECRET_KEY` | bugsink | (secret) | Django signing key, 50+ chars required |
| `SITE_TITLE` | bugsink | Bugsink | Name shown in the UI |
| `DATABASE_URL` | bugsink | - | PostgreSQL connection string |
| `ALLOWED_HOSTS` | bugsink | * | Accepted Host headers; edge already filters |
| `EMAIL_USE_SSL` | bugsink | false | No implicit TLS either |
| `EMAIL_USE_TLS` | bugsink | false | Mailpit 1025 offers no STARTTLS |
| `CREATE_SUPERUSER` | bugsink | - | First admin, email:password |
| `BEHIND_HTTPS_PROXY` | bugsink | true | Secure cookies, proxy scheme and client IP |
| `DEFAULT_FROM_EMAIL` | bugsink | - | Alert sender address |
| `FILE_EVENT_STORAGE_PATH` | bugsink | /data/events | Event payload directory on the volume |
| `FILE_OBJECT_STORAGE_PATH` | bugsink | /data/files | Uploaded artifact directory on the volume |
| `FILE_EVENT_STORAGE_USE_FOR_WRITE` | bugsink | true | Write new events to that directory |
| `FILE_OBJECT_STORAGE_USE_FOR_WRITE` | bugsink | true | Write new uploads to that directory |
| `PORT` | mailpit | 8025 | Web inbox port probed by the health check |
| `MP_UI_AUTH` | mailpit | - | Basic auth protecting the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for private SMTP |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/livez`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bugsink-error-tracking)
