# Deploy Paperclip Latest Version on Railway

Deploy Latest Version of Paperclip in one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-latest-version)

## About

Paperclip is an open-source platform for running AI agent companies—org charts, goals, budgets, and autonomous agent workflows in one place. This template ships a pinned latest upstream release with Postgres, persistent storage, authenticated access, and a one-click setup page to create your first admin invite—no SSH or log scraping required.

Hosting Paperclip on Railway means running the app service beside managed Postgres, with a volume at `/paperclip` for instance data and agent state. This template builds a pinned upstream Paperclip release in Docker, then starts a small wrapper that proxies traffic, serves `/setup` for admin bootstrap, and exposes `/setup/healthz` for Railway healthchecks. After deploy, open `/setup`, optionally add provider API keys, generate an admin invite URL, and use the app at `/`. Public URL, auth secret, and database wiring are prefilled via Railway reference variables; keep port `3100` and the volume mount aligned with the template defaults.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paperclip | [marco-quintella/paperclip-railway-template](https://github.com/marco-quintella/paperclip-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Paperclip | 0.0.0.0 | Host address where is reunning, keep 0.0.0.0 for local |
| `PORT` | Paperclip | 3100 | Port where is running. |
| `SERVE_UI` | Paperclip | true | Wheter the UI mode must be served |
| `DATABASE_URL` | Paperclip | - | Postgres database URL |
| `PAPERCLIP_HOME` | Paperclip | /paperclip | Home address |
| `BETTER_AUTH_SECRET` | Paperclip | (secret) | Authentication Secret |
| `BETTER_AUTH_BASE_URL` | Paperclip | - | Base URL for Authentication Engine |
| `PAPERCLIP_PUBLIC_URL` | Paperclip | - | Public accessible URL on the Web |
| `PAPERCLIP_DEPLOYMENT_MODE` | Paperclip | authenticated | Deployment Mode: keep authenticated to have protection |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | Paperclip | private | Kind of exposure you want |
| `POSTGRES_DB` | Postgres | railway | DB name |
| `DATABASE_URL` | Postgres | - | DB URL |
| `POSTGRES_USER` | Postgres | (secret) | DB User |
| `POSTGRES_PASSWORD` | Postgres | (secret) | DB Password |
| `DATABASE_PUBLIC_URL` | Postgres | - | DB Public URL |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/paperclip-latest-version)
