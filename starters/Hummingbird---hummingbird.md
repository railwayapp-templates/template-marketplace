# Deploy Hummingbird on Railway

Deploy and Host Hummingbird with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hummingbird)

## About

Hummingbird is a lightweight, high-performance Swift web framework for building APIs and web applications. It's designed for speed and simplicity, offering excellent performance with Swift's type safety and modern async/await support. Perfect for developers who want to use Swift for server-side development with minimal overhead.

Hosting Hummingbird means running Swift applications on servers with optimal performance and resource efficiency. You need to compile Swift code, configure database connections, and handle HTTP requests. Hummingbird apps are exceptionally fast due to their lightweight architecture and Swift's native compilation, but they require proper environment setup for databases and dependencies. Railway simplifies this by automatically handling server configuration, database provisioning, and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Server | [dangdennis/railway-hummingbird](https://github.com/dangdennis/railway-hummingbird) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE_PASSWORD` | Server | (secret) | - |
| `DATABASE_USERNAME` | Server | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Swift, Dockerfile

[View on Railway →](https://railway.com/deploy/hummingbird)
