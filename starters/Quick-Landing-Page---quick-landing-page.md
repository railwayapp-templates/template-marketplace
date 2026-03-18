# Deploy Quick Landing Page on Railway

Monorepo with multiple Astro static sites, a Hono API and Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/quick-landing-page)

## About

Quick Landing Page is a Turborepo monorepo that ships conversion-ready static landing pages with a sign-up API and Postgres backend. Clone a variant, customize the copy and theme, and deploy — each page captures emails by campaign so you can A/B test messaging from day one.

This template deploys a full multi-service stack: three Astro static landing pages served via Caddy, a Hono API on Node.js, an admin dashboard, and a Postgres database. Services communicate over Railway's private network to minimize latency and egress costs. Each landing page builds independently with Turborepo caching, so deploys are fast. Just wire up your domain and you're live.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| landing-c | [sethdavis512/quick-landing-page](https://github.com/sethdavis512/quick-landing-page) | Web service |
| landing-b | [sethdavis512/quick-landing-page](https://github.com/sethdavis512/quick-landing-page) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| landing-a | [sethdavis512/quick-landing-page](https://github.com/sethdavis512/quick-landing-page) | Web service |
| api | [sethdavis512/quick-landing-page](https://github.com/sethdavis512/quick-landing-page) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PUBLIC_API_URL` | landing-c | - | Hono API URL for data collection |
| `RAILPACK_SPA_OUTPUT_DIR` | landing-c | apps/landing-c/dist | Astro static build output directory |
| `PUBLIC_API_URL` | landing-b | - | Hono API URL for data collection |
| `RAILPACK_SPA_OUTPUT_DIR` | landing-b | apps/landing-b/dist | Astro static build output directory |
| `POSTGRES_DB` | Postgres | railway | Database name created on first startup |
| `DATABASE_URL` | Postgres | - | Private connection string for internal services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first startup |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated 32-char password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string via TCP proxy |
| `PUBLIC_API_URL` | landing-a | - | Hono API URL for data collection |
| `RAILPACK_SPA_OUTPUT_DIR` | landing-a | apps/landing-a/dist | Astro static build output directory |
| `DATABASE_URL` | api | - | Connection to Postgres service in Railway |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter api start`

**Category:** Starters · **Languages:** Astro, TypeScript, CSS, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/quick-landing-page)
