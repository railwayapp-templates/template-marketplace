# Deploy NocoDB on Railway

The Open Source Airtable Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opu-NU)

## About

NocoDB is the Open Source Airtable Alternative. NocoDB turns any MySQL, PostgreSQL, SQL Server, SQLite & MariaDB into a smart spreadsheet. Create endless solutions, collaborate just like spreadsheets, automate business workflows and create headless APIs.

Hosting NocoDB means running a no-code database platform that transforms relational databases into spreadsheet interfaces for team collaboration. The application connects to database backends, manages user authentication, handles API generation, and coordinates real-time collaboration features. Production deployment requires configuring database connections, managing environment variables for integrations, setting up Redis for caching, and handling file storage for attachments. Railway streamlines the deployment by providing PostgreSQL and Redis services, managing environment variable configuration, and handling the application server hosting with automatic database connectivity.

![NocoDB Logo](https://avatars.githubusercontent.com/u/50206778)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| NocoDB | `nocodb/nocodb:2026.07.0` | Web service |
| NocoDB Worker | `nocodb/nocodb:2026.07.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `NC_DB` | NocoDB | - | Postgres Database URL - You likely don't need to change this! |
| `NC_SITE_URL` | NocoDB | - | Public NocoDB URL |
| `NC_REDIS_URL` | NocoDB | - | Redis URL - You likely don't need to change this! |
| `NC_DISABLE_MUX` | NocoDB | true | Disable mux (Appears unused). |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | JWT secret used for auth and storing other secrets |
| `NC_DB` | NocoDB Worker | - | Postgres Database URL - You likely don't need to change this! |
| `NC_SITE_URL` | NocoDB Worker | - | Public NocoDB URL |
| `NC_REDIS_URL` | NocoDB Worker | - | Redis URL - You likely don't need to change this! |
| `NC_DISABLE_MUX` | NocoDB Worker | - | Disable mux (Appears unused). |
| `NC_AUTH_JWT_SECRET` | NocoDB Worker | (secret) | JWT secret used for auth and storing other secrets |
| `NC_WORKER_CONTAINER` | NocoDB Worker | true | This container is a worker. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data/`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/opu-NU)
