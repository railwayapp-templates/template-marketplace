# Deploy medusajs ecommerce Nextjs, Postgres, Redis on Railway

Full ecommerce solution, manage products, inventory, orders, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/QvfPwp)

## About

**This template is no longer maintained.** It deploys Medusa **1.x**, which has been replaced by Medusa 2.0. Dependencies were last updated 21 June 2024 and it receives no fixes or updates. It stays published so existing stores and inbound links keep working.

👉 **New project? Use the maintained Medusa 2.0 template instead: [Medusa 2.0 + Next.js Storefront](https://railway.com/deploy/medusajs-2-0-storefront?referralCode=-Yg50p)**

It deploys a Medusa 2.0 backend, Next.js storefront, Postgres, Redis, MeiliSearch and S3-compatible object storage in one click, and it is actively kept up to date. Step by step guide and video: [funkyton.com](https://funkyton.com/medusajs-2-0-is-finally-here/)

*An independent, community-maintained template by [FUNKYTON](https://funkyton.com/). Not affiliated with, endorsed by, or supported by MedusaJS, Inc. or Railway. "Medusa" is a trademark of MedusaJS, Inc., used here only to describe what this template deploys.*

This is the original Medusa 1.x boilerplate: an all-in-one e-commerce stack with backend, admin dashboard and a connected storefront, wired to Postgres and Redis. Railway hosts all of it in one project.

Because Medusa 1.x is superseded, nothing here is being updated. Deploy it only if you specifically need version 1. For anything new, use the [Medusa 2.0 template](https://railway.com/deploy/medusajs-2-0-storefront?referralCode=-Yg50p).

**Already running this one?** Your store keeps working. When you are ready to move, deploy the 2.0 template alongside it and migrate your data, rather than upgrading in place.

Original v1 setup guide and video: [funkyton.com](https://funkyton.com/medusajs-free-fully-open-source-ecommerce-solution/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `redis:8.2.1` | Database |
| medusajs-frontend | [rpuls/medusajs-for-railway-boilerplate.git](https://github.com/rpuls/medusajs-for-railway-boilerplate.git) (root: /medusajs-storefront) | Web service |
| medusajs-backend | [rpuls/medusajs-for-railway-boilerplate.git](https://github.com/rpuls/medusajs-for-railway-boilerplate.git) (root: /medusajs-backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `JWT_SECRET` | medusajs-backend | (secret) | Please change this value! |
| `COOKIE_SECRET` | medusajs-backend | (secret) | Please change this value! |
| `TEMPLATE_REPORTER_URL` | medusajs-backend | https://railway-template-reporter-production.up.railway.app | # Used for analytics - delete if you want to opt out |
| `MEDUSA_ADMIN_ONBOARDING_TYPE` | medusajs-backend | nextjs | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm run seed:once && npm run start`
- **Healthcheck:** `/health`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/QvfPwp)
