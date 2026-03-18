# Deploy claw-control on Railway

Kanban for AI Agents - Coordinate your AI team with style

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/claw-control)

## About

Claw Control is an open-source Kanban dashboard for AI agent teams. It provides real-time task management, agent status tracking, and a live activity feed—letting you coordinate multiple AI agents through an intuitive visual interface. Perfect for managing autonomous AI workflows at scale.

Deploying Claw Control involves running three services: a React frontend dashboard, a Fastify backend API with Server-Sent Events for real-time updates, and a PostgreSQL database for persistent storage. The frontend connects to the backend via the `API_URL` environment variable, which Railway auto-configures using service discovery. The backend handles task CRUD operations, agent status updates, and broadcasts changes to all connected clients via SSE. No manual configuration required—Railway's template system wires everything together automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| @claw-control/frontend | [adarshmishra07/claw-control](https://github.com/adarshmishra07/claw-control) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| @claw-control/backend | [adarshmishra07/claw-control](https://github.com/adarshmishra07/claw-control) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_URL` | @claw-control/frontend | - | Backend URL |
| `VITE_API_URL` | @claw-control/frontend | - | Backend URL |
| `POSTGRES_DB` | Postgres | railway | Default database created on init |
| `DATABASE_URL` | Postgres | - | Internal connection URL - use for Railway services (faster, no proxy) |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres superuser password (auto-generated) |
| `DATABASE_PUBLIC_URL` | Postgres | - | External connection URL - use from outside Railway (local dev, external tools) |
| `API_KEY` | @claw-control/backend | (secret) | For authenticated API calls , leave empty if no auth needed for API |
| `DATABASE_URL` | @claw-control/backend | - | Your database URL - Autoconfigured |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start --workspace=@claw-control/backend`
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** JavaScript, TypeScript, CSS, Dockerfile, HTML, Shell

[View on Railway →](https://railway.com/template/claw-control)
