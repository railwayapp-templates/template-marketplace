# Deploy Flagsmith on Railway

Feature Flags and Remote Config

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/36mGw8)

## About

Flagsmith lets you manage features across web, mobile and server side applications. Release features with confidence; manage feature flags across web, mobile, and server side applications. 

Flagsmith provides an all-in-one platform for developing, implementing, and managing your feature flags. Whether you are moving off an in-house solution or using toggles for the first time, you will be amazed by the power and efficiency gained by using Flagsmith.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Flagsmith | `flagsmith/flagsmith:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Flagsmith | 8000 | - |
| `GUNICORN_THREADS` | Flagsmith | 1 | - |
| `GUNICORN_WORKERS` | Flagsmith | 1 | - |
| `DJANGO_ALLOWED_HOSTS` | Flagsmith | * | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`

**Category:** Other

[View on Railway →](https://railway.com/template/36mGw8)
