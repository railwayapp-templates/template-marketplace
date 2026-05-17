# Deploy Railway SaaS Starter on Railway

Multi-tenant auth, Stripe billing, and feature flags

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-saas-starter)

## About

Railway SaaS Starter is a production-ready multi-tenant backend built on Bun — featuring JWT authentication, role-based access control, Stripe billing with subscription lifecycle management, and per-tenant feature flags. Everything a B2B SaaS needs, without the boilerplate.

Running a multi-tenant SaaS backend requires tenant isolation, secure authentication, and billing infrastructure. Railway SaaS Starter resolves tenants from the `X-Tenant-ID` header or subdomain, enforces data isolation at the query level, and manages sessions in Postgres. Stripe subscriptions sync automatically to tenant plans via webhook, provisioning the correct feature set on ever

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-saas-starter | [furelid/railway-saas-starter](https://github.com/furelid/railway-saas-starter) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | railway-saas-starter | 3000 | Server port |
| `JWT_SECRET` | railway-saas-starter | (secret) | Secret for signing JWTs |
| `DATABASE_URL` | railway-saas-starter | - | Postgres connection string |
| `STRIPE_SECRET_KEY` | railway-saas-starter | (secret) | Stripe API key — billing routes return 503 without it |
| `STRIPE_WEBHOOK_SECRET` | railway-saas-starter | (secret) | From Stripe dashboard → Webhooks |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/railway-saas-starter)
