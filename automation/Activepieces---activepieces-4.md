# Deploy Activepieces on Railway

Activepieces automation with Postgres and Redis, owner set at deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-4)

## About

[Activepieces](https://github.com/activepieces/activepieces) (MIT community edition) is an open-source alternative to Zapier: flows with hundreds of app integrations, webhooks, schedules, AI agents and MCP servers.

This template runs the official image (0.92.0) with the app and a worker in one container, which is the image's default, plus Postgres with pgvector and Redis for the job queue.

The first account that signs up to an Activepieces instance owns the platform, and after that new accounts need an invitation. On a public URL that first sign-up is a race, so this template does it for you: the deploy form asks for your email, a password is generated into `ADMIN_PASSWORD`, and a start step signs the owner up as soon as the API answers. Open `ACTIVEPIECES_URL` and sign in with that email and password; invite everyone else from the platform settings.

Before publishing I tested it end to end. The owner signed in with the admin role, and a sign-up from another address was refused with `INVITATION_ONLY_SIGN_UP`. I created a flow with a webhook trigger through the API, published it and called the webhook, and the worker ran it to `SUCCEEDED`. After a restart the owner signed in again and the flow was still there.

The first version ran the flow and then the whole container restarted before the run finished. Upstream's default is five flow runs at a time, each in its own process, and on a 1 GB service that was too much; with `AP_WORKER_CONCURRENCY=1` the same run succeeded. The template starts at 1. On a plan with more memory, raise it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7.4` | Database |
| Activepieces | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /activepieces) | Web service |
| Postgres | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (generated) |
| `PORT` | Activepieces | 80 | Port Railway routes to |
| `AP_PORT` | Activepieces | 80 | Port of the web app and API |
| `ADMIN_EMAIL` | Activepieces | - | Email of the owner account, created on first start. Sign in with it and ADMIN_PASSWORD |
| `AP_REDIS_URL` | Activepieces | - | Redis over the private network (family=0 lets the client use IPv6) |
| `AP_JWT_SECRET` | Activepieces | (secret) | Signs sessions and the worker token (generated) |
| `ADMIN_PASSWORD` | Activepieces | (secret) | Password of the owner account (generated) |
| `AP_ENVIRONMENT` | Activepieces | prod | Production mode |
| `AP_FRONTEND_URL` | Activepieces | - | Public URL, used for webhooks and app triggers. Change it when you add a custom domain |
| `ACTIVEPIECES_URL` | Activepieces | - | Open this and sign in with ADMIN_EMAIL and ADMIN_PASSWORD |
| `AP_POSTGRES_HOST` | Activepieces | - | Postgres over the private network |
| `AP_POSTGRES_PORT` | Activepieces | 5432 | Postgres port |
| `AP_ENCRYPTION_KEY` | Activepieces | - | Encrypts connections (generated). Keep it |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED | Upstream's default execution mode |
| `AP_POSTGRES_DATABASE` | Activepieces | - | Database name |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) | Database password |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) | Database user |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | Product analytics off |
| `AP_WORKER_CONCURRENCY` | Activepieces | 1 | Flow runs at the same time. Each is its own process: upstream's default of 5 got the container killed on a 1 GB service. Raise it on bigger plans |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 | Webhook response timeout |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 | Minutes between polling triggers |
| `POSTGRES_DB` | Postgres | activepieces | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |

## Configuration

- **Start command:** `/bin/sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/cache`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Tags:** activepieces, automation, zapier-alternative, workflows, ai-agents, postgres · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/activepieces-4)
