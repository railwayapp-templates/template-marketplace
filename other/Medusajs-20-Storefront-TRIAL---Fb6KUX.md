# Deploy Medusajs 2.0 + Storefront (TRIAL) on Railway

Full ecommerce solution, manage products, inventory, orders, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Fb6KUX)

## About

A reduced edition of the Medusa 2.0 template that fits inside **Railway's free plan**, which allows three services per project. Medusa itself is open source and free on any plan; what this template solves is the service limit. It runs the Medusa 2.0 backend with admin dashboard, a Next.js storefront and Postgres, deployed in one click, so you can run a real store on Railway without upgrading first.

It is a starting point and a demo build, **not a production setup**. For a real store, deploy the [full version](https://railway.com/deploy/medusajs-2-0-storefront?referralCode=-Yg50p).

Actively maintained: currently running Medusa **v2.19.0**, updated 31 August 2026.

*An independent community project by [FUNKYTON](https://funkyton.com/). Not affiliated with, endorsed by, or supported by MedusaJS, Inc. It uses the open-source Medusa release as published, with no fork or patches to the core, and adds the Railway deployment setup on top. The [Medusa documentation](https://docs.medusajs.com/) applies as normal.*

### Video Instructions
[![Watch the video](https://img.youtube.com/vi/Gr5F2j5B-os/maxresdefault.jpg)](https://youtu.be/Gr5F2j5B-os)
Click ☝️ to play on YouTube

### Additional Docs & Resources
- Full guide: [https://funkyton.com/medusajs-2-0-is-finally-here/](https://funkyton.com/medusajs-2-0-is-finally-here/)
- GitHub: [https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate)
- Medusa's own documentation: [https://docs.medusajs.com/](https://docs.medusajs.com/)

The full Medusa stack needs more services than Railway's free plan permits. This template is trimmed to three: the Medusa backend with its admin dashboard, a Next.js storefront, and Postgres. Everything that would normally live in a separate service is either dropped or runs in-process.

On deploy it provisions and connects all three, runs the database migrations, seeds the store, creates your admin user with a randomized strong password, and passes the publishable API key to the storefront. When the health checks go green you can sign in, add products and place a test order. It is a genuinely working shop, not a mock-up.

### What has been cut to fit three services

- **No Redis.** Medusa falls back to its in-memory event bus and workflow engine. Queued events and in-flight workflows do not survive a restart, and the backend cannot run more than one instance.
- **No MeiliSearch.** Storefront product search is switched off.
- **No object storage.** Product images are written to a volume on the backend rather than S3-compatible storage, so they are not served through a CDN.

None of that matters for evaluating Medusa or showing a client a working store. All of it matters once you have real customers.

### Moving to the full template

The [full version](https://railway.com/deploy/medusajs-2-0-storefront?referralCode=-Yg50p) is the same codebase with Redis, MeiliSearch and S3-compatible object storage added back, and it is the one that is actively maintained and supported. It needs a paid Railway plan. Deploy it alongside this one and migrate your data when you are ready.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /backend) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Storefront | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /storefront) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Backend | production | - |
| `JWT_SECRET` | Backend | (secret) | - |
| `STORE_NAME` | Backend | Demo Store | Change this value to your own stores name. This will be shown in the storefront, and on emails to customers. |
| `RESEND_FROM` | Backend | - | Add to enable automated emails with Resend (info@yourdomain.com) |
| `COOKIE_SECRET` | Backend | (secret) | - |
| `RESEND_API_KEY` | Backend | (secret) | Used to enable automated emailing with Resend |
| `STRIPE_API_KEY` | Backend | (secret) | Used to enable credit card payment with Stripe |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@yourmail.com | chage to your own email |
| `MEDUSA_ADMIN_PASSWORD` | Backend | (secret) | automatic strong password |
| `STRIPE_WEBHOOK_SECRET` | Backend | (secret) | Add to enable credit card payment with Stripe |
| `TEMPLATE_REPORTER_URL` | Backend | https://railway-template-reporter-production.up.railway.app | - |
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
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/Fb6KUX)
