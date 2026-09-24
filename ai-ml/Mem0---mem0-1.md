# Deploy Mem0 on Railway

Mem0 2.2 self-hosted AI memory API and dashboard with Postgres pgvector.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mem0-1)

## About

Mem0 is an open-source memory layer for AI agents and assistants. It extracts facts from conversations with an LLM, stores them as vector embeddings, and returns the relevant memories for each user, agent or session when you search. Apps use it through its REST API or the official Python and TypeScript SDKs.

This template deploys the Mem0 v2.2.0 self-hosted server, its web dashboard and a Railway Postgres database. Memories are stored with pgvector, which Railway's Postgres already includes. Users and API keys live in a second database created on first start. You must provide an OpenAI API key when deploying; LLM and embedding calls are billed by OpenAI. The first account registered in the dashboard becomes admin, and registration then closes, so register right after deploying. The API also accepts a generated admin API key. Telemetry is off. The memory history database is kept on a small volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | [aalfath/mem0-railway-template](https://github.com/aalfath/mem0-railway-template) | Web service |
| mem0 | [aalfath/mem0-railway-template](https://github.com/aalfath/mem0-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | dashboard | 3000 |
| `NEXT_PUBLIC_INSTANCE_NAME` | dashboard | Mem0 |
| `PORT` | mem0 | 8000 |
| `JWT_SECRET` | mem0 | (secret) |
| `APP_DB_NAME` | mem0 | mem0_app |
| `ADMIN_API_KEY` | mem0 | (secret) |
| `POSTGRES_USER` | mem0 | (secret) |
| `MEM0_TELEMETRY` | mem0 | false |
| `OPENAI_API_KEY` | mem0 | (secret) |
| `POSTGRES_PASSWORD` | mem0 | (secret) |
| `POSTGRES_COLLECTION_NAME` | mem0 | memories |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/docs`
- **Volume:** `/app/history`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/mem0-1)
