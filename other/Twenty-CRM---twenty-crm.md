# Deploy Twenty CRM on Railway

Self-hosted open-source CRM. Own your customer data, no per-seat fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm)

## About

Twenty is a modern, open-source CRM and a self-hostable alternative to Salesforce and HubSpot. Manage contacts, companies, deals, and pipelines with a fast, customizable interface — and keep all your customer data on your own infrastructure with no per-seat fees. This template runs the Twenty server and worker with Postgres and Redis, ready in one click.

This template deploys four services: the Twenty server (web UI + GraphQL API), a background worker for async jobs, a PostgreSQL database for your CRM data, and a Redis instance for the job queue. The encryption key is generated automatically on deploy and shared between the server and worker, and all services are wired together with Railway reference variables. A persistent volume stores uploaded files. After deploying, open the generated domain and create your admin account. If you add a custom domain, update SERVER_URL to that domain so links and webhooks resolve correctly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| twenty | `twentycrm/twenty:latest` | Web service |
| twenty Copy | `twentycrm/twenty:latest` | Database |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NODE_PORT` | twenty | 3000 |
| `STORAGE_TYPE` | twenty | local |
| `STORAGE_TYPE` | twenty Copy | local |
| `DISABLE_DB_MIGRATIONS` | twenty Copy | true |
| `DISABLE_CRON_JOBS_REGISTRATION` | twenty Copy | true |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/packages/twenty-server/.local-storage`
- **Start command:** `yarn worker:prod`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/twenty-crm)
