# Deploy Express + Prisma | API with Postgres and Migrations That Run on Railway

Express 5 and Prisma 7 on Railway, migrations run in the pre-deploy step

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/express-prisma-or-api-with-postgres-and-)

## About

An Express 5 API on Prisma 7 and Postgres, deployed with its database migrations in the pre-deploy step.

The interesting part of this template is where the migrations run.

The Express/Prisma starter most people deploy has not been updated since January 2023. It pins Prisma 4, long past end of life, and its build script is `yarn migrate:deploy && tsc` - it applies migrations during the **build**. Builds have no database attached, so the migration cannot connect and the build fails before TypeScript is ever invoked. Fewer than half of its deployments come up.

Railway has a step meant for this. The repository ships a railway.json declaring `preDeployCommand: npm run migrate`, which runs after the build and before the new version takes traffic, when DATABASE_URL exists. Migrations apply on every deploy, and a failed migration stops the rollout instead of putting new code in front of an old schema.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | [ak40u/express-prisma-railway-starter](https://github.com/ak40u/express-prisma-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | API | 8080 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/express-prisma-or-api-with-postgres-and-)
