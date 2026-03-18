# Deploy Penpot on Railway

Penpot open-source figma like design tool for design and code collaboration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/penpot)

## About

Penpot is an open‑source, web‑based design and prototyping tool that
enables teams to collaborate visually. Built using open standards,
Penpot works entirely in the browser and provides flexibility for both
designers and developers.

Hosting Penpot involves deploying multiple interconnected services that
handle storage, rendering, collaboration, and data persistence. When
hosting on Railway, these services are provisioned through managed
containers and databases, allowing you to run Penpot reliably without
manual infrastructure setup. Deployment requires configuring environment
variables, linking services, and applying the necessary Penpot flags.
With Railway's automated builds and scaling features, keeping your
Penpot instance stable and performant becomes significantly easier.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| exporter | `penpotapp/exporter` | Worker |
| minio | `minio/minio:latest` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| valkey | `valkey/valkey:8.1` | Database |
| frontend | `penpotapp/frontend:latest` | Web service |
| backend | `penpotapp/backend:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | minio | (secret) | - |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | - |
| `MINIO_CONSOLE_ADDRESS` | minio | :1453 | - |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `VALKEY_EXTRA_FLAGS` | valkey | --maxmemory 128mb --maxmemory-policy volatile-lfu | - |
| `PENPOT_FLAGS` | frontend | enable-prepl-server | - |
| `PENPOT_FLAGS` | backend | disable-email-verification enable-prepl-server | - |
| `PENPOT_SMTP_SSL` | backend | - | true or false |
| `PENPOT_SMTP_TLS` | backend | - | true or false |
| `PENPOT_SECRET_KEY` | backend | (secret) | - |
| `PENPOT_SMTP_PASSWORD` | backend | (secret) | - |
| `PENPOT_SMTP_USERNAME` | backend | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | backend | (secret) | - |
| `PENPOT_DATABASE_PASSWORD` | backend | (secret) | - |
| `PENPOT_DATABASE_USERNAME` | backend | (secret) | - |
| `PENPOT_TELEMETRY_ENABLED` | backend | true | - |
| `PENPOT_TELEMETRY_REFERER` | backend | railway | - |
| `PENPOT_ASSETS_STORAGE_BACKEND` | backend | assets-s3 | - |
| `PENPOT_STORAGE_ASSETS_S3_BUCKET` | backend | penpot-assets | - |
| `PENPOT_STORAGE_ASSETS_S3_REGION` | backend | us-east-1 | - |

## Configuration

- **Start command:** `minio server /mnt/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/penpot)
