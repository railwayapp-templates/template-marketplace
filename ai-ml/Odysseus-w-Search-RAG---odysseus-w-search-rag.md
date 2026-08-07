# Deploy Odysseus (w/ Search + RAG) on Railway

Self-hosted AI workspace: chat, agents, deep research, notes, docs, email

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odysseus-w-search-rag)

## About

Odysseus is a self-hosted AI workspace. It puts chat and agents, multi-step web
research, a writing-first document editor, an email inbox, notes, tasks and a
calendar behind a single login on an instance you own. This template deploys it
along with the two supporting services it expects, a vector store and a private
search engine, so retrieval and web search work on the first boot rather than
failing quietly.

Odysseus is built to run as a small cluster rather than a single container. The
app itself is a Python service, but its default search provider is a separate
SearXNG instance and its retrieval layer talks to a standalone Chroma server
over HTTP. The Python package it installs for that is the thin HTTP client
only, so there is no embedded fallback: deploy the app on its own and semantic
memory, retrieval and the tool picker all degrade to keyword matching, while
every web search and every Deep Research run comes back empty.

Two details make self-hosting it fiddlier than it looks. SearXNG serves HTML
only unless its JSON output is explicitly turned on in a config file, and
Odysseus talks to it exclusively over JSON, so the stock image is useless
without that edit. And the upstream container image is built for a workstation:
it carries a compiler toolchain for building llama.cpp, a full Chromium
install, and a Docker client for driving the host daemon, none of which can
function on a hosting platform.

This template resolves both. The search engine runs from an image with the JSON
config baked in, and the app runs from an image rebuilt from a pinned upstream
commit with the workstation tooling stripped out, taking it from roughly 3 GB
down to under 800 MB without losing a single feature that would work on Railway
anyway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| odysseus | `ghcr.io/hmseeb/odysseus-railway:latest` | Web service |
| chromadb | `chromadb/chroma:1.5.9` | Database |
| searxng | `ghcr.io/hmseeb/odysseus-railway-searxng:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | odysseus | 7000 |
| `AUTH_ENABLED` | odysseus | true |
| `DATABASE_URL` | odysseus | sqlite:////app/data/app.db |
| `CHROMADB_PORT` | odysseus | 8000 |
| `SECURE_COOKIES` | odysseus | true |
| `FASTEMBED_MODEL` | odysseus | sentence-transformers/all-MiniLM-L6-v2 |
| `LOCALHOST_BYPASS` | odysseus | false |
| `ODYSSEUS_DATA_DIR` | odysseus | /app/data |
| `ODYSSEUS_ADMIN_USER` | odysseus | (secret) |
| `FASTEMBED_CACHE_PATH` | odysseus | /app/data/fastembed |
| `ODYSSEUS_ADMIN_PASSWORD` | odysseus | (secret) |
| `ANONYMIZED_TELEMETRY` | chromadb | FALSE |
| `SEARXNG_SECRET` | searxng | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/odysseus-w-search-rag)
