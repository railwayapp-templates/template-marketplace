# Deploy nerve-template-source on Railway

Visual command center for securely operating OpenClaw and Hermes agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nerve-template-source)

## About

Nerve is an open-source visual command center for securely observing and operating OpenClaw and Hermes agent fleets. This template deploys the Nerve web application with PostgreSQL persistence, encrypted runtime credentials, database migrations, and health checks.

Nerve runs as a self-hosted Next.js control plane. Railway builds the repository Dockerfile, runs additive PostgreSQL migrations before each release, and monitors `/api/health`. Runtime credentials are encrypted before storage and never returned to the browser.

After deployment, open the generated Nerve domain and unlock the command center with the access token configured in `NERVE_ADMIN_TOKEN` or a role-scoped token from `NERVE_ACCESS_KEYS`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nerve | [boyeesu/nerve](https://github.com/boyeesu/nerve) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NERVE_ADMIN_TOKEN` | nerve | (secret) |
| `NERVE_SESSION_SECRET` | nerve | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/nerve-template-source)
