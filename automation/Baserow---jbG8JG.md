# Deploy Baserow on Railway

Open-source no-code database, app builder & Airtable alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jbG8JG)

## About

Baserow is an open-source, no-code database and application builder that enables users to create and manage databases, internal tools, forms, dashboards, and workflows without traditional coding. It serves as a flexible, self-hosted alternative to platforms like Airtable.

Hosting Baserow on Railway provides a powerful and flexible database platform that combines the simplicity of a spreadsheet with the capabilities of a relational database. With Baserow, you can define custom data structures, establish relationships between tables, create forms and views, build internal tools, and collaborate with your team.

This template uses the official `baserow/baserow` Docker image with PostgreSQL and Redis as separate services. A persistent volume is attached to Baserow at `/baserow/data` to preserve application data and uploaded files.

Railway simplifies the deployment process by providing managed infrastructure, private networking, persistent volumes, HTTPS, environment variable management, and easy service configuration and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Baserow | `baserow/baserow:2.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_MAXMEMORY` | Redis | 256mb | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `REDIS_MAXMEMORY_POLICY` | Redis | allkeys-lru | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET_KEY` | Baserow | (secret) | - |
| `BASEROW_BACKEND_DEBUG` | Baserow | false | - |
| `BASEROW_AMOUNT_OF_WORKERS` | Baserow | 1 | - |
| `BASEROW_BACKEND_LOG_LEVEL` | Baserow | INFO | - |
| `BASEROW_AMOUNT_OF_GUNICORN_WORKERS` | Baserow | 2 | - |
| `BASEROW_TRIGGER_SYNC_TEMPLATES_AFTER_MIGRATION` | Baserow | false | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/baserow/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/jbG8JG)
