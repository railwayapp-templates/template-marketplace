# Deploy PostgreSQL 15 on Railway

PostgreSQL 15 database with data persistence and TCP Proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nAqEGK)

## About

## Overview

PostgreSQL version 15 database service, deployed with Railway's official [SSL-enabled image](https://github.com/railwayapp-templates/postgres-ssl).

- A [volume](https://docs.railway.app/reference/volumes) is mounted to the service to persist data between builds.

- [TCP proxying](https://docs.railway.app/deploy/exposing-your-app#tcp-proxying) is configured to allow accessing the database from anywhere.

## How to use

Reference the `DATABASE_URL` variable from your service to connect to the database in your tool of choice (e.g. `${{Postgres.DATABASE_URL}}`)

## Connecting

Connect to the database using the proxied domain and port found on the service settings page. The password can be found on the Variables page.

In a terminal, for example:

```
psql "postgres://railway:PASSWORD@PROXY_DOMAIN:PROXY_PORT/railway"
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres-15 | `ghcr.io/railwayapp-templates/postgres-ssl:15` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nAqEGK)
