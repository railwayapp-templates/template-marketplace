# Deploy Flowise AI Agent Builder on Railway

Flowise 3.1.3 with Postgres 17, basic auth on, flows and keys persist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-ai-agent-builder)

## About

Flowise is the open-source drag-and-drop builder for LLM applications: assemble chatflows, RAG pipelines, and multi-agent systems on a visual canvas, then serve each one as an API endpoint or embeddable chat widget. This template deploys Flowise 3.1.3 with a dedicated PostgreSQL 17 database on a persistent volume.

Flowise defaults to SQLite in `~/.flowise`, and it stores three separate things: the flows themselves, encrypted API credentials for every provider you connect, and uploaded documents. Deployments that leave the default in place put all three on ephemeral container disk, so a redeploy silently discards every chatflow and every saved OpenAI or Anthropic key.

This template runs Flowise against PostgreSQL 17 over Railway's private network, so flows, chat history, and credentials live in a real database on a volume. `FLOWISE_SECRETKEY_OVERWRITE` is generated once at deploy and pinned — that key encrypts stored provider credentials, and if it changes, every saved credential becomes undecryptable. API keys and secrets are configured for database storage rather than local files, which is what keeps them consistent when the container is replaced.

A volume is also mounted at `/root/.flowise` for uploaded document blobs used by RAG flows. The UI is protected by basic auth with an `admin` username and a generated password, so the instance is not left open to the internet on first boot — a common oversight in self-hosted Flowise deployments. Telemetry is disabled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowise | `flowiseai/flowise:3.1.3` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DATABASE_USER` | flowise | (secret) |
| `FLOWISE_PASSWORD` | flowise | (secret) |
| `FLOWISE_USERNAME` | flowise | (secret) |
| `DATABASE_PASSWORD` | flowise | (secret) |
| `SECRETKEY_STORAGE_TYPE` | flowise | (secret) |
| `FLOWISE_SECRETKEY_OVERWRITE` | flowise | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-ai-agent-builder)
