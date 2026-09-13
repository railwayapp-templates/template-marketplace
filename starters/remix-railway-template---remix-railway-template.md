# Deploy remix-railway-template on Railway

The Remix-lineage full-stack starter: RRv7, Postgres, Prisma, auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/remix-railway-template)

## About

Click the deploy button. Railway provisions exactly two services:

| Service | What it is |
|---|---|
| **app** | Built from the GitHub repo's Dockerfile (Node 22 LTS, multi-stage, `npm ci`). Boots with `prisma migrate deploy` (idempotent) then serves on Railway's injected `PORT`. Healthcheck: `GET /healthcheck.jpg` → 200. |
| **Postgres** | Railway's Postgres 18 image with a persistent volume. |

Wiring is preconfigured: `DATABASE_URL` on the app references `${{Postgres.DATABASE_URL}}`, and
`SESSION_SECRET` is generated fresh per deployment via `${{secret(32, ...)}}`. Nothing to type.

Hosting costs roughly **$5/month** at idle-to-light usage: the Postgres service (~$3–4/mo for
the smallest volume + memory) plus the app container (~$1–3/mo). Both scale with usage; you can
sleep the app when developing locally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [lNamelessl/remix-railway-template](https://github.com/lNamelessl/remix-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SESSION_SECRET` | app | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, Dockerfile, Shell, CSS

[View on Railway →](https://railway.com/deploy/remix-railway-template)
