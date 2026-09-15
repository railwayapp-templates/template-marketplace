# Deploy Railhead on Railway

Next.js SaaS starter with auth, Stripe billing, email, and a worker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railhead)

## About

Railhead is a batteries-included SaaS starter: Next.js, Postgres, Better
Auth, Stripe billing, Resend email, and a Redis-backed worker, wired
together and ready to deploy. Most "SaaS starter" templates stop at auth
and a database — Railhead goes the rest of the way, because Stripe
Checkout and webhooks, transactional email, and a real background worker
are the parts everyone rebuilds from scratch and nobody wants to.

This template deploys two Railway services (a Next.js app and a BullMQ
worker) plus a Postgres and a Redis plugin, wired together with
reference variables. The `web` service handles the UI, Better Auth
sign-up/sign-in, and Stripe Checkout; the `worker` service is a
dedicated, no-public-port BullMQ consumer that sends transactional email
and processes Stripe webhook events asynchronously, so a webhook is
always acknowledged inside Stripe's 5-second window regardless of
downstream load.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | [Alphine/Railhead](https://github.com/Alphine/Railhead) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [Alphine/Railhead](https://github.com/Alphine/Railhead) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `RESEND_API_KEY` | worker | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `STRIPE_SECRET_KEY` | web | (secret) |
| `BETTER_AUTH_SECRET` | web | (secret) |
| `STRIPE_WEBHOOK_SECRET` | web | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Start command:** `npm run start --workspace=apps/worker`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start --workspace=apps/web`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Starters · **Languages:** TypeScript, PLpgSQL, CSS

[View on Railway →](https://railway.com/deploy/railhead)
