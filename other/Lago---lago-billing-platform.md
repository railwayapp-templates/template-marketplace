# Deploy Lago on Railway

Usage-based billing software that meters usage and sends invoices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lago-billing-platform)

## About

Lago is an open-source usage-based billing platform: your application posts usage
events to its API, Lago turns them into billable metrics, prices them against
subscription plans and credits, and issues invoices you collect through Stripe,
Adyen or GoCardless. It is the metering layer teams reach for when a flat per-seat
plan stops describing what they sell — AI products charging per token,
infrastructure per GB, APIs per call. It is AGPLv3, so self-host Lago and your
revenue data stays in your own database.

Deploy Lago on Railway and you get the full production topology, not a single
container. The Rails API serves the REST and GraphQL endpoints; a React dashboard
runs behind nginx; one Sidekiq worker handles invoicing, webhooks and integrations
while a second is dedicated to event ingestion, so a heavy billing run never delays
metering; a scheduler fires recurring billing jobs; and Gotenberg renders invoice
PDFs. Behind them sit PostgreSQL 17 with the `pg_partman` extension, Redis for
queues and cache, and an object storage bucket holding every generated PDF.

![Diagram of the Lago API, workers and datastores on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787421558/lago-architecture.png)

Billing is the most painful part of a product to build and the most expensive to get
wrong. Lago separates metering and pricing from payment processing: it owns the
events, the pricing rules and the invoices, and hands the final amount to whichever
provider you use. Teams self-host it because usage events are among the most
sensitive data a company holds, and keeping them in your own PostgreSQL avoids
handing a third party a full picture of customer behaviour.

What it gives you:

- Billable metrics with `sum`, `count`, `max`, `unique count` and weighted
  aggregations
- Standard, graduated, package, percentage and volume pricing
- Prepaid wallets with auto top-ups, coupons, add-ons and commitments
- Trials, upgrades, downgrades, proration, and anniversary or calendar billing
- Invoices with tax support, PDF output and a customer portal
- Webhooks and an idempotent REST API with official SDKs, plus an MCP server

