# Deploy Multica AI on Railway

Manage AI coding agents like teammates. Assign work, track progress & ship.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-ai)

## About

Multica is a self-hosted platform for managing AI coding agents like teammates. It helps you assign work, track progress, coordinate agent workflows, and manage development activity from a centralized interface.

This template deploys Multica with its Web UI, Backend API, and PostgreSQL with pgvector in a complete Railway stack.

![Multica](https://multica.ai/_next/image?url=%2Fimages%2Flanding-hero.webp\&w=1920\&q=85\&dpl=dpl_5i77AH733wd5yNwW9ppf4vhYvCgm)

Hosting Multica on Railway gives you a complete self-hosted environment for coordinating AI coding agents and their workflows.

This template deploys three services:

* **Multica Web** — browser-based user interface
* **Multica Backend** — API, authentication, WebSocket, agent coordination, and application logic
* **PostgreSQL + pgvector** — persistent relational and vector data storage

Multica Web and Backend communicate through Railway networking, while PostgreSQL remains private inside the project.

The Backend also uses persistent storage for uploaded files so application data survives redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| multica-backend | `ghcr.io/multica-ai/multica-backend:latest` | Database |
| multica-web | `ghcr.io/multica-ai/multica-web:latest` | Web service |
| Postgres | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | multica-backend | 8080 | HTTP and WebSocket port used by Multica Backend |
| `APP_ENV` | multica-backend | production | Enable Multica production safety checks |
| `JWT_SECRET` | multica-backend | (secret) | Secret used to sign Multica authentication tokens |
| `ALLOW_SIGNUP` | multica-backend | true | Allow new users to create Multica accounts |
| `DATABASE_URL` | multica-backend | - | Private PostgreSQL connection URL |
| `FRONTEND_ORIGIN` | multica-backend | - | Public Multica Web origin used for CORS and authentication |
| `MULTICA_APP_URL` | multica-backend | - | Public URL users use to access Multica |
| `MULTICA_PUBLIC_URL` | multica-backend | - | Public Multica Backend/API URL |
| `HOSTNAME` | multica-web | 0.0.0.0 | Bind Multica Web to all container interfaces |
| `REMOTE_API_URL` | multica-web | - | Private backend API URL used by the frontend server |
| `NEXT_PUBLIC_WS_URL` | multica-web | - | Public backend WebSocket URL used by browser clients |
| `NEXT_PUBLIC_API_URL` | multica-web | - | Public backend API URL used by browser clients |
| `POSTGRES_DB` | Postgres | vector | Default database created on first startup |
| `DATABASE_URL` | Postgres | - | Public PostgreSQL connection URL |
| `POSTGRES_USER` | Postgres | (secret) | Initial PostgreSQL administrator user |
| `PGHOST_PRIVATE` | Postgres | - | Private Railway hostname for internal connections |
| `PGPORT_PRIVATE` | Postgres | 5432 | Internal PostgreSQL TCP port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Initial PostgreSQL administrator password |
| `DATABASE_URL_PRIVATE` | Postgres | - | Private PostgreSQL connection URL |

## Configuration

- **Volume:** `/app/data/uploads`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/multica-ai)
