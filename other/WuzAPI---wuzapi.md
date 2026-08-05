# Deploy WuzAPI on Railway

RESTful WhatsApp API with multi-device support and concurrent sessions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wuzapi)

## About

WuzAPI is an open-source, lightweight RESTful API service for WhatsApp built with Go and the whatsmeow library. It connects directly to WhatsApp Web WebSocket servers without requiring Puppeteer or headless Chrome, providing a fast and memory-efficient solution for sending messages, managing groups, and handling webhooks across multiple concurrent sessions using PostgreSQL for session data persistence.

Hosting WuzAPI on Railway involves running the Go-based application container connected to a managed PostgreSQL database service. During deployment, Railway automatically links the services and provisions environment variables for database authentication (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`), admin security (`WUZAPI_ADMIN_TOKEN`), and encryption keys. Once deployed, WuzAPI automatically initializes its database schema in PostgreSQL, binds to port 8080, and maintains active WebSocket connections to WhatsApp servers while dispatching real-time event notifications to configured webhook endpoints.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| wuzapi | `asternic/wuzapi:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `TZ` | wuzapi | UTC | - |
| `PORT` | wuzapi | 8080 | - |
| `DB_USER` | wuzapi | (secret) | - |
| `DB_SSLMODE` | wuzapi | disable | - |
| `DB_PASSWORD` | wuzapi | (secret) | - |
| `WUZAPI_ADMIN_TOKEN` | wuzapi | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/wuzapi)
