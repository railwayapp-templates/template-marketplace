# Deploy LocalAI — Private OpenAI API for LLM, Image & Audio on Railway

Self-host one OpenAI-compatible API — LLM, images & audio

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/localai-multimodal-openai-api)

## About

LocalAI is a self-hosted, drop-in replacement for the OpenAI API — one endpoint that handles text generation, image generation, audio transcription, text-to-speech, and embeddings, all running on your own infrastructure. Point any application built on the OpenAI SDK at LocalAI and it works with no code changes. This template deploys the CPU-optimized build with a persistent model store and API-key authentication, so you get a private, multi-modal AI API in one click.

---

LocalAI's distinguishing strength is breadth: where most local-AI tools do only chat, LocalAI is a single OpenAI-compatible endpoint for several modalities at once.

**One API, many modalities.** LocalAI implements OpenAI's endpoints for text generation, image generation (Stable Diffusion), audio transcription (Whisper), text-to-speech, and embeddings. That means one deployment can back a chatbot, generate images, transcribe audio, and produce embeddings for a RAG pipeline — all through the same API key and base URL. For anyone migrating an existing OpenAI-based app, it's a drop-in swap.

**Railway is CPU-only, so size models accordingly.** There are no GPUs on Railway, and inference runs on CPU. Models under about 4 billion parameters run well here — Phi-4 Mini (3.8B), Gemma 3 1B, TinyLlama, and quantized (Q4_K_M) versions of larger models. They respond more slowly than GPU inference but work reliably within an 8 GB container. Loading an unquantized or oversized model is the common way to hit an out-of-memory crash; stick to quantized models and a modest `CONTEXT_SIZE` and it's stable.

**The `/models` volume is essential.** Model files are typically 500 MB to 4 GB each. Without a persistent volume, every redeploy re-downloads them — slow and wasteful. This template mounts `/models` so your models persist across restarts and redeploys.

**Set `THREADS` to your core count** for best CPU performance, and always set `LOCALAI_API_KEY` on a public deployment — the endpoint is your AI backend and should never be open. Railway's automatic HTTPS secures it in transit.

Typical cost: **~$5–10/month** on Railway for a small model on an 8 GB container, depending on usage. LocalAI is MIT-licensed and free; you pay only for infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LocalAI | `localai/localai:latest-cpu` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `THREADS` | 2 |
| `CONTEXT_SIZE` | 512 |
| `LOCALAI_API_KEY` | (secret) |
| `LOCALAI_MODELS_PATH` | /models |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/models`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/localai-multimodal-openai-api)
