# Deploy Github to Discord Webhook Bridge on Railway

A better alternative to the default discord-github integration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/github-to-discord-webhook-bridge)

## About

GitHub to Discord Webhook Bridge is a self-hosted service that forwards GitHub webhook events to Discord channels with beautifully formatted embeds. It supports multi-user, multi-repo configurations with secure HMAC-SHA256 webhook signature verification, making it easy to get real-time GitHub notifications in your Discord server.

Deploying GitHub to Discord Webhook Bridge involves setting up a Bun-powered web server connected to a PostgreSQL database. The service receives incoming webhooks from GitHub, verifies their authenticity using cryptographic signatures, and forwards formatted embed messages to configured Discord webhook URLs. Railway simplifies this by automatically provisioning the database and detecting the public domain. The service supports flexible registration modes (open, closed, or invite-only), and migrations run automatically on startup—no manual database setup required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| github-discord-webhook | [alexng353/github-discord-webhook](https://github.com/alexng353/github-discord-webhook) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | github-discord-webhook | production | NODE_ENV |
| `DATABASE_URL` | github-discord-webhook | - | The database URL. |
| `REGISTRATION` | github-discord-webhook | invite_only | You can set this to `open` or `closed` or `invite_only`. You *NEED* it to be `open` or `invite_only` on first launch. Otherwise you can fiddle with the database to get it working the first time. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `bun run start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** HTML, TypeScript

[View on Railway →](https://railway.com/deploy/github-to-discord-webhook-bridge)
