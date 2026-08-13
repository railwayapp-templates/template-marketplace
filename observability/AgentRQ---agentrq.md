# Deploy AgentRQ on Railway

Real-time human-in-the-loop task manager for AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentrq)

## About

AgentRQ is an agent infrastructure platform designed to provide a centralized environment for running and managing AI agents, tools, and related workflows. It can be deployed as a self-hosted Docker application and provides web access through its HTTP server.

Railway hosts AgentRQ using the published `agentrq/agentrq:latest` Docker image. The application listens internally on port `2026` and binds to `0.0.0.0`, allowing Railway to route incoming traffic to the service.

This template uses SQLite for persistent application data. A Railway Volume is mounted at `/_storage`, where AgentRQ stores its SQLite database, file attachments, and other persistent data. Railway handles the public TLS layer, so AgentRQ's built-in TLS is disabled.

The deployment uses Railway environment variables for the public URL, authentication secrets, SQLite configuration, and production settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| AgentRQ | `agentrq/agentrq:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `ENV` | AgentRQ | production | - |
| `HOST` | AgentRQ | 0.0.0.0 | - |
| `PORT` | AgentRQ | 2026 | - |
| `AGENTRQ_SSL_ENABLED` | AgentRQ | false | - |
| `AGENTRQ_COOKIE_SECURE` | AgentRQ | true | - |
| `AGENTRQ_POSTGRES_USER` | AgentRQ | (secret) | - |
| `AGENTRQ_SQLITE_ENABLED` | AgentRQ | false | - |
| `AGENTRQ_AUTH_JWT_SECRET` | AgentRQ | (secret) | - |
| `AGENTRQ_POSTGRES_ENABLED` | AgentRQ | true | - |
| `AGENTRQ_POSTGRES_PASSWORD` | AgentRQ | (secret) | - |
| `AGENTRQ_AUTH_ROOT_ACCESS_TOKEN` | AgentRQ | (secret) | - |
| `AGENTRQ_AUTH_ROOT_LOGIN_ENABLED` | AgentRQ | (secret) | - |
| `AGENTRQ_AUTH_WORKSPACE_TOKEN_KEY` | AgentRQ | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/_storage`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/agentrq)
