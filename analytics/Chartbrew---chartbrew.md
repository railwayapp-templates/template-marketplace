# Deploy Chartbrew on Railway

Build and share live dashboards from APIs, SQL, and NoSQL data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chartbrew)

## About

Chartbrew is a reporting platform for building and sharing live dashboards from APIs, SQL, and NoSQL databases. Connect data sources, design charts and dashboards, schedule refreshes, and share insights with your team or embed charts in other products.

This template deploys Chartbrew as a multi-service stack on Railway. Chartbrew runs in a single container with two endpoints: a **client UI** on port `4018` and an **API server** on port `4019`. Because Railway exposes one public port per domain, this template uses a **Second Port** proxy service to give the API its own public URL while the main Chartbrew domain serves the UI.

The stack includes **PostgreSQL** for data storage, **Redis** for queues and caching, and **Second Port** (Caddy) to forward public HTTPS traffic to the API over Railway's private network. On startup, Chartbrew migrates the database schema automatically. The API must bind to **`::`** and both Postgres and Redis must be reachable before the server logs `Running server on port 4019`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Chartbrew | `razvanilin/chartbrew:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Chartbrew Backend Proxy | [douglasrubims/railway-second-port](https://github.com/douglasrubims/railway-second-port) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Chartbrew | 4019 | - |
| `CB_DB_HOST` | Chartbrew | - | This is the host for the database |
| `CB_DB_NAME` | Chartbrew | - | This is the name of the database |
| `CB_DB_PORT` | Chartbrew | - | This is the port for the database |
| `CB_API_HOST` | Chartbrew | :: | This is the host for the API |
| `CB_API_PORT` | Chartbrew | - | This is the port for the API |
| `CB_DB_DIALECT` | Chartbrew | postgres | This is the dialect for the database (mysql or postgres) |
| `CB_REDIS_HOST` | Chartbrew | - | This is the host for the Redis |
| `CB_REDIS_PORT` | Chartbrew | - | This is the port for the Redis |
| `CB_DB_PASSWORD` | Chartbrew | (secret) | This is the password for the database |
| `CB_DB_USERNAME` | Chartbrew | (secret) | This is the username for the database |
| `CB_ENCRYPTION_KEY` | Chartbrew | - | This is a 32 bytes key for encryption |
| `CB_REDIS_PASSWORD` | Chartbrew | (secret) | This is the password for the Redis |
| `VITE_APP_API_HOST` | Chartbrew | - | This is the host for the API |
| `VITE_APP_CLIENT_HOST` | Chartbrew | - | This is the host for the client |
| `VITE_APP_CLIENT_PORT` | Chartbrew | 4018 | This is the port for the client |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `TARGET_PORT` | Chartbrew Backend Proxy | 4019 | - |
| `TARGET_DOMAIN` | Chartbrew Backend Proxy | chartbrew.railway.internal | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/chartbrew)
