# Deploy Baserow (Self-Hosted Airtable Alternative) on Railway

Open-source Airtable alternative — no-code database. [Updated Aug '26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baserow-self-hosted-airtable-alternative)

## About

Baserow is an open-source no-code database and spreadsheet platform — an Airtable alternative you fully own. Create databases, build tables with rich field types, filter and group data in grid, gallery, kanban and form views, and automate work through its REST API and webhooks. This template deploys the complete Baserow stack — the application (API, real-time server, background workers and web UI), PostgreSQL, and Redis — each pinned to a verified upstream image and wired over Railway's private network so it comes up working on the first deploy.

Baserow's official all-in-one image bundles the Django backend, the Nuxt web frontend, the real-time websocket server and the Celery workers behind an internal Caddy reverse proxy, backed by two data services: PostgreSQL for your tables and Redis for caching and the task queue. This template configures every connection string, generates unique signing secrets on each deploy, points the public URL at your Railway domain, and attaches a persistent volume for uploaded files — so you get a running instance without editing a compose file. The first boot runs all database migrations automatically, then the signup page prompts you to create the admin account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16` | Database |
| redis | `redis:7-alpine` | Database |
| baserow | `baserow/baserow:2.3.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | baserow | Baserow database name |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL superuser for Baserow |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated PostgreSQL password |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password |
| `PORT` | baserow | 3000 | Internal Nuxt frontend port (Caddy proxies here) |
| `DATA_DIR` | baserow | /baserow/data | Persistent data directory for uploads and media |
| `REDIS_HOST` | baserow | - | Redis private host |
| `REDIS_PORT` | baserow | 6379 | Redis port |
| `SECRET_KEY` | baserow | (secret) | Django secret key for signing (auto-generated) |
| `DATABASE_HOST` | baserow | - | PostgreSQL private host |
| `DATABASE_NAME` | baserow | baserow | PostgreSQL database name |
| `DATABASE_PORT` | baserow | 5432 | PostgreSQL port |
| `DATABASE_USER` | baserow | (secret) | PostgreSQL user |
| `REDIS_PASSWORD` | baserow | (secret) | Redis password (from the Redis service) |
| `DATABASE_PASSWORD` | baserow | (secret) | PostgreSQL password (from the database service) |
| `BASEROW_PUBLIC_URL` | baserow | - | Public URL where Baserow is served |
| `MIGRATE_ON_STARTUP` | baserow | true | Run database migrations on startup |
| `BASEROW_CADDY_ADDRESSES` | baserow | :80 | Caddy public listen address inside the container |
| `BASEROW_JWT_SIGNING_KEY` | baserow | - | JWT token signing key (auto-generated) |
| `BASEROW_AMOUNT_OF_WORKERS` | baserow | 1 | Number of Baserow backend workers |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'redis-server --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/baserow/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/baserow-self-hosted-airtable-alternative)
