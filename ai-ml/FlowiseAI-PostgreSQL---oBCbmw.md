# Deploy FlowiseAI + PostgreSQL on Railway

FlowiseAI + PostgreSQL Database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oBCbmw)

## About

This template integrates FlowiseAI with a PostgreSQL database.

All necessary variables are already pre-filled to help you get started instantly.

### Steps to get started:

1. Fill in values for these two variables for FlowiseAI:
  * `FLOWISE_USERNAME`
  * `FLOWISE_PASSWORD`
2. Deploy

Video Guide: https://youtu.be/FQSqDQi9FOA

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flowise | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Flowise | 8080 | - |
| `LOG_PATH` | Flowise | /opt/railway/.flowise/logs | - |
| `API_KEY_PATH` | Flowise | (secret) | - |
| `DATABASE_TYPE` | Flowise | postgres | - |
| `DATABASE_USER` | Flowise | (secret) | - |
| `SECRETKEY_PATH` | Flowise | (secret) | - |
| `FLOWISE_PASSWORD` | Flowise | (secret) | - |
| `FLOWISE_USERNAME` | Flowise | (secret) | - |
| `BLOB_STORAGE_PATH` | Flowise | /opt/railway/.flowise/storage | - |
| `DATABASE_PASSWORD` | Flowise | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/railway/.flowise`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, SCSS, HTML, Dockerfile, Shell, Batchfile

[View on Railway →](https://railway.com/deploy/oBCbmw)
