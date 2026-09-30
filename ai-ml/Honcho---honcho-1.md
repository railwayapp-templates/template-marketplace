# Deploy Honcho on Railway

Self-hosted memory server for AI agents (unofficial Honcho stack)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/honcho-1)

## About

Honcho is an open-source memory layer for AI agents: it stores conversations, extracts what it learns about each user or agent in the background, and answers questions about them. This template deploys the official plastic-labs/honcho image (v3.2.1) as an API service and a background deriver worker, plus a pgvector-enabled Postgres on a persistent volume. Unofficial template, not affiliated with Plastic Labs.

Three services run in your project: honcho-api (the HTTP API on port 8000), honcho-deriver (the worker that turns messages into memory) and honcho-db (Postgres with pgvector, on a volume). Bring your own LLM key: set LLM_OPENAI_API_KEY when you deploy. No key is included, and you pay your LLM provider directly for memory extraction. API authentication is switched on (AUTH_USE_AUTH=true) with a generated AUTH_JWT_SECRET, so every request needs a bearer token that you create yourself (see below). Redis is optional and left out; caching falls back to memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| honcho-api | `ghcr.io/plastic-labs/honcho:v3.2.1` | Web service |
| honcho-db | `pgvector/pgvector:0.8.6-pg15` | Database |
| honcho-deriver | `ghcr.io/plastic-labs/honcho:v3.2.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | honcho-api | 8000 | Port the API listens on (8000). |
| `LOG_LEVEL` | honcho-api | INFO | Log verbosity: DEBUG, INFO, WARNING, ERROR. |
| `API_WORKERS` | honcho-api | 1 | Number of API worker processes (default 1). |
| `AUTH_USE_AUTH` | honcho-api | true | Require a JWT bearer token on every API call. Leave true on a public URL. |
| `CACHE_ENABLED` | honcho-api | false | Redis caching. false = in-memory fallback, no Redis service needed. |
| `AUTH_JWT_SECRET` | honcho-api | (secret) | Auto-generated signing secret for Honcho's API tokens. Keep it private; you mint tokens from it. |
| `DB_CONNECTION_URI` | honcho-api | - | Postgres connection string built from the honcho-db service (private network). |
| `HONCHO_PUBLIC_URL` | honcho-api | - | Public https URL of this API, for your agents and SDK base_url. |
| `VECTOR_STORE_TYPE` | honcho-api | pgvector | Where embeddings are stored. pgvector uses the same Postgres. |
| `LLM_OPENAI_API_KEY` | honcho-api | (secret) | Your OpenAI API key (or key for an OpenAI-compatible proxy). Honcho will not start without an LLM provider. Not included in the template. |
| `POSTGRES_DB` | honcho-db | postgres | Name of the Postgres database Honcho uses. |
| `POSTGRES_USER` | honcho-db | (secret) | Postgres superuser name used by Honcho. |
| `POSTGRES_PASSWORD` | honcho-db | (secret) | Auto-generated password for the honcho-db Postgres service. |
| `LOG_LEVEL` | honcho-deriver | INFO | Log verbosity: DEBUG, INFO, WARNING, ERROR. |
| `AUTH_USE_AUTH` | honcho-deriver | true | Require a JWT bearer token on every API call. Leave true on a public URL. |
| `CACHE_ENABLED` | honcho-deriver | false | Redis caching. false = in-memory fallback, no Redis service needed. |
| `AUTH_JWT_SECRET` | honcho-deriver | (secret) | Signing secret shared with honcho-api (referenced, not regenerated). Keep it private. |
| `DB_CONNECTION_URI` | honcho-deriver | - | Postgres connection string built from the honcho-db service (private network). |
| `VECTOR_STORE_TYPE` | honcho-deriver | pgvector | Where embeddings are stored. pgvector uses the same Postgres. |
| `LLM_OPENAI_API_KEY` | honcho-deriver | (secret) | LLM key shared with honcho-api (set it once on honcho-api). Memory extraction needs it. |

## Configuration

- **Start command:** `sh docker/entrypoint.sh`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "/app/.venv/bin/python scripts/provision_db.py && exec /app/.venv/bin/python -m src.deriver"`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/honcho-1)
