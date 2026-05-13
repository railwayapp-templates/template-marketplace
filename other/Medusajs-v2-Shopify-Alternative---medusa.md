# Deploy Medusa.js v2 | Shopify Alternative on Railway

Self Host Medusa.js v2: Headless Commerce with REST API, admin, workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa?referralCode=QXdhdr)

Medusa.js v2 is an MIT-licensed, open-source headless commerce engine that gives JavaScript developers full ownership of the storefront, checkout, admin, and underlying data — with no per-sale fees, no feature paywalls, and no vendor lock-in. It's the open-source alternative to Shopify and the REST-first answer to Saleor and Vendure, with a modular Node.js + TypeScript backend that drops into any Next.js, Remix, or native frontend.

This template lets you deploy Medusa.js v2 on Railway in one click, with managed Postgres and Redis pre-wired, JWT and cookie secrets auto-generated, CORS configured for your Railway domain, and the initial admin user bootstrapped on first boot. The backend ships from a public custom Dockerfile (`praveen-ks-2001/medusa-railway`) — fork it to add modules, custom routes, subscribers, or workflows, then auto-deploy on every `git push`.

![Medusa.js v2 Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778613776/4de15b50-2c72-41f4-8b95-00035a38a968.png)

Medusa.js v2 is a TypeScript-first commerce engine that exposes Store, Admin, and Workflow APIs you build any frontend on. Each commerce primitive (cart, order, payment, fulfillment, customer, inventory) is an independent, swappable module.

Key features:
- **Modular core** — products, carts, orders, promotions, taxes, inventory, fulfillment as separate modules
- **Workflow engine** — durable, retryable, Redis-backed commerce workflows with rollback
- **Admin dashboard** — built in at `/app`, no separate service to host
- **B2B, D2C, marketplace, POS starters** — same engine, different starter
- **First-class integrations** — Stripe, Resend, SendGrid, MinIO, Meilisearch

The `medusa` service talks to Postgres and Redis over Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| medusa | [praveen-ks-2001/medusa-railway](https://github.com/praveen-ks-2001/medusa-railway) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | medusa | 9000 | HTTP server listening port |
| `NODE_ENV` | medusa | production | Node environment |
| `AUTH_CORS` | medusa | - | CORS allowlist for /auth/* |
| `REDIS_URL` | medusa | - | Redis URL (?family=0 required on Railway) |
| `ADMIN_CORS` | medusa | - | CORS allowlist for /admin/* |
| `JWT_SECRET` | medusa | (secret) | Signs admin and customer JWTs |
| `STORE_CORS` | medusa | - | CORS allowlist for /store/* |
| `BACKEND_URL` | medusa | - | Backend URL (runtime use only) |
| `DATABASE_URL` | medusa | - | Railway-managed Postgres connection |
| `COOKIE_SECRET` | medusa | (secret) | Signs admin session cookies |
| `MEDUSA_ADMIN_EMAIL` | medusa | - | Initial admin user email. Login at /app |
| `MEDUSA_WORKER_MODE` | medusa | shared | Worker mode: shared, server, or worker |
| `DISABLE_MEDUSA_ADMIN` | medusa | false | Set true to disable admin UI |
| `MEDUSA_ADMIN_PASSWORD` | medusa | (secret) | Initial admin user password. Login at /app |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/medusa)
