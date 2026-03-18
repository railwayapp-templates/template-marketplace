# Deploy Sveltekit Prisma on Railway

Sveltekit with Prisma already configured

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sRATcT)

## About

# Overview
Bare-bones Sveltekit project with Typescript and Prisma.

## Features
- Keep your database schema close to your code with Prisma
  - Perform Typesafe queries
- ESLint
- Prettier
- Vitest
- Playwright

## Learn More
- [Sveltekit Docs](https://kit.svelte.dev/docs/introduction)
- [Prisma Docs](https://www.prisma.io/docs)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sveltekit | [dobecad/sveltekit-prisma-template](https://github.com/dobecad/sveltekit-prisma-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** JavaScript, TypeScript, HTML, Svelte

[View on Railway →](https://railway.com/template/sRATcT)
