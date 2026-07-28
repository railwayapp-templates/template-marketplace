# Deploy Medusajs 2.0 + Storefront (B2B) on Railway

Fork of the official Medusajs V2 B2B starter, tweaked for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusajs-20-storefront-b2b)

## About

This template lets you deploy a **B2B-oriented MedusaJS 2.0 setup** on Railway in just a few clicks. It is based on a fork of the official MedusaJS B2B repository, tweaked to better fit Railway’s cloud environment. Includes backend, admin dashboard, and a connected storefront tailored for business-to-business use cases. Version **2.17.2** (Updated on July  23. 2026).

This is (currently) an experimental beta template intended for testing and exploration. It sets up a minimal MedusaJS B2B stack on Railway, with connections for Postgres, Redis, MinIO, and a frontend storefront. Because this is a fork and has not been deeply tested, some features might not work as expected. Use it to experiment with or adapt Medusa’s B2B tools in a managed cloud environment.  
If you run into issues or missing functions, please report in the discussion forum.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [rpuls/medusa-b2b-for-railway](https://github.com/rpuls/medusa-b2b-for-railway) (root: /backend) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Storefront | [rpuls/medusa-b2b-for-railway](https://github.com/rpuls/medusa-b2b-for-railway) (root: /storefront) | Web service |
| Redis | `redis:8.2.1` | Database |
| Bucket-proxy | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `S3_SECRET_ACCESS_KEY` | Bucket-proxy | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`
- **Healthcheck:** `/api/healthcheck`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `./run.sh aW1wb3J0IHsgczMgfSBmcm9tICJidW4iOwoKY29uc3QgQ0FDSEVfQ09OVFJPTCA9CiAgQnVuLmVudi5DQUNIRV9DT05UUk9MIHx8ICJwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZSI7CgpleHBvcnQgZGVmYXVsdCB7CiAgYXN5bmMgZmV0Y2gocmVxOiBSZXF1ZXN0KTogUHJvbWlzZTxSZXNwb25zZT4gewogICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXEudXJsKTsKCiAgICAvLyBQdWJsaWMgaGVhbHRoIGNoZWNrIGZvciBSYWlsd2F5LgogICAgaWYgKHVybC5wYXRobmFtZSA9PT0gIi9oZWFsdGgiKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBzdGF0dXM6ICJvayIgfSksIHsKICAgICAgICBzdGF0dXM6IDIwMCwKICAgICAgICBoZWFkZXJzOiB7ICJDb250ZW50LVR5cGUiOiAiYXBwbGljYXRpb24vanNvbiIgfSwKICAgICAgfSk7CiAgICB9CgogICAgLy8gVGhpcyBwcm94eSBpcyBzdHJpY3RseSByZWFkLW9ubHkuCiAgICBpZiAocmVxLm1ldGhvZCAhPT0gIkdFVCIgJiYgcmVxLm1ldGhvZCAhPT0gIkhFQUQiKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk1ldGhvZCBOb3QgQWxsb3dlZCIsIHsKICAgICAgICBzdGF0dXM6IDQwNSwKICAgICAgICBoZWFkZXJzOiB7CiAgICAgICAgICBBbGxvdzogIkdFVCwgSEVBRCIsCiAgICAgICAgfSwKICAgICAgfSk7CiAgICB9CgogICAgbGV0IGtleTogc3RyaW5nOwoKICAgIHRyeSB7CiAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh1cmwucGF0aG5hbWUuc2xpY2UoMSkpOwogICAgfSBjYXRjaCB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk5vdCBGb3VuZCIsIHsgc3RhdHVzOiA0MDQgfSk7CiAgICB9CgogICAgaWYgKCFrZXkgfHwga2V5LmluY2x1ZGVzKCJcMCIpKSB7CiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoIk5vdCBGb3VuZCIsIHsgc3RhdHVzOiA0MDQgfSk7CiAgICB9CgogICAgY29uc3QgZmlsZSA9IHMzLmZpbGUoa2V5KTsKICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBmaWxlLnN0YXQoKS5jYXRjaCgoKSA9PiBudWxsKTsKCiAgICBpZiAoIXN0YXQpIHsKICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZSgiTm90IEZvdW5kIiwgeyBzdGF0dXM6IDQwNCB9KTsKICAgIH0KCiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gewogICAgICAiQ29udGVudC1UeXBlIjogc3RhdC50eXBlIHx8ICJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0iLAogICAgICAiQ29udGVudC1MZW5ndGgiOiBTdHJpbmcoc3RhdC5zaXplKSwKICAgICAgIkNhY2hlLUNvbnRyb2wiOiBDQUNIRV9DT05UUk9MLAogICAgICAiWC1Db250ZW50LVR5cGUtT3B0aW9ucyI6ICJub3NuaWZmIiwKICAgIH07CgogICAgcmV0dXJuIHJlcS5tZXRob2QgPT09ICJIRUFEIgogICAgICA/IG5ldyBSZXNwb25zZShudWxsLCB7CiAgICAgICAgICBzdGF0dXM6IDIwMCwKICAgICAgICAgIGhlYWRlcnMsCiAgICAgICAgfSkKICAgICAgOiBuZXcgUmVzcG9uc2UoZmlsZS5zdHJlYW0oKSwgewogICAgICAgICAgc3RhdHVzOiAyMDAsCiAgICAgICAgICBoZWFkZXJzLAogICAgICAgIH0pOwogIH0sCn07`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/medusajs-20-storefront-b2b)
