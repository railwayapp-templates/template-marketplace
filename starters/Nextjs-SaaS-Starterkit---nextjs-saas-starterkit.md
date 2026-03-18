# Deploy Next.js SaaS Starterkit on Railway

Deploy and Host Next.js SaaS Starterkit with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-saas-starterkit)

## About

The **Next.js SaaS Starterkit** is an all-in-one boilerplate designed for developers to launch scalable SaaS products instantly. It integrates **Next.js 15**, **Better Auth**, **Prisma**, and **Stripe**, providing a production-ready foundation with pre-built subscription logic, gated content, and a comprehensive admin dashboard for immediate deployment.

Deploying this kit as a Railway template simplifies the infrastructure orchestration into a single click. The process involves provisioning a **PostgreSQL** instance alongside the Next.js service. Because the kit uses **Prisma**, the deployment pipeline automatically handles schema generation and database synchronization. Developers simply need to provide their environment variables for **Stripe**, **SendGrid**, and **Google OAuth** through Railway’s interface. This hosting setup ensures high availability and automatic SSL termination, allowing you to move from a repository to a live, billing-enabled application in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| MinIO-Console | [iqbalexperience/MinIO](https://github.com/iqbalexperience/MinIO) (root: /Console) | Web service |
| nextjs-saas-starterkit | [iqbalexperience/nextjs-saas-starterkit](https://github.com/iqbalexperience/nextjs-saas-starterkit) | Web service |
| MinIO-Bucket | [iqbalexperience/MinIO](https://github.com/iqbalexperience/MinIO) (root: /Bucket) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | MinIO-Console | 9090 | - |
| `PASSWORD` | MinIO-Console | (secret) | - |
| `USERNAME` | MinIO-Console | (secret) | - |
| `MINIO_PORT` | nextjs-saas-starterkit | 9000 | - |
| `GOOGLE_CLIENT_ID` | nextjs-saas-starterkit | your-google-client-id | https://better-auth.com/docs/authentication/google |
| `MINIO_SECRET_KEY` | nextjs-saas-starterkit | (secret) | - |
| `SENDGRID_API_KEY` | nextjs-saas-starterkit | (secret) | - |
| `MINIO_BUCKET_NAME` | nextjs-saas-starterkit | bucket | - |
| `STRIPE_SECRET_KEY` | nextjs-saas-starterkit | (secret) | - |
| `BETTER_AUTH_SECRET` | nextjs-saas-starterkit | (secret) | - |
| `SENDGRID_FROM_EMAIL` | nextjs-saas-starterkit | Your App <noreply@example.com> | - |
| `GOOGLE_CLIENT_SECRET` | nextjs-saas-starterkit | (secret) | https://better-auth.com/docs/authentication/google |
| `STRIPE_WEBHOOK_SECRET` | nextjs-saas-starterkit | (secret) | - |
| `STRIPE_PLUS_PRICE_ID_YEARLY` | nextjs-saas-starterkit | price_... | - |
| `STRIPE_PLUS_PRICE_ID_MONTHLY` | nextjs-saas-starterkit | price_... | - |
| `EMAIL_VERIFICATION_CALLBACK_URL` | nextjs-saas-starterkit | / | - |
| `STRIPE_ENTERPRISE_PRICE_ID_YEARLY` | nextjs-saas-starterkit | price_... | - |
| `STRIPE_ENTERPRISE_PRICE_ID_MONTHLY` | nextjs-saas-starterkit | price_... | - |
| `MINIO_ROOT_USER` | MinIO-Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | MinIO-Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | MinIO-Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | MinIO-Bucket | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`

**Category:** Starters · **Languages:** Dockerfile, TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/nextjs-saas-starterkit)
