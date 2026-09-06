# Deploy publications on Railway

Self-hosted MDX publications CMS with analytics and an admin studio.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/publications)

## About

Ren Publications is a self-hosted editorial archive for papers, research, articles, essays, notes, talks, and other long-form work. One Node service serves the Next.js interface and same-origin Express API.

The template provisions the application, PostgreSQL for durable content and analytics, and a Railway Bucket for uploaded media. The app runs database migrations before each deployment and exposes `/api/health` for Railway health checks.

After deployment, open the generated Railway domain. A first-run onboarding flow creates the single author profile, site identity, visual theme, and admin passphrase. The starter passphrase shown by the app is only a convenience and should be replaced during onboarding.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| publications | [shirasakaren/publications](https://github.com/shirasakaren/publications) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SESSION_SECRET` | publications | (secret) |
| `AWS_SECRET_ACCESS_KEY` | publications | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `npm start`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/publications)
