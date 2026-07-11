# Deploy memos on Railway

Lightweight, self-hosted note-taking with Markdown support.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memos-3)

## About

Deploy this template on Railway with one click. Railway provides compute, TLS at the edge, and a public URL. The service restarts automatically on failures.

This template runs as a single container with no external database dependencies. All data is stored using built-in storage — no PostgreSQL, Redis, or additional services required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| memos | [INAPP-Mobile/railway-memos](https://github.com/INAPP-Mobile/railway-memos) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone (e.g., America/New_York, Europe/London). |
| `MEMOS_DSN` | - | Database connection string. Add a Railway Postgres service to auto-inject. Leave empty for SQLite (default). |
| `MEMOS_PORT` | 5230 | Port Memos listens on (default: 5230). Railway injects PORT for routing. |
| `MEMOS_LOG_LEVEL` | info | Log verbosity level. Default: info. Options: debug, info, warn, error. |
| `MEMOS_ADMIN_EMAIL` | admin@example.com | Admin email for first-time setup. Set before initial deploy to pre-configure admin account. |
| `MEMOS_ADMIN_PASSWORD` | (secret) | Admin password for first-time setup. Auto-generated — set before initial deploy to configure admin account. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/memos-3)
