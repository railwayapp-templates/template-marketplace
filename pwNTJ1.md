# Deploy (v1) Simple Medusa Backend on Railway

Deploy an ecommerce backend and admin using Medusa

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pwNTJ1)

## About

> Note: this deploys a simple Medusa backend that's good for testing or simple use cases. For a recommended production deployment, refer to [this template](https://railway.app/template/zC7eOq?referralCode=TW4Qi0).

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
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `bitnami/redis` | Database |
| medusa-starter-default | [medusajs/medusa-starter-default](https://github.com/medusajs/medusa-starter-default) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `PORT` | medusa-starter-default | 9000 | - |
| `JWT_SECRET` | medusa-starter-default | (secret) | - |
| `COOKIE_SECRET` | medusa-starter-default | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `medusa migrations run && medusa start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/pwNTJ1)
