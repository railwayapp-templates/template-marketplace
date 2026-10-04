# Deploy Next + Prisma + tRPC | Typed Full-Stack on Current Versions on Railway

Next 16, Prisma 7, tRPC 11. Migrations run before the new version.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/next-prisma-trpc-o-1)

## About

A typed full-stack app on Next 16, React 19, Prisma 7 and tRPC 11, with Postgres.

A working app, not a skeleton. Open the domain, write a post, and it goes through a typed tRPC call to Prisma to Postgres and comes back from the database.

The existing Next Prisma tRPC template deploys a repository last touched in May 2023: Next 13, Prisma 4.7, tRPC 10, React 18. **No deployment of it succeeds**; the template reports 0% health. Three years of unattended dependency drift will do that, and the stack has moved twice since: Prisma 7 changed where the connection string lives, and tRPC 11 changed where the transformer is configured.

Hosting this stack on a platform has one well-known trap: running migrations at build time. The build container has no database, and putting `prisma migrate deploy` in the build is the single most common way this stack fails on a platform. Here migrations run in the pre-deploy step, before the new version takes traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [ak40u/next-prisma-trpc-railway-starter](https://github.com/ak40u/next-prisma-trpc-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | app | 8080 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, Shell

[View on Railway →](https://railway.com/deploy/next-prisma-trpc-o-1)
