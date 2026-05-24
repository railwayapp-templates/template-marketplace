# Deploy Paperclip - AI Agent Company on Railway

Open-source control plane for AI agents. Includes managed Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-ai-agent-company)

## About

Paperclip is an open-source AI agent orchestration platform for building and running autonomous agent companies. Define roles, assign tasks, set budgets and heartbeats — and let AI agents handle the execution. Connect Claude, Gemini, or OpenAI-compatible agents to a structured org chart, task queue, and governance layer.

Paperclip requires a persistent server, a PostgreSQL database, and a public HTTPS URL for agent heartbeats and the web UI. This template wires all three automatically: a managed Railway Postgres addon is pre-connected via `DATABASE_URL`, a volume is mounted at `/paperclip` for persistent config and storage, and the public Railway domain is injected at deploy time. A custom entrypoint writes the full server configuration from environment variables on first boot — no setup page, no manual config editing, no log scraping. The bootstrap admin invite URL is generated automatically and appears in the service logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| paperclip | [alphasecio/paperclip](https://github.com/alphasecio/paperclip) (root: /railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | paperclip | 0.0.0.0 | Paperclip host |
| `PORT` | paperclip | 3100 | Paperclip port |
| `NODE_ENV` | paperclip | production | Node environment |
| `DATABASE_URL` | paperclip | - | Postgres database URL |
| `DO_NOT_TRACK` | paperclip | 1 | Do not track |
| `GEMINI_API_KEY` | paperclip | (secret) | Gemini API key |
| `OPENAI_API_KEY` | paperclip | (secret) | OpenAI API key |
| `PAPERCLIP_HOME` | paperclip | /paperclip | Paperclip home dir |
| `ANTHROPIC_API_KEY` | paperclip | (secret) | Anthropic API key |
| `BETTER_AUTH_SECRET` | paperclip | (secret) | BetterAuth secret |
| `PAPERCLIP_PUBLIC_URL` | paperclip | - | Paperclip public URL |
| `PAPERCLIP_AGENT_JWT_SECRET` | paperclip | (secret) | Paperclip agent JWT secret |
| `PAPERCLIP_ALLOWED_HOSTNAMES` | paperclip | - | Paperclip allowed hostnames |
| `PAPERCLIP_TELEMETRY_DISABLED` | paperclip | 1 | Paperclip telemetry |
| `PAPERCLIP_AUTH_DISABLE_SIGN_UP` | paperclip | - | Paperclip disable signup |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paperclip-ai-agent-company)
