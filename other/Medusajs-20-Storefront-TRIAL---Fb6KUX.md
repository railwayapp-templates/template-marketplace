# Deploy Medusajs 2.0 + Storefront (TRIAL) on Railway

Full ecommerce solution, manage products, inventory, orders, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Fb6KUX)

## About

This boilerplate is a all in one medusajs 2.0 e-commerce webshop solution, it comes preconfigured with both backend + admin dashbord and connected to the "storefront" (webshop frontend). 

**Limited to 5 services, for free users!**

For full version, checkout: https://railway.com/template/gkU-27

**Updated to v2.10.2 🤩 17. September 2025**

### Video instructions
[![alt text](https://img.youtube.com/vi/Gr5F2j5B-os/maxresdefault.jpg)](https://youtu.be/Gr5F2j5B-os)

### Additional information and instructions
Instructions: [https://funkyton.com/medusajs-2-0-is-finally-here/](https://funkyton.com/medusajs-2-0-is-finally-here/)

GitHub: [https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bucket | `minio/minio:latest` | Database |
| Backend | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /backend) | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Storefront | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /storefront) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_BROWSER` | Bucket | off | - |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `NODE_ENV` | Backend | production | - |
| `JWT_SECRET` | Backend | (secret) | - |
| `RESEND_FROM` | Backend | - | Add to enable automated emails with Resend (info@yourdomain.com) |
| `COOKIE_SECRET` | Backend | (secret) | - |
| `RESEND_API_KEY` | Backend | (secret) | Used to enable automated emailing with Resend |
| `STRIPE_API_KEY` | Backend | (secret) | Used to enable credit card payment with Stripe |
| `MINIO_SECRET_KEY` | Backend | (secret) | - |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@yourmail.com | chage to your own email |
| `MEDUSA_ADMIN_PASSWORD` | Backend | (secret) | automatic strong password |
| `STRIPE_WEBHOOK_SECRET` | Backend | (secret) | Add to enable credit card payment with Stripe |
| `TEMPLATE_REPORTER_URL` | Backend | https://railway-template-reporter-production.up.railway.app | - |
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
| `NEXT_PUBLIC_STRIPE_KEY` | Storefront | - | Add to enable credit card payment with Stripe |

## Configuration

- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/Fb6KUX)
