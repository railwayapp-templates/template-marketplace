# Deploy Vapor on Railway

Deploy and Host Vapor with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vapor-1)

## About

Vapor is a Swift web framework for building APIs and web apps. It's fast, type-safe, and lets you use Swift for server-side development with built-in database support and templating. [Click here](https://www.swift.org/get-started/cloud-services/) for more Swift on Server.

Hosting Vapor means running Swift apps on servers. You need to compile Swift code, set up databases, and handle requests. Vapor apps are fast because they compile to native code, but they need the right environment to run. Railway makes this easy by handling the server setup, database connections, and scaling automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Server | [dangdennis/railway-vapor](https://github.com/dangdennis/railway-vapor) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_PASSWORD` | Server | (secret) | - |
| `DATABASE_USERNAME` | Server | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Swift, Dockerfile

[View on Railway →](https://railway.com/template/vapor-1)
