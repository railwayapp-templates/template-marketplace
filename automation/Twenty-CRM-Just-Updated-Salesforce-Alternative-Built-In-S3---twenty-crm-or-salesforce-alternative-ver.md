# Deploy Twenty CRM | (Just Updated) Salesforce Alternative, Built-In S3 on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-or-salesforce-alternative-ver)

## About

Twenty is an open-source CRM — a self-hosted alternative to Salesforce, HubSpot and Attio. It gives your team companies, people, opportunities, notes, tasks and attachments in a fast keyboard-driven UI, with custom objects and fields, saved views, workflow automations, a full GraphQL and REST API, and Gmail/Google Calendar and Microsoft 365 sync.

This template deploys a complete five-service Twenty stack: the API/UI server, a **background worker**, PostgreSQL, Redis, and a built-in **MinIO** S3 store — each stateful service on its own persistent volume. Every image is pinned to an exact version, and the deploy form has **nothing you have to fill in**.

Twenty is not a single container. The server renders the app and answers the API, but everything that happens in the background — email and calendar sync, workflow automations, cron triggers, imports, workspace clean-up — runs in a separate worker process against Redis. A Twenty deploy without that worker looks perfectly healthy and quietly never runs a workflow.

It also needs shared file storage. Both the server and the worker read and write attachments, profile pictures and workspace logos, and a Railway volume cannot be mounted into two services — so local storage would leave files written by one process invisible to the other. This template runs MinIO inside the stack as the shared S3 backend, on its own volume. Nothing external to sign up for, no bucket to create, no keys to paste.

Three things this template does differently from most Twenty listings:

- **Everything is version-pinned.** The server and the worker both run `twentycrm/twenty:v2.25.1` (wrapped as `ghcr.io/bon5co/twenty-railway`), never `latest`. On Railway each service redeploys independently, so `latest` lets one of them drift onto a newer build against a database the other has not migrated for — and it means an unrelated restart months from now can silently carry your CRM across a breaking upgrade you did not choose. Upgrading here is an explicit change of tag.
- **A dedicated `ENCRYPTION_KEY` is generated per deploy.** Since v2.5 Twenty encrypts at-rest secrets — OAuth tokens, TOTP secrets, signing keys, sensitive config — under `ENCRYPTION_KEY`, and silently falls back to `APP_SECRET` when it is unset. Upstream's guidance is that new installs should always set a dedicated key, so this one does; the two secrets stay independent and `APP_SECRET` can be rotated without destroying every stored credential.
- **The worker starts in the right order.** On a first deploy all five services boot at once, so the worker waits for the server to create the `core` schema instead of crash-looping against tables that do not exist yet, and it runs with migrations and cron registration disabled so it can never race the server's migration.

Sizing: the server is the memory-hungry service (roughly 1 GB), the worker a few hundred MB, and Postgres, Redis and MinIO are small. Expect to need the Hobby plan or above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| twenty | `ghcr.io/bon5co/twenty-railway:latest` | Web service |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| redis | `redis:8.2.1` | Database |
| postgres | `postgres:16` | Database |
| worker | `ghcr.io/bon5co/twenty-railway:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `APP_SECRET` | twenty | (secret) |
| `STORAGE_S3_SECRET_ACCESS_KEY` | twenty | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `APP_SECRET` | worker | (secret) |
| `STORAGE_S3_SECRET_ACCESS_KEY` | worker | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found && mkdir -p /data/twenty && exec minio server --address ":9000" --console-address ":9001" /data'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data --maxmemory-policy noeviction'`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/usr/local/bin/railway-entrypoint.sh yarn worker:prod`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/twenty-crm-or-salesforce-alternative-ver)
