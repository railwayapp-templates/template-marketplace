# Deploy Comp AI CRM on Railway

Open-source CRM for AI agents. Contacts, deals, email.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/comp-ai-crm-aug-26)

## About

Comp AI CRM tracks contacts, companies, deals, and email threads. Built for teams that work with AI agents — the CRM feeds context to your agents so they stop asking for the same information twice.

This template deploys the full stack in one click: a Next.js frontend, a NestJS API server, and a managed Postgres database. Both the API and web app run inside a single Railway service. Prisma handles the database schema on first deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| crm | [trycompai/crm](https://github.com/trycompai/crm) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | crm | 3000 | Web server port |
| `API_URL` | crm | http://localhost:3001 | Internal API server URL. Leave as default. |
| `APP_URL` | crm | - | Public URL of the app. Auto-filled by Railway. |
| `NODE_ENV` | crm | production | Leave as production |
| `DATABASE_URL` | crm | - | Postgres connection string. Auto-filled. |
| `BETTER_AUTH_SECRET` | crm | (secret) | Session signing key. Auto-generated. |
| `CRM_TELEMETRY_DISABLED` | crm | 1 | Set to 1 to disable telemetry |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `cd apps/api && bun src/main.ts & cd apps/app && bun run start`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Python, HTML, CSS, JavaScript, PLpgSQL, Shell

[View on Railway →](https://railway.com/deploy/comp-ai-crm-aug-26)
