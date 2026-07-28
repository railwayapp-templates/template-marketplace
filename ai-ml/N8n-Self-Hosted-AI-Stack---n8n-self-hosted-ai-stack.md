# Deploy N8n Self Hosted AI Stack on Railway

A fully private, self hosted automation and AI stack.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-self-hosted-ai-stack)

## About

N8n Self Hosted AI Stack is a private automation and AI platform. It includes n8n for workflows, Postgres for storage, Ollama for local models, and Qdrant for vector search. Your prompts, documents, and credentials stay inside your Railway project with no third party AI API required.

This template deploys four services already connected over Railway private networking. n8n stores workflows and credentials in Postgres, runs inference through Ollama, and uses Qdrant for embeddings and RAG. After deploy, open the n8n public URL, create your owner account, pull a model into Ollama, and start building. Ollama uses the most memory because it holds model weights. Postgres and Qdrant stay light for hobby and small team workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16` | Database |
| Ollama | `ollama/ollama:latest` | Database |
| Qdrant | `qdrant/qdrant:latest` | Database |
| n8n | `n8nio/n8n:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | n8n |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `OLLAMA_HOST` | Ollama | 0.0.0.0 |
| `PORT` | n8n | 5678 |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PORT` | n8n | 5678 |
| `N8N_PROTOCOL` | n8n | https |
| `N8N_PROXY_HOPS` | n8n | 1 |
| `GENERIC_TIMEZONE` | n8n | Europe/Madrid |
| `DB_POSTGRESDB_PORT` | n8n | 5432 |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `N8N_LISTEN_ADDRESS` | n8n | 0.0.0.0 |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/root/.ollama`
- **Volume:** `/qdrant/storage`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/n8n-self-hosted-ai-stack)
