# Deploy Medusa 2 | Migrations Before Traffic, Admin on First Boot on Railway

Medusa 2 pinned. Migrations before traffic, admin created on first boot.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-2-or-migrations-before-traffic-ad)

## About

# Medusa 2

The Medusa commerce backend and its admin dashboard, with Postgres and Redis.
Everything pinned, migrations before the new version takes traffic, and an
administrator created for you.

## What this fixes

Three Medusa templates on Railway, **2869 failed deployments** between them. The
largest reports 12% health: it builds from `medusajs/medusa-starter-default` —
the **version 1** starter — while Medusa has been on 2.x for a long time. Its
Postgres is `:latest` and its Redis is a Bitnami image, and Bitnami has closed
its public tag catalogue, so that pull is no longer dependable and fails quietly.

This is Medusa 2.18 written against the published packages, every version pinned.

## Five things that matter here

- **Migrations run pre-deploy, not at build.** The build container has no
  database. They run from `.medusa/server` — Medusa's build output is a separate
  application, and that catches people out.
- **The administrator is created on first boot** from `ADMIN_EMAIL` and
  `ADMIN_PASSWORD`. `medusa user` fails when the account exists, which is the
  normal outcome of every later deploy, so that failure is not allowed to fail the
  deploy.
- **Redis drives the event bus, the workflow engine and the cache.** Without it
  Medusa uses in-memory versions — fine on a laptop, quietly wrong once there is
  more than one process.
- **All four `@mikro-orm/*` packages sit on one version.** MikroORM refuses to
  start otherwise, and its error does not say which version it wants.
- **The build reuses one dependency tree.** Medusa's build output has the same
  dependencies as the source; installing them a second time pushed the build past
  the platform's limit, so the root tree is linked instead.

## Verified

Deployed from this template: `/health` returns 200, the generated
`ADMIN_PASSWORD` authenticates against `/auth/user/emailpass` and returns a
token, a wrong password returns 401, and the admin dashboard at `/app` serves.

## Using it

The dashboard is at `/app`. Log in with `ADMIN_EMAIL` and the generated
`ADMIN_PASSWORD` from your service variables.

## Configuration

Nothing to fill in. `JWT_SECRET`, `COOKIE_SECRET`, the database password and the
admin password are generated. CORS is `*` — narrow it once you have a storefront.

## Storefront

This is the backend and its admin. A storefront is a separate application talking
to the Store API; deploy one when you need it and point it here.

Source: https://github.com/ak40u/medusa-railway-starter

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Medusa | [ak40u/medusa-railway-starter](https://github.com/ak40u/medusa-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.6.5-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Medusa | 8080 |
| `NODE_ENV` | Medusa | production |
| `AUTH_CORS` | Medusa | * |
| `ADMIN_CORS` | Medusa | * |
| `JWT_SECRET` | Medusa | (secret) |
| `STORE_CORS` | Medusa | * |
| `ADMIN_EMAIL` | Medusa | admin@example.com |
| `COOKIE_SECRET` | Medusa | (secret) |
| `ADMIN_PASSWORD` | Medusa | (secret) |
| `POSTGRES_DB` | Postgres | medusa |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`

**Category:** Starters · **Languages:** TypeScript, Shell

[View on Railway →](https://railway.com/deploy/medusa-2-or-migrations-before-traffic-ad)
