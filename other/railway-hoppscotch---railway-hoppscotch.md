# Deploy railway-hoppscotch on Railway

Self-hosted API dev platform — REST, GraphQL, WebSocket, SSE

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-hoppscotch)

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
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hoppscotch | [INAPP-Mobile/railway-hoppscotch](https://github.com/INAPP-Mobile/railway-hoppscotch) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `SECRET_KEY` | hoppscotch | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/railway-hoppscotch)
