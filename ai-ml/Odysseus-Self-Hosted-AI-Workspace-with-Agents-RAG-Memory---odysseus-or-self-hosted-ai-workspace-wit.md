# Deploy Odysseus | Self-Hosted AI Workspace with Agents, RAG & Memory on Railway

Self-host Odysseus on Railway — AI chat, agents, RAG search & memory.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odysseus-or-self-hosted-ai-workspace-wit)

## About

Odysseus is a self-hosted AI workspace that puts chat, autonomous agents, retrieval-augmented search and persistent memory behind a single login. It runs entirely on infrastructure you control and connects to any OpenAI-compatible model provider you choose.

This template deploys Odysseus together with a ChromaDB vector store, wired over Railway's private network. The application service builds from the upstream repository and serves the web UI, API and agent runtime on port 7000 behind Railway's HTTPS proxy. A persistent volume at `/app/data` holds the SQLite database, session state, uploaded documents and the embedding cache, so everything survives restarts and redeploys. ChromaDB keeps its collections on its own volume. Authentication is enabled by default and the first administrator account is seeded on first boot from the generated `ODYSSEUS_ADMIN_PASSWORD` variable: open the deployed URL, sign in as `admin`, and the workspace is ready.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| odysseus | [odysseus-dev/odysseus](https://github.com/odysseus-dev/odysseus) | Database |
| chromadb | `chromadb/chroma:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PGID` | 1000 |
| `PORT` | 7000 |
| `PUID` | 1000 |
| `AUTH_ENABLED` | true |
| `CHROMADB_HOST` | chromadb.railway.internal |
| `CHROMADB_PORT` | 8000 |
| `SECURE_COOKIES` | true |
| `ODYSSEUS_ADMIN_USER` | (secret) |
| `ODYSSEUS_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/app/data`
- **Volume:** `/chroma/chroma`

**Category:** AI/ML · **Languages:** Python, JavaScript, CSS, HTML, Shell, PowerShell, Swift, Dockerfile, TypeScript, Batchfile

[View on Railway →](https://railway.com/deploy/odysseus-or-self-hosted-ai-workspace-wit)