The Railway architecture mirrors what Lago documents for production. The API is the
only service your application talks to. Event ingestion gets its own Sidekiq worker
so a month-end billing run cannot block incoming usage, while the general worker
finalizes invoices, generates PDFs and delivers webhooks. PDFs are rendered by
Gotenberg, a headless Chromium service, and written straight to object storage
rather than a disk, which lets the API and worker scale independently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lago-events-worker | [gridalpha/lago-railway](https://github.com/gridalpha/lago-railway) | Worker |
| lago-api | [gridalpha/lago-railway](https://github.com/gridalpha/lago-railway) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| lago-worker | [gridalpha/lago-railway](https://github.com/gridalpha/lago-railway) | Worker |
| lago-front | `getlago/front:v1.51.0` | Web service |
| lago-clock | [gridalpha/lago-railway](https://github.com/gridalpha/lago-railway) | Worker |
| lago-pdf | `getlago/lago-gotenberg:8.15` | Worker |
| lago-postgres | [gridalpha/lago-railway](https://github.com/gridalpha/lago-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | lago-events-worker | 8080 | Sidekiq liveness endpoint port |
| `LAGO_ROLE` | lago-events-worker | events-worker | Runs Sidekiq on the events queue only |
| `RAILS_ENV` | lago-events-worker | production | Rails environment |
| `REDIS_URL` | lago-events-worker | - | Sidekiq queue Redis |
| `DATABASE_URL` | lago-events-worker | - | PostgreSQL connection string |
| `LAGO_API_URL` | lago-events-worker | - | Public API base URL |
| `LAGO_PDF_URL` | lago-events-worker | - | Private PDF renderer endpoint |
| `DATABASE_POOL` | lago-events-worker | 10 | ActiveRecord connections per process |
| `LAGO_FRONT_URL` | lago-events-worker | - | Dashboard URL used in links |
| `SIDEKIQ_EVENTS` | lago-events-worker | true | This worker consumes the events queue |
| `LAGO_USE_AWS_S3` | lago-events-worker | true | Store PDFs in object storage |
| `SECRET_KEY_BASE` | lago-events-worker | (secret) | Must match the API |
| `LAGO_SIDEKIQ_WEB` | lago-events-worker | false | No Sidekiq admin UI |
| `LAGO_AWS_S3_BUCKET` | lago-events-worker | - | Bucket holding invoice PDFs |
| `LAGO_AWS_S3_REGION` | lago-events-worker | - | Bucket region |
| `LAGO_DISABLE_SIGNUP` | lago-events-worker | true | Close public registration |
| `RAILS_LOG_TO_STDOUT` | lago-events-worker | true | Send logs to the deploy log |
| `SIDEKIQ_CONCURRENCY` | lago-events-worker | 10 | Sidekiq threads |
| `LAGO_AWS_S3_ENDPOINT` | lago-events-worker | - | Object storage endpoint |
| `LAGO_DISABLE_SEGMENT` | lago-events-worker | true | Disable anonymous product analytics |
| `LAGO_REDIS_CACHE_URL` | lago-events-worker | - | Cache on a separate Redis database |
| `LAGO_AWS_S3_PATH_STYLE` | lago-events-worker | true | Use path-style bucket addressing |
| `LAGO_AWS_S3_ACCESS_KEY_ID` | lago-events-worker | - | Object storage access key |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | lago-events-worker | - | Must match the API |
| `LAGO_AWS_S3_SECRET_ACCESS_KEY` | lago-events-worker | (secret) | Object storage secret key |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | lago-events-worker | - | Must match the API |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | lago-events-worker | - | Must match the API |
| `PORT` | lago-api | 3000 | HTTP port the API listens on |
| `LAGO_ROLE` | lago-api | api | Runs the Rails API and migrations |
| `RAILS_ENV` | lago-api | production | Rails environment |
| `REDIS_URL` | lago-api | - | Sidekiq and ActionCable Redis |
| `DATABASE_URL` | lago-api | - | PostgreSQL connection string |
| `LAGO_API_URL` | lago-api | - | Public API base URL |
| `LAGO_PDF_URL` | lago-api | - | Private PDF renderer endpoint |
| `DATABASE_POOL` | lago-api | 10 | ActiveRecord connections per process |
| `LAGO_ORG_NAME` | lago-api | My Company | Organization name |
| `LAGO_FRONT_URL` | lago-api | - | Dashboard origin allowed by CORS |
| `SIDEKIQ_EVENTS` | lago-api | true | Route ingestion to the event worker |
| `LAGO_CREATE_ORG` | lago-api | true | Seed the organization on first boot |
| `LAGO_USE_AWS_S3` | lago-api | true | Store PDFs in object storage |
| `SECRET_KEY_BASE` | lago-api | (secret) | Rails session and cookie signing key |
| `WEB_CONCURRENCY` | lago-api | 2 | Puma worker processes |
| `LAGO_SIDEKIQ_WEB` | lago-api | false | Keep the Sidekiq admin UI off the public API |
| `RAILS_MAX_THREADS` | lago-api | 5 | Puma threads per worker process |
| `LAGO_AWS_S3_BUCKET` | lago-api | - | Bucket holding invoice PDFs |
| `LAGO_AWS_S3_REGION` | lago-api | - | Bucket region |
| `LAGO_DISABLE_SIGNUP` | lago-api | true | Close public registration |
| `LAGO_ORG_USER_EMAIL` | lago-api | admin@example.dev | First admin email |
| `RAILS_LOG_TO_STDOUT` | lago-api | true | Send logs to the deploy log |
| `LAGO_AWS_S3_ENDPOINT` | lago-api | - | Object storage endpoint |
| `LAGO_DISABLE_SEGMENT` | lago-api | true | Disable anonymous product analytics |
| `LAGO_REDIS_CACHE_URL` | lago-api | - | Cache on a separate Redis database |
| `LAGO_AWS_S3_PATH_STYLE` | lago-api | true | Use path-style bucket addressing |
| `LAGO_ORG_USER_PASSWORD` | lago-api | (secret) | First admin password, change after login |
| `LAGO_AWS_S3_ACCESS_KEY_ID` | lago-api | - | Object storage access key |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | lago-api | - | At-rest encryption key |
| `LAGO_AWS_S3_SECRET_ACCESS_KEY` | lago-api | (secret) | Object storage secret key |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | lago-api | - | Deterministic encryption key |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | lago-api | - | Encryption key derivation salt |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | lago-worker | 8080 | Sidekiq liveness endpoint port |
| `LAGO_ROLE` | lago-worker | worker | Runs Sidekiq on the default queues |
| `RAILS_ENV` | lago-worker | production | Rails environment |
| `REDIS_URL` | lago-worker | - | Sidekiq queue Redis |
| `DATABASE_URL` | lago-worker | - | PostgreSQL connection string |
| `LAGO_API_URL` | lago-worker | - | Public API base URL |
| `LAGO_PDF_URL` | lago-worker | - | Private PDF renderer endpoint |
| `DATABASE_POOL` | lago-worker | 10 | ActiveRecord connections per process |
| `LAGO_FRONT_URL` | lago-worker | - | Dashboard URL used in links |
| `SIDEKIQ_EVENTS` | lago-worker | true | Route ingestion to the event worker |
| `LAGO_USE_AWS_S3` | lago-worker | true | Store PDFs in object storage |
| `SECRET_KEY_BASE` | lago-worker | (secret) | Must match the API |
| `LAGO_SIDEKIQ_WEB` | lago-worker | false | No Sidekiq admin UI |
| `LAGO_AWS_S3_BUCKET` | lago-worker | - | Bucket holding invoice PDFs |
| `LAGO_AWS_S3_REGION` | lago-worker | - | Bucket region |
| `LAGO_DISABLE_SIGNUP` | lago-worker | true | Close public registration |
| `RAILS_LOG_TO_STDOUT` | lago-worker | true | Send logs to the deploy log |
| `SIDEKIQ_CONCURRENCY` | lago-worker | 10 | Sidekiq threads |
| `LAGO_AWS_S3_ENDPOINT` | lago-worker | - | Object storage endpoint |
| `LAGO_DISABLE_SEGMENT` | lago-worker | true | Disable anonymous product analytics |
| `LAGO_REDIS_CACHE_URL` | lago-worker | - | Cache on a separate Redis database |
| `LAGO_AWS_S3_PATH_STYLE` | lago-worker | true | Use path-style bucket addressing |
| `LAGO_AWS_S3_ACCESS_KEY_ID` | lago-worker | - | Object storage access key |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | lago-worker | - | Must match the API |
| `LAGO_AWS_S3_SECRET_ACCESS_KEY` | lago-worker | (secret) | Object storage secret key |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | lago-worker | - | Must match the API |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | lago-worker | - | Must match the API |
| `PORT` | lago-front | 80 | nginx listening port |
| `API_URL` | lago-front | - | API the dashboard calls |
| `APP_ENV` | lago-front | production | Front-end build environment |
| `LAGO_DOMAIN` | lago-front | - | Public dashboard URL |
| `LAGO_DISABLE_SIGNUP` | lago-front | true | Hide the sign-up form |
| `LAGO_OAUTH_PROXY_URL` | lago-front | https://proxy.getlago.com | Google and Okta login proxy |
| `LAGO_DISABLE_PDF_GENERATION` | lago-front | false | Keep invoice PDF downloads enabled |
| `LAGO_ROLE` | lago-clock | clock | Runs the Clockwork scheduler |
| `RAILS_ENV` | lago-clock | production | Rails environment |
| `REDIS_URL` | lago-clock | - | Redis used to enqueue jobs |
| `DATABASE_URL` | lago-clock | - | PostgreSQL connection string |
| `LAGO_API_URL` | lago-clock | - | Public API base URL |
| `LAGO_PDF_URL` | lago-clock | - | Private PDF renderer endpoint |
| `DATABASE_POOL` | lago-clock | 5 | ActiveRecord connections per process |
| `LAGO_FRONT_URL` | lago-clock | - | Dashboard URL used in links |
| `SIDEKIQ_EVENTS` | lago-clock | true | Match the routing used by the workers |
| `LAGO_USE_AWS_S3` | lago-clock | true | Store PDFs in object storage |
| `SECRET_KEY_BASE` | lago-clock | (secret) | Must match the API |
| `LAGO_SIDEKIQ_WEB` | lago-clock | false | No Sidekiq admin UI |
| `LAGO_AWS_S3_BUCKET` | lago-clock | - | Bucket holding invoice PDFs |
| `LAGO_AWS_S3_REGION` | lago-clock | - | Bucket region |
| `LAGO_DISABLE_SIGNUP` | lago-clock | true | Close public registration |
| `RAILS_LOG_TO_STDOUT` | lago-clock | true | Send logs to the deploy log |
| `LAGO_AWS_S3_ENDPOINT` | lago-clock | - | Object storage endpoint |
| `LAGO_DISABLE_SEGMENT` | lago-clock | true | Disable anonymous product analytics |
| `LAGO_REDIS_CACHE_URL` | lago-clock | - | Cache on a separate Redis database |
| `LAGO_AWS_S3_PATH_STYLE` | lago-clock | true | Use path-style bucket addressing |
| `LAGO_AWS_S3_ACCESS_KEY_ID` | lago-clock | - | Object storage access key |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | lago-clock | - | Must match the API |
| `LAGO_AWS_S3_SECRET_ACCESS_KEY` | lago-clock | (secret) | Object storage secret key |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | lago-clock | - | Must match the API |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | lago-clock | - | Must match the API |
| `PORT` | lago-pdf | 3000 | Gotenberg HTTP port |
| `TINI_KILL_PROCESS_GROUP` | lago-pdf | 1 | Forward SIGTERM to Chromium children |
| `POSTGRES_DB` | lago-postgres | lago | Database created on first boot |
| `DATABASE_URL` | lago-postgres | - | Private connection string |
| `POSTGRES_USER` | lago-postgres | (secret) | Role created on first boot |
| `POSTGRES_PASSWORD` | lago-postgres | (secret) | Role password |

## Configuration

- **Healthcheck:** `/`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/bin/tini -s -- gotenberg --api-port-from-env=PORT --api-timeout=180s --chromium-auto-start=true`
- **Start command:** `/bin/sh -c 'MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MEM" in ""|max|*[!0-9]*) MEM=2147483648;; esac; SB=$((MEM/4/1048576)); EC=$((MEM*3/4/1048576)); echo "sizing shared_buffers=${SB}MB effective_cache_size=${EC}MB from cgroup"; exec docker-entrypoint.sh postgres -c data_directory=/data/pgdata -c shared_buffers=${SB}MB -c effective_cache_size=${EC}MB -c maintenance_work_mem=256MB -c work_mem=16MB -c max_connections=200 -c shared_preload_libraries=pg_partman_bgw -c pg_partman_bgw.interval=3600 -c pg_partman_bgw.role=lago -c pg_partman_bgw.dbname=lago'`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/lago-billing-platform)
