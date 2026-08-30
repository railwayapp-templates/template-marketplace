# Deploy Medusajs 2.0 + Storefront (TRIAL) on Railway

Full ecommerce solution, manage products, inventory, orders, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Fb6KUX)

## About

Deploy a complete open-source e-commerce stack on Railway's free trial. This community-built template runs a MedusaJS 2.0 backend, admin dashboard and connected Next.js storefront on four services, so it fits inside the trial's five-service limit. Same code as the full template, trimmed to the essentials. Currently running Medusa **v2.17.2**.

*An independent community project by [FUNKYTON](https://funkyton.com/). Not affiliated with, endorsed by, or supported by MedusaJS, Inc. It uses the official open-source Medusa release as published, with no fork or patches to the core, and adds the Railway deployment setup plus preconfigured Stripe and Resend integrations on top. The [official Medusa documentation](https://docs.medusajs.com/) applies as normal.*

**Want product search and S3-compatible file storage?** Deploy the [full version of this template](https://railway.com/deploy/medusajs-2-0-storefront?referralCode=-Yg50p), which adds MeiliSearch and object storage on top of everything here.

### Video Instructions
[![Watch the video](https://img.youtube.com/vi/Gr5F2j5B-os/maxresdefault.jpg)](https://youtu.be/Gr5F2j5B-os)
Click ☝️ to play on YouTube

### Additional Docs & Resources
- Full guide: [https://funkyton.com/medusajs-2-0-is-finally-here/](https://funkyton.com/medusajs-2-0-is-finally-here/)
- GitHub: [https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate)
- Medusa's own documentation: [https://docs.medusajs.com/](https://docs.medusajs.com/)

Railway's free trial allows up to five services in a project, which is not quite enough for a full Medusa stack. This template fits the limit by running only what a working store actually requires: the Medusa backend with its admin dashboard, a Next.js storefront, Postgres and Redis.

On deploy it provisions and connects all four, runs the database migrations, seeds the store, creates your admin user with a randomized strong password, and passes the publishable API key to the storefront automatically. When the health checks go green you can sign in and start adding products. Uploaded product images are written to a persistent volume on the backend rather than external object storage, so they survive redeploys.

Two things are left out compared to the full template: MeiliSearch, so storefront product search is switched off, and S3-compatible object storage. Both can be added later without redeploying from scratch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /backend) | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Storefront | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /storefront) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Backend | production | - |
| `JWT_SECRET` | Backend | (secret) | - |
| `RESEND_FROM` | Backend | - | Add to enable automated emails with Resend (info@yourdomain.com) |
| `COOKIE_SECRET` | Backend | (secret) | - |
| `RESEND_API_KEY` | Backend | (secret) | Used to enable automated emailing with Resend |
| `STRIPE_API_KEY` | Backend | (secret) | Used to enable credit card payment with Stripe |
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

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.medusa/server/static`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/Fb6KUX)
