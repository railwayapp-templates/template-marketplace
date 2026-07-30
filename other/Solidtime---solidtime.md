# Deploy Solidtime on Railway

Private time tracking for teams, projects, tasks, and reports.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/solidtime)

## About

Solidtime is an open-source time tracker for teams and freelancers. It organizes tracked hours around organizations, members, clients, projects, and tasks, then turns that data into detailed and shareable reports. Self-hosting keeps operational and time-entry data under your control while retaining Solidtime's browser-based workflow.

**Published on Railway:** https://railway.com/deploy/solidtime

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/solidtime)

Hosting Solidtime requires coordinated HTTP, scheduler, and queue-worker containers, PostgreSQL, Gotenberg for PDF rendering, and persistent storage for database and application files. This template pins the official Solidtime 0.18.0, PostgreSQL 17.3, and Gotenberg 8.17.1 images. Only the `Solidtime` service receives a Railway HTTPS domain; every dependency uses Railway private networking. Railway generates one application key and one database password per deployment, runs database migrations automatically, and enables registration so the first owner can create an account. Email is safely logged by default, so SMTP credentials remain optional and can be added after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.3@sha256:0321e2252ebfeecb8bc1a899755084d29bce872953e1a5a3e25ec0860b739098` | Database |
| Gotenberg | `gotenberg/gotenberg:8.17.1@sha256:46e7b68adeadda1794a9ab194f1e2939f5b09ff21aadef6000e84102c9af6dd5` | Worker |
| Queue | `solidtime/solidtime:0.18.0@sha256:e6c510be7da6d33f3949021d44f53585a9e34c2d76d115b3ed262ef44aa85c1c` | Worker |
| Scheduler | `solidtime/solidtime:0.18.0@sha256:e6c510be7da6d33f3949021d44f53585a9e34c2d76d115b3ed262ef44aa85c1c` | Worker |
| Solidtime | `solidtime/solidtime:0.18.0@sha256:e6c510be7da6d33f3949021d44f53585a9e34c2d76d115b3ed262ef44aa85c1c` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | solidtime |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Gotenberg | 3000 |
| `API_PORT_FROM_ENV` | Gotenberg | PORT |
| `DB_PASSWORD` | Queue | (secret) |
| `DB_USERNAME` | Queue | (secret) |
| `CONTAINER_MODE` | Queue | worker |
| `WORKER_COMMAND` | Queue | php /var/www/html/artisan queue:work |
| `DB_PASSWORD` | Scheduler | (secret) |
| `DB_USERNAME` | Scheduler | (secret) |
| `CONTAINER_MODE` | Scheduler | scheduler |
| `PORT` | Solidtime | 8000 |
| `APP_ENV` | Solidtime | production |
| `DB_PORT` | Solidtime | 5432 |
| `APP_NAME` | Solidtime | solidtime |
| `APP_DEBUG` | Solidtime | false |
| `LOG_LEVEL` | Solidtime | info |
| `DB_PASSWORD` | Solidtime | (secret) |
| `DB_USERNAME` | Solidtime | (secret) |
| `LOG_CHANNEL` | Solidtime | stderr |
| `MAIL_MAILER` | Solidtime | log |
| `CACHE_DRIVER` | Solidtime | file |
| `DB_CONNECTION` | Solidtime | pgsql |
| `VITE_APP_NAME` | Solidtime | solidtime |
| `CONTAINER_MODE` | Solidtime | http |
| `MAIL_FROM_NAME` | Solidtime | solidtime |
| `SESSION_DRIVER` | Solidtime | database |
| `APP_FORCE_HTTPS` | Solidtime | true |
| `AUTO_DB_MIGRATE` | Solidtime | true |
| `FILESYSTEM_DISK` | Solidtime | local |
| `TRUSTED_PROXIES` | Solidtime | 0.0.0.0/0,2000:0:0:0:0:0:0:0/3 |
| `QUEUE_CONNECTION` | Solidtime | database |
| `MAIL_FROM_ADDRESS` | Solidtime | no-reply@solidtime.local |
| `PUBLIC_FILESYSTEM_DISK` | Solidtime | public |
| `APP_ENABLE_REGISTRATION` | Solidtime | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/app`

**Category:** Other

[View on Railway →](https://railway.com/deploy/solidtime)
