# Deploy ariadne-core on Railway

Document extraction + vector search pipeline for AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ariadne-core)

## About

Ariadne Core is an open-source document extraction and retrieval pipeline. It converts PDFs and 20+ other formats into clean Markdown and searchable vector embeddings, reducing frontier-LLM token costs by 20x per document. Connect from Claude Code, Cursor, or any MCP client.

Ariadne Core deploys as a single Docker container with a pgvector PostgreSQL database. It exposes both an MCP server and REST API on a single port. After deploying, fill in your API key from Google or OpenAI — the embedding model, vision model, and client authentication key are pre-configured with sensible defaults. Connect your AI tools using the generated domain URL and the auto-generated ARIADNE_API_KEY from your Variables tab.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ariadne-core | [denson/ariadne-core](https://github.com/denson/ariadne-core) | Web service |
| pgvector | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_PASSWORD` | ariadne-core | (secret) |
| `VISION_MODEL` | ariadne-core | gemini-1.5-flash |
| `VISION_API_KEY` | ariadne-core | (secret) |
| `ARIADNE_API_KEY` | ariadne-core | (secret) |
| `EMBEDDING_MODEL` | ariadne-core | text-embedding-004 |
| `VISION_BASE_URL` | ariadne-core | https://generativelanguage.googleapis.com/v1beta/openai/ |
| `EMBEDDING_API_KEY` | ariadne-core | (secret) |
| `EMBEDDING_BASE_URL` | ariadne-core | https://generativelanguage.googleapis.com/v1beta/openai/ |
| `POSTGRES_DB` | pgvector | railway |
| `POSTGRES_USER` | pgvector | (secret) |
| `PGPORT_PRIVATE` | pgvector | 5432 |
| `POSTGRES_PASSWORD` | pgvector | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql`

**Category:** Other · **Languages:** Python, HTML, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/ariadne-core)
