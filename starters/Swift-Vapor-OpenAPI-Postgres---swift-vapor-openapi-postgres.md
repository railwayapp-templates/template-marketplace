# Deploy Swift + Vapor + OpenAPI + Postgres on Railway

A starter Swift Server using Vapor, OpenAPI, and Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swift-vapor-openapi-postgres)

## About

The Swift Server starter project from the [swift.org tutorial](https://github.com/swiftlang/swift-server-todos-tutorial), which shows how to deploy a Vapor service that uses OpenAPI and Postgres to build a simple TODOs application.

The app uses a Postgres database to store the TODOs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| swift-server-todos-tutorial | [swiftlang/swift-server-todos-tutorial](https://github.com/swiftlang/swift-server-todos-tutorial) (root: Completed) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LOG_LEVEL` | swift-server-todos-tutorial | debug | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Swift, Dockerfile

[View on Railway →](https://railway.com/deploy/swift-vapor-openapi-postgres)
