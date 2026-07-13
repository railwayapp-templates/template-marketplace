# Deploy hoppscotch on Railway

Hoppscotch — self-hosted API development platform for testing APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hoppscotch)

## About

Deploy Hoppscotch on Railway in one click. This template provisions a container running the Hoppscotch all-in-one image (Caddy reverse proxy, NestJS backend, and webapp frontend) with an attached PostgreSQL database. SSL is handled automatically by Railway.

This template runs Hoppscotch v2026.5.0 inside a single Railway container with three internal services:

- **Caddy** serves the frontend SPA on port 3000, admin dashboard on port 3100, and reverse-proxies API requests to the backend on port 3170
- **NestJS Backend** provides REST + GraphQL APIs on port 8080 (internal)
- **Webapp Server** serves the built frontend assets

PostgreSQL is provisioned as a Railway plugin — no manual database setup required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16-alpine` | Database |
| hoppscotch | [INAPP-Mobile/railway-hoppscotch](https://github.com/INAPP-Mobile/railway-hoppscotch) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | hoppscotch | Default database |
| `POSTGRES_USER` | Postgres | (secret) | Superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | hoppscotch | 3000 | Public port Caddy listens on. Railway exposes this. The backend uses 8080 internally via the entrypoint (export PORT=8080). |
| `SECRET_KEY` | hoppscotch | (secret) | Secret key for signing JWT tokens. Auto-generated. |
| `INFRA_TOKEN` | hoppscotch | (secret) | Secret token for admin dashboard API access. Auto-generated. |
| `DATABASE_URL` | hoppscotch | postgresql://postgres:hoppscotch2026@postgres.railway.internal:5432/hoppscotch | PostgreSQL connection string. Connected to the postgres sibling service. |
| `VITE_BASE_URL` | hoppscotch | - | Public URL of your deployment (e.g., https://your-app.up.railway.app). Required for cookies and callbacks. |
| `VITE_ADMIN_URL` | hoppscotch | - | Admin URL for subpath access. |
| `MAILER_SMTP_URL` | hoppscotch | smtp://user:pass@smtp.example.com:587 | SMTP connection URL for email sending. REQUIRED for admin onboarding to succeed — replace with your real SMTP after deploy. Empty value causes backend to exit immediately. |
| `DATA_ENCRYPTION_KEY` | hoppscotch | - | Encryption key for sensitive data stored in the database (32 characters). Auto-generated. |
| `VITE_BACKEND_WS_URL` | hoppscotch | - | Backend Websocket URL for subpath access. |
| `WHITELISTED_ORIGINS` | hoppscotch | - | Comma-separated allowed CORS origins. Include your Railway public URL. |
| `VITE_BACKEND_API_URL` | hoppscotch | - | Backend API URL for subpath access. |
| `VITE_BACKEND_GQL_URL` | hoppscotch | - | Backend GraphQL URL for subpath access. |
| `HOPP_AIO_ALTERNATE_PORT` | hoppscotch | 3000 | Port Caddy uses to serve the app frontend. MUST be 3000. |
| `ENABLE_SUBPATH_BASED_ACCESS` | hoppscotch | true | Serves frontend, admin, and backend API on a single port via subpaths (required for Railway proxy). |
| `VITE_ALLOWED_AUTH_PROVIDERS` | hoppscotch | EMAIL,GOOGLE,GITHUB,MICROSOFT | Comma-separated list of enabled auth providers. Required for admin sign-up. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hoppscotch)
