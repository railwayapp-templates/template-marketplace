# Deploy Evolution API with postgres on Railway

[Jul'26] Secure WhatsApp HTTP REST API with PostgreSQL & storage. 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-with-postgres)

## About

Evolution API with PostgreSQL is a simple, low-cost Evolution API deployment template for Railway. It includes the core services needed to run Evolution API with PostgreSQL and persistent volume storage, giving you a lightweight WhatsApp HTTP REST API backend that is easy to deploy, manage, and scale without complex server configuration.

![Imgur](https://imgur.com/pnKwqOW.png)

Hosting Evolution API with PostgreSQL on Railway gives you a fast way to run Evolution API with the required database service already connected. PostgreSQL stores application data such as instances, messages, contacts, and session-related information. Railway handles the infrastructure layer, including service deployment, networking, environment variables, public domain setup, and persistent storage.

This template is designed for users who want a simpler Evolution API deployment without Redis while still keeping PostgreSQL and persistent storage in place. Once deployed, you can access the API, open the manager, connect WhatsApp instances, and start building automation workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evolution-api | `evoapicloud/evolution-api:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | evolution-api | 8080 | - |
| `DATABASE_PROVIDER` | evolution-api | postgresql | - |
| `CACHE_REDIS_ENABLED` | evolution-api | false | - |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-api-with-postgres)
