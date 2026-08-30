# Deploy Medusajs 2.17.2 + Storefront (NEW!) on Railway

Full ecommerce solution, manage products, inventory, orders, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusajs-2136-storefront-new)

## About

Deploy a complete open-source e-commerce stack in minutes. This community-built template provisions a MedusaJS 2.0 backend, admin dashboard and a connected Next.js storefront, with Postgres, Redis, MeiliSearch and S3-compatible file storage already wired together. Currently running Medusa **v2.17.2 (18. July 2026)**.

*An independent community project by [FUNKYTON](https://funkyton.com/). Not affiliated with, endorsed by, or supported by MedusaJS, Inc. It deploys the unmodified official open-source Medusa release, so the [official Medusa documentation](https://docs.medusajs.com/) applies to your store as-is.*

### Video Instructions
[![Watch the video](https://img.youtube.com/vi/Gr5F2j5B-os/maxresdefault.jpg)](https://youtu.be/Gr5F2j5B-os)
Click ☝️ to play on YouTube

### Additional Docs & Resources
- Full guide: [https://funkyton.com/medusajs-2-0-is-finally-here/](https://funkyton.com/medusajs-2-0-is-finally-here/)
- GitHub: [https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate)
- Medusa's own documentation: [https://docs.medusajs.com/](https://docs.medusajs.com/)

Self-hosting a Medusa 2.0 store means running several services that all have to find each other: the backend API, the admin dashboard, a Next.js storefront, a Postgres database, Redis for events and workflows, MeiliSearch for product search, and object storage for product images. Wiring that by hand is most of a day's work.

This template provisions and connects all of them in a single deploy, then runs the database migrations, seeds the store, creates your admin user with a randomized strong password, and shares the publishable API key with the storefront automatically. When the health checks go green, the store is live and you can sign in and add products. Stripe and transactional email are pre-installed and activate as soon as you add your keys. Railway handles the infrastructure, so what is left is your catalogue and your design.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MeiliSearch | `getmeili/meilisearch:v1.11.3` | Web service |
| Bucket-proxy | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Storefront | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /storefront) | Web service |
| Backend | [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate) (root: /backend) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | MeiliSearch | 3331 | - |
| `MEILI_ENV` | MeiliSearch | production | - |
| `MEILI_DB_PATH` | MeiliSearch | /meili_data/data.ms | - |
| `MEILI_HTTP_ADDR` | MeiliSearch | :::3331 | - |
| `MEILI_MAX_INDEXING_MEMORY` | MeiliSearch | 2GiB | - |
| `S3_SECRET_ACCESS_KEY` | Bucket-proxy | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `MEILISEARCH_API_KEY` | Storefront | (secret) | Only used to fetch search key. |
| `NEXT_PUBLIC_INDEX_NAME` | Storefront | products | - |
| `NEXT_PUBLIC_STRIPE_KEY` | Storefront | - | Add to enable credit card payment with Stripe |
| `NODE_ENV` | Backend | production | - |
| `JWT_SECRET` | Backend | (secret) | - |
| `RESEND_FROM` | Backend | - | Required to enable automated emails with Resend (info@yourdomain.com) |
| `COOKIE_SECRET` | Backend | (secret) | - |
| `RESEND_API_KEY` | Backend | (secret) | Required to enable automated emailing with Resend |
| `STRIPE_API_KEY` | Backend | (secret) | Required to enable credit card payment with Stripe |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@yourmail.com | Change to your own email (❗Only used when seeding the database - to create new admin user, invite via the admin dashboard) |
| `S3_SECRET_ACCESS_KEY` | Backend | (secret) | - |
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

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`
- **Start command:** `./run.sh aW1wb3J0IHsgczMgfSBmcm9tICJidW4iOwoKY29uc3QgQ0FDSEVfQ09OVFJPTCA9CiAgQnVuLmVudi5DQUNIRV9DT05UUk9MIHx8ICJwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZSI7CgpleHBvcnQgZGVmYXVsdCB7CiAgYXN5bmMgZmV0Y2gocmVxOiBSZXF1ZXN0KTogUHJvbWlzZTxSZXNwb25zZT4gewogICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXEudXJsKTsKCiAgICAvLyBQdWJsaWMgaGVhbHRoIGNoZWNrIGZvciBSYWlsd2F5LgogICAgaWYgKHVybC5wYXRobmFtZSA9PT0gIi9oZWFsdGgiKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBzdGF0dXM6ICJvayIgfSksIHsKICAgICAgICBzdGF0dXM6IDIwMCwKICAgICAgICBoZWFkZXJzOiB7ICJDb250ZW50LVR5cGUiOiAiYXBwbGljYXRpb24vanNvbiIgfSwKICAgICAgfSk7CiAgICB9CgogICAgLy8gVGhpcyBwcm94eSBpcyBzdHJpY3RseSByZWFkLW9ubHkuCiAgICBpZiAocmVxLm1ldGhvZCAhPT0gIkdFVCIgJiYgcmVxLm1ldGhvZCAhPT0gIkhFQUQiKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk1ldGhvZCBOb3QgQWxsb3dlZCIsIHsKICAgICAgICBzdGF0dXM6IDQwNSwKICAgICAgICBoZWFkZXJzOiB7CiAgICAgICAgICBBbGxvdzogIkdFVCwgSEVBRCIsCiAgICAgICAgfSwKICAgICAgfSk7CiAgICB9CgogICAgbGV0IGtleTogc3RyaW5nOwoKICAgIHRyeSB7CiAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh1cmwucGF0aG5hbWUuc2xpY2UoMSkpOwogICAgfSBjYXRjaCB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk5vdCBGb3VuZCIsIHsgc3RhdHVzOiA0MDQgfSk7CiAgICB9CgogICAgaWYgKCFrZXkgfHwga2V5LmluY2x1ZGVzKCJcMCIpKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk5vdCBGb3VuZCIsIHsgc3RhdHVzOiA0MDQgfSk7CiAgICB9CgogICAgY29uc3QgZmlsZSA9IHMzLmZpbGUoa2V5KTsKICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmaWxlLnN0YXQoKS5jYXRjaCgoKSA9PiBudWxsKTsKCiAgICBpZiAoIXN0YXQpIHsKICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZSgiTm90IEZvdW5kIiwgeyBzdGF0dXM6IDQwNCB9KTsKICAgIH0KCiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gewogICAgICAiQ29udGVudC1UeXBlIjogc3RhdC50eXBlIHx8ICJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0iLAogICAgICAiQ29udGVudC1MZW5ndGgiOiBTdHJpbmcoc3RhdC5zaXplKSwKICAgICAgIkNhY2hlLUNvbnRyb2wiOiBDQUNIRV9DT05UUk9MLAogICAgICAiWC1Db250ZW50LVR5cGUtT3B0aW9ucyI6ICJub3NuaWZmIiwKICAgIH07CgogICAgcmV0dXJuIHJlcS5tZXRob2QgPT09ICJIRUFEIgogICAgICA/IG5ldyBSZXNwb25zZShudWxsLCB7CiAgICAgICAgICBzdGF0dXM6IDIwMCwKICAgICAgICAgIGhlYWRlcnMsCiAgICAgICAgfSkKICAgICAgOiBuZXcgUmVzcG9uc2UoZmlsZS5zdHJlYW0oKSwgewogICAgICAgICAgc3RhdHVzOiAyMDAsCiAgICAgICAgICBoZWFkZXJzLAogICAgICAgIH0pOwogIH0sCn07`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **Healthcheck:** `/health`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/medusajs-2136-storefront-new)
