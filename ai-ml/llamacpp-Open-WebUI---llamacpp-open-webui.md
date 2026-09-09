# Deploy llama.cpp + Open WebUI on Railway

Deploys llama.cpp (free tokens) +Open WebUI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llamacpp-open-webui)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Q1VldK)

Run your own private AI chat — **llama.cpp** (`llama-server`) serving open models with raw, first-party performance, and **Open WebUI** on top: a polished, self-hosted ChatGPT-style interface. No API keys, no rate limits, no per-token bills — your prompts never leave your Railway instance.

> 🎯 **Stop renting tokens. Own them.** With closed-model APIs you pay for every token, forever. Here, tokens are unlimited and free — you only pay for infrastructure.

This template deploys a lean, production-ready two-service stack:

- ⚡ **llama.cpp server** — the inference engine used by virtually every local-AI tool, running as a **single static process** (no daemon/runner layers). Serves the OpenAI-compatible API on the private network, with explicit control over threads, context size, and quantized KV cache.
- 💬 **Open WebUI** — multi-user ChatGPT-style interface: history, markdown, voice, document RAG, web search. The only public-facing service.
- 💾 **Two persistent volumes** — one for GGUF model files, one for users, chats, and uploads. Everything survives redeploys.
- 🔁 **Automatic model bootstrap** — on boot, the start script checks the volume and downloads `MODEL_URL` only if missing.

**Why llama.cpp instead of heavier runtimes:** new model families land here **first** (the engine is updated upstream within days of a release), it runs as one process with no background scheduler, and every performance knob — threads, context, KV cache type, flash attention — is an explicit flag you control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |
| llama-server | `ghcr.io/ggml-org/llama.cpp:server` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OPENAI_API_KEY` | open-webui | (secret) | open ai api key |
| `ENABLE_OLLAMA_API` | open-webui | - | flag to enable open ai compatible endpoint |
| `OPENAI_API_BASE_URL` | open-webui | - | openai compatible base url |
| `LLAMA_CACHE` | llama-server | /models | llama cache |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Start command:** `/app/llama-server -hf ggml-org/Qwen3.5-0.8B-GGUF:Q4_0 --host 0.0.0.0 --port 8080 --threads 4 --ctx-size 4096`
- **Volume:** `/models`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/llamacpp-open-webui)
