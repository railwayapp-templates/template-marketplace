# Deploy Agent Control Dev on Railway

Deploy Agent Control server - guardrails, API, and UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agent-control-dev)

## About

Agent Control Dev is an open-source control plane for AI agent guardrails. It lets you define runtime policies, evaluate agent requests against controls, and manage agents from a built-in dashboard — without changing your application code on every policy update.

Hosting Agent Control Dev on Railway provisions a two-service stack with minimal configuration. This template includes a managed PostgreSQL database and the official `galileoai/agent-control-server` Docker image, which serves both the REST API and the bundled web dashboard from a single service.

`AGENT_CONTROL_DB_URL`, API keys, session secrets, and CORS settings are wired automatically over Railway's private network. Database migrations run on server startup, and a `/health` healthcheck (300-second timeout) waits for Postgres before marking the deployment live. API key authentication is enabled by default in production.

After deploy, generate a public domain on the **server** service, open it in your browser, and log in with the auto-generated `AGENT_CONTROL_ADMIN_API_KEYS` value from the server variables. Use `AGENT_CONTROL_API_KEYS` for SDK and runtime API access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `galileoai/agent-control-server:latest` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `GALILEO_API_KEY` | server | (secret) | Optional Galileo API key for the Luna-2 AI evaluator. |
| `AGENT_CONTROL_HOST` | server | 0.0.0.0 | 0.0.0.0", "Server bind address. |
| `AGENT_CONTROL_PORT` | server | - | Server listen port. Uses Railway-assigned PORT for external routing. |
| `AGENT_CONTROL_DB_URL` | server | - | PostgreSQL connection URL with psycopg driver. References the managed postgres service. |
| `AGENT_CONTROL_API_KEYS` | server | (secret) | Auto-generated API key for runtime and read access. Save this value for SDK and API clients. |
| `AGENT_CONTROL_CORS_ORIGINS` | server | - | Allowed CORS origins for the bundled dashboard served from the server public domain. |
| `AGENT_CONTROL_ADMIN_API_KEYS` | server | (secret) | Auto-generated admin API key for control-plane mutations and UI login. Save this value. |
| `AGENT_CONTROL_SESSION_SECRET` | server | (secret) | Secret for session encryption. Auto-generated; do not change after first deploy. |
| `AGENT_CONTROL_API_KEY_ENABLED` | server | (secret) | Enable API key authentication. Should remain enabled in production. |
| `POSTGRES_DB` | postgres | agent_control | Default database name created on initialization. |
| `DATABASE_URL` | postgres | - | Internal PostgreSQL connection URL for service-to-service communication. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL username. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated PostgreSQL password. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/agent-control-dev)
