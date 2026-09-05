# Deploy Agno on Railway

A production-ready agent runtime with API, MCP, memory and observability.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agno)

## About

Agno AgentOS is a production-ready runtime for building, serving, and managing AI agent platforms.

This Railway template deploys **AgentOS with PostgreSQL**, giving you persistent sessions, memory, knowledge, traces, REST APIs, MCP connectivity, scheduling, observability, and secure production deployment.

AgentOS is the runtime layer of the Agno ecosystem. It allows you to build AI agents using the Agno SDK, expose them through production APIs, connect them to external interfaces, and manage runtime state using your own infrastructure.

This template uses PostgreSQL as the persistent storage backend for AgentOS data such as:

* Sessions
* Memory
* Knowledge
* Traces
* Runtime state
* Agent activity

The AgentOS service is publicly accessible, while PostgreSQL communicates only through Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Agno | [agno-agi/agentos-railway](https://github.com/agno-agi/agentos-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DB_HOST` | Agno | - | PostgreSQL host referenced from the Postgres service |
| `DB_PASS` | Agno | - | PostgreSQL password referenced from the Postgres service |
| `DB_PORT` | Agno | - | PostgreSQL port referenced from the Postgres service |
| `DB_USER` | Agno | (secret) | PostgreSQL username referenced from the Postgres service |
| `DB_DRIVER` | Agno | postgresql+psycopg | PostgreSQL driver used by AgentOS |
| `AGENTOS_URL` | Agno | - | Public URL of this AgentOS deployment |
| `DB_DATABASE` | Agno | - | PostgreSQL database referenced from the Postgres service |
| `RUNTIME_ENV` | Agno | dev | Use 'prd' if you want to run AgentOS in production mode |
| `AGNO_TELEMETRY` | Agno | false | Optional: disable anonymous Agno telemetry |
| `OPENAI_API_KEY` | Agno | (secret) | Required for the default OpenAI-based agents and embeddings |
| `PARALLEL_API_KEY` | Agno | (secret) | Optional: Parallel API key for web search and faster knowledge ingestion |
| `MCP_CONNECT_SECRET` | Agno | (secret) | Optional: secret used when enabling external MCP client connections |
| `JWT_VERIFICATION_KEY` | Agno | - | Required in production; set the public verification key from AgentOS Control Plane after deployment |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/agno)
