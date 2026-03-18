# Deploy SnackBase - SQLite on Railway

A template to spin SnackBase instance with SQLite db

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/snackbase-sqlite)

## About

SnackBase is an open-source Backend-as-a-Service (BaaS) built with FastAPI, providing auto-generated REST APIs, multi-tenancy, and row-level security. It serves as a lightweight, self-hosted alternative to PocketBase and Supabase. Features include a comprehensive React admin UI, JWT authentication, enterprise OAuth/SAML, and GxP-compliant audit logging, making it perfect for secure, modern application development.

Hosting SnackBase with SQLite on Railway involves deploying a containerized FastAPI application with a persistent volume to store the database file. This setup is ideal for prototypes, internal tools, and small-to-medium applications where simplicity and low overhead are prioritized. SnackBase leverages SQLite's efficiency while providing enterprise features like RBAC and audit trails. The deployment process is fully automated via Railway, which handles the container build, environment variable management, and automatic SSL termination. By using Railway's persistent volumes, your data remains secure across deployments. The integrated React dashboard allows for seamless management of collections, users, and real-time subscriptions directly from your browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SnackBase | [lalitgehani/SnackBase](https://github.com/lalitgehani/SnackBase) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SNACKBASE_HOST` | 0.0.0.0 |
| `SNACKBASE_PORT` | 8000 |
| `SNACKBASE_DEBUG` | false |
| `SNACKBASE_IS_DEMO` | true |
| `SNACKBASE_LOG_LEVEL` | INFO |
| `SNACKBASE_LOG_FORMAT` | json |
| `SNACKBASE_SECRET_KEY` | (secret) |
| `SNACKBASE_ENVIRONMENT` | development |
| `SNACKBASE_CORS_ORIGINS` | ["https://demo.snackbase.dev"] |
| `SNACKBASE_DATABASE_URL` | sqlite+aiosqlite:///./sb_data/snackbase.db |
| `SNACKBASE_EXTERNAL_URL` | http://localhost:8000 |
| `SNACKBASE_STORAGE_PATH` | ./sb_data/files |
| `SNACKBASE_MAX_FILE_SIZE` | 10485760 |
| `SNACKBASE_ENCRYPTION_KEY` | change-me-in-production-use-openssl-rand-hex-32 |
| `SNACKBASE_SUPERADMIN_EMAIL` | admin@admin.com |
| `SNACKBASE_SUPERADMIN_PASSWORD` | (secret) |
| `SNACKBASE_REFRESH_TOKEN_EXPIRE_DAYS` | (secret) |
| `SNACKBASE_ACCESS_TOKEN_EXPIRE_MINUTES` | (secret) |
| `SNACKBASE_PERMISSION_CACHE_TTL_SECONDS` | 300 |

## Configuration

- **Start command:** `uv run uvicorn snackbase.infrastructure.api.app:app --host 0.0.0.0 --port 8000`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/sb_data`

**Category:** Storage · **Languages:** Python, TypeScript, HTML, CSS, Dockerfile, Mako, JavaScript

[View on Railway →](https://railway.com/template/snackbase-sqlite)
