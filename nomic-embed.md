# Deploy Nomic Embed on Railway

Generate high-quality text embeddings with Google's best model

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nomic-embed)

## About

Nomic Embed Text is an 8192 context length text encoder that surpasses OpenAI text-embedding-ada-002 and text-embedding-3-small performance on short and long context tasks. 

Released in February 2024, it was the first long-context embedding model to outperform OpenAI's flagship embedding models and features Matryoshka learning for variable-sized embeddings between 64 and 768 dimensions.

Hosting Nomic Embed Text provides access to one of the best embedding models available, offering exceptional performance on both monolingual and multilingual tasks with an extended 8192 token context window. 

The deployment handles long-form document processing, semantic similarity computations, and supports variable embedding dimensions through Matryoshka representation learning. This allows you to trade off embedding size for performance based on your specific needs, making it ideal for applications requiring flexible, high-quality text representations without external API dependencies.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nomic Embed Text | `ollama/ollama` | Database |
| Auth Proxy | [FraglyG/CaddyAuthProxy](https://github.com/FraglyG/CaddyAuthProxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Nomic Embed Text | 11434 | - |
| `MODEL` | Nomic Embed Text | nomic-embed-text:latest | Model from https://ollama.com/library |
| `PORT` | Auth Proxy | 80 | - |
| `API_KEY` | Auth Proxy | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "ollama serve & pid=$!; sleep 5; ollama pull $MODEL; wait $pid"`
- **Volume:** `/root/.ollama`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/nomic-embed)
