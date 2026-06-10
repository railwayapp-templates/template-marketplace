# Deploy swift-cool on Railway

Deploy and Host swift-cool EVO TESTING

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swift-cool)

## About

Evolution API is an open-source WhatsApp REST API built on Baileys. 
Connect any WhatsApp account via HTTP endpoints without Meta's Business 
API approval. Send messages, manage groups, receive webhooks, and 
automate workflows through a simple REST interface.

Hosting Evolution API requires three core services: a PostgreSQL database 
for persistence of instances, messages, contacts and chats; Redis for cache 
and session management; and a persistent volume mounted at 
/evolution/instances for WhatsApp authentication data. The API listens on 
port 8080 and exposes REST endpoints for instance creation, QR code 
connection, messaging, and webhook configuration. Railway provisions all 
services and handles networking, SSL, and scaling automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evoapicloud/evolution-api:latest | `evoapicloud/evolution-api:latest` | Worker |
| redis:latest | `redis:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | evoapicloud/evolution-api:latest | 8080 | - |
| `DATABASE_PROVIDER` | evoapicloud/evolution-api:latest | postgresql | - |
| `CACHE_REDIS_ENABLED` | evoapicloud/evolution-api:latest | true | - |
| `AUTHENTICATION_API_KEY` | evoapicloud/evolution-api:latest | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/swift-cool)
