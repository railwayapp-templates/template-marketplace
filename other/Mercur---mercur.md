# Deploy Mercur on Railway

Software for running an online marketplace with many sellers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mercur)

## About

Mercur is an open-source multi-vendor marketplace platform for B2B and B2C commerce, built on MedusaJS. Where a normal store has one seller, a marketplace has many, and Mercur adds the layer that makes that work: vendor onboarding and approval, seller-scoped offers, commission rules, and automated payouts. It suits teams who want something like Mirakl without the licence fee or the cut of gross merchandise value. Inheriting Medusa v2 means any TypeScript developer can extend it with ordinary modules, workflows and API routes rather than a proprietary plugin format.

This template lets you self-host Mercur on Railway with the production shape already wired together: a **Mercur server** answering the Store, Admin and Vendor APIs and serving both panels, a private **Mercur worker** for jobs, subscribers and long-running workflows, **PostgreSQL** for commerce data, **Redis** for the event bus, workflow engine and locks, and an **object storage bucket** for uploads. Only the server is exposed to the internet. On first boot it migrates, creates your admin account and seeds a demo marketplace, so there is something real to click the moment the build finishes.

![Mercur server and worker over Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787290069/mercur-architecture.png)

Mercur is a marketplace accelerator, not a finished storefront. It gives you the seller-facing and operator-facing halves — the slow, fiddly parts — and leaves the buyer storefront to you, where a marketplace usually differentiates. Self-hosting earns its keep when volume is real, when commission and payout rules fit no SaaS product exactly, or when the data must stay yours.

Key capabilities:

- Vendor registration, onboarding and admin approval
- Seller-scoped offers, pricing and inventory over a shared master catalogue
- Commission rules and automated payouts, including a Stripe Connect provider
- The Medusa v2 commerce core: orders, carts, promotions, tax, regions, fulfilment
- An admin console and a separate vendor hub, plus Store, Admin and Vendor REST APIs

Railway splits the application by role: the server handles every HTTP request and owns migrations; the worker runs the same codebase with jobs and subscribers enabled but no public traffic, so a long product import never slows a shopper's request. Redis connects the two — the event bus and workflow engine are shared, so an event the server emits is processed on the worker. PostgreSQL holds commerce data; object storage holds uploads, so both services reach the same files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mercur-server | [gridalpha/mercur-railway](https://github.com/gridalpha/mercur-railway) | Web service |
| Redis | `redis:8.2` | Database |
| mercur-worker | [gridalpha/mercur-railway](https://github.com/gridalpha/mercur-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mercur-server | 9000 | HTTP listening port |
| `REDIS_URL` | mercur-server | - | Events, workflows and locking |
| `S3_BUCKET` | mercur-server | - | Uploads bucket name |
| `S3_REGION` | mercur-server | - | Bucket region |
| `JWT_SECRET` | mercur-server | (secret) | Signs API tokens |
| `S3_ENDPOINT` | mercur-server | - | Object storage endpoint |
| `DATABASE_URL` | mercur-server | - | Postgres connection string |
| `NODE_OPTIONS` | mercur-server | --max-old-space-size=4096 | Node heap ceiling |
| `COOKIE_SECRET` | mercur-server | (secret) | Signs session cookies |
| `S3_ACCESS_KEY_ID` | mercur-server | - | Bucket access key |
| `MERCUR_VENDOR_URL` | mercur-server | - | Vendor hub URL |
| `MEDUSA_ADMIN_EMAIL` | mercur-server | admin@example.com | First administrator email |
| `MEDUSA_WORKER_MODE` | mercur-server | server | Serves HTTP and runs migrations |
| `MERCUR_BACKEND_URL` | mercur-server | - | Public origin, also read at build |
| `S3_SECRET_ACCESS_KEY` | mercur-server | (secret) | Bucket secret key |
| `MEDUSA_ADMIN_PASSWORD` | mercur-server | (secret) | First administrator password |
| `MERCUR_SEED_SELLER_PASSWORD` | mercur-server | (secret) | Password for seeded demo vendors |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | mercur-worker | 9000 | Health check port, no public domain |
| `REDIS_URL` | mercur-worker | - | Events, workflows and locking |
| `S3_BUCKET` | mercur-worker | - | Uploads bucket name |
| `S3_REGION` | mercur-worker | - | Bucket region |
| `JWT_SECRET` | mercur-worker | (secret) | Must match the server |
| `S3_ENDPOINT` | mercur-worker | - | Object storage endpoint |
| `DATABASE_URL` | mercur-worker | - | Postgres connection string |
| `NODE_OPTIONS` | mercur-worker | --max-old-space-size=4096 | Node heap ceiling |
| `COOKIE_SECRET` | mercur-worker | (secret) | Must match the server |
| `S3_ACCESS_KEY_ID` | mercur-worker | - | Bucket access key |
| `MERCUR_VENDOR_URL` | mercur-worker | - | Vendor hub URL |
| `MEDUSA_WORKER_MODE` | mercur-worker | worker | Runs jobs, subscribers and workflows |
| `MERCUR_BACKEND_URL` | mercur-worker | - | Public origin of the server |
| `S3_SECRET_ACCESS_KEY` | mercur-worker | (secret) | Bucket secret key |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile, Shell, HTML

[View on Railway →](https://railway.com/deploy/mercur)
