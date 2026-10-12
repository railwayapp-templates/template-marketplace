# Deploy Medusa v2 Commerce Store (Backend + Storefront) on Railway

Headless e-commerce with admin, Next.js storefront, search and workers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-v2-commerce-store-backend-storefr)

## About

Launch a complete Medusa v2 store on Railway: the Medusa backend with its admin dashboard, a background worker, the official Next.js storefront, Meilisearch-powered search, Postgres, Redis and product images in a Railway Bucket. The admin user and the storefront's API key are set up automatically on the first deploy. Community template.

Medusa is a headless commerce platform: a Node.js backend exposes Store and Admin APIs, and any frontend can sell through it. A production setup needs more than one process. Medusa recommends running the HTTP server and a separate worker for subscribers, scheduled jobs and workflows, both backed by Postgres and Redis, with uploads in object storage. This template builds the backend and storefront from the official `medusajs/dtc-starter` at a pinned commit, runs migrations in a pre-deploy step, stores files in a private Railway Bucket served through a small read-only media proxy, and hands the storefront its publishable key at start-up over the private network, so nothing has to be copied by hand.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Storefront | [baranberkay96/medusa-railway](https://github.com/baranberkay96/medusa-railway) (branch: main) (root: /services/storefront) | Web service |
| Meilisearch | `getmeili/meilisearch:v1.54.3` | Database |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Worker | [baranberkay96/medusa-railway](https://github.com/baranberkay96/medusa-railway) (branch: main) (root: /services/backend) | Worker |
| Backend | [baranberkay96/medusa-railway](https://github.com/baranberkay96/medusa-railway) (branch: main) (root: /services/backend) | Web service |
| Media-Proxy | [baranberkay96/medusa-railway](https://github.com/baranberkay96/medusa-railway) (branch: main) (root: /services/media-proxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Storefront | 8000 | HTTP port of the Next.js server. |
| `NODE_ENV` | Storefront | production | Run Next.js in production mode. |
| `MEDUSA_INTERNAL_URL` | Storefront | - | Backend URL on the private network, used only at start to fetch the publishable API key. |
| `NEXT_PUBLIC_BASE_URL` | Storefront | - | Public URL of this storefront, used for absolute links and metadata. |
| `NEXT_PUBLIC_STRIPE_KEY` | Storefront | - | Optional. Stripe publishable key; build-time value, redeploy after changing it. |
| `KEY_WAIT_TIMEOUT_SECONDS` | Storefront | 840 | Maximum time to wait for the Backend at start before the container exits and restarts. |
| `NEXT_PUBLIC_DEFAULT_REGION` | Storefront | dk | Fallback country code; must belong to a region in Medusa (the demo region covers gb, de, dk, se, fr, es, it). |
| `STOREFRONT_BOOTSTRAP_TOKEN` | Storefront | (secret) | Token for the Backend's /internal/publishable-key route. |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Storefront | - | Public backend URL used by the browser and the server (applied at container start). |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Storefront | - | Optional override (pk_...). Leave empty to fetch the key from the Backend automatically. |
| `PORT` | Meilisearch | 7700 | Port Meilisearch listens on (used by the healthcheck and the Backend URL). |
| `MEILI_ENV` | Meilisearch | production | Production mode: requires the master key and disables the search preview UI. |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms | Index storage on the volume. |
| `MEILI_DUMP_DIR` | Meilisearch | /meili_data/dumps | Dump directory on the volume (used for upgrades and backups). |
| `MEILI_HTTP_ADDR` | Meilisearch | [::]:7700 | Listen on all IPv4/IPv6 interfaces for the private network. |
| `MEILI_MASTER_KEY` | Meilisearch | - | Master key protecting the Meilisearch API (generated). |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable Meilisearch telemetry. |
| `MEILI_MAX_INDEXING_MEMORY` | Meilisearch | 1GiB | Upper bound for indexing memory so the container stays within its RAM budget. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Worker | 9000 | Port of the worker's internal /health endpoint (used by the Railway healthcheck). |
| `NODE_ENV` | Worker | production | Run Medusa in production mode. |
| `REDIS_URL` | Worker | - | Redis connection (same instance as the Backend). |
| `S3_BUCKET` | Worker | - | Bucket name used for the S3 API (Railway Bucket reference). |
| `S3_REGION` | Worker | - | Bucket region (Railway Bucket reference, usually auto). |
| `JWT_SECRET` | Worker | (secret) | Same JWT secret as the Backend. |
| `S3_ENDPOINT` | Worker | - | S3 API endpoint of the Railway Bucket (public network only). |
| `S3_FILE_URL` | Worker | - | Same public file URL as the Backend. |
| `DATABASE_URL` | Worker | - | Postgres connection string over the private network. |
| `COOKIE_SECRET` | Worker | (secret) | Same cookie secret as the Backend. |
| `STRIPE_API_KEY` | Worker | (secret) | Same Stripe configuration as the Backend (optional). |
| `MEILISEARCH_HOST` | Worker | - | Same Meilisearch URL as the Backend (indexing runs on the worker). |
| `S3_ACCESS_KEY_ID` | Worker | - | Bucket access key ID (Railway Bucket reference). |
| `MEDUSA_BACKEND_URL` | Worker | - | Public backend URL, for links generated by background jobs. |
| `MEDUSA_WORKER_MODE` | Worker | worker | Process subscribers, scheduled jobs, workflows and search indexing; no public HTTP. |
| `MEILISEARCH_API_KEY` | Worker | (secret) | Same Meilisearch key as the Backend. |
| `S3_FORCE_PATH_STYLE` | Worker | - | Same URL style setting as the Backend. |
| `DISABLE_MEDUSA_ADMIN` | Worker | true | The worker does not build or serve the admin dashboard. |
| `S3_SECRET_ACCESS_KEY` | Worker | (secret) | Bucket secret access key (Railway Bucket reference). |
| `STRIPE_WEBHOOK_SECRET` | Worker | (secret) | Same Stripe webhook secret as the Backend (optional). |
| `MEDUSA_SERVER_HEALTH_URL` | Worker | - | The worker waits for this URL before starting, so it never runs before the Backend's migrations. |
| `WAIT_FOR_SERVER_TIMEOUT_SECONDS` | Worker | 840 | Maximum wait for the Backend health URL before starting anyway. |
| `PORT` | Backend | 9000 | HTTP port Medusa listens on (also used by the Railway healthcheck). |
| `NODE_ENV` | Backend | production | Run Medusa in production mode. |
| `AUTH_CORS` | Backend | - | Origins allowed to call the auth routes (admin and storefront). |
| `REDIS_URL` | Backend | - | Redis for sessions, events, workflows, locking and cache; family=0 enables IPv4+IPv6 lookup. |
| `S3_BUCKET` | Backend | - | Bucket name used for the S3 API (Railway Bucket reference). |
| `S3_REGION` | Backend | - | Bucket region (Railway Bucket reference, usually auto). |
| `ADMIN_CORS` | Backend | - | Origins allowed to call the Admin API (the admin is served from this domain). |
| `JWT_SECRET` | Backend | (secret) | Secret used to sign auth tokens. Generated; shared with the Worker. |
| `STORE_CORS` | Backend | - | Origins allowed to call the Store API (the storefront domain; comma-separate extra domains). |
| `S3_ENDPOINT` | Backend | - | S3 API endpoint of the Railway Bucket (public network only). |
| `S3_FILE_URL` | Backend | - | Public base URL for uploaded files: the Media-Proxy service, because Railway Buckets are private. |
| `DATABASE_URL` | Backend | - | Postgres connection string over the private network. |
| `COOKIE_SECRET` | Backend | (secret) | Secret used to sign session cookies. Generated; shared with the Worker. |
| `STRIPE_API_KEY` | Backend | (secret) | Optional. Stripe secret key; enables the Stripe payment provider (then enable it per region in the admin). |
| `MEILISEARCH_HOST` | Backend | - | Meilisearch URL over the private network. Clear it (Backend and Worker) to use Medusa's built-in PostgreSQL search instead. |
| `S3_ACCESS_KEY_ID` | Backend | - | Bucket access key ID (Railway Bucket reference). |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@example.com | Login email of the first admin user, created on first deploy. Change it to your own address before deploying. |
| `MEDUSA_BACKEND_URL` | Backend | - | Public URL of this backend (admin and API). |
| `MEDUSA_WORKER_MODE` | Backend | server | This instance only serves HTTP; background jobs run on the Worker service. |
| `SEED_DEMO_PRODUCTS` | Backend | false | Set to true to add 50 extra demo products on the next deploy (idempotent). The base demo store is always created on first migration. |
| `MEILISEARCH_API_KEY` | Backend | (secret) | Meilisearch key used by the backend to manage and query indexes. |
| `S3_FORCE_PATH_STYLE` | Backend | false | Set to true only for older Railway Buckets that require path-style URLs (see the bucket's Credentials tab). |
| `DISABLE_MEDUSA_ADMIN` | Backend | false | Keep false here: this service builds and serves the admin dashboard at /app. |
| `S3_SECRET_ACCESS_KEY` | Backend | (secret) | Bucket secret access key (Railway Bucket reference). |
| `MEDUSA_ADMIN_PASSWORD` | Backend | (secret) | Password of the first admin user (generated). Only used to create the user; change it later in the admin. |
| `STRIPE_WEBHOOK_SECRET` | Backend | (secret) | Optional. Stripe webhook signing secret for <backend URL>/hooks/payment/stripe_stripe. |
| `STOREFRONT_BOOTSTRAP_TOKEN` | Backend | (secret) | Shared token the Storefront uses to fetch the publishable API key from /internal/publishable-key at start. |
| `PORT` | Media-Proxy | 8080 | HTTP port of the proxy. |
| `S3_BUCKET` | Media-Proxy | - | Bucket name used for the S3 API (Railway Bucket reference). |
| `S3_REGION` | Media-Proxy | - | Bucket region (Railway Bucket reference, usually auto). |
| `S3_ENDPOINT` | Media-Proxy | - | S3 API endpoint of the Railway Bucket (public network only). |
| `CACHE_CONTROL` | Media-Proxy | public, max-age=31536000, immutable | Cache-Control header for served files (Medusa file keys are unique per upload). |
| `S3_ACCESS_KEY_ID` | Media-Proxy | - | Bucket access key ID (Railway Bucket reference). |
| `S3_FORCE_PATH_STYLE` | Media-Proxy | - | Same URL style setting as the Backend. |
| `S3_SECRET_ACCESS_KEY` | Media-Proxy | (secret) | Bucket secret access key (Railway Bucket reference). |
| `ALLOWED_CONTENT_TYPES` | Media-Proxy | image/,video/ | Comma-separated content-type prefixes the proxy serves; other objects return 404. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/meili_data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Tags:** medusa, ecommerce, headless-commerce, nextjs, meilisearch · **Languages:** TypeScript, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/medusa-v2-commerce-store-backend-storefr)
