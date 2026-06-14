# Deploy OfferKit on Railway

Self-hosted engine for coupons, loyalty, referrals, and gift cards.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/offerkit)

## About

OfferKit is an open-source promotion engine for coupons, gift cards, loyalty, referrals, customer segments, validation rules, and stackable redemptions. It includes a dashboard, REST API, TypeScript SDK, CLI, and MCP server, giving developers a self-hosted way to manage promotion logic across products and checkout flows.

Hosting OfferKit on Railway provisions the core services needed to run the promotion engine in production: a public web service, a private background worker, PostgreSQL for durable application data, and Redis for job processing. The web service serves the dashboard, API, and docs, while the worker handles async jobs such as webhook delivery, bulk code generation, and loyalty expiration. OfferKit runs from a published Docker image, so Railway can deploy it without building the source monorepo. On first boot, the web service runs database migrations and creates the initial admin user from environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | `ghcr.io/offerkit/offerkit:edge` | Web service |
| worker | `ghcr.io/offerkit/offerkit:edge` | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ADMIN_PASSWORD` | web | (secret) | - |
| `BETTER_AUTH_SECRET` | web | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node apps/web/server.js`
- **Healthcheck:** `/api/v1/ready`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/offerkit)
