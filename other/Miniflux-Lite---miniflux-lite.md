# Deploy Miniflux Lite on Railway

Self-hosted RSS reader with Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/miniflux-lite)

## About

Railway handles the infrastructure: containers, networking, SSL, and persistent Postgres storage. You focus on reading feeds, not managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| miniflux | `miniflux/miniflux:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BASE_URL` | miniflux | - | Public URL of your Miniflux instance. Used for feed discovery and redirects. |
| `BATCH_SIZE` | miniflux | 100 | Number of feeds to fetch in one batch. Default: 100. |
| `CREATE_ADMIN` | miniflux | 1 | Create admin user on first run. Set to 1 for first deploy. |
| `DATABASE_URL` | miniflux | - | PostgreSQL connection string — auto-wired from the Postgres companion service. Do not edit. |
| `ADMIN_PASSWORD` | miniflux | (secret) | Admin password — MUST be at least 12 characters. Change immediately after first login. |
| `ADMIN_USERNAME` | miniflux | (secret) | Admin username for the Miniflux web UI. |
| `RUN_MIGRATIONS` | miniflux | 1 | Run database migrations on startup. Set to 1 for first deploy. |
| `POLLING_FREQUENCY` | miniflux | 60 | How often (in minutes) Miniflux fetches feeds. Default: 60 minutes. |
| `MINIFLUX_WEBHOOK_URL` | miniflux | - | Optional: webhook URL for new entries (e.g., Marketing Bot Lite endpoint). Leave empty to disable. |
| `POSTGRES_DB` | Postgres | miniflux | PostgreSQL database name. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL user name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL password — auto-generated on deploy. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/miniflux-lite)
