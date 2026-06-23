# Deploy Planka v2.0.3 on Railway

PLANKA is a self-hosted Kanban board for agile project management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/planka-v203-1)

## About

Planka is an elegant, open-source project management and kanban board application. Built with React and Node.js, it provides teams with a lightweight alternative to Trello for organizing tasks, managing workflows, and collaborating in real-time with a clean, intuitive interface.

Deploying Planka on Railway simplifies project management infrastructure for teams of any size. Railway handles database provisioning, scaling, and SSL certificates automatically. Planka includes real-time collaboration, customizable boards, user management, and dark mode support. Your team gets a Trello-like experience without vendor lock-in or subscription costs. Railway's integrated PostgreSQL database ensures data persistence and reliability. One-click deployment with automatic backups, environment variable management, and zero configuration needed to get your kanban boards running instantly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Planka | [Pluma-Negra/railway-planka](https://github.com/Pluma-Negra/railway-planka) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Planka | 1337 | - |
| `SECRET_KEY` | Planka | (secret) | - |
| `DEFAULT_LANGUAGE` | Planka | en-US | - |
| `DEFAULT_ADMIN_NAME` | Planka | Admin Name | - |
| `DEFAULT_ADMIN_EMAIL` | Planka | admin@mail.com | - |
| `DEFAULT_ADMIN_PASSWORD` | Planka | (secret) | - |
| `DEFAULT_ADMIN_USERNAME` | Planka | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/planka-v203-1)
