# Deploy Hoppscotch on Railway

Open-source Postman alternative for REST and GraphQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-hoppscotch-api-client-on-railway)

## About

This template deploys Hoppscotch Community Edition 2026.9.0 as one AIO image on a single Railway domain with Postgres. Login methods are configured in the /admin wizard after first deploy, ideal for backend teams moving off Postman.

This template runs the official Hoppscotch 2026.9.0 AIO image on one Railway domain with subpath access, backed by Railway Postgres. You finish setup by picking a sign-in method there, so no deploy-time input is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18.6@sha256:fcc6686a3f4f1962fe4ed77a15884553b7bd611ae1cea3204687968c5c09d517` | Database |
| Hoppscotch | `hoppscotch/hoppscotch:2026.9.0@sha256:3160f5b3acf49478552a66a0785ee6c75f64311066f149f7d946fbd540f8388d` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database name |
| `DATABASE_URL` | Postgres | - | Private connection string for other services |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated Postgres password |
| `PORT` | Hoppscotch | 8080 | Internal backend port that Caddy proxies /backend to; keep 8080 |
| `TRUST_PROXY` | Hoppscotch | true | Use X-Forwarded-For client IPs behind Railway's proxy |
| `DATABASE_URL` | Hoppscotch | - | Postgres connection string (Railway Postgres, private network) |
| `VITE_BASE_URL` | Hoppscotch | - | Public URL of the Hoppscotch web app |
| `VITE_ADMIN_URL` | Hoppscotch | - | Public URL of the admin dashboard |
| `DATA_ENCRYPTION_KEY` | Hoppscotch | - | 32-char key that encrypts secrets stored in the database; never change after first boot |
| `VITE_BACKEND_WS_URL` | Hoppscotch | - | GraphQL WebSocket endpoint for live sync |
| `WHITELISTED_ORIGINS` | Hoppscotch | - | Allowed CORS and desktop-app origins |
| `VITE_BACKEND_API_URL` | Hoppscotch | - | REST API base URL (also used for OAuth callbacks) |
| `VITE_BACKEND_GQL_URL` | Hoppscotch | - | GraphQL API endpoint used by the frontends |
| `VITE_SHORTCODE_BASE_URL` | Hoppscotch | - | Base URL for shared request links |
| `ENABLE_SUBPATH_BASED_ACCESS` | Hoppscotch | true | Serve app at /, admin at /admin and API at /backend on one domain |
| `WEBAPP_SERVER_SIGNING_SECRET` | Hoppscotch | (secret) | Seed for the desktop-app bundle signing key, stable across redeploys |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "cd /dist/backend && pnpm exec prisma migrate deploy && exec tini -s -- node /usr/src/app/aio_run.mjs"`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/deploy-hoppscotch-api-client-on-railway)
