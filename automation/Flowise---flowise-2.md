# Deploy Flowise on Railway

No-code LLM app builder with Postgres backend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/flowise-2)

## About

Flowise is an open-source, low-code platform for building LLM-powered applications visually. Using a drag-and-drop interface, you can create AI workflows, chatbots, and agents with integrations for OpenAI, Anthropic, Ollama, and more — no deep programming required.

Hosting Flowise requires a persistent server with access to a database for storing flows, credentials, and chat history. This Railway template deploys Flowise alongside a managed PostgreSQL instance, with all database connection variables automatically wired between services using Railway's private networking. The application runs on port 3000 with a public domain provisioned automatically. A secret key for encrypting stored credentials is generated at deploy time. Railway handles infrastructure provisioning, service restarts on failure, and health monitoring via the `/api/v1/ping` endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-flowise | [c-treinta/railway-flowise](https://github.com/c-treinta/railway-flowise) (root: app) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | railway-flowise | 3000 | Port Flowise listens on |
| `DATABASE_SSL` | railway-flowise | false | Disable SSL on private network |
| `DATABASE_HOST` | railway-flowise | - | Postgres private hostname |
| `DATABASE_NAME` | railway-flowise | - | Database name |
| `DATABASE_PORT` | railway-flowise | - | Postgres port |
| `DATABASE_TYPE` | railway-flowise | postgres | Use postgres backend |
| `DATABASE_USER` | railway-flowise | (secret) | Database user |
| `DATABASE_PASSWORD` | railway-flowise | (secret) | Database password |
| `FLOWISE_SECRETKEY_OVERWRITE` | railway-flowise | (secret) | Auto-generated encryption key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/v1/ping`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Makefile, Dockerfile

[View on Railway →](https://railway.com/template/flowise-2)
