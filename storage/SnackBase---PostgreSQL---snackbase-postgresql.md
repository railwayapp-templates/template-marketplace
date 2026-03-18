# Deploy SnackBase - PostgreSQL on Railway

A template to spin SnackBase instance with PostgreSQL db

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/snackbase-postgresql)

## About

SnackBase is an open-source Backend-as-a-Service (BaaS) built with FastAPI, providing auto-generated REST APIs, multi-tenancy, and row-level security. This template couples SnackBase with a managed PostgreSQL database, offering a production-ready alternative to Supabase and PocketBase. With features like enterprise OAuth/SAML, GxP-compliant audit logging, and a powerful React admin UI, SnackBase handles your backend infrastructure so you can focus on building your product.

Hosting SnackBase with PostgreSQL on Railway provides a robust, scalable infrastructure for production-grade applications. This setup replaces the local SQLite database with a dedicated PostgreSQL service, enabling higher concurrency, better performance for large datasets, and simplified vertical scaling. SnackBase automatically manages your schema and migrations using Alembic, while Railway handles the database provisioning and connection orchestration. This template is designed for high-availability environments where data integrity, relational performance, and enterprise-grade security are paramount. The integrated admin UI allows for live management of collections and users, with all data securely persisted in your managed PostgreSQL instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| SnackBase | [lalitgehani/SnackBase](https://github.com/lalitgehani/SnackBase) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SNACKBASE_HOST` | SnackBase | 0.0.0.0 | - |
| `SNACKBASE_PORT` | SnackBase | 8000 | - |
| `SNACKBASE_DEBUG` | SnackBase | false | - |
| `SNACKBASE_IS_DEMO` | SnackBase | true | - |
| `SNACKBASE_LOG_LEVEL` | SnackBase | INFO | - |
| `SNACKBASE_LOG_FORMAT` | SnackBase | json | - |
| `SNACKBASE_SECRET_KEY` | SnackBase | (secret) | - |
| `SNACKBASE_ENVIRONMENT` | SnackBase | development | - |
| `SNACKBASE_CORS_ORIGINS` | SnackBase | ["https://demo.snackbase.dev"] | - |
| `SNACKBASE_EXTERNAL_URL` | SnackBase | http://localhost:8000 | - |
| `SNACKBASE_STORAGE_PATH` | SnackBase | ./sb_data/files | - |
| `SNACKBASE_MAX_FILE_SIZE` | SnackBase | 10485760 | - |
| `SNACKBASE_ENCRYPTION_KEY` | SnackBase | change-me-in-production-use-openssl-rand-hex-32 | - |
| `SNACKBASE_SUPERADMIN_EMAIL` | SnackBase | admin@admin.com | - |
| `SNACKBASE_SUPERADMIN_PASSWORD` | SnackBase | (secret) | - |
| `SNACKBASE_REFRESH_TOKEN_EXPIRE_DAYS` | SnackBase | (secret) | - |
| `SNACKBASE_ACCESS_TOKEN_EXPIRE_MINUTES` | SnackBase | (secret) | - |
| `SNACKBASE_PERMISSION_CACHE_TTL_SECONDS` | SnackBase | 300 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `uv run uvicorn snackbase.infrastructure.api.app:app --host 0.0.0.0 --port 8000`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/sb_data`

**Category:** Storage · **Languages:** Python, TypeScript, HTML, CSS, Dockerfile, Mako, JavaScript

[View on Railway →](https://railway.com/deploy/snackbase-postgresql)
