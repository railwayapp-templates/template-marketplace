# Deploy Twenty on Railway

Modern self-hosted open-source CRM for sales, workflows & customer data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty)

## About

**Twenty** is the #1 open-source CRM and a modern, flexible alternative to Salesforce. Designed for technical teams and growing businesses, Twenty provides customizable data models, powerful visual workflows, AI capabilities, beautiful dashboards, and deep extensibility — all while giving you full control over your data and infrastructure.

Hosting Twenty on Railway provides a complete, production-ready self-hosted CRM stack that can be deployed in **one click**. 

This template automatically provisions:

- **Server** (`twentycrm/twenty:latest`) — The main application serving the web UI, API, authentication, and business logic.
- **Worker** (`twentycrm/twenty:latest`) — Dedicated background processor for workflows, emails, cron jobs, and long-running tasks.
- **Postgres** — Primary relational database with persistent storage for companies, contacts, opportunities, custom objects, and all CRM data.
- **Redis** — In-memory cache and queue system powering real-time features and background jobs.
- **Railway Bucket** — Managed S3-compatible object storage provided directly by Railway for handling file uploads, attachments, images, and documents.

The template is intentionally designed to be **extremely simple to deploy**. Because it uses native **Railway Bucket**, the required S3 credentials (`ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `ENDPOINT`, `BUCKET`, `REGION`) are automatically provided through Railway Variable References. 

In most cases, **you don't need to manually configure anything** for the bucket — the references are pre-wired in the template. All other services use secure, production-ready defaults with healthchecks, persistent volumes, and correct inter-service networking already configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Server | `twentycrm/twenty:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Worker | `twentycrm/twenty:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_PORT` | Server | 3000 | - |
| `APP_SECRET` | Server | (secret) | - |
| `STORAGE_TYPE` | Server | S_3 | - |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Server | (secret) | - |
| `IS_CONFIG_VARIABLES_IN_DB_ENABLED` | Server | false | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APP_SECRET` | Worker | (secret) | - |
| `STORAGE_TYPE` | Worker | S_3 | - |
| `DISABLE_DB_MIGRATIONS` | Worker | true | - |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Worker | (secret) | - |
| `DISABLE_CRON_JOBS_REGISTRATION` | Worker | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/twenty)
