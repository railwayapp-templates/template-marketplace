# Deploy Finley (Voltagent) on Railway

Everything you need to build production-ready AI agents in TypeScript

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/finley)

## About

VoltAgent is an open-source TypeScript AI agent framework. This template is a fresh VoltAgent starter pre-configured with the PostgreSQL memory adapter for persistent agent state out of the box. It needed a name, so I called it Finley. 🤷

Hosting VoltAgent requires a Node.js service and a PostgreSQL database. The PostgreSQL adapter is already wired up for agent memory and state persistence — just configure your LLM provider credentials and deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| finley | [sethdavis512/finley](https://github.com/sethdavis512/finley) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the default database to create |
| `DATABASE_URL` | Postgres | - | Internal connection string via Railway private network |
| `POSTGRES_USER` | Postgres | (secret) | Username for the PostgreSQL superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated secure password for the PostgreSQL user |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string via Railway TCP proxy |
| `DATABASE_URL` | finley | - | Postgres DB Url |
| `ANTHROPIC_API_KEY` | finley | (secret) | Anthropic API Key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/finley)
