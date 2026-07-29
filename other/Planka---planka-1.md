# Deploy Planka on Railway

Self-hosted Kanban boards for collaborative project management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/planka-1)

## About

Planka is a self-hosted, real-time Kanban application for collaborative project management. Teams can organize work into projects, boards, lists, and cards; assign members; add labels, due dates, comments, and attachments; and keep changes synchronized across connected browsers while retaining control of their project data.

**Published on Railway:** https://railway.com/deploy/planka-1

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/planka-1)

Hosting Planka requires the application container, PostgreSQL, a public HTTPS URL, and durable storage for database records and uploaded files. This template runs Planka 2.1.1 on its documented port `1337`, connects it to PostgreSQL 16 through Railway private networking, and mounts one application volume at `/app/data`. That unified Planka v2 data directory preserves user avatars, project background images, favicons, and attachments. Railway generates the database, session, and initial-administrator secrets, terminates TLS at the public domain, checks Planka's root page for health, and lets the image initialize or migrate the database during startup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Planka | `ghcr.io/plankanban/planka:2.1.1` | Web service |
| Postgres | `postgres:16.13-alpine3.23@sha256:4e6e670bb069649261c9c18031f0aded7bb249a5b6664ddec29c013a89310d50` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Planka | 1337 |
| `SECRET_KEY` | Planka | (secret) |
| `TRUST_PROXY` | Planka | true |
| `DEFAULT_ADMIN_NAME` | Planka | Administrator |
| `DEFAULT_ADMIN_EMAIL` | Planka | admin@planka.local |
| `DEFAULT_ADMIN_PASSWORD` | Planka | (secret) |
| `DEFAULT_ADMIN_USERNAME` | Planka | (secret) |
| `POSTGRES_DB` | Postgres | planka |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/planka-1)
