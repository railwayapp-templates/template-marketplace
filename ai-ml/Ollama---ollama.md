# Deploy Ollama on Railway

Run open-source LLMs with Ollama and persistent model storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama)

## About

Ollama is an open-source model runner and API for downloading, managing, and serving large language models such as Llama, Gemma, Qwen, and DeepSeek. It packages models behind a simple HTTP interface, making private inference and integration with applications, agents, and developer tools straightforward.

Hosting Ollama on Railway runs the official pinned container as a single CPU-based service. Model inference is resource intensive: choose enough memory for the selected model and expect CPU inference to be slower than GPU-backed hardware. A persistent volume mounted at `/root/.ollama` retains downloaded model blobs and metadata across redeploys, so storage needs grow with every model. The Ollama API is exposed through the Railway domain on port `11434`. No model is bundled with the image; after deployment, pull only models sized appropriately for your available memory and disk, using an Ollama client or an API request before sending inference workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama | `ollama/ollama:0.32.0@sha256:57f573b47f1f71ebb445789f279fe3e596a8beab182f7cf486db9205bad87c5a` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama)
