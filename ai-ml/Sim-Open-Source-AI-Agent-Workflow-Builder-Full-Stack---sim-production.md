# Deploy Sim | Open-Source AI Agent Workflow Builder (Full Stack) on Railway

Build and run AI agent workflows visually. App, realtime, cron, pgvector.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sim-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sim-production?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=sim)

[Sim](https://sim.ai) is an open-source platform for building and running AI agent workflows. You lay out agents, tools, conditions, loops and code on a canvas, connect any model provider and hundreds of integrations (Slack, Gmail, GitHub, Notion, databases and more), then run each workflow on a schedule, from a webhook, as an API, or as a chat. It is Apache-2.0 licensed and one of the most-starred agent builders on GitHub.

This template runs the full Sim stack, version 0.9.26, as six Railway services from Sim's official images:

| Service | What it does |
|---|---|
| **Sim** | The web app and API. Its volume holds uploaded files. |
| **Realtime** | Live canvas sync over WebSockets, so edits and run status appear instantly and teammates can edit together. |
| **Migrations** | Brings the database schema up to date, then exits. |
| **Cron** | Runs scheduled workflows and polling triggers (Gmail, RSS and others) every minute. |
| **Postgres** | PostgreSQL 17 with pgvector, which knowledge bases need. On a volume. |
| **Redis** | Run-status streaming and caches. |

What's set up for you:

- **Only you can sign up.** Sim's default lets anyone with the URL create an account. Here, only the email you enter at deploy time (`SIM_ADMIN_EMAIL`) can sign up or sign in. Everyone else gets "Access restricted".
- **All secrets are generated.** That covers session signing, credential encryption, API-key encryption, the internal service secret and the cron secret. The services that need a secret reference it from Sim, so nothing has to be copied by hand.
- **Pinned versions.** All four Sim images are pinned to `v0.9.26`, so a redeploy never upgrades one service ahead of the others.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Realtime | `ghcr.io/simstudioai/realtime:v0.9.26` | Web service |
| Migrations | `ghcr.io/simstudioai/migrations:v0.9.26` | Worker |
| Sim | `ghcr.io/simstudioai/simstudio:v0.9.26` | Web service |
| Cron | `ghcr.io/simstudioai/cron:v0.9.26` | Worker |
| Redis | `redis:7-alpine` | Database |
| Postgres | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Realtime | 3002 | Port Realtime listens on - leave as is. |
| `NODE_ENV` | Realtime | production | Production mode. |
| `REDIS_URL` | Realtime | - | Same Redis as Sim. |
| `DATABASE_URL` | Realtime | - | Same database as Sim. |
| `BETTER_AUTH_URL` | Realtime | - | Auth base URL, same as Sim's. |
| `BETTER_AUTH_SECRET` | Realtime | (secret) | Must match Sim. |
| `INTERNAL_API_SECRET` | Realtime | (secret) | Must match Sim. |
| `NEXT_PUBLIC_APP_URL` | Realtime | - | Sim's public URL, allowed as a socket origin. Match Sim's NEXT_PUBLIC_APP_URL if you add a custom domain. |
| `DATABASE_URL` | Migrations | - | Runs Sim's database migrations, then exits. Bump its image tag together with Sim and Realtime. |
| `PORT` | Sim | 3000 | Port Sim listens on - leave as is. |
| `HOSTNAME` | Sim | :: | Listen on IPv4 and IPv6, so Cron can reach Sim privately. |
| `REDIS_URL` | Sim | - | Redis for live status streaming and caches. |
| `CRON_SECRET` | Sim | (secret) | Authenticates the Cron service (schedules, polling triggers). |
| `DATABASE_URL` | Sim | - | Postgres with pgvector (knowledge bases). |
| `ENCRYPTION_KEY` | Sim | - | Encrypts stored credentials and environment variables. Never change or lose it. |
| `BETTER_AUTH_URL` | Sim | - | Auth base URL, same as the public URL. |
| `SIM_ADMIN_EMAIL` | Sim | - | Your email. Only this address can sign up and sign in until you add more (ALLOWED_LOGIN_EMAILS / ALLOWED_LOGIN_DOMAINS). |
| `STORAGE_PROVIDER` | Sim | local | Uploaded files go to the service's volume. |
| `SOCKET_SERVER_URL` | Sim | - | Realtime server over the private network. |
| `API_ENCRYPTION_KEY` | Sim | - | Encrypts Sim API keys at rest. Never change or lose it. |
| `BETTER_AUTH_SECRET` | Sim | (secret) | Signs sessions. Shared with Realtime. |
| `INTERNAL_API_SECRET` | Sim | (secret) | Authenticates Sim and Realtime to each other. |
| `NEXT_PUBLIC_APP_URL` | Sim | - | Public URL of Sim. Switch to your custom domain after adding one. |
| `ALLOWED_LOGIN_EMAILS` | Sim | (secret) | Comma-separated emails allowed to sign up and sign in. Add teammates here. |
| `NEXT_PUBLIC_SOCKET_URL` | Sim | - | Realtime server as the browser reaches it (live canvas collaboration). |
| `TZ` | Cron | UTC | Time zone for the job schedule. |
| `SIM_URL` | Cron | - | Sim over the private network. |
| `CRON_SECRET` | Cron | (secret) | Must match Sim. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `POSTGRES_DB` | Postgres | simstudio | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bun run db:migrate`
- **Healthcheck:** `/api/health`
- **Volume:** `/app/apps/sim/uploads`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save '' --appendonly no"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sim-production)
