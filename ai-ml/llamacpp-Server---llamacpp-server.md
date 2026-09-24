# Deploy llama.cpp Server on Railway

llama.cpp server with an OpenAI-compatible API running GGUF models on CPU.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llamacpp-server)

## About

llama.cpp is the widely used C/C++ engine for running large language models locally, and `llama-server` is its lightweight HTTP server. It loads GGUF models, offers an OpenAI-compatible chat and completions API with streaming, tool calling and JSON schema output, and runs efficiently on CPUs without a GPU.

This template deploys the official llama.cpp server image (v0.5.0) on CPU with `ggml-org/Qwen3-0.6B-GGUF` as the default model. The model is downloaded from Hugging Face on first start into a Railway volume and reused on restarts. Every request needs the generated API key. The thread count is pinned to 4: containers see the host's cores, and the default over-subscribed the CPU quota and slowed generation to a crawl. With 4 threads the small model generated about 70 to 90 tokens per second in testing. Larger models need more memory and a bigger plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| llamacpp | `ghcr.io/ggml-org/llama.cpp:server-v0.5.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `HF_HOME` | /models/hf |
| `LLAMA_CACHE` | /models |
| `LLAMA_API_KEY` | (secret) |
| `LLAMA_ARG_HOST` | :: |
| `LLAMA_ARG_PORT` | 8080 |
| `LLAMA_ARG_ALIAS` | qwen3-0.6b |
| `LLAMA_ARG_HF_REPO` | ggml-org/Qwen3-0.6B-GGUF |
| `LLAMA_ARG_THREADS` | 4 |
| `LLAMA_ARG_CTX_SIZE` | 4096 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/models`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/llamacpp-server)
