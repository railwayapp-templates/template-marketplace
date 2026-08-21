# Deploy Medusa.js on Railway

Open-source commerce backend for building your own online store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusajs)

## About

Medusa is an open-source commerce platform written in TypeScript. Where a hosted store keeps your catalogue, checkout and order logic behind someone else's admin panel, Medusa gives you the same building blocks — products, carts, orders, inventory, pricing, promotions, tax and fulfilment — as modules you own, behind a Store API for any storefront and an Admin API for any back office. Brands reach for it when the checkout or the pricing rules are the product, not a setting.

Deploy Medusa on Railway and this template runs the backend the way Medusa's own deployment guide describes it: a **server** service answering the Store and Admin APIs and serving the dashboard at `/app`, a **worker** service running scheduled jobs, subscribers and long-running workflows, managed **PostgreSQL** holding every commerce record, managed **Redis** carrying the event bus, cache, locks and workflow queues between the two, and an S3-compatible **bucket** for product media. Only the server has a public domain. Both build from [gridalpha/medusa-railway](https://github.com/gridalpha/medusa-railway), pinned to Medusa 2.19.0.

![Medusa server and worker services above Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787192190/medusa-architecture.png)

Medusa is a backend, not a website. It ships no storefront — you build that in Next.js, Astro or anything else and talk to the Store API. Self-hosting earns its keep once the commerce logic is genuinely custom: bespoke pricing, marketplace payouts, subscription billing, or an ERP that stays authoritative.

- Products with options, variants, categories, collections and multi-currency pricing
- Carts, promotions, tax regions and a pluggable payment and fulfilment layer
- Multi-warehouse inventory with reservations, plus sales channels per storefront
- Orders, returns, exchanges, claims and draft orders in one model
- Durable, resumable workflows, and an Admin dashboard you extend with your own pages

The Railway topology mirrors that split. The **server** handles requests and serves the dashboard; the **worker** runs what must not block one — scheduled jobs, subscribers reacting to `order.placed`, exports and imports. **PostgreSQL** is the system of record, and **Redis** makes the two containers one system: event bus, shared cache, locking provider and workflow engine all run through it. The **bucket** holds uploaded media, so neither app service keeps state on disk and the server can scale to several replicas.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| medusa-worker | [gridalpha/medusa-railway](https://github.com/gridalpha/medusa-railway) | Worker |
| medusa-server | [gridalpha/medusa-railway](https://github.com/gridalpha/medusa-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | medusa-worker | 9000 | HTTP port serving /health only |
| `REDIS_URL` | medusa-worker | - | Redis for events, cache, locks, queues |
| `S3_BUCKET` | medusa-worker | - | Bucket holding uploaded media |
| `S3_REGION` | medusa-worker | - | Bucket region |
| `JWT_SECRET` | medusa-worker | (secret) | Must match the server exactly |
| `S3_ENDPOINT` | medusa-worker | - | S3-compatible endpoint URL |
| `DATABASE_URL` | medusa-worker | - | Postgres connection string |
| `NODE_OPTIONS` | medusa-worker | --max-old-space-size=4096 | Node heap ceiling for the container |
| `COOKIE_SECRET` | medusa-worker | (secret) | Must match the server exactly |
| `S3_ACCESS_KEY_ID` | medusa-worker | - | Bucket access key |
| `MEDUSA_PUBLIC_URL` | medusa-worker | - | Public base URL for generated file links |
| `MEDUSA_WORKER_MODE` | medusa-worker | worker | Runs jobs, subscribers, workflows |
| `DISABLE_MEDUSA_ADMIN` | medusa-worker | true | Skip the dashboard on this service |
| `S3_SECRET_ACCESS_KEY` | medusa-worker | (secret) | Bucket secret key |
| `PORT` | medusa-server | 9000 | HTTP listening port |
| `REDIS_URL` | medusa-server | - | Redis for events, cache, locks, queues |
| `S3_BUCKET` | medusa-server | - | Bucket holding uploaded media |
| `S3_REGION` | medusa-server | - | Bucket region |
| `JWT_SECRET` | medusa-server | (secret) | Signs API tokens, keep stable |
| `S3_ENDPOINT` | medusa-server | - | S3-compatible endpoint URL |
| `DATABASE_URL` | medusa-server | - | Postgres connection string |
| `NODE_OPTIONS` | medusa-server | --max-old-space-size=4096 | Node heap ceiling for the container |
| `COOKIE_SECRET` | medusa-server | (secret) | Signs session cookies, keep stable |
| `S3_ACCESS_KEY_ID` | medusa-server | - | Bucket access key |
| `MEDUSA_PUBLIC_URL` | medusa-server | - | Public base URL for links and uploads |
| `MEDUSA_ADMIN_EMAIL` | medusa-server | admin@example.com | First administrator email |
| `MEDUSA_WORKER_MODE` | medusa-server | server | Serves Store, Admin and dashboard |
| `DISABLE_MEDUSA_ADMIN` | medusa-server | false | Build and serve the Admin dashboard |
| `S3_SECRET_ACCESS_KEY` | medusa-server | (secret) | Bucket secret key |
| `MEDUSA_ADMIN_PASSWORD` | medusa-server | (secret) | First administrator password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/medusajs)
