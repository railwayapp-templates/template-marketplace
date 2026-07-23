# Deploy Medusa 2 + Enthusiast Commerce on Railway

Medusa 2 commerce starter with Next.js, Shopping feeds and Enthusiast AI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-2-enthusiast-commerce)

## About

A reusable production starter for a branded Dutch/Belgian webshop. It combines a Medusa 2 backend, a conversion-focused Next.js storefront and the complete Enthusiast AI stack.

This template deploys the complete commerce stack to Railway. Medusa and Enthusiast each receive an isolated PostgreSQL database and Redis instance. The public storefront, Medusa API/Admin and Enthusiast interface receive their own service and health check. Internal service references and generated secrets are configured automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| enthusiast-redis | `redis:8.2.1` | Database |
| storefront | `ghcr.io/pathtoresiliencebv/medusa2-enthusiast-storefront:latest` | Web service |
| enthusiast-beat | `ghcr.io/pathtoresiliencebv/medusa2-enthusiast-enthusiast-server:latest` | Worker |
| enthusiast-worker | `ghcr.io/pathtoresiliencebv/medusa2-enthusiast-enthusiast-server:latest` | Worker |
| enthusiast-api | `ghcr.io/pathtoresiliencebv/medusa2-enthusiast-enthusiast-server:latest` | Web service |
| enthusiast-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| medusa | `ghcr.io/pathtoresiliencebv/medusa2-enthusiast-medusa:latest` | Web service |
| enthusiast-frontend | `ghcr.io/pathtoresiliencebv/medusa2-enthusiast-enthusiast-frontend:latest` | Web service |
| medusa-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| medusa-redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | enthusiast-redis | (secret) |
| `REDIS_PASSWORD` | enthusiast-redis | (secret) |
| `ECL_DB_USER` | enthusiast-beat | (secret) |
| `ECL_DB_PASSWORD` | enthusiast-beat | (secret) |
| `ECL_DJANGO_SECRET_KEY` | enthusiast-beat | (secret) |
| `ECL_DB_USER` | enthusiast-worker | (secret) |
| `ECL_DB_PASSWORD` | enthusiast-worker | (secret) |
| `ECL_DJANGO_SECRET_KEY` | enthusiast-worker | (secret) |
| `ECL_DB_USER` | enthusiast-api | (secret) |
| `ECL_DB_PASSWORD` | enthusiast-api | (secret) |
| `ECL_ADMIN_PASSWORD` | enthusiast-api | (secret) |
| `ECL_DJANGO_SECRET_KEY` | enthusiast-api | (secret) |
| `POSTGRES_USER` | enthusiast-db | (secret) |
| `POSTGRES_PASSWORD` | enthusiast-db | (secret) |
| `JWT_SECRET` | medusa | (secret) |
| `COOKIE_SECRET` | medusa | (secret) |
| `SUPPORT_BFF_SECRET` | medusa | (secret) |
| `SUPPORT_INTERNAL_SECRET` | medusa | (secret) |
| `ENTHUSIAST_SERVICE_ACCOUNT_TOKEN` | medusa | (secret) |
| `POSTGRES_USER` | medusa-db | (secret) |
| `POSTGRES_PASSWORD` | medusa-db | (secret) |
| `REDISPASSWORD` | medusa-redis | (secret) |
| `REDIS_PASSWORD` | medusa-redis | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/docs`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Healthcheck:** `/`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/medusa-2-enthusiast-commerce)
