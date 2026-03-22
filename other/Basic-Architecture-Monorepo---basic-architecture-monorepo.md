# Deploy Basic Architecture Monorepo on Railway

Basic Architecture Monorepo and Database for apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/basic-architecture-monorepo)

## About

Payzon is a Brazilian fintech/education SaaS platform built as a Turborepo monorepo. It includes a Fastify 5 REST API, a React + Vite SPA frontend, a shared Prisma database layer, auto-generated API client, and a Radix-based UI component library — all orchestrated with pnpm workspaces.

Deploying Payzon requires running two main services: the Fastify API backend and a static/SPA build for the React frontend. Both share internal packages (database, UI, utils) that must be built in dependency order via Turborepo. The backend needs a PostgreSQL 16 database for user accounts, education content, and lesson progress tracking, plus a Redis 7 instance for session storage and rate limiting. Object storage (S3-compatible) is required for user avatars and media thumbnails — Cloudflare R2 in production. External integrations include Asaas (payment gateway), Resend (transactional email), and Vimeo (video hosting for lessons).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1` | Database |
| api | [Dellub/pixel-builder](https://github.com/Dellub/pixel-builder) | Web service |
| admin | [Dellub/pixel-builder](https://github.com/Dellub/pixel-builder) | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| app | [Dellub/pixel-builder](https://github.com/Dellub/pixel-builder) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis | - | Variable for Railway Private Domain |
| `REDISPORT` | redis | 6379 | Variable for Railway Private Domain |
| `REDISUSER` | redis | default | Variable for Railway Private Domain |
| `REDIS_URL` | redis | - | Variable for Railway Private Domain |
| `REDISPASSWORD` | redis | (secret) | Variable for Railway Private Domain |
| `REDIS_PASSWORD` | redis | (secret) | Variable for Railway Private Domain |
| `REDIS_PUBLIC_URL` | redis | - | Variable for Railway Private Domain |
| `APP_URL` | api | - | Variable for Railway Private Domain |
| `DB_HOST` | api | - | Variable for Railway Private Domain |
| `DB_PORT` | api | - | Variable for Railway Private Domain |
| `DB_USER` | api | (secret) | Variable for Railway Private Domain |
| `ADMIN_URL` | api | - | Variable for Railway Private Domain |
| `REDIS_URL` | api | - | Variable for Railway Private Domain |
| `S3_BUCKET` | api | - | Variable for Railway Private Domain |
| `S3_REGION` | api | - | Variable for Railway Private Domain |
| `DB_DATABASE` | api | - | Variable for Railway Private Domain |
| `DB_PASSWORD` | api | (secret) | Variable for Railway Private Domain |
| `S3_ENDPOINT` | api | - | Variable for Railway Private Domain |
| `DATABASE_URL` | api | - | Variable for Railway Private Domain |
| `ASAAS_API_KEY` | api | (secret) | Variable for Railway Private Domain |
| `ASAAS_API_URL` | api | - | Variable for Railway Private Domain |
| `COOKIE_SECRET` | api | (secret) | Variable for Railway Private Domain |
| `S3_ACCESS_KEY` | api | - | Variable for Railway Private Domain |
| `S3_PUBLIC_URL` | api | - | Variable for Railway Private Domain |
| `S3_SECRET_KEY` | api | (secret) | Variable for Railway Private Domain |
| `RESEND_API_KEY` | api | (secret) | Variable for Railway Private Domain |
| `BETTER_AUTH_URL` | api | - | Variable for Railway Private Domain |
| `PAYMENT_GATEWAY` | api | - | Variable for Railway Private Domain |
| `BETTER_AUTH_SECRET` | api | (secret) | Variable for Railway Private Domain |
| `BETTER_STACK_TOKEN` | api | (secret) | Variable for Railway Private Domain |
| `ASAAS_WEBHOOK_TOKEN` | api | (secret) | Variable for Railway Private Domain |
| `VITE_API_URL` | admin | - | Variable for Railway Private Domain |
| `POSTGRES_DB` | postgres | railway | Variable for Railway Private Domain |
| `DATABASE_URL` | postgres | - | Variable for Railway Private Domain |
| `POSTGRES_USER` | postgres | (secret) | Variable for Railway Private Domain |
| `POSTGRES_PASSWORD` | postgres | (secret) | Variable for Railway Private Domain |
| `DATABASE_PUBLIC_URL` | postgres | - | Variable for Railway Private Domain |
| `VITE_API_URL` | app | - | Variable for Railway Private Domain |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `pnpm --filter=@repo/api run seed && pnpm --filter=@repo/api run start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `pnpm --filter=@repo/admin run start`
- **Healthcheck:** `/login`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter=@repo/app run start`

**Category:** Other · **Languages:** TypeScript, CSS, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/basic-architecture-monorepo)
