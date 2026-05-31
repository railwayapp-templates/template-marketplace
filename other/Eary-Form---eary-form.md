# Deploy Eary Form on Railway

Self-hosted, privacy contact form with CAPTCHA anti-spam, admin dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eary-form)

## About

Eary Form is designed to run on Railway. It uses PostgreSQL for data storage, Cap CAPTCHA for spam protection, and Valkey for rate limiting — all available as Railway plugins. The FastAPI backend is automatically built with Nixpacks and requires zero configuration beyond setting your admin password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cap | `tiago2/cap:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Valkey | `valkey/valkey:8-alpine` | Database |
| Form API | [INAPP-Mobile/railway-form-template](https://github.com/INAPP-Mobile/railway-form-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `ADMIN_PASSWORD` | Form API | (secret) |
| `CAP_SECRET_KEY` | Form API | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT --proxy-headers`

**Category:** Other · **Languages:** TypeScript, Python, HTML, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/eary-form)
