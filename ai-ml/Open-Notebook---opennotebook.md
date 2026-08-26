# Deploy Open Notebook on Railway

AI research notebooks that chat with your documents and files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opennotebook)

## About

Open Notebook is an open-source, privacy-first research workspace — a self-hosted implementation of Google's NotebookLM. You create a notebook, add sources (web pages, PDFs, EPUBs, YouTube links, audio, video or raw text), then chat with them, generate summaries, search across everything, and turn a set of documents into a multi-speaker podcast. The difference from the Google product is control: you choose which AI provider sees your material, and everything lives in a database you own. MIT-licensed, 37,000+ GitHub stars.

This template runs Open Notebook as two services. **open-notebook** is the official `lfnovo/open_notebook:v1-latest` image, supervising three processes in one container: a FastAPI backend on 5055, a worker for ingestion, embedding and podcasts, and a Next.js frontend on 8502. Only the frontend port is published — Next.js rewrites `/api/*` to the backend internally, so one domain covers the app. **SurrealDB** is `surrealdb/surrealdb:v2` on the RocksDB engine, holding notebooks, sources, notes, search indexes, the job queue and your encrypted credentials on a private volume. Uploads sit on a volume at `/app/data`.

![Open Notebook and SurrealDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787601950/open-notebook-architecture.png)

Research assistants are most useful on exactly the material you would rather not upload anywhere — legal documents, unpublished manuscripts, internal reports, interview transcripts. Self-hosting removes that governance question, and since the provider is your choice, an Ollama endpoint keeps the workflow in-house.

Key capabilities:

- **Multi-format ingestion** — web pages, PDFs, EPUBs, Office documents, YouTube transcripts, and audio or video with speech-to-text
- **Chat grounded in your sources**, with per-source control over the context window
- **Transformations** — reusable prompts producing summaries, insights or reflection questions
- **Hybrid search** — BM25 full-text and vector similarity over the same records
- **Podcast generation** — a notebook becomes a scripted multi-speaker episode
- **Provider freedom** — OpenAI, Anthropic, Google, Groq, ElevenLabs, Deepgram, OpenRouter, Ollama and any OpenAI-compatible endpoint

SurrealDB does more than persistence: it is the search engine, the vector store and the job queue, which is why both the API and the worker connect to it. Keeping API, worker and web UI in one container is upstream's supported production shape, and holds the running cost to two containers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SurrealDB | `surrealdb/surrealdb:v2` | Database |
| open-notebook | `lfnovo/open_notebook:v1-latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SurrealDB | 8000 | Health-check port |
| `SURREAL_BIND` | SurrealDB | 0.0.0.0:8000 | Listen address inside the container |
| `SURREAL_PASS` | SurrealDB | - | Root password created on first boot |
| `SURREAL_PATH` | SurrealDB | rocksdb:/mydata/mydatabase.db | Storage engine and data directory |
| `SURREAL_USER` | SurrealDB | (secret) | Root user created on first boot |
| `PORT` | open-notebook | 5055 | Health-check port, the API process |
| `API_URL` | open-notebook | - | Public base URL the browser calls |
| `SURREAL_URL` | open-notebook | - | Private database WebSocket |
| `CORS_ORIGINS` | open-notebook | - | Allowed browser origins |
| `SURREAL_USER` | open-notebook | (secret) | Database root username |
| `SURREAL_DATABASE` | open-notebook | open_notebook | SurrealDB database name |
| `SURREAL_PASSWORD` | open-notebook | (secret) | Database root password |
| `SURREAL_NAMESPACE` | open-notebook | open_notebook | SurrealDB namespace |
| `OPEN_NOTEBOOK_PASSWORD` | open-notebook | (secret) | Instance login and API bearer token |
| `OPEN_NOTEBOOK_ENCRYPTION_KEY` | open-notebook | - | Encrypts stored provider API keys |

## Configuration

- **Start command:** `/surreal start --log info`
- **Healthcheck:** `/health`
- **Volume:** `/mydata`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opennotebook)
