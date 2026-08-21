# Deploy Follow The Thread on Railway

AI Powered Multi Threaded Research Agent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/follow-the-thread)

## About

Follow The Thread is an open-source AI deep-research platform. You give it a
research question or a reusable "brief"; AI agents run multi-step web research
— parallel search, full-page source reading, synthesis — and produce
structured, cited research documents you can explore, share publicly, and
refresh on a schedule. Bring an OpenRouter API key for LLMs and a Jina AI key
for web search — both have free/low-cost tiers.

The template deploys the full five-service stack, wired together over
Railway's private network: a Next.js application (UI, API, and Postgres-backed
research state), the AgentField control plane that orchestrates agent
execution and stores RAG vectors, a Go deep-research agent that performs the
actual searching and synthesis, and two PostgreSQL databases — a standard one
for the app and a pgvector-enabled one required by the control plane's vector
store. Database schemas migrate automatically on first boot, all internal
secrets are auto-generated, and authentication defaults to Better Auth
(self-hosted email/password on your own Postgres — no third-party auth
account needed). You supply exactly two values at deploy time: an OpenRouter
API key and a Jina AI API key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| follow-the-thread | [Agent-Field/follow-the-thread](https://github.com/Agent-Field/follow-the-thread) | Web service |
| FTT-DB | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| control-plane | `agentfield/control-plane:latest` | Web service |
| deepresearch-agent | [Agent-Field/follow-the-thread](https://github.com/Agent-Field/follow-the-thread) (root: /agents/general-deep-research) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `DATABASE_URL` | Postgres | - | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `DATABASE_PUBLIC_URL` | Postgres | - | - |
| `APP_SECRET` | follow-the-thread | (secret) | - |
| `DATABASE_URL` | follow-the-thread | - | - |
| `JINA_API_KEY` | follow-the-thread | (secret) | - |
| `AGENTFIELD_URL` | follow-the-thread | - | - |
| `ENCRYPTION_KEY` | follow-the-thread | - | - |
| `AGENTFIELD_API_KEY` | follow-the-thread | (secret) | - |
| `AGENT_CALLBACK_URL` | follow-the-thread | - | - |
| `OPENROUTER_API_KEY` | follow-the-thread | (secret) | - |
| `NEXT_PUBLIC_APP_URL` | follow-the-thread | - | - |
| `AGENTFIELD_WEBHOOK_SECRET` | follow-the-thread | (secret) | - |
| `POSTGRES_DB` | FTT-DB | railway | - |
| `DATABASE_URL` | FTT-DB | - | - |
| `POSTGRES_USER` | FTT-DB | (secret) | - |
| `POSTGRES_PASSWORD` | FTT-DB | (secret) | - |
| `DATABASE_PUBLIC_URL` | FTT-DB | - | - |
| `AGENTFIELD_PORT` | control-plane | 8080 | - |
| `AGENTFIELD_API_KEY` | control-plane | (secret) | - |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres | - |
| `AGENTFIELD_STORAGE_POSTGRES_URL` | control-plane | - | - |
| `PORT` | deepresearch-agent | 8080 | - |
| `JINA_API_KEY` | deepresearch-agent | (secret) | - |
| `DEFAULT_MODEL` | deepresearch-agent | openrouter/deepseek/deepseek-chat-v3.1 | - |
| `EMBEDDING_MODEL` | deepresearch-agent | jina_ai/jina-embeddings-v3 | - |
| `AGENTFIELD_SERVER` | deepresearch-agent | http://control-plane.railway.internal:8080 | - |
| `AGENTFIELD_API_KEY` | deepresearch-agent | (secret) | - |
| `AGENT_CALLBACK_URL` | deepresearch-agent | - | - |
| `OPENROUTER_API_KEY` | deepresearch-agent | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** TypeScript, Go, Python, CSS, PLpgSQL, JavaScript, Shell, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/follow-the-thread)
