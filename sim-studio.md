# Deploy Sim Studio on Railway

A lightweight, user-friendly platform for building AI agent workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sim-studio)

## About

Sim Studio is a lightweight, user-friendly platform for building AI agent workflows. It provides an intuitive interface for creating, managing, and deploying AI-powered automation workflows with support for local and cloud-based models.

### Deployment Steps

All required settings are pre-configured, but there are many other configuration options for LLMs, emails, etc.

1.  Import the template and wait for all services to be running
2.  Make sure the `migrations` service shows as `COMPLETED` before continuing, otherwise you won’t be able to register!
3.  Click on the `simstudio` service and visit the domain (you can also add your own!)
4.  Click on **Start now** on the homepage and create an account

For more configuration options, take a look at the [.env.example file](https://github.com/simstudioai/sim/blob/main/apps/sim/.env.example) for the most important ones, or the [.env.ts file](https://github.com/simstudioai/sim/blob/main/apps/sim/lib/env.ts) for an extensive list\*. _(\*it seems many of these variables are unused or deprecated!)_

### Post-Deployment Setup

If you wish to prevent other users accessing your server, you can set the `DISABLE_REGISTRATION` environment variable to `true`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| realtime | `ghcr.io/simstudioai/realtime:latest` | Web service |
| pgvector | `pgvector/pgvector:pg17` | Database |
| migrations | `ghcr.io/simstudioai/migrations:latest` | Worker |
| simstudio | `ghcr.io/simstudioai/simstudio:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | realtime | - | The same database used by `simstudio` |
| `BETTER_AUTH_URL` | realtime | - | The same URL used by `simstudio` |
| `BETTER_AUTH_SECRET` | realtime | (secret) | The same secret used by `simstudio` |
| `NEXT_PUBLIC_APP_URL` | realtime | - | The same URL used by `simstudio` |
| `POSTGRES_DB` | pgvector | railway | Name of the default database |
| `DATABASE_URL` | pgvector | - | Public URL |
| `POSTGRES_USER` | pgvector | (secret) | Name of the initial user |
| `PGHOST_PRIVATE` | pgvector | - | Private host |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private port |
| `POSTGRES_PASSWORD` | pgvector | (secret) | The Postgres password |
| `DATABASE_URL_PRIVATE` | pgvector | - | Private URL |
| `DATABASE_URL` | migrations | - | The same database used by `simstudio` |
| `DATABASE_URL` | simstudio | - | Private pgvector URL |
| `ENCRYPTION_KEY` | simstudio | - | Secure encryption key |
| `RESEND_API_KEY` | simstudio | (secret) | Used to configure the Resend email delivery service |
| `BETTER_AUTH_URL` | simstudio | - | Public URL |
| `SOCKET_SERVER_URL` | simstudio | - | `realtime` server URL |
| `BETTER_AUTH_SECRET` | simstudio | (secret) | Secure auth secret |
| `NEXT_PUBLIC_APP_URL` | simstudio | - | Public URL |
| `DISABLE_REGISTRATION` | simstudio | false | Prevent users from registering |
| `NEXT_PUBLIC_SOCKET_URL` | simstudio | - | `realtime` server URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run db:migrate`
- **Healthcheck:** `/`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/sim-studio)
