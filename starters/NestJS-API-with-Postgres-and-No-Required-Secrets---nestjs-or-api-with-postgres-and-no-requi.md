# Deploy NestJS | API with Postgres and No Required Secrets on Railway

NestJS 11 and Prisma 7 on Railway, deploys without any required secrets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nestjs-or-api-with-postgres-and-no-requi)

## About

A NestJS 11 API on Prisma 7 and Postgres, with nothing to fill in before it deploys.

The NestJS template on Railway declares three variables with empty values - RESEND_API_KEY, JWT_ACCESS_SECRET and JWT_REFRESH_SECRET - and Railway turns every empty value into a required field. Before the Deploy button will light up you have to sign up for a third-party email service, obtain an API key, and invent two JWT secrets, for a starter you have not seen run yet. Its FRONTEND_URL also defaults to localhost:3000, which is wrong for every deployment. Fewer than one in ten come up.

This one deploys without asking anything. It ships no auth and no email, on purpose: a generic starter that implements neither should not be collecting their secrets. Add @nestjs/jwt and a mail provider when you need them, and the variables along with them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | [ak40u/nestjs-railway-starter](https://github.com/ak40u/nestjs-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | API | 8080 |
| `POSTGRES_DB` | Postgres | nest |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/nestjs-or-api-with-postgres-and-no-requi)
