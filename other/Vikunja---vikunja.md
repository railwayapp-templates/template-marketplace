# Deploy Vikunja on Railway

Open-source task and project management with teams and calendars.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vikunja)

## About

Vikunja is an open-source task and project manager for individuals and teams. It combines lists, boards, tables, calendars, and Gantt views with assignments, due dates, recurring tasks, labels, collaboration, CalDAV, and an API, while keeping application data and uploaded attachments under your control.

Hosting Vikunja requires the application, a durable SQL database, persistent attachment storage, and a canonical public URL. This template runs the official Vikunja 2.4.0 image on port 3456 alongside MariaDB 10.11.8. Vikunja reaches MariaDB only through Railway's private network, while Railway terminates public HTTPS and injects the generated hostname into `VIKUNJA_SERVICE_PUBLICURL`. MariaDB stores its data at `/var/lib/mysql`, and Vikunja stores uploaded files at `/app/vikunja/files`. Database migrations run automatically during startup, and Railway checks the unauthenticated `/health` endpoint before marking Vikunja healthy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:10.11.8` | Database |
| Vikunja | `vikunja/vikunja:2.4.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_USER` | MariaDB | (secret) |
| `MYSQL_DATABASE` | MariaDB | vikunja |
| `MYSQL_PASSWORD` | MariaDB | (secret) |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) |
| `PORT` | Vikunja | 3456 |
| `VIKUNJA_DATABASE_TLS` | Vikunja | false |
| `VIKUNJA_DATABASE_TYPE` | Vikunja | mysql |
| `VIKUNJA_DATABASE_USER` | Vikunja | (secret) |
| `VIKUNJA_SERVICE_SECRET` | Vikunja | (secret) |
| `VIKUNJA_SERVICE_DEMOMODE` | Vikunja | false |
| `VIKUNJA_DATABASE_DATABASE` | Vikunja | vikunja |
| `VIKUNJA_DATABASE_PASSWORD` | Vikunja | (secret) |
| `VIKUNJA_AUTH_LOCAL_ENABLED` | Vikunja | true |
| `VIKUNJA_SERVICE_ENABLELINKSHARING` | Vikunja | false |
| `VIKUNJA_SERVICE_ENABLEPUBLICTEAMS` | Vikunja | false |
| `VIKUNJA_SERVICE_ENABLEREGISTRATION` | Vikunja | true |

## Configuration

- **Start command:** `docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/vikunja/files`

**Category:** Other

[View on Railway →](https://railway.com/deploy/vikunja)
