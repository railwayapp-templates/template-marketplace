# Deploy drizzle-pg-proxy on Railway

Postgres DB with Drizzle HTTP Proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/yvPIKJ)

## About

This template deploys 2 services:

1. Postgresql Database
2. Drizzle HTTP Proxy Service

The Proxy Service is a node docker container running [hono](https://hono.dev/) app which exposes a `/query` endpoint that [drizzle](https://orm.drizzle.team/) can use to execute queries over http.

Github Repo: [nmajor/drizzle-pg-proxy](https://github.com/nmajor/drizzle-pg-proxy)
Docker Image: [nmajor/drizzle-pg-proxy](https://hub.docker.com/r/nmajor/drizzle-pg-proxy)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nmajor/drizzle-pg-proxy | `nmajor/drizzle-pg-proxy` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | nmajor/drizzle-pg-proxy | 3030 | - |
| `APP_SECRET` | nmajor/drizzle-pg-proxy | (secret) | Secret used for JWT validation |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/yvPIKJ)
