# Deploy ClingySOCKs on Railway

Deploy your own AI agents with relational memory engine instantly

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clingysocks)

## About

ClingySOCKs is a relational memory engine for AI agents. It gives LLM-powered personas persistent, structured memory through a knowledge graph, enabling agents to recall context across conversations, track emotional dynamics, and build genuine long-term relationships with users.

ClingySOCKs deploys as two services: a **FastAPI backend** (Python) that handles memory storage, conversation harvesting, and LLM orchestration, and a **React frontend** served via Nginx. It requires a **PostgreSQL database with pgvector** for relational memory and vector similarity search. The backend connects to external LLM providers (Gemini, OpenAI, Anthropic, or self-hosted via Ollama) using API keys you supply. Railway's template deploys all three components — frontend, backend, and database — in a single click with automatic networking between services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| baysuk728/clingysocks-frontend:latest | `ghcr.io/baysuk728/clingysocks-frontend:latest` | Web service |
| baysuk728/clingysocks-backend:latest | `ghcr.io/baysuk728/clingysocks-backend:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | Internal database variable. Do not modify! |
| `DATABASE_URL` | Postgres | - | Internal database variable. Do not modify! |
| `POSTGRES_USER` | Postgres | (secret) | Internal database variable. Do not modify! |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Internal database variable. Do not modify! |
| `DATABASE_PUBLIC_URL` | Postgres | - | Internal database variable. Do not modify! |
| `VITE_MEMORY_API_URL` | baysuk728/clingysocks-frontend:latest | - | uto-generated link to your backend API. Do not modify. |
| `JWT_SECRET` | baysuk728/clingysocks-backend:latest | (secret) | JWT secret for local auth tokens (auto-generated if empty, set for production) |
| `CORS_ORIGINS` | baysuk728/clingysocks-backend:latest | - | Internal variable. Do not modify! |
| `DATABASE_URL` | baysuk728/clingysocks-backend:latest | - | Internal variable. Do not modify! |
| `ENCRYPTION_KEY` | baysuk728/clingysocks-backend:latest | - | Encryption key for API keys stored in DB (64 hex chars or passphrase) |
| `REQUIRE_SECRETS` | baysuk728/clingysocks-backend:latest | (secret) | Set to true to refuse startup without ENCRYPTION_KEY and JWT_SECRET |
| `OPENROUTER_API_KEY` | baysuk728/clingysocks-backend:latest | (secret) | REQUIRED: Your OpenRouter API key. Get one at https://openrouter.ai/keys — This is the only key you need to start using the app! |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/clingysocks)
