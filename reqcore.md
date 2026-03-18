# Deploy Reqcore on Railway

Open-source, self-hosted Applicant Tracking System (ATS)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/reqcore)

## About

Reqcore is an open-source, self-hosted Applicant Tracking System (ATS). It gives you full data ownership, transparent AI, and no per-seat pricing — with a modern stack (Nuxt 4, Vue 3, PostgreSQL 16) replacing legacy recruiting platforms.

Deploying Reqcore on Railway gives you a fully managed ATS without maintaining your own servers. Railway provisions a PostgreSQL database, an S3-compatible storage bucket for candidate documents, and the Reqcore application container — all wired together automatically. The Dockerfile uses a multi-stage Node 20 Alpine build, and database migrations are applied automatically on each deploy using PostgreSQL advisory locks, making it safe for zero-downtime rolling updates. Environment variables like `DATABASE_URL`, S3 credentials, and authentication secrets are configured once and injected at runtime. Reqcore validates all environment variables at startup via Zod, so misconfigurations fail fast with clear error messages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| reqcore | [reqcore-inc/reqcore](https://github.com/reqcore-inc/reqcore) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `S3_SECRET_KEY` | reqcore | (secret) | - |
| `BETTER_AUTH_SECRET` | reqcore | (secret) | - |
| `S3_FORCE_PATH_STYLE` | reqcore | false | - |
| `NUXT_SESSION_PASSWORD` | reqcore | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Vue, TypeScript, CSS, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/reqcore)
