# Deploy Medusajs 2.0 + Storefront on Railway

Full ecommerce solution, manage products, inventory, orders, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gkU-27)

## About

Deploy a **best-in-class e-commerce stack** in minutes. This boilerplate brings you an all-in-one MedusaJS 2.0 webshop solution, preconfigured with backend, admin dashboard, and a connected storefront (webshop). Everything you need to get started with a modern, feature-rich shop, now updated to **v2.12.1 🤩 (7. December 2025)**.

### Video Instructions
[![Watch the video](https://img.youtube.com/vi/Gr5F2j5B-os/maxresdefault.jpg)](https://youtu.be/Gr5F2j5B-os)
Click ☝️ to play on YouTube

### Additional Docs & Resources
- Full guide: [https://funkyton.com/medusajs-2-0-is-finally-here/](https://funkyton.com/medusajs-2-0-is-finally-here/)
- GitHub: [https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate)

Host the next-gen MedusaJS 2.0 e-commerce stack—complete with storefront, admin dashboard, and all services—without tedious setup. This template configures backend, frontend, Redis, Postgres, MinIO, MeiliSearch, and more, so your shop is production-ready from the first deploy. Benefit from automated admin creation, strong secrets, API key sharing, health checks, and pre-bundled Stripe and email plugins. Railway handles the cloud infrastructure so you can focus on building your business or project. Ideal for fast prototyping, custom e-commerce, personal hobby webshop, and ambitious side-projects.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MeiliSearch | `getmeili/meilisearch:v1.11.3` | Web service |
| Backend | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /backend) | Web service |
| Redis | `redis:8.2.1` | Database |
| Bucket | `minio/minio:latest` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Storefront | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /storefront) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | MeiliSearch | 3331 | - |
| `MEILI_ENV` | MeiliSearch | production | - |
| `MEILI_DB_PATH` | MeiliSearch | /meili_data/data.ms | - |
| `MEILI_HTTP_ADDR` | MeiliSearch | :::3331 | - |
| `MEILI_MAX_INDEXING_MEMORY` | MeiliSearch | 2GiB | - |
| `NODE_ENV` | Backend | production | - |
| `JWT_SECRET` | Backend | (secret) | - |
| `RESEND_FROM` | Backend | - | Required to enable automated emails with Resend (info@yourdomain.com) |
| `COOKIE_SECRET` | Backend | (secret) | - |
| `RESEND_API_KEY` | Backend | (secret) | Required to enable automated emailing with Resend |
| `STRIPE_API_KEY` | Backend | (secret) | Required to enable credit card payment with Stripe |
| `MINIO_SECRET_KEY` | Backend | (secret) | - |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@yourmail.com | Change to your own email (❗Only used when seeding the database - to create new admin user, invite via the admin dashboard) |
| `MEDUSA_ADMIN_PASSWORD` | Backend | (secret) | ❗Only used when seeding the database - to create new admin user, invite via the admin dashboard |
| `STRIPE_WEBHOOK_SECRET` | Backend | (secret) | Required to enable credit card payment with Stripe |
| `TEMPLATE_REPORTER_URL` | Backend | https://railway-template-reporter-production.up.railway.app | - |
| `MEILISEARCH_MASTER_KEY` | Backend | - | Used to fetch admin key. If you want to use your own admin key, delete this variable and create MEILISEARCH_ADMIN_KEY instead. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |
| `MEILISEARCH_API_KEY` | Storefront | (secret) | Only used to fetch search key. |
| `NEXT_PUBLIC_INDEX_NAME` | Storefront | products | - |
| `NEXT_PUBLIC_STRIPE_KEY` | Storefront | - | Add to enable credit card payment with Stripe |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`
- **Healthcheck:** `/health`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/template/gkU-27)
