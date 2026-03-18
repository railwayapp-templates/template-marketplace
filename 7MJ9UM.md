# Deploy PostgreSQL DuckDB on Railway

PostgreSQL database service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7MJ9UM)

## About

# SSL-enabled Postgres DB image with DuckDB support

This repository contains the logic to build SSL-enabled Postgres images with DuckDB support.

By default, when you deploy the pgduckdb template on Railway, the image that is used is built from this repository!

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/template/7MJ9UM)

### Why though?

The official pgduckdb image in Docker hub does not come with SSL baked in.

Since this could pose a problem for applications or services attempting to connect to Postgres services, we decided to roll our own pgduckdb image with SSL enabled right out of the box.

### How does it work?

The Dockerfiles contained in this repository start with the official pgduckdb image as base. Then the `init-ssl.sh` script is copied into the `docker-entrypoint-initdb.d/` directory to be executed upon initialization.

### Certificate expiry

By default, the cert expiry is set to 820 days. You can control this by configuring the `SSL_CERT_DAYS` environment variable as needed.

### Certificate renewal

When a redeploy or restart is done the certificates expiry is checked, if it has expired or will expire in 30 days a new certificate is automatically generated.

### A note about ports

By default, this image is hardcoded to listen on port `5432` regardless of what is set in the `PGPORT` environment variable. We did this to allow connections to the postgres service over the `RAILWAY_TCP_PROXY_PORT`.  If you need to change this behavior, feel free to build your own image without passing the `--port` parameter to the `CMD` command in the Dockerfile.

### Moving from timescaledb to duckdb

If you are moving from timescaledb to duckdb, you will need update the source image of your service and then run the following SQL commands to enable duckdb:

```sql
DROP EXTENSION IF EXISTS timescaledb CASCADE;

ALTER SYSTEM SET shared_preload_libraries = 'pg_duckdb';

CREATE EXTENSION IF NOT EXISTS pg_duckdb;
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DuckDB | `ghcr.io/railwayapp-templates/postgres-duckdb-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/7MJ9UM)
