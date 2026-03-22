# Deploy IronClaw on Railway

Deploy IronClaw on Railway with PostgreSQL and pgvector.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ironclaw)

## About

IronClaw is a secure AI assistant with a modern web interface, persistent memory, jobs, routines, and tool-based workflows. It combines chat, automation, and long-term state in one system, making it useful for personal assistants, hosted AI workspaces, and experimental agent-style deployments backed by PostgreSQL and pgvector.

Hosting IronClaw involves running the main application service together with a PostgreSQL database that supports pgvector for persistence and memory-related features. In a hosted environment like Railway, deployment also requires handling a few practical concerns such as public web access, internal service networking, persistent storage, non-interactive startup, and port separation between the UI proxy and internal channels. This template is designed to simplify that process by packaging IronClaw in a Railway-friendly way, so users can deploy the app with less manual setup and fewer environment-specific issues.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ironclaw | [omryatia/ironclaw-railway](https://github.com/omryatia/ironclaw-railway) | Web service |
| Postgres | `pgvector/pgvector:pg16-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | ironclaw | 8080 |
| `HTTP_HOST` | ironclaw | 0.0.0.0 |
| `HTTP_PORT` | ironclaw | 8081 |
| `LLM_BACKEND` | ironclaw | openai |
| `OPENAI_API_KEY` | ironclaw | (secret) |
| `SANDBOX_ENABLED` | ironclaw | false |
| `ONBOARD_COMPLETED` | ironclaw | true |
| `GATEWAY_AUTH_TOKEN` | ironclaw | (secret) |
| `HTTP_WEBHOOK_SECRET` | ironclaw | (secret) |
| `POSTGRES_DB` | Postgres | ironclaw |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/ironclaw)
