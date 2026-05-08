# Deploy Flowise with postgres on Railway

Flowise with Postgres, web UI, auth, and persistent file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-with-postgres)

## About

Flowise with Postgres is a low-code AI agent and LLM workflow platform powered by the prebuilt Flowise Docker image and a PostgreSQL database. It provides a drag-and-drop web UI for building AI agents, chatbots, RAG pipelines, and automation workflows, while Postgres stores application data in a more production-ready database layer.

![](https://i.imgur.com/hbOkfpX.png)

Deploying Flowise with Postgres on Railway uses the official Flowise Docker image together with Railway PostgreSQL. Railway runs the Flowise web UI on port `3000`, provisions a Postgres database, handles networking between services, and exposes the application through a public Railway domain or custom domain. Flowise uses Postgres for database-backed application data, while a Railway Volume mounted at `/root/.flowise` keeps local files, API keys, logs, secret files, and uploaded storage available across restarts and redeployments. This setup is better suited for users who want a more durable Flowise deployment than a simple local-file-only setup.

> **Note**
> This template uses the prebuilt Flowise Docker image and Railway PostgreSQL, so deployment is usually faster than building Flowise from the GitHub repository while still providing a more production-ready database setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowiseai | `flowiseai/flowise` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | flowiseai | 3000 | - |
| `LOG_PATH` | flowiseai | /root/.flowise/logs | - |
| `PGSSLMODE` | flowiseai | disable | - |
| `APIKEY_PATH` | flowiseai | /root/.flowise | - |
| `DATABASE_TYPE` | flowiseai | postgres | - |
| `DATABASE_USER` | flowiseai | (secret) | - |
| `SECRETKEY_PATH` | flowiseai | (secret) | - |
| `FLOWISE_PASSWORD` | flowiseai | (secret) | - |
| `FLOWISE_USERNAME` | flowiseai | (secret) | - |
| `BLOB_STORAGE_PATH` | flowiseai | /root/.flowise/storage | - |
| `DATABASE_PASSWORD` | flowiseai | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-with-postgres)
