# Deploy ghost on Railway

Self-hosted Ghost CMS blog — powerful open-source publishing platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-ghost)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/railway-ghost)

> **Canonical code:** `railway-ghost` — deploy URL: https://railway.com/new/template/railway-ghost

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-ghost/main/og-image.svg)

Deploy a self-hosted Ghost CMS blog on Railway in one click. Ghost is a powerful, open-source publishing platform used by creators and startups worldwide.

Ghost runs as a single container with a Railway-managed PostgreSQL database for content storage. Railway provides the compute, TLS at the edge, and a public URL. The service restarts automatically on failures via Railway's built-in health check. Content is stored in PostgreSQL — no persistent volume needed for the core deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-ghost | `ghost:6-alpine` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/railway-ghost)
