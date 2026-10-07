# Deploy Lago Production | Open-Source Usage-Based Billing, Stripe Billing Alternative on Railway

Usage-based billing with the worker, clock and PDF invoices that bill

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lago-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/lago-production?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=lago-production)

[Lago](https://www.getlago.com/) is the open-source billing engine for usage-based, subscription and hybrid pricing. It is an alternative to Stripe Billing, Chargebee and Orb. You send usage events to its API, and Lago meters them and applies your plans, coupons, credits and taxes. It then issues invoices with PDFs and pushes them to Stripe, Adyen or GoCardless for payment. This template runs the complete Lago v1.54.0 stack, including the background worker and scheduler that do the actual billing.

The stack is five services: Lago, API, PDF, Postgres and Redis.

- **Lago** is the dashboard (upstream's `lago-front` image) on its own public domain. This is where you sign in and set up plans, customers and invoices.
- **API** runs Lago's Rails API, Sidekiq worker and billing clock in one container. Its public domain is the REST and GraphQL endpoint your app sends events to. **The worker and clock are what generate invoices.** The clock enqueues billing, invoice finalization, overdue and wallet jobs every hour, and the worker runs them along with webhooks and PDF rendering. Lago templates that run only the API and dashboard accept events but never bill anyone. Upstream runs these three processes as separate containers that share a storage volume. Railway volumes can't be shared between services, so here they run in one container, and if any of them stops, Railway restarts the container.
- **PDF** is Lago's Gotenberg build, which renders invoice and credit note PDFs on the private network.
- **Postgres 17 with pg_partman**: Lago's schema loads the `pg_partman` extension on the first migration, so a stock Postgres fails the first boot. Upstream's own partman image is PostgreSQL 15.0.
- **Redis 8** holds the job queues, with append-only persistence and no eviction so that queued billing jobs survive a restart.
- **Locked to you.** Your admin account is created on the first boot and public sign-up is closed. Integration credentials are encrypted with keys generated for this deploy.
- **Its own signing key.** Lago signs sessions and webhooks with an RSA key. Other templates ship one fixed key that is visible in the template itself. This one generates a key on the first boot and stores it on the API's volume, so webhook signatures stay valid across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PDF | `getlago/lago-gotenberg:7.8.2` | Worker |
| Redis | `redis:8.10.2-alpine` | Database |
| API | [nomideusz/lago-railway](https://github.com/nomideusz/lago-railway) (root: /api) | Web service |
| Lago | `getlago/front:v1.54.0` | Web service |
| Postgres | [nomideusz/lago-railway](https://github.com/nomideusz/lago-railway) (root: /postgres) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | PDF | 3000 | Port Gotenberg listens on - leave as is |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | API | 3000 | Port the Rails API listens on - leave as is |
| `RAILS_ENV` | API | production | Rails environment |
| `REDIS_URL` | API | - | Redis on the private network - Sidekiq queues and live updates |
| `DATABASE_URL` | API | - | Postgres on the private network |
| `LAGO_API_URL` | API | - | Public URL of this API - used in invoice links and webhooks |
| `LAGO_PDF_URL` | API | - | Invoice PDF renderer on the private network |
| `LAGO_ORG_NAME` | API | - | Your company name - printed as the sender on invoices |
| `LAGO_FRONT_URL` | API | - | Public URL of the dashboard - the only origin allowed to call the API from a browser |
| `LAGO_SMTP_PORT` | API | 587 | SMTP port |
| `REDIS_PASSWORD` | API | (secret) | Redis password |
| `LAGO_CREATE_ORG` | API | true | Create the organization and admin account below on first boot |
| `LAGO_FROM_EMAIL` | API | - | Sender address for invoice emails |
| `SECRET_KEY_BASE` | API | (secret) | Auto-generated Rails secret |
| `LAGO_SIDEKIQ_WEB` | API | false | Sidekiq's job dashboard has no login of its own, so it stays off |
| `LAGO_SMTP_ADDRESS` | API | - | SMTP host for invoice emails (Railway Pro or above; Hobby blocks outbound SMTP) |
| `LAGO_SMTP_PASSWORD` | API | (secret) | SMTP password |
| `LAGO_SMTP_USERNAME` | API | (secret) | SMTP username |
| `LAGO_DISABLE_SIGNUP` | API | true | Public sign-up stays closed; invite teammates from Settings > Members |
| `LAGO_ORG_USER_EMAIL` | API | - | Admin login email |
| `RAILS_LOG_TO_STDOUT` | API | true | Send logs to Railway's log view |
| `LAGO_DISABLE_SEGMENT` | API | true | No usage telemetry to Lago |
| `LAGO_OAUTH_PROXY_URL` | API | https://proxy.getlago.com | Lago's OAuth proxy for payment provider connections |
| `LAGO_ORG_USER_PASSWORD` | API | (secret) | Auto-generated admin password - copy it from this service's Variables tab |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | API | - | Auto-generated key encrypting integration credentials at rest |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | API | - | Auto-generated deterministic encryption key |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | API | - | Auto-generated key derivation salt |
| `PORT` | Lago | 80 | Port nginx listens on - leave as is |
| `API_URL` | Lago | - | Public URL of the Lago API |
| `APP_ENV` | Lago | production | Frontend environment |
| `LAGO_DISABLE_SIGNUP` | Lago | - | Hides the sign-up page when the API has it closed |
| `LAGO_OAUTH_PROXY_URL` | Lago | https://proxy.getlago.com | Lago's OAuth proxy for payment provider connections |
| `POSTGRES_DB` | Postgres | lago | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c "rm -rf /data/lost+found && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --maxmemory-policy noeviction --appendonly yes --dir /data"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/lago-production)
