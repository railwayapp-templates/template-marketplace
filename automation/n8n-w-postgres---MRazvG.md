# Deploy n8n (w/ postgres) on Railway

n8n workflow automation on PostgreSQL, webhooks and secrets preconfigured

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/MRazvG)

## About

n8n is a fair-code workflow automation tool: you build automations in a visual, node-based editor, connect hundreds of apps and APIs, and drop into JavaScript or Python when a node is not enough. This template runs n8n on PostgreSQL, the database n8n itself recommends for team and production use, with the webhook URL, encryption key and database connection already wired.

![n8n workflow editor with an automation open on the canvas](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot-readme.png)

The template deploys two services. **n8n** runs the official `n8nio/n8n` image behind a public Railway domain with a `/healthz` health check, so a new deploy only receives traffic once it answers. **Postgres** runs Railway's SSL-enabled PostgreSQL image on a persistent volume. n8n reaches it over Railway's private network, so database traffic never leaves the project and is not billed as egress.

Everything n8n needs to come up is set for you: `DB_TYPE=postgresdb` with host, port, user, password and database name referenced from the Postgres service, `WEBHOOK_URL` pointing at the service's public domain so webhook and OAuth callbacks resolve to the right place, and `N8N_ENCRYPTION_KEY` generated at deploy time so stored credentials survive restarts and redeploys. On first visit n8n asks you to create the owner account. There is no password to look up.

By default n8n uses SQLite. Its own hosting docs say: "If you're setting n8n up for a team or a production environment, consider a more robust database like Postgres rather than the built-in default." That is what this template does.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n | - | A random generated n8n encryption key for credentials |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/MRazvG)
