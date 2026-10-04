# Deploy taskview on Railway

Self-hosted task management with Kanban, analytics, and integrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/taskview)

## About

TaskView is a self-hosted project and task management platform for teams that need clear ownership and flexible workflows. It combines projects, tasks, Kanban boards, dependency graphs, analytics, role-based collaboration, developer integrations, webhooks, and AI/MCP connectivity while keeping application data in a PostgreSQL database you control.

Railway runs TaskView as Docker image services for the web UI, API, database migration, and PostgreSQL. The web and API services use Railway domains, while API and migration services connect to PostgreSQL over Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| api | `gimanhead/taskview-ce-api-server:1.55.0` | Web service |
| web | `gimanhead/taskview-ce-webapp:1.55.0` | Web service |
| migration | `gimanhead/taskview-ce-db-migration:1.55.0` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | api | 1401 |
| `DB_PORT` | api | 5432 |
| `DB_USER` | api | (secret) |
| `JWT_ALG` | api | HS256 |
| `APP_PORT` | api | 1401 |
| `NODE_ENV` | api | production |
| `DB_PASSWORD` | api | (secret) |
| `DB_POOL_MAX` | api | 10 |
| `PM2_INSTANCES` | api | 1 |
| `ACCESS_LIFE_TIME` | api | 1d |
| `DEFAULT_PASSWORD` | api | (secret) |
| `DEFAULT_USERNAME` | api | (secret) |
| `REFRESH_LIFE_TIME` | api | 2d |
| `AUTH_LOGIN_METHODS` | api | (secret) |
| `INVITE_EMAIL_ENABLED` | api | false |
| `ALLOW_PUBLIC_REGISTRATION` | api | false |
| `WEBHOOKS_ALLOW_PRIVATE_URLS` | api | false |
| `PASSWORD_CHANGE_CONFIRMATION` | api | (secret) |
| `CORS_REMOVE_DEFAULT_ALLOWED_ORIGINS` | api | true |
| `PORT` | web | 80 |
| `DB_PORT` | migration | 5432 |
| `DB_USER` | migration | (secret) |
| `DB_PASSWORD` | migration | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/taskview)
