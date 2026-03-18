# Deploy Sveltekit NestJS on Railway

Full-stack with SvelteKit + NestJS + Prisma + Postgresql with utils

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/oovLiW)

## About

🚀 SvelteKit + NestJS + Prisma Starter Template

A powerful full-stack starter template designed for rapid development and seamless deployment on Railway.

This template combines:
- ⚡ SvelteKit – blazing-fast frontend with file-based routing and built-in SSR
- 🧠 NestJS – scalable, modular backend framework with TypeScript
- 🧬 Prisma ORM – modern database toolkit for type-safe database access
- 🛠️ Pre-configured PostgreSQL, Vite API URL, and automatic deployment

Features:
- ✅ Production-ready Docker setup
- ✅ .env preloaded and auto-linked Railway variables
- ✅ Clean folder structure for monorepo projects
- ✅ Ready-to-use REST API & SSR frontpage
- ✅ Hot reload in dev mode for both frontend & backend

Ideal For:
- Full-stack developers seeking a quick and clean setup
- Projects with SSR, APIs, and DB access
- Teams deploying to Railway in minutes

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sveltekit-starter | [zxdev7/sveltekit-starter](https://github.com/zxdev7/sveltekit-starter) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| nestjs-starter | [zxdev7/nestjs-starter](https://github.com/zxdev7/nestjs-starter) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CORS_URL` | sveltekit-starter | - | The private DNS name of the service. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | nestjs-starter | 5000 | - |
| `S3_SECRET_KEY` | nestjs-starter | (secret) | - |

## Configuration

- **Start command:** `node build`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start`

**Category:** Starters · **Languages:** JavaScript, TypeScript, HTML, Svelte, CSS, Dockerfile

[View on Railway →](https://railway.com/template/oovLiW)
