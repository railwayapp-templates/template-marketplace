# Deploy Sim AI on Railway

Deploy and Host Sim AI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sim-ai)

## About

Sim AI is an open-source platform for building and deploying AI agent workflows. It provides a visual, low-code interface powered by Next.js and Bun, enabling users to create complex LLM-based automations with drag-and-drop nodes for agents, functions, knowledge bases, and integrations like Slack, Gmail, and Pinecone. Self-hostable via Docker or NPM, it supports PostgreSQL with pgvector for embeddings and tools like Socket.io for realtime features. (48 words)

Hosting Sim AI involves deploying its full-stack application, which includes a Next.js frontend, Bun runtime backend, and PostgreSQL database with pgvector extension for AI embeddings. Start by cloning the GitHub repository (https://github.com/simstudioai/sim) and setting up environment variables for database connections, API keys (e.g., OpenAI, Copilot), and ports. Use Docker Compose for quick setup, pulling necessary images and running migrations via Drizzle ORM. Configure authentication with Better Auth and enable realtime features with Socket.io. On Railway, link your repo, provision a PostgreSQL database, and deploy—Railway handles scaling, builds with Nixpacks or Dockerfiles, and manages environment vars automatically. Monitor via Railway's dashboard for logs and metrics. This self-hosted setup allows customization for production use cases like agentic workflows, ensuring data privacy and integration with external LLMs. (128 words)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| realtime | `ghcr.io/simstudioai/realtime:latest` | Web service |
| simstudio | `ghcr.io/simstudioai/simstudio:latest` | Web service |
| pgvector | `pgvector/pgvector:pg17` | Database |
| migrations | `ghcr.io/simstudioai/migrations:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BETTER_AUTH_SECRET` | realtime | (secret) |
| `BETTER_AUTH_SECRET` | simstudio | (secret) |
| `DISABLE_REGISTRATION` | simstudio | false |
| `POSTGRES_DB` | pgvector | railway |
| `POSTGRES_USER` | pgvector | (secret) |
| `PGPORT_PRIVATE` | pgvector | 5432 |
| `POSTGRES_PASSWORD` | pgvector | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run db:migrate`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/sim-ai)
