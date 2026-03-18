# Deploy T3 Postgres on Railway

The popular T3 App ready to go on Railway with Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Qi2Q_U)

## About

# Overview

This starter was scaffolded with the T3 App CLI using: 
- Tailwind
- Prisma
- tRPC
- NextAuth
You will need to add your own NextAuth providers in `src/server/auth.ts`, there's none configured by default.

Database migrations are configured to run as part of the `start` command. If you plan on using multiple replicas I would suggest to move the migrations into the `build` command.

# Learn more

For more information about create-t3-app please head over to https://create.t3.gg/en/introduction or join the discord https://t3.gg/discord

# Contribute

If you have any suggestions, don't hesitate to open an issue in the template repo.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-t3-template | [pgvr/railway-t3-template](https://github.com/pgvr/railway-t3-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXTAUTH_SECRET` | railway-t3-template | (secret) | 32 character secret key to sign tokens (Try CMD-K to generate one) |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Start command:** `pnpm run db:migrate-deploy && pnpm run start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/Qi2Q_U)
