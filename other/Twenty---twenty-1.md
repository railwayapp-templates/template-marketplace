# Deploy Twenty on Railway

Modern open-source CRM for contacts, pipelines, workflows, and teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-1)

## About

Twenty is a modern open-source CRM for managing contacts, companies, opportunities, pipelines, tasks, notes, dashboards, and automated workflows. Its adaptable data model, table and Kanban views, APIs, and team collaboration features let organizations shape customer operations around their own processes while retaining control of their data.

Hosting Twenty requires a public application server, a private background worker, PostgreSQL, Redis, and durable storage for both relational data and uploaded files. This Railway template pins Twenty 2.23.2, PostgreSQL 16.8, and Redis 7.4.2. The server runs database setup and upgrades, registers recurring jobs, serves the UI on port `3000`, and exposes `/healthz`; the worker runs `yarn worker:prod` without repeating migrations or cron registration. Railway supplies private networking, HTTPS, a shared S3-compatible bucket, persistent database/cache volumes, and generated database and application secrets. Email, calendar, and OAuth integrations remain optional and are configured by each deployer after setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Twenty | `twentycrm/twenty:v2.23.2` | Web service |
| Twenty Worker | `twentycrm/twenty:v2.23.2` | Worker |
| Redis | `redis:7.4.2` | Database |
| Postgres | `postgres:16.8` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Twenty | 3000 |
| `NODE_PORT` | Twenty | 3000 |
| `APP_SECRET` | Twenty | (secret) |
| `STORAGE_TYPE` | Twenty | S_3 |
| `DISABLE_DB_MIGRATIONS` | Twenty | false |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty | false |
| `APP_SECRET` | Twenty Worker | (secret) |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true |
| `POSTGRES_DB` | Postgres | default |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `yarn worker:prod`
- **Start command:** `redis-server --maxmemory-policy noeviction`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/twenty-1)
