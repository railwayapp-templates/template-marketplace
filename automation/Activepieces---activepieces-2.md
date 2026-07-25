# Deploy Activepieces on Railway

Self-hosted Activepieces: open-source Zapier & n8n alternative, no limits

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-2)

## About

Activepieces is an open-source, AI-first automation platform and a self-hostable alternative to Zapier, Make, and n8n. Build unlimited workflows across 400+ integrations like Slack, Gmail, HubSpot, and OpenAI, add native AI steps, and write custom pieces in TypeScript. This template runs Activepieces with Postgres and Redis, ready in one click, with no per-task fees.

This template deploys three services: the Activepieces app that runs the web UI, API, and flow worker, a PostgreSQL database that stores your flows and credentials, and a Redis instance for the job queue. All secrets, including the encryption key, JWT secret, and database passwords, are generated automatically on deploy, and the app is pre-wired to the database and queue using Railway reference variables. Persistent volumes keep your data across redeploys. After deploying, open the generated domain to create your admin account. If you add a custom domain, update AP_FRONTEND_URL to that domain so webhooks and triggers resolve correctly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| activepieces | `ghcr.io/activepieces/activepieces:0.83.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `AP_JWT_SECRET` | activepieces | (secret) |
| `AP_ENVIRONMENT` | activepieces | prod |
| `AP_EXECUTION_MODE` | activepieces | UNSANDBOXED |
| `AP_REDIS_PASSWORD` | activepieces | (secret) |
| `AP_POSTGRES_PASSWORD` | activepieces | (secret) |
| `AP_POSTGRES_USERNAME` | activepieces | (secret) |
| `AP_TELEMETRY_ENABLED` | activepieces | false |
| `AP_ENGINE_EXECUTABLE_PATH` | activepieces | dist/packages/engine/main.js |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-2)
