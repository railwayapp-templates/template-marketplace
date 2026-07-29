# Deploy Penpot on Railway

Open-source design and prototyping platform for collaborative teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/penpot-1)

## About

Penpot is an open-source, web-based design and prototyping platform built around SVG and open standards. It gives product teams collaborative interface design, interactive prototypes, reusable design systems, developer inspection, and self-hosting without tying their workflows to a proprietary desktop format.

[Deploy Penpot on Railway](https://railway.com/deploy/penpot-1) using the published template code `penpot-1`.

Hosting Penpot requires a frontend reverse proxy, a backend that runs migrations and application workers, an exporter for rendered assets, PostgreSQL for durable application data, Valkey for websocket coordination, and persistent object storage for uploaded media. This template pins the Umbrel-tested Penpot 2.17.0 images, PostgreSQL 15, and Valkey 8.1.3. Only the Frontend receives a Railway HTTPS domain; every dependency uses Railway private networking. PostgreSQL and Valkey have persistent volumes, while a private Railway S3-compatible bucket stores Penpot objects because Railway volumes cannot be shared between the frontend and backend services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | `penpotapp/backend:2.17.0` | Worker |
| Postgres | `postgres:15` | Database |
| Exporter | `penpotapp/exporter:2.17.0` | Worker |
| Frontend | `penpotapp/frontend:2.17.0` | Web service |
| Valkey | `valkey/valkey:8.1.3` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PENPOT_FLAGS` | Backend | enable-registration enable-login-with-password disable-email-verification disable-smtp enable-prepl-server |
| `PENPOT_SECRET_KEY` | Backend | (secret) |
| `AWS_SECRET_ACCESS_KEY` | Backend | (secret) |
| `PENPOT_DATABASE_PASSWORD` | Backend | (secret) |
| `PENPOT_DATABASE_USERNAME` | Backend | (secret) |
| `PENPOT_TELEMETRY_ENABLED` | Backend | false |
| `PENPOT_TELEMETRY_REFERER` | Backend | railway |
| `PENPOT_OBJECTS_STORAGE_BACKEND` | Backend | s3 |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | Backend | 367001600 |
| `PENPOT_HTTP_SERVER_MAX_MULTIPART_BODY_SIZE` | Backend | 367001600 |
| `POSTGRES_DB` | Postgres | penpot |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `POSTGRES_INITDB_ARGS` | Postgres | --data-checksums |
| `PENPOT_SECRET_KEY` | Exporter | (secret) |
| `PENPOT_FLAGS` | Frontend | enable-registration enable-login-with-password disable-email-verification disable-smtp enable-prepl-server |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | Frontend | 367001600 |
| `PENPOT_HTTP_SERVER_MAX_MULTIPART_BODY_SIZE` | Frontend | 367001600 |
| `VALKEY_EXTRA_FLAGS` | Valkey | --maxmemory 128mb --maxmemory-policy volatile-lfu --appendonly yes |

## Configuration

- **Healthcheck:** `/readyz`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/penpot-1)
