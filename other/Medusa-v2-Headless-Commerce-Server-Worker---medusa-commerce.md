# Deploy Medusa v2 | Headless Commerce (Server + Worker) on Railway

Medusa 2.20: server + worker, Postgres, Redis. Admin user created on boot.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-commerce)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/medusa-commerce?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=medusa-commerce)

[Medusa](https://medusajs.com/) is the open-source headless commerce platform: a Node.js backend with a modular commerce engine (products, carts, orders, pricing, promotions, fulfillment, payments) and a built-in admin dashboard. This template runs Medusa 2.x the way its deployment guide asks for: a server instance that serves the API and admin, a separate worker instance for background jobs, Postgres, and Redis for cache, events, workflows and locks.

Four services from one repo. The Medusa image is built from a stock `create-medusa-app` project with a production Dockerfile, so you can fork the repo and add modules, plugins or custom API routes. On boot the server runs migrations, creates the first admin user from `MEDUSA_ADMIN_EMAIL` / `MEDUSA_ADMIN_PASSWORD` if it does not exist yet, then starts. The worker waits for those migrations and then starts in worker mode. Redis-backed caching, event bus, workflow engine and locking modules are configured so both instances share state. Uploaded files are stored on a volume at `/app/static`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | [nomideusz/medusa-railway](https://github.com/nomideusz/medusa-railway) | Web service |
| redis | [nomideusz/medusa-railway](https://github.com/nomideusz/medusa-railway) (root: /redis) | Database |
| postgres | [nomideusz/medusa-railway](https://github.com/nomideusz/medusa-railway) (root: /postgres) | Database |
| worker | [nomideusz/medusa-railway](https://github.com/nomideusz/medusa-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | server | 9000 | Medusa HTTP port. Do not change. |
| `AUTH_CORS` | server | - | Origins allowed to call the auth API. Add your storefront URL here too. |
| `REDIS_URL` | server | - | Redis connection for cache, events, workflows and locks (shared with the worker). |
| `ADMIN_CORS` | server | - | Origins allowed to call the admin API. Comma-separated. |
| `JWT_SECRET` | server | (secret) | Signs auth tokens (generated). The worker reuses it. |
| `STORE_CORS` | server | http://localhost:8000 | Origins allowed to call the store API. Set this to your storefront URL. |
| `DATABASE_URL` | server | - | Postgres connection (private network, no TLS). |
| `COOKIE_SECRET` | server | (secret) | Signs session cookies (generated). The worker reuses it. |
| `MEDUSA_ADMIN_EMAIL` | server | admin@example.com | First admin user, created on first boot. |
| `MEDUSA_BACKEND_URL` | server | - | Public URL of this server. |
| `MEDUSA_WORKER_MODE` | server | server | This instance serves the API and admin; the worker service runs background jobs. |
| `DISABLE_MEDUSA_ADMIN` | server | false | Serve the admin dashboard at /app. |
| `MEDUSA_ADMIN_PASSWORD` | server | (secret) | Password for the first admin user (generated). Change it after logging in. |
| `REDIS_PASSWORD` | redis | (secret) | Redis password (generated). |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres superuser password (generated). |
| `PORT` | worker | 9000 | Internal port. Do not change. |
| `REDIS_URL` | worker | - | Same Redis as the server. |
| `JWT_SECRET` | worker | (secret) | Shared with the server. |
| `DATABASE_URL` | worker | - | Same database as the server. |
| `COOKIE_SECRET` | worker | (secret) | Shared with the server. |
| `MEDUSA_WORKER_MODE` | worker | worker | Runs scheduled jobs, subscribers and workflow executions. |
| `DISABLE_MEDUSA_ADMIN` | worker | true | The worker never serves the admin. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/static`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/medusa-commerce)
