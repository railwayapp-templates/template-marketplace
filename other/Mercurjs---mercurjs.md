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
| Bucket-proxy | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |
| Marketplace | [rpuls/mercurjs-for-railway-boilerplate](https://github.com/rpuls/mercurjs-for-railway-boilerplate) (root: /storefront) | Web service |
| Backend | [rpuls/mercurjs-for-railway-boilerplate](https://github.com/rpuls/mercurjs-for-railway-boilerplate) (root: /backend) | Web service |
| Admin-dashboard | [rpuls/mercurjs-for-railway-boilerplate](https://github.com/rpuls/mercurjs-for-railway-boilerplate) (root: /admin-panel) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VITE_MEDUSA_BASE` | Vendor-dashboard | / | - |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Vendor-dashboard | - | Used by: https://www.npmjs.com/package/medusajs-launch-utils to await backend ready |
| `VITE_DISABLE_SELLERS_REGISTRATION` | Vendor-dashboard | false | - |
| `S3_SECRET_ACCESS_KEY` | Bucket-proxy | (secret) | - |
| `NEXT_PUBLIC_INDEX_NAME` | Marketplace | products | - |
| `NEXT_PUBLIC_STRIPE_KEY` | Marketplace | - | Add to enable credit card payment with Stripe |
| `NEXT_PUBLIC_MEDIA_HOSTNAME` | Marketplace | - | Public media hostname provided by the read-only Bucket-proxy Function |
| `S3_ACL` | Backend | false | Required because Railway Bucket does not support ACL headers |
| `NODE_ENV` | Backend | production | - |
| `S3_BUCKET` | Backend | - | Railway Bucket's globally unique S3 bucket name |
| `S3_REGION` | Backend | - | Railway Bucket region |
| `JWT_SECRET` | Backend | (secret) | - |
| `RESEND_FROM` | Backend | - | Required to enable automated emails with Resend (info@yourdomain.com) |
| `S3_ENDPOINT` | Backend | - | Private authenticated connection from the backend to Railway Bucket |
| `S3_FILE_URL` | Backend | - | Public read-only media URL served by the Bucket-proxy Function |
| `COOKIE_SECRET` | Backend | (secret) | - |
| `RESEND_API_KEY` | Backend | (secret) | Required to enable automated emailing with Resend |
| `ALGOLIA_API_KEY` | Backend | (secret) | (Write key) |
| `S3_ACCESS_KEY_ID` | Backend | - | Railway Bucket access key |
| `MEDUSA_ADMIN_EMAIL` | Backend | admin@yourmail.com | Change to your own email (❗Only used when seeding the database - to create new admin user, invite via the admin dashboard) |
| `S3_SECRET_ACCESS_KEY` | Backend | (secret) | Railway Bucket secret key |
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
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `./run.sh aW1wb3J0IHsgczMgfSBmcm9tICJidW4iOwoKY29uc3QgQ0FDSEVfQ09OVFJPTCA9CiAgQnVuLmVudi5DQUNIRV9DT05UUk9MIHx8ICJwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZSI7CgpleHBvcnQgZGVmYXVsdCB7CiAgYXN5bmMgZmV0Y2gocmVxOiBSZXF1ZXN0KTogUHJvbWlzZTxSZXNwb25zZT4gewogICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXEudXJsKTsKCiAgICAvLyBQdWJsaWMgaGVhbHRoIGNoZWNrIGZvciBSYWlsd2F5LgogICAgaWYgKHVybC5wYXRobmFtZSA9PT0gIi9oZWFsdGgiKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBzdGF0dXM6ICJvayIgfSksIHsKICAgICAgICBzdGF0dXM6IDIwMCwKICAgICAgICBoZWFkZXJzOiB7ICJDb250ZW50LVR5cGUiOiAiYXBwbGljYXRpb24vanNvbiIgfSwKICAgICAgfSk7CiAgICB9CgogICAgLy8gVGhpcyBwcm94eSBpcyBzdHJpY3RseSByZWFkLW9ubHkuCiAgICBpZiAocmVxLm1ldGhvZCAhPT0gIkdFVCIgJiYgcmVxLm1ldGhvZCAhPT0gIkhFQUQiKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk1ldGhvZCBOb3QgQWxsb3dlZCIsIHsKICAgICAgICBzdGF0dXM6IDQwNSwKICAgICAgICBoZWFkZXJzOiB7CiAgICAgICAgICBBbGxvdzogIkdFVCwgSEVBRCIsCiAgICAgICAgfSwKICAgICAgfSk7CiAgICB9CgogICAgbGV0IGtleTogc3RyaW5nOwoKICAgIHRyeSB7CiAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh1cmwucGF0aG5hbWUuc2xpY2UoMSkpOwogICAgfSBjYXRjaCB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk5vdCBGb3VuZCIsIHsgc3RhdHVzOiA0MDQgfSk7CiAgICB9CgogICAgaWYgKCFrZXkgfHwga2V5LmluY2x1ZGVzKCJcMCIpKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk5vdCBGb3VuZCIsIHsgc3RhdHVzOiA0MDQgfSk7CiAgICB9CgogICAgY29uc3QgZmlsZSA9IHMzLmZpbGUoa2V5KTsKICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmaWxlLnN0YXQoKS5jYXRjaCgoKSA9PiBudWxsKTsKCiAgICBpZiAoIXN0YXQpIHsKICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZSgiTm90IEZvdW5kIiwgeyBzdGF0dXM6IDQwNCB9KTsKICAgIH0KCiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gewogICAgICAiQ29udGVudC1UeXBlIjogc3RhdC50eXBlIHx8ICJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0iLAogICAgICAiQ29udGVudC1MZW5ndGgiOiBTdHJpbmcoc3RhdC5zaXplKSwKICAgICAgIkNhY2hlLUNvbnRyb2wiOiBDQUNIRV9DT05UUk9MLAogICAgICAiWC1Db250ZW50LVR5cGUtT3B0aW9ucyI6ICJub3NuaWZmIiwKICAgIH07CgogICAgcmV0dXJuIHJlcS5tZXRob2QgPT09ICJIRUFEIgogICAgICA/IG5ldyBSZXNwb25zZShudWxsLCB7CiAgICAgICAgICBzdGF0dXM6IDIwMCwKICAgICAgICAgIGhlYWRlcnMsCiAgICAgICAgfSkKICAgICAgOiBuZXcgUmVzcG9uc2UoZmlsZS5zdHJlYW0oKSwgewogICAgICAgICAgc3RhdHVzOiAyMDAsCiAgICAgICAgICBoZWFkZXJzLAogICAgICAgIH0pOwogIH0sCn07`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **Healthcheck:** `/health`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/mercurjs)
