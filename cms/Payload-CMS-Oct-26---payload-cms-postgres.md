# Deploy Payload CMS [Oct 26] on Railway

Payload 3.91 headless CMS on Next.js 16.4 with Postgres · Updated Oct 26

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/payload-cms-postgres)

## About

Railway provides a modern, streamlined platform for deploying web applications and databases. This template bundles **Payload CMS 3.91** (October 2026) — the open-source, fullstack Next.js framework for headless content management — running on Next.js 16.4 with a managed Postgres database. One-click deploy, auto-migrations, zero vendor lock-in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| payload | [marco-quintella/payload-cms-postgres](https://github.com/marco-quintella/payload-cms-postgres) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PAYLOAD_SECRET` | payload | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `HOSTNAME=0.0.0.0 node .next/standalone/server.js`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/payload-cms-postgres)
