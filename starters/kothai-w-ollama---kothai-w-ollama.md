# Deploy kothai w/ ollama on Railway

Save now, remember later and do more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kothai-w-ollama)

## About

Kothai is a self-hosted save-all manager with optional AI. Drop links, images, and text into one box. A model reads and indexes everything so you can search by meaning and ask questions answered from your own stuff. One SQLite file, no cloud account required.

This template deploys two services: Kothai's lite image and an Ollama instance that serves it, wired together over Railway's private network. Nothing leaves your project and there's no API key to buy — Ollama pulls `llama3.2:3b` and `nomic-embed-text` on first boot, which takes a few minutes before the AI features come alive. Kothai itself is small (~300 MB RAM, 475 MB disk); Ollama is the heavy half, needing around 8 GB of RAM with a 3B model loaded. Both services get persistent volumes: one for your notes, one for the model weights. Set `KOTHAI_PASSWORD` — Railway gives your instance a public URL.

Prefer a hosted provider? Point `KOTHAI_AI_BASE_URL` at OpenAI or OpenRouter, add `KOTHAI_AI_API_KEY`, and delete the Ollama service. That's cheaper and faster, at the cost of sending your notes to someone else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kothai | [ibrahimTareq/kothai](https://github.com/ibrahimTareq/kothai) | Web service |
| ollama | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KOTHAI_PASSWORD` | kothai | (secret) | Password to protect your instance |
| `KOTHAI_SETUP_PROVIDER` | kothai | ollama-railway | The AI Ollama URL |
| `OLLAMA_HOST` | ollama | [::]:11434 | The Ollama host |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `/bin/sh -c 'OLLAMA_HOST=127.0.0.1:11434 /bin/ollama serve & pid=$!; until OLLAMA_HOST=http://127.0.0.1:11434 /bin/ollama ps >/dev/null 2>&1; do sleep 1; done; OLLAMA_HOST=http://127.0.0.1:11434 /bin/ollama pull nomic-embed-text; OLLAMA_HOST=http://127.0.0.1:11434 /bin/ollama pull llama3.2:3b; kill $pid; wait $pid 2>/dev/null; exec /bin/ollama serve'`
- **Volume:** `/root/.ollama`

**Category:** Starters · **Languages:** TypeScript, CSS, Shell, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/kothai-w-ollama)
