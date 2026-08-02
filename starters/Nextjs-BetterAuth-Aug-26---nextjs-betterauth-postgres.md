# Deploy Next.js BetterAuth [Aug 26] on Railway

Next.js 16 + BetterAuth + Postgres SaaS starter with auth · Updated Aug 26

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-betterauth-postgres)

## About

Railway provides a modern, streamlined platform for deploying web applications and databases. This template bundles a production-ready Next.js 16 application with BetterAuth authentication, Drizzle ORM, and a Postgres database — all configured to work together out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [marco-quintella/nextjs-betterauth-postgres](https://github.com/marco-quintella/nextjs-betterauth-postgres) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BETTER_AUTH_SECRET` | web | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/nextjs-betterauth-postgres)
