# Deploy Typesense RAG on Railway

RAG retrieval on a Typesense index

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-rag)

## About

Deploy Typesense on Railway as the retrieval layer for RAG — pull the right chunks with hybrid keyword and vector search before your LLM answers.

Typesense RAG is a retrieval-augmented generation pattern built on a self-hosted Typesense index. You store embeddings and metadata in collections, retrieve relevant chunks, and feed them to an LLM. On Railway, run the official `typesense/typesense:30.2` image with a persistent volume at `/data`, an API key, and CORS enabled. The service listens on port 8108, keeps the index in RAM, and is GPL-3.0 licensed with no per-search fees.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [Shinyduo/typesense-railway](https://github.com/Shinyduo/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PORT |
| `TYPESENSE_URL` | - | TYPESENSE_URL |
| `TYPESENSE_API_KEY` | (secret) | TYPESENSE_API_KEY |
| `TYPESENSE_DATA_DIR` | - | TYPESENSE_DATA_DIR |
| `TYPESENSE_PUBLIC_URL` | - | TYPESENSE_PUBLIC_URL |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | TYPESENSE_THREAD_POOL_SIZE |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-rag)
