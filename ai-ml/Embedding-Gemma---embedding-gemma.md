# Deploy Embedding Gemma on Railway

Generate high-quality text embeddings with Google's best model

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/embedding-gemma)

## About

EmbeddingGemma is Google's state-of-the-art embedding model that generates vector representations of text for search and retrieval tasks. With just 308M parameters, it achieves #1 ranking on the MTEB leaderboard among models under 500M parameters, making it perfect for privacy-focused, on-device applications that require high-quality embeddings.

Hosting EmbeddingGemma provides access to the highest-ranking open multilingual text embedding model under 500M parameters, trained on 100+ languages and optimized to run on less than 200MB of RAM with quantization. This deployment handles vector embedding generation, multilingual text processing, and semantic similarity computations. With sub-15ms inference latency for 256 tokens, it's ideal for real-time applications requiring fast, accurate text embeddings without sending data to external services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Embedding Gemma | `ollama/ollama` | Database |
| Auth Proxy | [FraglyG/CaddyAuthProxy](https://github.com/FraglyG/CaddyAuthProxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Embedding Gemma | 11434 | - |
| `MODEL` | Embedding Gemma | embeddinggemma:300m | Model from https://ollama.com/library |
| `PORT` | Auth Proxy | 80 | - |
| `API_KEY` | Auth Proxy | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "ollama serve & pid=$!; sleep 5; ollama pull $MODEL; wait $pid"`
- **Volume:** `/root/.ollama`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/embedding-gemma)
