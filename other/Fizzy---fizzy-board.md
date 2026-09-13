# Deploy Fizzy on Railway

Kanban tracker for issues, ideas and small projects

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fizzy-board)

## About

Fizzy is the kanban tracker 37signals built for its own bugs, ideas and small projects — the same team behind Basecamp and HEY. Cards move through a handful of columns, every card carries a description, a checklist of steps, tags, reactions and attachments, and anything that sits ignored for too long bubbles back up on its own. Pages are fast, keyboard shortcuts are everywhere, and nothing stands between an idea and a card. Teams self-host Fizzy to get that workflow on their own domain, with their own data and no per-seat bill.

Deploy Fizzy on Railway and the whole production shape comes up at once. The `fizzy` service runs the Rails app behind Thruster on a public domain; `fizzy-jobs` runs the Solid Queue supervisor separately, so notifications, webhooks and cleanup never compete with web requests; `MySQL` stores boards, cards and the queue tables; a Railway object storage bucket holds every upload; and `mailpit` captures the six-digit sign-in codes Fizzy mails, so you can sign in without wiring up an SMTP provider first. Both app services are stateless, so redeploys and replicas are safe.

![Diagram of the Fizzy web, jobs, MySQL and Mailpit services](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789239040/fizzy-architecture.webp)

Fizzy is a Rails 8 application built on the modern Rails stack rather than a pile of services: Solid Queue for jobs, Solid Cache for caching and Solid Cable for live updates, all backed by the same database. Self-host it when your issues are internal, when you want the board on your own domain, or when you would rather own the data behind a tool your team uses all day.

Features worth knowing about:

- Columns you name yourself, with cards moved by drag, keyboard or the card screen
- Steps — a checklist inside each card, with progress shown on the board
- Tags, reactions, comments, assignments and pinned cards
- Auto-close, which prunes cards nobody has touched, and "not now" for deferred work
- Webhooks for publishing card events to Slack, Campfire or anything else
- Web Push notifications, a public-board mode, passkey sign-in and a documented HTTP API

