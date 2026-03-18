# Deploy NextJS + Better Auth + ShadCN on Railway

NextJS + Better Auth + ShadCN pre-installed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nextjs-better-auth-shadcn)

## About

This Next.js + Better Auth template is designed to be deployed on Railway with minimal configuration. Railway automatically detects your Next.js application, provides a PostgreSQL database, installs dependencies, builds the project, and deploys it with a public URL.

Railway provides:
- **Automatic deployments** from your Git repository
- **Built-in PostgreSQL** with automatic backups
- **Custom domains** and SSL certificates
- **Environment variable management**
- **Instant rollbacks** to previous deployments
- **Built-in metrics** and logging
- **Horizontal scaling** capabilities

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| NextJS | [bon5co/nextjs-better-auth-template](https://github.com/bon5co/nextjs-better-auth-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `GOOGLE_CLIENT_ID` | NextJS | GOOGLE_CLIENT_ID | - |
| `GOOGLE_CLIENT_SECRET` | NextJS | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run db:push && npm run start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/nextjs-better-auth-shadcn)
