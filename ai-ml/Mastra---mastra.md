# Deploy Mastra on Railway

A TypeScript AI agent platform with Studio, workflows & persistent memory.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra)

## About

Mastra is a TypeScript framework for building AI agents, workflows, tools, and production-ready AI applications.

This Railway template deploys **Mastra with PostgreSQL**, providing a production Mastra server with Studio, persistent storage, agent memory, workflows, health monitoring, and multi-provider AI model support.

Mastra provides a complete TypeScript-native framework for building and operating AI-powered applications.

This template runs Mastra as a standalone production server and includes **Mastra Studio** in the production build, allowing you to inspect and interact with registered agents, workflows, and tools directly from your browser.

PostgreSQL is used as the persistent storage backend through Mastra's official PostgreSQL integration, allowing application state to survive container restarts and Railway redeployments.

The Mastra application is publicly accessible, while PostgreSQL remains available only through Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra | [codestorm-official/mastra](https://github.com/codestorm-official/mastra) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mastra | 4111 | HTTP port used by Mastra; Railway may override it |
| `NODE_ENV` | Mastra | production | Run Mastra in production mode |
| `MODEL_NAME` | Mastra | gpt-4o-mini | Provider-specific model name (without the provider prefix) |
| `DATABASE_URL` | Mastra | - | PostgreSQL persistence connection URL |
| `SYSTEM_PROMPT` | Mastra | You are a helpful AI assistant. | Default agent instructions |
| `MODEL_PROVIDER` | Mastra | openai | AI provider: openai, anthropic, or google |
| `OPENAI_API_KEY` | Mastra | (secret) | Required only when MODEL_PROVIDER=openai |
| `ANTHROPIC_API_KEY` | Mastra | (secret) | Required only when MODEL_PROVIDER=anthropic |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Mastra | (secret) | Required only when MODEL_PROVIDER=google |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/mastra)
