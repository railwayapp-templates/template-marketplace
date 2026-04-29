# Deploy AgentOS on Railway

Multi-agent system with RAG and MCP agents. Powered by Agno.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentos)

## About

AgentOS is a multi-agent system built with Agno featuring Knowledge (RAG) and MCP agents. Deploy AI agents that answer questions and connect to external services.

This template deploys a FastAPI backend with PostgreSQL (pgvector) for vector storage. The Knowledge Agent answers questions using hybrid search. The MCP Agent connects to external services via Model Context Protocol.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agentos-railway-template | [agno-agi/agentos-railway-template](https://github.com/agno-agi/agentos-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_USER` | agentos-railway-template | (secret) | - |
| `OPENAI_API_KEY` | agentos-railway-template | (secret) | Your OpenAI API key for the agents |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/agentos)
