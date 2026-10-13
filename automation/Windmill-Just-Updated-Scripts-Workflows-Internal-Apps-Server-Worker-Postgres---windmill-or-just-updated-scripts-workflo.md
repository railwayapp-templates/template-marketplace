# Deploy Windmill | (Just Updated) Scripts, Workflows & Internal Apps, Server + Worker + Postgres on Railway

Scripts, workflows & internal apps. Server, worker, Postgres, persistent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-or-just-updated-scripts-workflo)

## About

Windmill is an open-source developer platform for turning scripts (Python, TypeScript, Go, Bash, SQL and more) into webhooks, workflows, cron jobs and internal apps with auto-generated UIs. This template runs the Windmill server, a default worker and a PostgreSQL database with a persistent volume, so your scripts, flows, schedules and run history survive redeploys.

This template deploys three services from the official `ghcr.io/windmill-labs/windmill` image (pinned by digest) plus `postgres:18`. The server (`MODE=server`) serves the UI and API on the public domain. A separate worker service (`MODE=worker`, group `default`) executes jobs, so you can scale workers independently. Both connect to PostgreSQL over Railway's private network; the database password is generated at deploy as a random secret and shared with the app services by reference, so there is nothing to type. PostgreSQL stores its data on a volume mounted at `/var/lib/postgresql`. After deploy, open the public domain and sign in with the Windmill default account (`admin@windmill.dev` / `changeme`); Windmill asks you to set a new password and create your first workspace right away, so do this immediately after the first deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:18` | Database |
| windmill | `ghcr.io/windmill-labs/windmill:1.830.0@sha256:46016168ebe27f0916c4de5c5b174667ee01675169da999f10bc62cfd18fa1cd` | Web service |
| windmill-worker | `ghcr.io/windmill-labs/windmill:1.830.0@sha256:46016168ebe27f0916c4de5c5b174667ee01675169da999f10bc62cfd18fa1cd` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `POSTGRES_PASSWORD` | windmill | (secret) |
| `POSTGRES_PASSWORD` | windmill-worker | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export POSTGRES_DB=windmill; exec docker-entrypoint.sh postgres'`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export MODE=server DATABASE_URL="postgres://postgres:${POSTGRES_PASSWORD}@${PG_HOST}:5432/windmill?sslmode=disable"; exec windmill'`
- **Healthcheck:** `/api/version`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'export MODE=worker WORKER_GROUP=default DATABASE_URL="postgres://postgres:${POSTGRES_PASSWORD}@${PG_HOST}:5432/windmill?sslmode=disable"; exec windmill'`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/windmill-or-just-updated-scripts-workflo)
