# Deploy Ollama — Private LLM & Embeddings API on Railway on Railway

Self-host Ollama: private LLM & embeddings API, OpenAI-compatible. No GPU.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-llm-api)

## About

![Ollama local LLM API server](https://github-production-user-asset-6210df.s3.amazonaws.com/3325447/264390813-4b63b9ee-f9c9-4aa1-8e2f-3b9e3df13295.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260705%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260705T081820Z&X-Amz-Expires=300&X-Amz-Signature=18ad01ec1d0534ca28531159c14d1c11ac52be62a8d789410381c65259c50555&X-Amz-SignedHeaders=host&response-content-type=image%2Fgif)

Ollama is the simplest way to run open large language models through a clean REST API —
**150k+ GitHub stars**. Pull a model with one command and serve Llama 3.2, Phi-4, Gemma,
Mistral, Qwen, or embedding models over an OpenAI-compatible endpoint. This template gives you a
private, always-on Ollama API on Railway that your other services can call over the private
network — no local machine kept running, no third-party inference bill.

**Best for small models and embeddings.** Railway runs CPU inference (no GPU), so this template
shines as a private endpoint for embedding models and small chat models (1B–8B) — powering RAG,
search, and lightweight agents at a flat ~$5–20/month instead of per-token API fees.

---

Running Ollama locally means keeping your own machine on 24/7 for anything that needs the API.
Hosting it on Railway gives you an always-on inference endpoint your apps can hit any time —
without a GPU cloud bill or per-token SaaS pricing for the many workloads that small models
handle perfectly well.

Railway runs CPU-based inference (no GPU available), so this template is built for the workloads
that thrive there: **embedding models** (`nomic-embed-text`, `mxbai-embed-large`) for RAG and
semantic search, and **small chat models** (Llama 3.2 1B/3B, Phi, Gemma 2B, Qwen 0.5–7B) for
classification, extraction, and lightweight agents. Large models (30B+) will run but slowly —
match your model choice to CPU inference and this is a genuinely useful private endpoint.

Typical cost: **~$5–20/month** on Railway depending on model size and RAM. Compared to OpenAI's
embedding and small-model API fees at scale, a flat-rate private Ollama endpoint pays for itself
fast on high-volume embedding and classification workloads.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `open-webui/open-webui` | Database |
| Ollama | `ollama/ollama` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_HOST` | :: |

## Configuration

- **Volume:** `/app/backend/data`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-llm-api)
