# Deploy Medusa on Railway

MedusaJS 2 commerce with admin and Next.js storefront, Postgres and Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-1)

## About

[Medusa](https://github.com/medusajs/medusa) is an open-source commerce platform, often used as a Shopify alternative: products, inventory, carts, orders, customers, regions and taxes behind an API, with an admin dashboard. This template runs Medusa 2.21.2 with its admin and Medusa's official Next.js storefront, on Postgres and Redis.

The template builds Medusa's official starter, [dtc-starter](https://github.com/medusajs/dtc-starter), at a pinned commit (it has no releases). Medusa's older Next.js starter is archived; dtc-starter is the one Medusa points to now.

What happens on deploy:

- The backend runs its migrations on every start. On an empty database they also seed a starter store: a Europe region (GB, DE, DK, SE, FR, ES, IT) in EUR and USD, shipping options, a stock location and four demo products you can delete in the admin.
- The admin account is created from `MEDUSA_ADMIN_EMAIL` and a generated `MEDUSA_ADMIN_PASSWORD`. Medusa has no public admin sign-up, so nobody else can claim the store.
- The storefront needs a publishable API key when it's built, which usually means copying it from the admin and rebuilding. Here the key is generated at deploy (`MEDUSA_PUBLISHABLE_KEY`), the storefront is built with it, and the backend sets its store key to that value on every start.
- The storefront's product, collection and category pages render on request instead of at build time, so it builds before the backend has ever run and new products show up without a rebuild.
- Redis handles caching, events, workflows and locking. Uploaded images go to a volume and are served by the backend at `/static`. The backend's heap is capped at 512 MB so it fits a 1 GB service.

Before publishing I tested it on Railway. The backend answered `/health` and served the admin at `/app`, and the admin signed in with the generated password. The store API, called with the generated publishable key, listed the four seeded products, and the storefront rendered the Medusa Sweatshirt's product page. An image uploaded through the admin API was served from `/static`. After restarting all four services the same checks passed and the image was still there.

Memory at idle: backend 0.34 GB, storefront 0.10 GB, Postgres 0.07 GB, Redis 0.01 GB. That's about $5 a month on Railway's usage pricing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7.4` | Database |
| Medusa | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /medusa) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Storefront | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /medusa-storefront) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (generated) |
| `PORT` | Medusa | 9000 | Port Railway routes to |
| `AUTH_CORS` | Medusa | - | Origins allowed to call the auth API |
| `REDIS_URL` | Medusa | - | Redis over the private network |
| `ADMIN_CORS` | Medusa | - | Origins allowed to call the admin API |
| `JWT_SECRET` | Medusa | (secret) | Signs auth tokens (generated) |
| `STORE_CORS` | Medusa | - | Origins allowed to call the store API (add your storefront's custom domain) |
| `DATABASE_URL` | Medusa | - | Postgres over the private network |
| `NODE_OPTIONS` | Medusa | --max-old-space-size=512 | Heap cap so Medusa fits a 1 GB service; raise it on bigger plans |
| `COOKIE_SECRET` | Medusa | (secret) | Signs session cookies (generated) |
| `MEDUSA_ADMIN_URL` | Medusa | - | Medusa admin |
| `MEDUSA_ADMIN_EMAIL` | Medusa | - | Email of the admin account, created on first start. Sign in at MEDUSA_ADMIN_URL with it and MEDUSA_ADMIN_PASSWORD |
| `MEDUSA_BACKEND_URL` | Medusa | - | Public URL of the backend (store API, admin, uploaded files) |
| `MEDUSA_WORKER_MODE` | Medusa | shared | One process serves the API and runs background jobs |
| `MEDUSA_ADMIN_PASSWORD` | Medusa | (secret) | Password of the admin account (generated) |
| `MEDUSA_PUBLISHABLE_KEY` | Medusa | - | The storefront's publishable API key (generated, not secret); set on the store's key at every start |
| `AUTH_MFA_ENCRYPTION_KEY` | Medusa | - | Encrypts admin MFA secrets (generated) |
| `POSTGRES_DB` | Postgres | medusa | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | Storefront | 8000 | Port Railway routes to |
| `STOREFRONT_URL` | Storefront | - | Your shop |
| `NEXT_PUBLIC_BASE_URL` | Storefront | - | The storefront's own URL |
| `NEXT_PUBLIC_DEFAULT_REGION` | Storefront | dk | Country code used when a visitor's country isn't in a region (the starter store's region covers gb, de, dk, se, fr, es, it) |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Storefront | - | Backend URL, built into the storefront |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Storefront | - | Publishable API key, built into the storefront |

## Configuration

- **Start command:** `/bin/sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --save "" --appendonly no'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/apps/backend/.medusa/server/static`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/dk`

**Category:** Other · **Tags:** medusa, medusajs, ecommerce, shopify-alternative, nextjs, headless-commerce · **Languages:** JavaScript, Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/medusa-1)
