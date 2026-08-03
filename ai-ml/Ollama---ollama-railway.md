# Deploy Ollama on Railway

Open-source local LLM runtime: chat, embeddings, OpenAI-compatible /v1 API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-railway)

## About

Ollama is an open-source runtime that serves local large language models over plain HTTP: `/api/generate`, `/api/chat`, `/api/embed`, and an OpenAI-compatible `/v1` surface on the same port. Teams self-host Ollama to keep prompts inside their own perimeter and stop paying per token for work a 1B model does fine.

Deploy Ollama on Railway as one service running the official `ollama/ollama:0.32.5` image with a 5 GB volume at `/root/.ollama` for model storage. It listens on port `11434` and gets **no public domain by design** — Ollama enforces no authentication on any route, so a public URL is an open endpoint strangers could spend your CPU on. It answers at `http://ollama.railway.internal:11434`, where your app or worker calls it. `OLLAMA_HOST` is `[::]:11434`, not the image's IPv4-only default, because Railway private DNS returns AAAA only.

![Ollama Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1785656211/510_1x_shots_so_atprzi.png)

Self-hosting removes an external dependency from the request path: no rate limits you did not set, no provider retiring your model. It suits compliance-bound processing, high-volume batch calls, and anything a small model does well — vLLM suits GPUs and heavy concurrency.

- **One API for generation, chat and embeddings** — plus OpenAI-compatible `/v1` endpoints, so SDKs work by changing a base URL.
- **Model management and baked-in parameters over HTTP** — `pull`, `create`, `show` and `delete` handle weights; pin context, temperature or thread count into a named model. Function calling and JSON schemas are supported.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama | `ollama/ollama:0.32.5` | Database |

## Configuration

- **Healthcheck:** `/`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-railway)
