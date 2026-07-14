# Deploy LLaMA.cpp on Railway

Lightweight OpenAI-compatible LLM inference server. Add GGUF models with HF

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llamacpp-1)

## About

Deploy a private, OpenAI-compatible LLM inference server on Railway in minutes. Drop GGUF-format models into a persistent volume and instantly serve chat completions, text completions, and embeddings through standard OpenAI API endpoints — no GPU, no API keys from third parties, no data leaving your infrastructure.

LLaMA.cpp runs as a single Docker container using [llama-cpp-python](https://github.com/abetlen/llama-cpp-python), optimized for Railway's Hobby tier with a ~50–200 MB baseline RAM footprint. Models live in a persistent Railway volume and load lazily on the first request, so builds stay fast and redeploys never re-download your weights. The server exposes OpenAI-compatible endpoints (`/v1/chat/completions`, `/v1/completions`, `/v1/models`, `/v1/embeddings`) that work as a drop-in backend for OpenAI SDKs, LangChain, and any ChatGPT-style UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-llama-cpp | [INAPP-Mobile/railway-llama-cpp](https://github.com/INAPP-Mobile/railway-llama-cpp) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `N_CTX` | 4096 | Context window size in tokens. Increase for longer conversations (e.g., 8192, 16384). Higher values use more memory. |
| `HF_TOKEN` | (secret) | Hugging Face access token for downloading from private repos. Not needed for public models. Use Railway secret store for this value. |
| `N_THREADS` | 4 | Number of CPU threads to use for inference. Increase for multi-core CPUs. Set to 1 for single-threaded operation. |
| `MODEL_PATH` | /opt/models/.cache/huggingface | Directory path where GGUF model files are mounted (Railway volume mount). Mount your models to this path via the volume settings. |
| `HF_HUB_CACHE` | /opt/models/.cache/huggingface | Huggingface CLI cache path |
| `DEFAULT_MODEL` | - | Optional: Specific model filename to load by default (e.g., 'llama-2-7b.Q4_0.gguf'). Leave empty to auto-detect from mounted models. |
| `HF_TOKEN_PATH` | (secret) | Huggingface CLI cache path |
| `MODEL_REPO_ID` | - | Hugging Face repo with GGUF models to auto-download on startup (requires HF_TOKEN if private repo). Example: unsloth/Meta-Llama-3.1-8B-Instruct-GGUF |
| `HF_ASSETS_CACHE` | /opt/models/.cache/huggingface/assets | Huggingface CLI cache path |
| `HF_STORED_TOKENS_PATH` | (secret) | Huggingface CLI cache path |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/models/.cache/huggingface`

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/llamacpp-1)
