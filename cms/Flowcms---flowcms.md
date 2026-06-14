# Deploy Flowcms on Railway

FlowCMS – AI-powered self-hostable headless CMS with AI & APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowcms)

## About

Flow CMS is an open-source, AI-powered, self-hostable headless CMS. It pairs content modeling and a fast delivery API with an AI tool suite (bring your own provider keys), an SEO/AEO suite, media, messaging, webhooks, and an agent API, so any website, app, or AI agent can read and write your content.

This template runs the all-in-one Flow CMS image (admin studio, headless API, and reverse proxy in one service) alongside a managed PostgreSQL database. On deploy, Railway auto-generates the encryption and session secrets, wires the database connection over private networking, and runs the database migrations on first boot. There is no default admin account: you open the generated URL and create your own admin in the first-run /welcome wizard. Postgres data persists on a volume. Because container storage is ephemeral, point media uploads at an S3-compatible bucket (Cloudflare R2, Supabase Storage, or S3) for production use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowcms-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| flowcms | `ghcr.io/flowcms-co/flowcms:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | flowcms-db | railway |
| `POSTGRES_USER` | flowcms-db | (secret) |
| `POSTGRES_PASSWORD` | flowcms-db | (secret) |
| `PORT` | flowcms | 8080 |
| `NODE_ENV` | flowcms | production |
| `JWT_SECRET` | flowcms | (secret) |
| `SECRETS_ENCRYPTION_KEY` | flowcms | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/deploy/flowcms)
