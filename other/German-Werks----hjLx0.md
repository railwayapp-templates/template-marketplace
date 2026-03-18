# Deploy German Werks on Railway

German Werks LTD Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/-hjLx0)

## About

Railway is a cloud deployment platform that simplifies the process of deploying and managing web applications. It offers a user-friendly interface and handles infrastructure provisioning, scaling, and maintenance. Key features include:

Zero-configuration builds: Railway uses Nixpacks to build container images from your source code.
Quick deployment: Push your code to a repository, and Railway will build and deploy it to a live URL.
Scalability: Easily scale your application's resources based on demand.
Managed services: Railway offers managed databases, cron jobs, and other services.
Template marketplace: Choose from pre-built templates for common web applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Worker | [jaskirat-gill/German-Werks](https://github.com/jaskirat-gill/German-Werks) (root: /german-werks) | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |
| Server | [jaskirat-gill/German-Werks](https://github.com/jaskirat-gill/German-Werks) (root: /german-werks) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `ADMIN_CORS` | Worker | /http:\/\/*/ | - |
| `JWT_SECRET` | Worker | (secret) | - |
| `STORE_CORS` | Worker | https://germanwerks.vercel.app/,https://germanwerks-admin.vercel.app, http://localhost:8000, https://germanwerks.ca | - |
| `COOKIE_SECRET` | Worker | (secret) | - |
| `SENDGRID_FROM` | Worker | - | key |
| `PAYPAL_SANDBOX` | Worker | true | - |
| `STRIPE_API_KEY` | Worker | (secret) | key |
| `PAYPAL_CLIENT_ID` | Worker | - | key |
| `SENDGRID_API_KEY` | Worker | (secret) | key |
| `MEDUSA_WORKER_MODE` | Worker | worker | - |
| `PAYPAL_CLIENT_SECRET` | Worker | (secret) | key |
| `SENDGRID_ORDER_PLACED_ID` | Worker | - | key |
| `MEDUSA_FF_PRODUCT_CATEGORIES` | Worker | true | - |
| `REDISPORT` | Redis | 5432 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |
| `PORT` | Server | 9000 | - |
| `S3_URL` | Server | - | key |
| `S3_BUCKET` | Server | - | key |
| `S3_REGION` | Server | - | key |
| `ADMIN_CORS` | Server | https://germanwerks-admin.vercel.app | - |
| `JWT_SECRET` | Server | (secret) | - |
| `STORE_CORS` | Server | https://germanwerks.vercel.app/,https://germanwerks-admin.vercel.app,http://localhost:8000,https://germanwerks.ca | - |
| `COOKIE_SECRET` | Server | (secret) | - |
| `SENDGRID_FROM` | Server | - | Email |
| `PAYPAL_SANDBOX` | Server | false | - |
| `STRIPE_API_KEY` | Server | (secret) | Put key |
| `PAYPAL_CLIENT_ID` | Server | - | key |
| `S3_ACCESS_KEY_ID` | Server | - | key |
| `S3_CACHE_CONTROL` | Server | - | key |
| `SENDGRID_API_KEY` | Server | (secret) | Put Key |
| `MEDUSA_WORKER_MODE` | Server | server | - |
| `PAYPAL_CLIENT_SECRET` | Server | (secret) | key |
| `S3_SECRET_ACCESS_KEY` | Server | (secret) | key |
| `SENDGRID_ORDER_PLACED_ID` | Server | - | template |
| `MEDUSA_FF_PRODUCT_CATEGORIES` | Server | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`
- **Volume:** `/bitnami`
- **Start command:** `medusa migrations run && medusa seed --seed-file=/data/seed.json && medusa start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/-hjLx0)
