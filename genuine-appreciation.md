# Deploy qwen3-embedding-4b on Railway

Deploy Qwen3-Embedding(or other models) use llama.cpp

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/genuine-appreciation)

## About

Run a production-ready llama.cpp server that serves OpenAI-compatible embeddings from GGUF models. It auto-downloads the specified model from Hugging Face or ModelScope on first start and persists it in a Railway volume to avoid re-downloading on redeploys. Authentication is enforced via API key.

This template builds and deploys a Dockerized llama.cpp server configured for embeddings. On startup, it checks a persistent volume for the GGUF model; if missing, it fetches it from your chosen platform (Hugging Face or ModelScope). Core runtime settings—port, model name, filename, context size—are injected via environment variables. An API_KEY is required and used for Bearer-token auth. The template includes a healthcheck and uses Railway volumes to persist the model across deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qwen3-embedding-railway | [xkos/qwen3-embedding-railway](https://github.com/xkos/qwen3-embedding-railway) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `API_KEY` | (secret) |
| `MODEL_NAME` | Qwen/Qwen3-Embedding-4B-GGUF |
| `CONTEXT_SIZE` | 40960 |
| `MODEL_FILENAME` | Qwen3-Embedding-4B-Q4_K_M.gguf |

## Configuration

- **Volume:** `/models`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/genuine-appreciation)
