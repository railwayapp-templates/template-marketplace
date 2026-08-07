# Deploy Medusa v2 (Worker Mode) on Railway

Medusa v2 with a dedicated background-job worker, search and storefront.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-v2-worker-mode)

## About

Medusa is an open-source commerce platform: a headless Node.js backend with a
full Admin dashboard, plus a Next.js storefront. This template runs it the way
Medusa documents for production — API traffic and background jobs split into
two independently scalable services instead of one process doing both.

Deploying provisions seven services: a Medusa **Backend** in `server` mode, a
**Worker** in `worker` mode, Postgres, Redis, Meilisearch, a Next.js
**Storefront**, and a read-only media proxy in front of a Railway Storage
Bucket. Backend and Worker build the same repository, so the first deploy takes
roughly 10–15 minutes. On a cold project the Backend runs migrations and seeds
demo catalog data on first boot, while the Worker restarts a few times until
that schema exists — this is expected and self-healing, not a failure. Only
Backend, Storefront, Meilisearch, and the media proxy get public domains; the
Worker deliberately has none.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Worker | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (branch: master) (root: /backend) | Worker |
| Storefront | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (branch: master) (root: /storefront) | Web service |
| Media-proxy | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Backend | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (branch: master) (root: /backend) | Web service |
| MeiliSearch | `getmeili/meilisearch:v1.11.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway private domain name for Redis. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default Redis user. |
| `REDIS_URL` | Redis | - | Connection string for Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, used by the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password protecting Redis. |
| `PORT` | Worker | 9000 | Port Medusa binds. Must match the healthcheck probe. |
| `NODE_ENV` | Worker | production | Node environment. Keep as production. |
| `REDIS_URL` | Worker | - | Redis for the event bus and workflow engine. family=0 lets ioredis resolve Railway's dual-stack DNS. |
| `S3_BUCKET` | Worker | - | Storage bucket holding product media. |
| `S3_REGION` | Worker | - | Region of the storage bucket. |
| `JWT_SECRET` | Worker | (secret) | Must match the Backend's JWT secret. |
| `S3_ENDPOINT` | Worker | - | S3 API endpoint for the bucket. |
| `S3_FILE_URL` | Worker | - | Public base URL uploaded files are served from. |
| `DATABASE_URL` | Worker | - | Postgres connection string. |
| `COOKIE_SECRET` | Worker | (secret) | Must match the Backend's cookie secret. |
| `RESEND_API_KEY` | Worker | (secret) | Resend API key. Enables transactional email together with RESEND_FROM_EMAIL. |
| `STRIPE_API_KEY` | Worker | (secret) | Stripe secret key. Enables card payments together with STRIPE_WEBHOOK_SECRET. |
| `MEILISEARCH_HOST` | Worker | - | Meilisearch over the private network; indexing traffic never leaves Railway. |
| `S3_ACCESS_KEY_ID` | Worker | - | Access key id for the bucket's S3 API. |
| `SENDGRID_API_KEY` | Worker | (secret) | SendGrid API key. Alternative to Resend. |
| `RESEND_FROM_EMAIL` | Worker | - | From address for Resend email, e.g. store@yourdomain.com. |
| `MEDUSA_WORKER_MODE` | Worker | worker | Runs scheduled jobs and subscribers only; serves no API traffic. |
| `SENDGRID_FROM_EMAIL` | Worker | - | From address for SendGrid email. |
| `MEDUSA_DISABLE_ADMIN` | Worker | true | Skips building the Admin dashboard on this instance. |
| `S3_SECRET_ACCESS_KEY` | Worker | (secret) | Secret key for the bucket's S3 API. |
| `STRIPE_WEBHOOK_SECRET` | Worker | (secret) | Stripe webhook signing secret. Required alongside STRIPE_API_KEY. |
| `MEILISEARCH_MASTER_KEY` | Worker | - | Meilisearch root key, used once at boot to mint a scoped admin key. |
| `PORT` | Storefront | 3000 | Port Next.js binds. Must match the healthcheck probe. |
| `NODE_ENV` | Storefront | production | Node environment. Keep as production. |
| `MEILISEARCH_API_KEY` | Storefront | (secret) | Used at boot to mint a scoped, search-only Meilisearch key. |
| `NEXT_PUBLIC_BASE_URL` | Storefront | - | The storefront's own public origin. |
| `NEXT_PUBLIC_INDEX_NAME` | Storefront | products | Meilisearch index backing product search. |
| `NEXT_PUBLIC_STRIPE_KEY` | Storefront | - | Stripe publishable key for the checkout form. |
| `NEXT_PUBLIC_MEDIA_HOSTNAME` | Storefront | - | Allowed image host for next/image. |
| `NEXT_PUBLIC_SEARCH_ENDPOINT` | Storefront | - | Public Meilisearch origin; browsers query it directly. |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Storefront | - | Backend the storefront calls from the browser. |
| `PORT` | Media-proxy | 8080 | Port the proxy binds. Must match the healthcheck probe. |
| `S3_BUCKET` | Media-proxy | - | Storage bucket holding product media. |
| `S3_REGION` | Media-proxy | - | Region of the storage bucket. |
| `S3_ENDPOINT` | Media-proxy | - | S3 API endpoint for the bucket. |
| `CACHE_CONTROL` | Media-proxy | public, max-age=31536000, immutable | Cache-Control header sent with served media. |
| `S3_ACCESS_KEY_ID` | Media-proxy | - | Access key id for the bucket's S3 API. |
| `S3_SECRET_ACCESS_KEY` | Media-proxy | (secret) | Secret key for the bucket's S3 API. |
| `POSTGRES_DB` | Postgres | railway | Default database created when the image starts. |
| `DATABASE_URL` | Postgres | - | Connection string used by Medusa over the private network. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to the Postgres database. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for the Postgres user. |
| `PORT` | Backend | 9000 | Port Medusa binds. Must match the healthcheck probe. |
| `NODE_ENV` | Backend | production | Node environment. Keep as production. |
| `AUTH_CORS` | Backend | - | Origins allowed to call the auth routes. |
| `REDIS_URL` | Backend | - | Redis for the event bus and workflow engine. family=0 lets ioredis resolve Railway's dual-stack DNS. |
| `S3_BUCKET` | Backend | - | Storage bucket holding product media. |
| `S3_REGION` | Backend | - | Region of the storage bucket. |
| `ADMIN_CORS` | Backend | - | Origins allowed to call the Admin API. |
| `JWT_SECRET` | Backend | (secret) | Generated secret used to sign JWTs. Shared with the Worker. |
| `STORE_CORS` | Backend | - | Storefront origin allowed to call the Store API. |
| `S3_ENDPOINT` | Backend | - | S3 API endpoint for the bucket. |
| `S3_FILE_URL` | Backend | - | Public base URL uploaded files are served from. |
| `DATABASE_URL` | Backend | - | Postgres connection string. |
| `COOKIE_SECRET` | Backend | (secret) | Generated secret used to sign session cookies. Shared with the Worker. |
| `RESEND_API_KEY` | Backend | (secret) | Resend API key. Enables transactional email together with RESEND_FROM_EMAIL. |
| `STRIPE_API_KEY` | Backend | (secret) | Stripe secret key. Enables card payments together with STRIPE_WEBHOOK_SECRET. |
| `MEILISEARCH_HOST` | Backend | - | Meilisearch over the private network; indexing traffic never leaves Railway. |
| `S3_ACCESS_KEY_ID` | Backend | - | Access key id for the bucket's S3 API. |
| `SENDGRID_API_KEY` | Backend | (secret) | SendGrid API key. Alternative to Resend. |
| `RESEND_FROM_EMAIL` | Backend | - | From address for Resend email, e.g. store@yourdomain.com. |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@example.com | Admin login created during first-boot seeding. Change this before deploying. |
| `MEDUSA_WORKER_MODE` | Backend | server | Serves HTTP only; background jobs run on the Worker service. |
| `SENDGRID_FROM_EMAIL` | Backend | - | From address for SendGrid email. |
| `MEDUSA_DISABLE_ADMIN` | Backend | false | Keeps the Admin dashboard on this instance. |
| `S3_SECRET_ACCESS_KEY` | Backend | (secret) | Secret key for the bucket's S3 API. |
| `MEDUSA_ADMIN_PASSWORD` | Backend | (secret) | Generated password for the admin user. Only used at seed time. |
| `STRIPE_WEBHOOK_SECRET` | Backend | (secret) | Stripe webhook signing secret. Required alongside STRIPE_API_KEY. |
| `MEILISEARCH_MASTER_KEY` | Backend | - | Meilisearch root key, used once at boot to mint a scoped admin key. |
| `PORT` | MeiliSearch | 7700 | Port Meilisearch binds. Must match the healthcheck probe. |
| `MEILI_ENV` | MeiliSearch | production | Production mode; requires a master key. |
| `MEILI_DB_PATH` | MeiliSearch | /meili_data/data.ms | Index location on the attached volume. |
| `MEILI_HTTP_ADDR` | MeiliSearch | 0.0.0.0:7700 | Bind address. IPv4 so Railway's healthcheck can reach it. |
| `MEILI_MASTER_KEY` | MeiliSearch | - | Generated root key. Backend and Storefront derive scoped keys from it. |
| `MEILI_NO_ANALYTICS` | MeiliSearch | true | Disables telemetry sent to Meilisearch's servers. |
| `MEILI_MAX_INDEXING_MEMORY` | MeiliSearch | 2GiB | Caps indexing memory so large catalogs don't OOM the service. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `./run.sh aW1wb3J0IHsgczMgfSBmcm9tICJidW4iOwoKY29uc3QgQ0FDSEVfQ09OVFJPTCA9IEJ1bi5lbnYuQ0FDSEVfQ09OVFJPTCB8fCAicHVibGljLCBtYXgtYWdlPTMxNTM2MDAwLCBpbW11dGFibGUiOwoKY29uc3Qgbm90Rm91bmQgPSAoKSA9PiBuZXcgUmVzcG9uc2UoIk5vdCBGb3VuZCIsIHsgc3RhdHVzOiA0MDQgfSk7CgpleHBvcnQgZGVmYXVsdCB7CiAgYXN5bmMgZmV0Y2gocmVxOiBSZXF1ZXN0KTogUHJvbWlzZTxSZXNwb25zZT4gewogICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXEudXJsKTsKCiAgICBpZiAodXJsLnBhdGhuYW1lID09PSAiL3Byb3h5LWhlYWx0aHoiKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIm9rIiwgeyBzdGF0dXM6IDIwMCB9KTsKICAgIH0KCiAgICBpZiAocmVxLm1ldGhvZCAhPT0gIkdFVCIgJiYgcmVxLm1ldGhvZCAhPT0gIkhFQUQiKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk1ldGhvZCBOb3QgQWxsb3dlZCIsIHsKICAgICAgICBzdGF0dXM6IDQwNSwKICAgICAgICBoZWFkZXJzOiB7IEFsbG93OiAiR0VULCBIRUFEIiB9LAogICAgICB9KTsKICAgIH0KCiAgICBsZXQga2V5OiBzdHJpbmc7CiAgICB0cnkgewogICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQodXJsLnBhdGhuYW1lLnNsaWNlKDEpKTsKICAgIH0gY2F0Y2ggewogICAgICByZXR1cm4gbm90Rm91bmQoKTsKICAgIH0KCiAgICBpZiAoIWtleSB8fCBrZXkuaW5jbHVkZXMoIlwwIikgfHwga2V5LmluY2x1ZGVzKCIuLiIpKSByZXR1cm4gbm90Rm91bmQoKTsKCiAgICBjb25zdCBmaWxlID0gczMuZmlsZShrZXkpOwogICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZpbGUuc3RhdCgpLmNhdGNoKCgpID0+IG51bGwpOwogICAgaWYgKCFzdGF0KSByZXR1cm4gbm90Rm91bmQoKTsKCiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gewogICAgICAiQ29udGVudC1UeXBlIjogc3RhdC50eXBlIHx8ICJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0iLAogICAgICAiQ29udGVudC1MZW5ndGgiOiBTdHJpbmcoc3RhdC5zaXplKSwKICAgICAgIkNhY2hlLUNvbnRyb2wiOiBDQUNIRV9DT05UUk9MLAogICAgICAiWC1Db250ZW50LVR5cGUtT3B0aW9ucyI6ICJub3NuaWZmIiwKICAgIH07CgogICAgcmV0dXJuIHJlcS5tZXRob2QgPT09ICJIRUFEIgogICAgICA/IG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogMjAwLCBoZWFkZXJzIH0pCiAgICAgIDogbmV3IFJlc3BvbnNlKGZpbGUuc3RyZWFtKCksIHsgc3RhdHVzOiAyMDAsIGhlYWRlcnMgfSk7CiAgfSwKfTsK`
- **Healthcheck:** `/proxy-healthz`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Volume:** `/meili_data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/medusa-v2-worker-mode)
