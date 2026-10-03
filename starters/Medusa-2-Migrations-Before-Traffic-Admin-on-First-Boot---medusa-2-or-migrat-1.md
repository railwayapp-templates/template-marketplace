# Deploy Medusa 2 | Migrations Before Traffic, Admin on First Boot on Railway

Medusa 2 pinned. Migrations before traffic, admin created on first boot.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-2-or-migrat-1)

## About

The Medusa commerce backend and its admin dashboard, with Postgres and Redis. Everything is pinned, migrations run before the new version takes traffic, and an administrator is created for you.

The dashboard is at `/app`. Log in with `ADMIN_EMAIL` and the generated `ADMIN_PASSWORD` from your service variables.

There are three Medusa templates on Railway, with **2869 failed deployments** between them. The largest reports 12% health: it builds from `medusajs/medusa-starter-default`, the **version 1** starter, while Medusa has been on 2.x for a long time. Its Postgres is `:latest` and its Redis is a Bitnami image, and Bitnami has closed its public tag catalogue, so that pull is no longer dependable and fails quietly.

This template is Medusa 2.18, written against the published packages, with every version pinned.

It is the backend and its admin. A storefront is a separate application talking to the Store API; deploy one when you need it and point it here.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.2-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Medusa | [ak40u/medusa-railway-starter](https://github.com/ak40u/medusa-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | medusa |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Medusa | 8080 |
| `NODE_ENV` | Medusa | production |
| `AUTH_CORS` | Medusa | * |
| `ADMIN_CORS` | Medusa | * |
| `JWT_SECRET` | Medusa | (secret) |
| `STORE_CORS` | Medusa | * |
| `ADMIN_EMAIL` | Medusa | admin@example.com |
| `COOKIE_SECRET` | Medusa | (secret) |
| `ADMIN_PASSWORD` | Medusa | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Shell, TypeScript

[View on Railway →](https://railway.com/deploy/medusa-2-or-migrat-1)
