# Deploy Next.js Postgres SaaS on Railway

Deploy and Host Next.js Postgres SaaS with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-postgres-saas)

## About

The **Next.js SaaS Starterkit** is an all-in-one boilerplate designed for developers to launch scalable SaaS products instantly. It integrates **Next.js 15**, **Better Auth**, **Prisma**, and **Stripe**, providing a production-ready foundation with pre-built subscription logic, gated content, and a comprehensive admin dashboard for immediate deployment.

Deploying this kit as a Railway template simplifies the infrastructure orchestration into a single click. The process involves provisioning a **PostgreSQL** instance alongside the Next.js service. Because the kit uses **Prisma**, the deployment pipeline automatically handles schema generation and database synchronization. Developers simply need to provide their environment variables for **Stripe**, **SendGrid**, and **Google OAuth** through Railway’s interface. This hosting setup ensures high availability and automatic SSL termination, allowing you to move from a repository to a live, billing-enabled application in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextjs-saas-starterkit | [iqbalexperience/nextjs-postgres-starter](https://github.com/iqbalexperience/nextjs-postgres-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `GOOGLE_CLIENT_ID` | nextjs-saas-starterkit | your-google-client-id | https://better-auth.com/docs/authentication/google |
| `SENDGRID_API_KEY` | nextjs-saas-starterkit | (secret) | - |
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
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/nextjs-postgres-saas)
