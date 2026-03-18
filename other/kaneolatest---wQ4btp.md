# Deploy kaneo:latest on Railway

An open source project management platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wQ4btp)

## About

An open source project management platform focused on simplicity and efficiency.

### ✨ Features
- 🚀 Simple & Fast: Minimalist interface with powerful features
- 🔒 Self-hosted: Full control over your data
- 🎨 Customizable: Make it yours with extensive customization options
- 🤝 Open Source: MIT licensed, free forever

[GITHUB](https://github.com/kaneo-app/app)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| frontend | `ghcr.io/usekaneo/web:latest` | Web service |
| backend | `ghcr.io/usekaneo/api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | frontend | 5173 | - |
| `KANEO_API_URL` | frontend | - | Backend URL |
| `AUTH_SECRET` | backend | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/wQ4btp)
