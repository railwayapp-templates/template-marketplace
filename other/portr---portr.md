# Deploy portr on Railway

Self-hosted ngrok alternative with request inspection and replay

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/portr)

## About

portr is an open-source, self-hosted tunnel that puts local HTTP, TCP and WebSocket services on public URLs. It ships a team admin dashboard and a request inspector that lets you view, modify and replay traffic - a private alternative to ngrok that runs on your own domain.

This template runs the portr server - admin dashboard plus tunnel proxy in one deployment - backed by the bundled PostgreSQL database. Tunnels use the WebSocket transport, so everything rides Railway's HTTP edge with no raw TCP ports and no SSH host keys. The deploy exposes two ports: 8000 for the admin dashboard and 8001 for the tunnel endpoint. The dashboard works out of the box on the generated Railway domain; to serve tunnel URLs, add a wildcard custom domain (for example *.tunnels.example.com) targeting port 8001 and set PORTR_DOMAIN to it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| portr | [amalshaji/portr](https://github.com/amalshaji/portr) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORTR_DB_URL` | portr | - | Postgres connection string, wired to the bundled Postgres database. |
| `PORTR_DOMAIN` | portr | - | Domain tunnels are served on. Keep the Railway domain to start; change after adding a wildcard custom domain. |
| `PORTR_WS_URL` | portr | - | WebSocket endpoint tunnel clients connect to; must reach port 8001. If clients cannot connect, set to the domain targeting port 8001. |
| `PORTR_TRANSPORT` | portr | websocket | Tunnel transport. Keep websocket on Railway; the ssh transport needs a raw TCP port. |
| `PORTR_ADMIN_PORT` | portr | 8000 | Port the admin dashboard and API listen on. |
| `PORTR_PROXY_PORT` | portr | 8001 | Port the tunnel proxy and WebSocket endpoint listen on. |
| `PORTR_SERVER_URL` | portr | - | Public URL of the admin dashboard. Update if you move it to a custom domain. |
| `PORTR_RESERVED_SUBDOMAIN_LIMIT` | portr | 3 | Maximum reserved subdomains per team member. 0 disables new reservations. |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first boot. |
| `DATABASE_URL` | Postgres | - | Full connection string other services reference, e.g. portr's PORTR_DB_URL. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated randomly at deploy time. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Go, TypeScript, MDX, CSS, Python, HTML, Shell, JavaScript, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/portr)
