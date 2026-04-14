# Deploy Postbase on Railway

The open-source alternative to Firebase and Supabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postbase)

## About

Postbase is a self-hosted auth and database platform for Next.js. Drop it into your stack, configure 25+ auth providers from a dashboard, and connect your app with a single SDK call. Think self-hosted Supabase or Clerk — you own the data, you control the infra.

Postbase ships as a single Docker container bundling PostgreSQL 18 (with pg_cron and pgmq), MinIO object storage, and the Next.js dashboard — all managed by supervisord. Deploying on Railway means one service, one attached volume, and a handful of environment variables. Railway detects the root Dockerfile automatically. You attach a volume at `/data` to persist your database and object storage, set a few secrets, generate a public domain, and you're live. No separate database service or storage bucket required — everything runs together out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| postbase | [harshalone/postbase](https://github.com/harshalone/postbase) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | postbase | Default database created during initialisation. Can be overridden if needed. |
| `DATABASE_URL` | Postgres | - | Primary internal database connection string used by services within Railway. |
| `POSTGRES_USER` | Postgres | (secret) | Default PostgreSQL superuser created during setup. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Secure auto-generated password for the PostgreSQL user. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public-facing connection string for external access (e.g. local development or admin tools). |
| `NEXTAUTH_SECRET` | postbase | (secret) | - |
| `STORAGE_SECRET_KEY` | postbase | (secret) | - |
| `POSTBASE_JWT_SECRET` | postbase | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Verified:** Yes · **Languages:** TypeScript, Shell, Dockerfile, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/postbase)
