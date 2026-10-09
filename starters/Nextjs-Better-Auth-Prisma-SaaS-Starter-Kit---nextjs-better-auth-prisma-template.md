# Deploy Next.js Better Auth Prisma SaaS Starter Kit on Railway

Next.js starter with Better Auth, Prisma/Postgres and role-based dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-better-auth-prisma-template)

## About

Next.js Better Auth Prisma SaaS Starter Kit is an open-source, production-ready starter for building SaaS products with Next.js 16, Better Auth, Prisma and PostgreSQL. It ships with email and password login, Google OAuth, email verification, password reset, role-based access, admin and user dashboards, and a shadcn/ui interface.

Deploying the template on Railway creates two services: the Next.js app and a PostgreSQL database. Railway builds the app, generates the Prisma client, and wires `DATABASE_URL` automatically. On every start the app applies pending database migrations, so the schema is always up to date. A built-in `/api/health` endpoint runs a database check and is used as Railway's healthcheck, with automatic restarts on failure. You get a public HTTPS URL as soon as the first deploy finishes. After that, you only add your auth secret, your public URL, and your Resend and Google credentials, then push to your repository to redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Next.js | [laguillo/nextjs-better-auth-prisma-template](https://github.com/laguillo/nextjs-better-auth-prisma-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Next.js | production | Application environment (development, production, etc.) |
| `DATABASE_URL` | Next.js | - | PostgreSQL database connection string |
| `RESEND_API_KEY` | Next.js | (secret) | Resend API key for sending emails |
| `GOOGLE_CLIENT_ID` | Next.js | your-client-id | Google OAuth client credentials |
| `EMAIL_SENDER_NAME` | Next.js | SaaS Template | Email sender information for transactional emails |
| `BETTER_AUTH_SECRET` | Next.js | (secret) | Resend API key for sending emails |
| `EMAIL_SENDER_ADDRESS` | Next.js | no-reply@yourdomain.com | Email sender information for transactional emails |
| `GOOGLE_CLIENT_SECRET` | Next.js | (secret) | Google OAuth client credentials |
| `NEXT_PUBLIC_BASE_URL` | Next.js | - | Public domain |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/nextjs-better-auth-prisma-template)
