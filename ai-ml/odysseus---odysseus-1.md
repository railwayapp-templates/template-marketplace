# Deploy odysseus on Railway

Self-hosted AI workspace with chat, agents, memory, and research

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odysseus-1)

## About

Odysseus runs on Railway as an image-only deployment using a pre-built Docker Hub app image plus private ChromaDB and SearXNG services. Railway provides HTTPS routing, private service networking, generated secrets, and one-click template variables for the authenticated web UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/odysseus-railway:latest` | Web service |
| chromadb | `chromadb/chroma:1.5.10.dev82` | Worker |
| searxng | `searxng/searxng:2026.6.2-e964708c0` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PGID` | app | 1000 |
| `PORT` | app | 7000 |
| `PUID` | app | 1000 |
| `HF_TOKEN` | app | (secret) |
| `LLM_HOST` | app | localhost |
| `AUTH_ENABLED` | app | true |
| `DATABASE_URL` | app | sqlite:///./data/app.db |
| `CHROMADB_PORT` | app | 8000 |
| `GOOGLE_API_KEY` | app | (secret) |
| `OPENAI_API_KEY` | app | (secret) |
| `SECURE_COOKIES` | app | true |
| `SERPER_API_KEY` | app | (secret) |
| `TAVILY_API_KEY` | app | (secret) |
| `FASTEMBED_MODEL` | app | sentence-transformers/all-MiniLM-L6-v2 |
| `LOCALHOST_BYPASS` | app | false |
| `DATA_BRAVE_API_KEY` | app | (secret) |
| `ODYSSEUS_ADMIN_USER` | app | (secret) |
| `ODYSSEUS_SCRIPT_HOST` | app | localhost |
| `CLEANUP_INTERVAL_HOURS` | app | 24 |
| `HUGGING_FACE_HUB_TOKEN` | app | (secret) |
| `ODYSSEUS_ADMIN_PASSWORD` | app | (secret) |
| `CHROMADB_CONNECT_TIMEOUT` | app | 5.0 |
| `ODYSSEUS_INPROCESS_TASKS` | app | 1 |
| `ODYSSEUS_INPROCESS_POLLERS` | app | 1 |
| `IS_PERSISTENT` | chromadb | TRUE |
| `PERSIST_DIRECTORY` | chromadb | /chroma/chroma |
| `ANONYMIZED_TELEMETRY` | chromadb | FALSE |
| `SEARXNG_SECRET` | searxng | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/odysseus-1)
