# Deploy Mercurjs on Railway

Open-source multi-vendor marketplace platform for B2B & B2C.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mercurjs)

## About

This template deploys a robust open-source **multi-vendor marketplace platform** built with MercurJS on Railway, supporting both **B2B and B2C** business models. The stack includes a MedusaJS-powered backend with marketplace extensions, an admin dashboard for marketplace owners, a vendor/seller dashboard for managing individual stores, and a fully integrated Next.js storefront for customers. Optional integrations include Stripe for payments, Algolia for search, and Resend for emails, all of which can be enabled via API keys.

### Video Instructions
[![Watch the video](https://img.youtube.com/vi/rcA5pkn1bQk/maxresdefault.jpg)](https://youtu.be/rcA5pkn1bQk)
Click ☝️ to play on YouTube

### Additional Docs & Resources
- Full guide: [https://funkyton.com/mercurjs-deploy-tutorial/](https://funkyton.com/mercurjs-deploy-tutorial/)
- GitHub: [https://github.com/rpuls/mercurjs-for-railway-boilerplate](https://github.com/rpuls/mercurjs-for-railway-boilerplate)

MercurJS provides a comprehensive managed marketplace experience:

- **Admin Dashboard:** This is the control center for marketplace owners (hosters). The admin sets platform-wide rules, manages product categories, commissions, and vendor approvals. They hold super admin rights and can accept or decline vendor registration requests.

- **Vendor Dashboard:** This interface is for vendors or companies wishing to sell on the marketplace. Vendors can register (pending admin approval), manage products, define tax and shipping rules, and track orders through this dedicated panel.

- **Marketplace Storefront:** Customers interact with a customizable, multi-vendor marketplace storefront, able to browse and purchase products from all vendors seamlessly. This storefront demonstrates how to build or extend a marketplace-facing frontend with multi-vendor cart and checkout functionality.

The entire stack is automated to deploy on Railway with PostgreSQL and Redis services, supporting quick setup with minimal manual configuration. While API keys for payments, search, and emails are optional, providing them is recommended to enable full marketplace functionality.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vendor-dashboard | [rpuls/mercurjs-for-railway-boilerplate](https://github.com/rpuls/mercurjs-for-railway-boilerplate) (root: /vendor-panel) | Web service |
| Marketplace | [rpuls/mercurjs-for-railway-boilerplate](https://github.com/rpuls/mercurjs-for-railway-boilerplate) (root: /storefront) | Web service |
| Backend | [rpuls/mercurjs-for-railway-boilerplate](https://github.com/rpuls/mercurjs-for-railway-boilerplate) (root: /backend) | Web service |
| Admin-dashboard | [rpuls/mercurjs-for-railway-boilerplate](https://github.com/rpuls/mercurjs-for-railway-boilerplate) (root: /admin-panel) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Bucket | `minio/minio:latest` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VITE_MEDUSA_BASE` | Vendor-dashboard | / | - |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Vendor-dashboard | - | Used by: https://www.npmjs.com/package/medusajs-launch-utils to await backend ready |
| `VITE_DISABLE_SELLERS_REGISTRATION` | Vendor-dashboard | false | - |
| `NEXT_PUBLIC_INDEX_NAME` | Marketplace | products | - |
| `NEXT_PUBLIC_STRIPE_KEY` | Marketplace | - | Add to enable credit card payment with Stripe |
| `NODE_ENV` | Backend | production | - |
| `JWT_SECRET` | Backend | (secret) | - |
| `RESEND_FROM` | Backend | - | Required to enable automated emails with Resend (info@yourdomain.com) |
| `COOKIE_SECRET` | Backend | (secret) | - |
| `RESEND_API_KEY` | Backend | (secret) | Required to enable automated emailing with Resend |
| `ALGOLIA_API_KEY` | Backend | (secret) | (Write key) |
| `MINIO_SECRET_KEY` | Backend | (secret) | - |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@yourmail.com | Change to your own email (❗Only used when seeding the database - to create new admin user, invite via the admin dashboard) |
| `MEDUSA_ADMIN_PASSWORD` | Backend | (secret) | ❗Only used when seeding the database - to create new admin user, invite via the admin dashboard |
| `STRIPE_SECRET_API_KEY` | Backend | (secret) | Required to enable credit card payment with Stripe |
| `STRIPE_WEBHOOK_SECRET` | Backend | (secret) | Required to enable credit card payment with Stripe |
| `TEMPLATE_REPORTER_URL` | Backend | https://railway-template-reporter-production.up.railway.app | - |
| `VITE_MEDUSA_BASE` | Admin-dashboard | / | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **Healthcheck:** `/health`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/mercurjs)
