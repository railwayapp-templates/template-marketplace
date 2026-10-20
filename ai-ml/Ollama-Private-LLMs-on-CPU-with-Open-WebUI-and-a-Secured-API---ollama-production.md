# Deploy Ollama | Private LLMs on CPU with Open WebUI and a Secured API on Railway

Run open LLMs on CPU: slim Ollama, token-gated API, Open WebUI chat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/ollama-production?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=ollama-production)

[Ollama](https://github.com/ollama/ollama) runs open large language models (Llama, Qwen, Gemma, Mistral, DeepSeek and hundreds more) on your own server, with its own API and an OpenAI-compatible one. This template pairs a CPU build of Ollama, tuned for Railway, with [Open WebUI](https://github.com/open-webui/open-webui) for a ChatGPT-style chat in the browser. Your prompts and documents never leave your Railway project.

Two services, each with a Railway volume.

- **Built for Railway's CPUs.** Railway has no GPUs, so this image is the official Ollama release with the GPU libraries removed: about 100 MB instead of 3.8 GB, so it builds and starts in seconds. It also caps the model's threads at your plan's vCPUs. Without the cap, llama.cpp sizes itself to the host's cores rather than your share of them; in our tests `llama3.2:3b` generated about 12 tokens/s with 24 threads and 55–80 tokens/s with the cap.
- **The API is locked.** Ollama has no authentication of its own, and a public Ollama URL is free compute for anyone who finds it. Here the public URL only answers requests that carry `Authorization: Bearer `. Open WebUI talks to Ollama over Railway's private network.
- **Idle costs almost nothing.** Railway counts cached files as memory. While no model is loaded, the server drops the cached model files, so an idle Ollama uses about 35 MB instead of the size of your models.
- **Ready on first boot.** A small chat model (`llama3.2:3b`) and an embedding model (`nomic-embed-text`) are pulled automatically. The Open WebUI admin account is created for you and public sign-up is closed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui:v0.12.3` | Web service |
| Ollama | [two-workspaces/ollama](https://github.com/two-workspaces/ollama) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Open WebUI | 8080 | Port Railway routes to - leave as is |
| `WEBUI_URL` | Open WebUI | - | Public URL of Open WebUI |
| `OLLAMA_BASE_URL` | Open WebUI | - | Ollama over Railway's private network |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Signs login sessions |
| `WEBUI_ADMIN_EMAIL` | Open WebUI | admin@example.com | Admin login email, created on first boot (change it later in Settings) |
| `RAG_EMBEDDING_MODEL` | Open WebUI | nomic-embed-text | Ollama embedding model (must be in OLLAMA_PULL_MODELS) |
| `RAG_EMBEDDING_ENGINE` | Open WebUI | ollama | Document embeddings run in Ollama instead of a second model inside Open WebUI |
| `WEBUI_ADMIN_PASSWORD` | Open WebUI | (secret) | Admin password, created on first boot |
| `PORT` | Ollama | 8080 | Port Railway routes to - leave as is |
| `OLLAMA_API_KEY` | Ollama | (secret) | Bearer token for the public Ollama API (Open WebUI uses the private network and doesn't need it) |
| `OLLAMA_NUM_THREADS` | Ollama | - | CPU threads per model; empty = your plan's vCPU quota |
| `OLLAMA_PULL_MODELS` | Ollama | llama3.2:3b,nomic-embed-text | Models pulled at boot, comma-separated (ollama.com/library names) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/root/.ollama`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ollama-production)
