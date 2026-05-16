# Deploy Atomic on Railway

An AI-native knowledge graph that's yours end-to-end.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/atomic-1)

## About

Atomic is an AI-augmented personal knowledge base. Drop in freeform markdown notes ("atoms") and an asynchronous pipeline automatically chunks them, generates embeddings, extracts hierarchical tags, and builds semantic edges between related notes. On top sit LLM-synthesized wiki articles with citations, agentic RAG chat scoped to tags, and a force-directed canvas view.

Atomic runs as a single Rust binary backed by SQLite (with the `sqlite-vec` extension for vector search), so the hosting footprint is small — one process, one data directory. This template bundles `atomic-server`, the React web UI, and nginx into a single container behind one port. Persistent state — registry, knowledge bases, embeddings, wiki articles, conversations — lives in a single `/data` volume. On first boot you claim the instance through a setup wizard using `ATOMIC_SETUP_TOKEN`, then configure an AI provider (OpenRouter or Ollama) from the Settings UI. No external database, queue, or object storage is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| atomic-railway | [youssefsiam38/atomic-railway](https://github.com/youssefsiam38/atomic-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST_PORT` | 8080 | - |
| `PUBLIC_URL` | - | Public URL of this deployment. Used for OAuth / remote-MCP discovery. Leave as-is to auto-derive from Railway's public domain. |
| `ATOMIC_SETUP_TOKEN` | (secret) | Token used to claim the instance from the setup UI on first start. Generate with: openssl rand -base64 24 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/atomic-1)
