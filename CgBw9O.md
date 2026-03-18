# Deploy Next Prisma tRPC on Railway

A sample NextJS app using tRPC

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/CgBw9O)

## About

## Overview

This is an example [NextJS](https://nextjs.org/) app that uses [Prisma](https://www.prisma.io/) with [tRPC](https://trpc.io/)

## Highlights

- E2E typesafety with [tRPC](https://trpc.io/)
- Full-stack React with Next.js
- Database with Prisma
- VSCode extensions
- ESLint + Prettier
- Validates your env vars on build and start

## Learn More

View the official [tRPC website](https://trpc.io/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| frontend | [railwayapp-templates/next-prisma-trpc](https://github.com/railwayapp-templates/next-prisma-trpc) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** trpc, next, typescript, web · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/CgBw9O)
