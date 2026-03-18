# Deploy kompanion on Railway

Ready made template to make your KOmpanion instance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n9t_1r)

## About

It will ask for admin username and password, and setup railway domain for it. After deployment follow to railway domain and add devices for progress and statistics sync feautres. Detailed description for usage: https://github.com/vanadium23/kompanion?tab=readme-ov-file#usage

Inside you will see a postgresql instance and container done via Docker Hub image: https://hub.docker.com/r/vanadium23/kompanion/

For detailed setup and configuration you can refer to README:
https://github.com/vanadium23/kompanion?tab=readme-ov-file#configuration

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vanadium23/kompanion | `vanadium23/kompanion` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KOMPANION_AUTH_PASSWORD` | vanadium23/kompanion | (secret) | - |
| `KOMPANION_AUTH_USERNAME` | vanadium23/kompanion | (secret) | - |
| `POSTGRES_DB` | Postgres | kompanion | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/n9t_1r)
