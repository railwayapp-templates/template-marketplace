# Deploy medusajs ecommerce Nextjs, Postgres, Redis on Railway

Full ecommerce solution, manage products, inventory, orders, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/QvfPwp)

## About

[Meudsa version 2 template is out now!](https://railway.com/template/gkU-27?referralCode=-Yg50p)

But if you prefer the good old...:

This boilerplate is a all in one medusajs (version 1.X legacy) ecommerce webshop solution, it comes preconfigured with both backend + admin dashbord and connected to the "storefront" (webshop frontend).

**Dependencies updated: 21-06-2024**

### Video demo and tutorial
[![alt text](https://img.youtube.com/vi/pP84utXQgxg/maxresdefault.jpg)](https://youtu.be/pP84utXQgxg)

Instructions: [https://funkyton.com/medusajs-free-fully-open-source-ecommerce-solution/](https://funkyton.com/medusajs-free-fully-open-source-ecommerce-solution/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| medusajs-frontend | [rpuls/medusajs-for-railway-boilerplate.git](https://github.com/rpuls/medusajs-for-railway-boilerplate.git) (root: /medusajs-storefront) | Web service |
| medusajs-backend | [rpuls/medusajs-for-railway-boilerplate.git](https://github.com/rpuls/medusajs-for-railway-boilerplate.git) (root: /medusajs-backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `JWT_SECRET` | medusajs-backend | (secret) | Please change this value! |
| `COOKIE_SECRET` | medusajs-backend | (secret) | Please change this value! |
| `TEMPLATE_REPORTER_URL` | medusajs-backend | https://railway-template-reporter-production.up.railway.app | # Used for analytics - delete if you want to opt out |
| `MEDUSA_ADMIN_ONBOARDING_TYPE` | medusajs-backend | nextjs | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm run seed:once && npm run start`
- **Healthcheck:** `/health`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/QvfPwp)
