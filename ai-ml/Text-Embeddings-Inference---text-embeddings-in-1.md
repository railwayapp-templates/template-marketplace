# Deploy Text Embeddings Inference on Railway

Hugging Face Text Embeddings Inference 1.9 on CPU with an API key.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/text-embeddings-in-1)

## About

Text Embeddings Inference (TEI) is Hugging Face's high-performance server for text embedding and reranker models. It serves models such as BGE, GTE, E5, Nomic and sentence-transformers through a simple REST API and an OpenAI-compatible embeddings endpoint, with dynamic batching and fast tokenization, which makes it a drop-in backend for RAG pipelines.

This template deploys TEI v1.9.4 using the CPU image, with `BAAI/bge-small-en-v1.5` as the default model. The model is downloaded from Hugging Face on first start into a Railway volume, so restarts reuse the cache. Every request needs the generated API key as a bearer token. The service listens on IPv4 and IPv6, so other Railway services can use the private URL. The default model produces 384-dimension vectors and uses roughly 500 MB of memory. Change `MODEL_ID` for another embedding or reranker model, and size memory accordingly. Add replicas to scale throughput horizontally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tei | `ghcr.io/huggingface/text-embeddings-inference:cpu-1.9.4` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `API_KEY` | (secret) |
| `HOSTNAME` | :: |
| `MODEL_ID` | BAAI/bge-small-en-v1.5 |
| `HUGGINGFACE_HUB_CACHE` | /data |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/text-embeddings-in-1)
