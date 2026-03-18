# Deploy Medusajs 2.0 + Storefront (B2B) on Railway

Fork of the official Medusajs V2 B2B starter, tweaked for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/medusajs-20-storefront-b2b)

## About

This template lets you deploy a **B2B-oriented MedusaJS 2.0 setup** on Railway in just a few clicks. It is based on a fork of the official MedusaJS B2B repository, tweaked to better fit Railway’s cloud environment. Includes backend, admin dashboard, and a connected storefront tailored for business-to-business use cases. Version **2.8.4 (beta)**.

This is (currently) an experimental beta template intended for testing and exploration. It sets up a minimal MedusaJS B2B stack on Railway, with connections for Postgres, Redis, MinIO, and a frontend storefront. Because this is a fork and has not been deeply tested, some features might not work as expected. Use it to experiment with or adapt Medusa’s B2B tools in a managed cloud environment.  
If you run into issues or missing functions, please report in the discussion forum.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [rpuls/medusa-b2b-for-railway](https://github.com/rpuls/medusa-b2b-for-railway) (root: /backend) | Web service |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Storefront | [rpuls/medusa-b2b-for-railway](https://github.com/rpuls/medusa-b2b-for-railway) (root: /storefront) | Web service |
| Redis | `redis:8.2.1` | Database |
| Bucket | `minio/minio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `NEXT_PUBLIC_INDEX_NAME` | Storefront | products | - |
| `NEXT_PUBLIC_STRIPE_KEY` | Storefront | - | Add to enable credit card payment with Stripe |
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

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/template/medusajs-20-storefront-b2b)
