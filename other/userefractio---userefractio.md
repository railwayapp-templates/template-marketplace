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
| Backend | [palm-software/website](https://github.com/palm-software/website) | Web service |
| Consumers | [palm-software/website](https://github.com/palm-software/website) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Host |
| `REDIS_URL` | Redis | - | Configuration URL |
| `REDISPASSWORD` | Redis | (secret) | Password |
| `REDIS_PASSWORD` | Redis | (secret) | Password |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL |
| `SERVICE` | Backend | webapp | Service running the backend container |
| `NODE_ENV` | Backend | production | Environment running the backend |
| `REDIS_URL` | Backend | - | URL of the Redis instance |
| `BACKEND_URL` | Backend | - | Public URL to access the backend |
| `SALT_ROUNDS` | Backend | 10 | Numbers of time a password should be hashed |
| `FRONTEND_URL` | Backend | - | Accessible URL for the Frontend (Same as backend in production) |
| `SESSION_SECRET` | Backend | (secret) | Session hashing secret |
| `STRIPE_SECRET_KEY` | Backend | (secret) | Stripe production secret key |
| `STRIPE_API_VERSION` | Backend | - | Stripe production API version |
| `STRIPE_WEBHOOK_SECRET` | Backend | (secret) | Stripe production webhook secret |
| `STRIPE_PUBLISHABLE_KEY` | Backend | - | Stripe production publishable key |
| `SERVICE` | Consumers | consumer | Service running the backend container |
| `NODE_ENV` | Consumers | - | Environment running the backend |
| `REDIS_URL` | Consumers | - | URL of the Redis instance |
| `BACKEND_URL` | Consumers | - | Public URL to access the backend |
| `SALT_ROUNDS` | Consumers | - | Numbers of time a password should be hashed |
| `FRONTEND_URL` | Consumers | - | Accessible URL for the Frontend (Same as backend in production) |
| `SESSION_SECRET` | Consumers | (secret) | Session hashing secret |
| `STRIPE_SECRET_KEY` | Consumers | (secret) | Stripe production secret key |
| `STRIPE_API_VERSION` | Consumers | - | Stripe production API version |
| `STRIPE_WEBHOOK_SECRET` | Consumers | (secret) | Stripe production webhook secret |
| `STRIPE_PUBLISHABLE_KEY` | Consumers | - | Stripe production publishable key |
| `DATABASE_URL` | Postgres | - | Configuration URK |
| `DATABASE_PUBLIC_URL` | Postgres | - | Publicly accessible URL |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `node apps/backend/dist/consumer.js`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, HTML, Shell, Makefile, JavaScript, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/userefractio)
