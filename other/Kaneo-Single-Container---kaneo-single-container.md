# Deploy Kaneo Single Container on Railway

Open source project management — current single-container Kaneo + Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-single-container)

## About

# Kaneo — Single Container

One-click deploy of [Kaneo](https://kaneo.app), the open source project management platform (kanban boards, tasks, workspaces, time tracking).

This template uses Kaneo's **current single-container release** (`ghcr.io/usekaneo/kaneo`) — web app and API in one image — plus Railway's managed PostgreSQL. It is pre-configured for Railway:

- IPv6-ready web server (fixes the 502s the stock image produces behind Railway's proxy)
- Health-checked deploys (`/api/health`)
- `AUTH_SECRET` generated fresh per deploy, so sessions survive restarts and no two deploys share secrets
- Database wired automatically via reference variables

## After deploying

1. Open your service's domain and create your account (first signup is yours).
2. Recommended: lock the instance down by adding these variables to the Kaneo service:
   - `DISABLE_REGISTRATION=true` — no new public signups (invited users can still join)
   - `DISABLE_GUEST_ACCESS=true` — removes anonymous sign-in

## Optional extras

- **File uploads in tasks/comments**: S3-compatible storage (e.g. a Railway bucket) via `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_FORCE_PATH_STYLE=true`
- **Email (SMTP)** and **GitHub / Google / Discord sign-in**: see [Kaneo's environment variable docs](https://kaneo.app/docs/core/installation/environment-variables)
- **Redis**: only needed when scaling to multiple replicas; a single instance falls back to in-memory automatically

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Kaneo | `ghcr.io/usekaneo/kaneo:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Kaneo | 5173 |
| `AUTH_SECRET` | Kaneo | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'sed -i "s/listen 5173;/listen 5173; listen [::]:5173;/" /etc/nginx/conf.d/default.conf && exec /usr/local/bin/kaneo-entrypoint.sh'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kaneo-single-container)
