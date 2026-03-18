# Deploy (v1) Medusa Backend with Worker Modes on Railway

Deploy an ecommerce backend and admin using Medusa

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zC7eOq)

## About

> Note: this deploys a Medusa backend with two services supporting [worker mode](https://docs.medusajs.com/development/worker-mode/) which is ideal for a production deployment. For testing, development, or simple use cases, you can use [this template](https://railway.app/template/pwNTJ1?referralCode=TW4Qi0) instead.

Deploy a fully-fledged ecommerce backend and admin dashboard using [Medusa](https://medusajs.com/).

Once the deployment finishes, you can access the admin dashboard at `/app`. Refer to [this documentation](https://docs.medusajs.com/deployments/server/deploying-on-railway#create-admin-user) to learn how to create an admin user.

You can refer to the [Admin](https://docs.medusajs.com/api/admin) and [Store](https://docs.medusajs.com/api/store) API references to learn how to send requests to the Medusa backend.

Please note that this template doesn't use Redis or the production module for events and caching. Refer to the documentation to learn how to set them:

- [Set redis_url in Medusa's configurations](https://docs.medusajs.com/development/backend/configurations#redis_url)
- [Install and use the Redis Event Bus module](https://docs.medusajs.com/development/events/modules/redis)
- [Install and use the Redis Cache module](https://docs.medusajs.com/development/cache/modules/redis)

You can refer to the [Medusa documentation](https://docs.medusajs.com/) for guides related to troubleshooting, development, plugins, and more.

Please consider [giving Medusa a star on GitHub](https://github.com/medusajs/medusa).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend (server) | [medusajs/medusa-starter-default](https://github.com/medusajs/medusa-starter-default) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| backend (worker) | [medusajs/medusa-starter-default](https://github.com/medusajs/medusa-starter-default) | Worker |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | backend (server) | 9000 | The port to run the backend on |
| `REDIS_URL` | backend (server) | - | URL of Redis |
| `JWT_SECRET` | backend (server) | (secret) | Secret used to sign JWT tokens |
| `DATABASE_URL` | backend (server) | - | URL of Postgres Database |
| `COOKIE_SECRET` | backend (server) | (secret) | Secret used to sign cookie SID |
| `MEDUSA_WORKER_MODE` | backend (server) | server | The worker mode of the service |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDIS_URL` | backend (worker) | - | The URL to the Redis database |
| `JWT_SECRET` | backend (worker) | (secret) | The JWT secret |
| `DATABASE_URL` | backend (worker) | - | The URL to the PostgreSQL database |
| `COOKIE_SECRET` | backend (worker) | (secret) | The cookie secret |
| `MEDUSA_WORKER_MODE` | backend (worker) | worker | The worker mode of the service |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **Start command:** `medusa migrations run && medusa start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/zC7eOq)
