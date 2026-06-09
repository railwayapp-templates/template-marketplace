# Deploy userefract.io on Railway

Refract deployment architecture (userefract.io)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/userefractio)

## About

Refract is a premium TypeScript SaaS foundation engineered for longevity. While most boilerplates become technical debt after the MVP, Refract is Human & Machine Optimized—built with explicit architectural silos so that when your business pivots, your codebase remains an asset, not a liability.

Refract is designed for Zero-Lock-in. The architecture is entirely self-contained, utilizing standard industry primitives that spin up on Railway in minutes:
- Runtime: Node.js / TypeScript
- Primary Data: PostgreSQL
- Cache & Queues: Redis
- Containerization: GitHub Container Registry (GHCR)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Webapp | [arc-lab-hq/refract-dev](https://github.com/arc-lab-hq/refract-dev) | Worker |
| Async | [arc-lab-hq/refract-dev](https://github.com/arc-lab-hq/refract-dev) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Host |
| `REDIS_URL` | Redis | - | Configuration URL |
| `REDIS_PASSWORD` | Redis | (secret) | Password |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL |
| `APP_URL` | Webapp | - | Public URL to access the backend |
| `SERVICE` | Webapp | webapp | Service running the backend container |
| `NODE_ENV` | Webapp | production | Environment running the backend |
| `REDIS_URL` | Webapp | - | URL of the Redis instance |
| `POSTGRES_DB` | Webapp | - | Database of the Postgres instance |
| `SALT_ROUNDS` | Webapp | 10 | Numbers of time a password should be hashed |
| `ANALYTICS_APP` | Webapp | - | Analytics App Tracked |
| `POSTGRES_HOST` | Webapp | - | Host of the Postgres instance |
| `POSTGRES_PORT` | Webapp | - | Port of the Postgres instance |
| `POSTGRES_USER` | Webapp | (secret) | Username of the Postgres instance |
| `SESSION_SECRET` | Webapp | (secret) | Session hashing secret |
| `POSTGRES_PASSWORD` | Webapp | (secret) | Password of the Postrgres instance |
| `STRIPE_SECRET_KEY` | Webapp | (secret) | Stripe production secret key |
| `STRIPE_API_VERSION` | Webapp | - | Stripe production API version |
| `STRIPE_WEBHOOK_SECRET` | Webapp | (secret) | Stripe production webhook secret |
| `STRIPE_PUBLISHABLE_KEY` | Webapp | - | Stripe production publishable key |
| `STRIPE_DEFAULT_CURRENCY` | Webapp | - | Stripe production default currency |
| `APP_URL` | Async | - | Accessible URL for the Frontend (Same as backend in production) |
| `SERVICE` | Async | consumer | Service running the backend container |
| `NODE_ENV` | Async | - | Environment running the backend |
| `REDIS_URL` | Async | - | URL of the Redis instance |
| `POSTGRES_DB` | Async | - | Database of the Postgres instance |
| `SALT_ROUNDS` | Async | - | Numbers of time a password should be hashed |
| `ANALYTICS_APP` | Async | - | Analytics App Tracked |
| `POSTGRES_HOST` | Async | - | Host of the Postgres instance |
| `POSTGRES_PORT` | Async | - | Port of the Postgres instance |
| `POSTGRES_USER` | Async | (secret) | Username of the Postgres instance |
| `SESSION_SECRET` | Async | (secret) | Session hashing secret |
| `POSTGRES_PASSWORD` | Async | (secret) | Password of the Postrgres instance |
| `STRIPE_SECRET_KEY` | Async | (secret) | Stripe production secret key |
| `STRIPE_API_VERSION` | Async | - | Stripe production API version |
| `STRIPE_WEBHOOK_SECRET` | Async | (secret) | Stripe production webhook secret |
| `STRIPE_PUBLISHABLE_KEY` | Async | - | Stripe production publishable key |
| `STRIPE_DEFAULT_CURRENCY` | Async | - | Stripe production default currency |
| `POSTGRES_DB` | Postgres | database | Database |
| `POSTGRES_HOST` | Postgres | - | Host |
| `POSTGRES_PORT` | Postgres | 5432 | Port |
| `POSTGRES_USER` | Postgres | (secret) | Username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Configuration URL |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Start command:** `node apps/backend/dist/consumer.js`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, HTML, Shell, JavaScript, Makefile, Astro, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/userefractio)
