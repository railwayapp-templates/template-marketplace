# Deploy Blitz Postgres on Railway

A basic Blitz starter using Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/u6vADm)

## About

# Overview

Blitz.js is titled as "The Missing Fullstack Toolkit for Next.js".

You get authentication, data fetching and Prisma all working nicely together in a type-safe way.
This template makes it easy to deploy Blitz.js with Postgres to Railway.

# Learn more

To learn more about Blitz.js you can head to https://blitzjs.com/ and go through the docs.

# Contribute

If you have any suggestions, don't hesitate to open an issue in the template repo.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-blitz-template | [pgvr/railway-blitz-template](https://github.com/pgvr/railway-blitz-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SESSION_SECRET_KEY` | railway-blitz-template | (secret) | 32 character secret key to sign tokens (Try CMD-K to generate one) |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Start command:** `pnpm run migrate:deploy && pnpm run start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/u6vADm)
