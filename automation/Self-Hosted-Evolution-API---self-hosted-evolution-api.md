# Deploy Self-Hosted Evolution API on Railway

[Jun'26] The cheapest self-hosted WhatsApp REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-evolution-api)

## About

Evolution API with PostgreSQL is a lightweight Evolution API deployment template for Railway. It runs Evolution API with PostgreSQL for reliable data persistence, local cache for simpler operation, and no Redis dependency, making it a practical low-cost option for hosting a WhatsApp HTTP REST API backend.

Hosting Evolution API with PostgreSQL on Railway gives you a fast way to run Evolution API with the required database layer already connected. PostgreSQL stores application data such as instances, messages, contacts, sessions, and other API-related records, while local cache keeps the setup simpler by avoiding an additional Redis service.

This template is useful for demos, personal projects, lightweight automation, and small-to-medium WhatsApp API workloads. Railway handles service deployment, networking, environment variables, public domain setup, PostgreSQL provisioning, and optional persistent volume storage.

Compared to a Redis-backed setup, this version keeps the infrastructure lighter and cheaper while still using PostgreSQL as the main database provider required by Evolution API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evolution-api | `evoapicloud/evolution-api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | evolution-api | 8080 | - |
| `DATABASE_PROVIDER` | evolution-api | postgresql | - |
| `CACHE_LOCAL_ENABLED` | evolution-api | true | - |
| `CACHE_REDIS_ENABLED` | evolution-api | false | - |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/self-hosted-evolution-api)
