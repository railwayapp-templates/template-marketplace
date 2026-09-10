# Deploy DBOS Durable Webhooks on Railway

Durable webhook processing with PostgreSQL, retries, and recovery.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dbos-durable-webhooks)

## About

A working Node.js service built with DBOS SDK 4.27.6 accepts authenticated JSON events, schedules durable processing, and stores the workflow result in PostgreSQL. This is an application template, not a standalone DBOS orchestration server.

Verified in an isolated Railway deployment. See the validation scope below for the checks performed and operational limits.

The template defines 2 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `main`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Cold-start initialization was verified in a fresh Railway project. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17@sha256:67f41722b7a8cbdb868a44a4995c846eddfdc2973bccb291ce937dce88ad5675` | Database |
| dbos | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | dbos | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `PORT` | dbos | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `API_KEY` | dbos | (secret) | Generated API authentication key, or a reference to the shared internal API key. Keep private and preserve matching references. |
| `DATABASE_URL` | dbos | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/dbos-durable-webhooks)
