# Deploy NocoDB on Railway

The Open Source Airtable Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/opu-NU)

## About

NocoDB is the Open Source Airtable Alternative. NocoDB turns any MySQL, PostgreSQL, SQL Server, SQLite & MariaDB into a smart spreadsheet. Create endless solutions, collaborate just like spreadsheets, automate business workflows and create headless APIs.

Hosting NocoDB means running a no-code database platform that transforms relational databases into spreadsheet interfaces for team collaboration. The application connects to database backends, manages user authentication, handles API generation, and coordinates real-time collaboration features. Production deployment requires configuring database connections, managing environment variables for integrations, setting up Redis for caching, and handling file storage for attachments. Railway streamlines the deployment by providing PostgreSQL and Redis services, managing environment variable configuration, and handling the application server hosting with automatic database connectivity.

![NocoDB Logo](https://avatars.githubusercontent.com/u/50206778)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis:8.2` | Database |
| NocoDB | `nocodb/nocodb` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `NC_DB` | NocoDB | - | Postgres Database URL - You likely don't need to change this! |
| `NC_REDIS_URL` | NocoDB | - | Redis URL - You likely don't need to change this! |
| `NC_PUBLIC_URL` | NocoDB | - | Public NocoDB URL |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | JWT secret used for auth and storing other secrets |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | NocoDB | true | Proper private networking for Alpine based images |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data/`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/opu-NU)
