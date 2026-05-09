# Deploy crikket on Railway

Deploy and Host crikket with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crikket)

## About

Hosting crikket requires deploying multiple interconnected services: a frontend web application, backend API server, PostgreSQL database, and object storage for uploads and media assets. The platform is distributed as containerized services, making it well-suited for modern infrastructure platforms like Railway.

On Railway, crikket can be deployed using separate services for the web app and API server while leveraging Railway-managed PostgreSQL and external S3-compatible storage such as Cloudflare R2. Railway simplifies networking, environment variable management, HTTPS provisioning, scaling, and service orchestration so you can focus on running your creator platform instead of managing infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Crikket Web | `ghcr.io/redpangilinan/crikket-web:latest` | Web service |
| Crikket Server | `ghcr.io/redpangilinan/crikket-server:latest` | Web service |
| Crikket Migrate | `ghcr.io/redpangilinan/crikket-server:latest` | Worker |
| Crikket Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` | Crikket Web | false | - |
| `STORAGE_BUCKET` | Crikket Server | crikket | - |
| `ENABLE_PAYMENTS` | Crikket Server | false | - |
| `BETTER_AUTH_SECRET` | Crikket Server | (secret) | - |
| `STORAGE_ADDRESSING_STYLE` | Crikket Server | path | - |
| `STORAGE_SECRET_ACCESS_KEY` | Crikket Server | (secret) | - |
| `POSTGRES_DB` | Crikket Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Crikket Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Crikket Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Crikket Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Crikket Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bun run --filter @crikket/db db:migrate`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/crikket)