The deployment is split the way a production Rails app should be. `fizzy` serves HTTP through Thruster, which handles keep-alives and asset caching in front of Puma. `fizzy-jobs` runs the same image with `FIZZY_ROLE=jobs`, so background work scales and restarts on its own. `MySQL` holds four databases — app, queue, cache and cable — created on first boot. The bucket keeps uploads off the container filesystem, which is what lets both app services stay stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| fizzy-jobs | [gridalpha/fizzy-railway](https://github.com/gridalpha/fizzy-railway) | Worker |
| fizzy | [gridalpha/fizzy-railway](https://github.com/gridalpha/fizzy-railway) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Inbox web UI port |
| `MP_UI_AUTH` | mailpit | - | Credentials for the inbox UI |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | Credentials the app sends with |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MAILPIT_PASSWORD` | mailpit | (secret) | Shared inbox and SMTP password |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, reachable from peers |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Plain SMTP on the private network |
| `PORT` | fizzy-jobs | 8080 | Port the liveness probe serves on |
| `BASE_URL` | fizzy-jobs | - | Public URL used in emails |
| `S3_BUCKET` | fizzy-jobs | - | Object storage bucket name |
| `S3_REGION` | fizzy-jobs | - | Object storage region |
| `SMTP_PORT` | fizzy-jobs | 1025 | Mail port |
| `FIZZY_ROLE` | fizzy-jobs | jobs | Selects the Solid Queue role |
| `MYSQL_HOST` | fizzy-jobs | - | Private database hostname |
| `MYSQL_PORT` | fizzy-jobs | - | Database port |
| `MYSQL_USER` | fizzy-jobs | (secret) | Database user |
| `S3_ENDPOINT` | fizzy-jobs | - | Object storage endpoint |
| `MULTI_TENANT` | fizzy-jobs | false | One account per deployment |
| `SMTP_ADDRESS` | fizzy-jobs | - | Mail host for sign-in codes |
| `SMTP_PASSWORD` | fizzy-jobs | (secret) | Mail password, matches Mailpit |
| `SMTP_USERNAME` | fizzy-jobs | (secret) | Mail username, matches Mailpit |
| `MYSQL_PASSWORD` | fizzy-jobs | (secret) | Database password |
| `RAILS_LOG_LEVEL` | fizzy-jobs | info | Application log level |
| `SECRET_KEY_BASE` | fizzy-jobs | (secret) | Must match the web service |
| `DATABASE_ADAPTER` | fizzy-jobs | mysql | Use MySQL instead of SQLite |
| `S3_ACCESS_KEY_ID` | fizzy-jobs | - | Object storage access key |
| `MAILER_FROM_ADDRESS` | fizzy-jobs | fizzy@example.com | From address on outgoing mail |
| `S3_FORCE_PATH_STYLE` | fizzy-jobs | true | Required for browser uploads |
| `S3_SECRET_ACCESS_KEY` | fizzy-jobs | (secret) | Object storage secret key |
| `ACTIVE_STORAGE_SERVICE` | fizzy-jobs | s3 | Store uploads in the bucket |
| `S3_REQUEST_CHECKSUM_CALCULATION` | fizzy-jobs | when_required | Skip unsupported checksums |
| `S3_RESPONSE_CHECKSUM_VALIDATION` | fizzy-jobs | when_required | Skip unsupported checksums |
| `PORT` | fizzy | 8080 | Port Railway health-checks |
| `BASE_URL` | fizzy | - | Public URL used in emails |
| `HTTP_PORT` | fizzy | 8080 | Thruster listener port |
| `S3_BUCKET` | fizzy | - | Object storage bucket name |
| `S3_REGION` | fizzy | - | Object storage region |
| `SMTP_PORT` | fizzy | 1025 | Mail port |
| `ADMIN_NAME` | fizzy | Owner | Display name of the seeded owner |
| `FIZZY_ROLE` | fizzy | web | Selects the web role of the image |
| `MYSQL_HOST` | fizzy | - | Private database hostname |
| `MYSQL_PORT` | fizzy | - | Database port |
| `MYSQL_USER` | fizzy | (secret) | Database user |
| `ADMIN_EMAIL` | fizzy | owner@example.com | Seeds the owner account, closes signups |
| `S3_ENDPOINT` | fizzy | - | Object storage endpoint |
| `TARGET_PORT` | fizzy | 3000 | Puma port behind Thruster |
| `MULTI_TENANT` | fizzy | false | One account per deployment |
| `SMTP_ADDRESS` | fizzy | - | Mail host for sign-in codes |
| `SMTP_PASSWORD` | fizzy | (secret) | Mail password, matches Mailpit |
| `SMTP_USERNAME` | fizzy | (secret) | Mail username, matches Mailpit |
| `MYSQL_PASSWORD` | fizzy | (secret) | Database password |
| `CSP_CONNECT_SRC` | fizzy | - | Extra fetch origins |
| `RAILS_LOG_LEVEL` | fizzy | info | Application log level |
| `SECRET_KEY_BASE` | fizzy | (secret) | Rails signing key and VAPID seed |
| `DATABASE_ADAPTER` | fizzy | mysql | Use MySQL instead of SQLite |
| `S3_ACCESS_KEY_ID` | fizzy | - | Object storage access key |
| `MAILER_FROM_ADDRESS` | fizzy | fizzy@example.com | From address on outgoing mail |
| `S3_FORCE_PATH_STYLE` | fizzy | true | Required for browser uploads |
| `SOLID_QUEUE_IN_PUMA` | fizzy | false | Jobs run in their own service |
| `S3_SECRET_ACCESS_KEY` | fizzy | (secret) | Object storage secret key |
| `ACTIVE_STORAGE_SERVICE` | fizzy | s3 | Store uploads in the bucket |
| `SERVICE_WORKER_CORS_ENABLED` | fizzy | false | Presigned URLs send no CORS headers |
| `S3_REQUEST_CHECKSUM_CALCULATION` | fizzy | when_required | Skip unsupported checksums |
| `S3_RESPONSE_CHECKSUM_VALIDATION` | fizzy | when_required | Skip unsupported checksums |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/up`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Ruby, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/fizzy-board)
