# Deploy Ever Gauzy on Railway

The open business management platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ever-gauzy)

## About

Ever Gauzy is an open-source business management platform that integrates ERP, CRM, and HRM functionalities. It enables organizations to manage human resources, customer relationships, projects, sales, accounting, inventory, and more within a unified, scalable system.

Hosting Ever Gauzy involves setting up both its backend (API) and frontend (UI) components, alongside a PostgreSQL database. These backend and frontend components must be connected together for the Ever Gauzy service to work as intended. Hosting Ever Gauzy allows multiple clients to access the platform via browser, desktop, or mobile apps. Railway simplifies this setup for you down to one click to get your instance up and running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | `ghcr.io/ever-co/gauzy-api` | Web service |
| Webapp | `ghcr.io/ever-co/gauzy-webapp` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_USER` | API | (secret) |
| `API_HOST` | API | 0.0.0.0 |
| `API_PORT` | API | 3000 |
| `NODE_ENV` | API | production |
| `IS_DOCKER` | API | true |
| `JWT_SECRET` | API | (secret) |
| `EXPRESS_SESSION_SECRET` | API | (secret) |
| `JWT_REFRESH_TOKEN_SECRET` | API | (secret) |
| `JWT_VERIFICATION_TOKEN_SECRET` | API | (secret) |
| `DB_USER` | Webapp | (secret) |
| `APP_NAME` | Webapp | Gauzy |
| `NODE_ENV` | Webapp | production |
| `WEB_HOST` | Webapp | 0.0.0.0 |
| `WEB_PORT` | Webapp | 4200 |
| `IS_DOCKER` | Webapp | true |
| `JWT_SECRET` | Webapp | (secret) |
| `APP_SIGNATURE` | Webapp | Gauzy |
| `EXPRESS_SESSION_SECRET` | Webapp | (secret) |
| `JWT_REFRESH_TOKEN_SECRET` | Webapp | (secret) |
| `JWT_VERIFICATION_TOKEN_SECRET` | Webapp | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/ever-gauzy)
