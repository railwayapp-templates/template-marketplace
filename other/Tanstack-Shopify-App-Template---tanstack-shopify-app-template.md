# Deploy Tanstack Shopify App Template on Railway

A Shopify app using Tanstack, Drizzle, Postgres, and BullMQ with Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tanstack-shopify-app-template)

## About

A modern Shopify app boilerplate built with TanStack Start, React 19, and TypeScript. Features OAuth authentication, GraphQL integration, background job processing with BullMQ, and comprehensive database management with Drizzle ORM for rapid Shopify app development.

Hosting the Tanstack Shopify App Template involves deploying a full-stack application with multiple components: a React frontend using TanStack Router and Start, a backend API with Shopify Admin API integration, PostgreSQL database for session and shop management, Redis for caching and job queues, and BullMQ for background task processing. The deployment requires proper environment configuration for Shopify credentials, database connections, and webhook endpoints to ensure secure OAuth flows and seamless Shopify admin integration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Shopify App | [djordje-st/tanstack-start-shopify-app-boilerplate](https://github.com/djordje-st/tanstack-start-shopify-app-boilerplate) (root: /) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDIS_URL` | Shopify App | - | Redis URL. Automatically configured. |
| `DATABASE_URL` | Shopify App | - | Postgres URL. Automatically configured. |
| `SHOPIFY_API_KEY` | Shopify App | (secret) | Found in the Shopify Dev Dashboard or the shopify.app.toml file |
| `SHOPIFY_APP_URL` | Shopify App | - | The URL where your app is hosted |
| `RAILPACK_BUILD_CMD` | Shopify App | pnpm app:build | Build command for the app |
| `SHOPIFY_API_SECRET` | Shopify App | (secret) | Found in the Shopify Dev Dashboard or the shopify.app.toml file |
| `SHOPIFY_APP_SCOPES` | Shopify App | read_products | Should match the scopes in the shopify.app.toml file |
| `SHOPIFY_APP_PROXY_SECRET` | Shopify App | (secret) | This should match your SHOPIFY_API_SECRET value. Used for the app proxy and webhook validation. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm app:start`

**Category:** Other · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/tanstack-shopify-app-template)
