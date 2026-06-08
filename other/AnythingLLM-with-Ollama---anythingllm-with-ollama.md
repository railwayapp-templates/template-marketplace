# Deploy AnythingLLM with Ollama on Railway

All-in-one AI app for chat docs, AI agents, multi-user, and configurable

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingllm-with-ollama)

## About

AnythingLLM with Ollama is a self-hosted AI stack that combines a powerful LLM orchestration layer (AnythingLLM) with a local model inference engine (Ollama). This setup allows you to run private AI assistants, chat with documents, build RAG pipelines, and deploy custom AI workflows without relying on external LLM APIs, external databases (like PostgreSQL), or caching layers (like Redis).

Hosting AnythingLLM with Ollama on Railway involves deploying two lightweight services: the AnythingLLM application as the main user interface/orchestration layer, and Ollama as the local model runtime engine. 

Both services communicate securely over Railway’s private networking.

By default, AnythingLLM uses an internal, self-contained **SQLite database** to store workspaces, document embeddings, and configuration. To ensure your data persists across redeployments, you simply need to mount a **Railway Volume** to your AnythingLLM service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ollama | `ollama/ollama:latest` | Database |
| AnythingLLM | `mintplexlabs/anythingllm:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OLLAMA_HOST` | Ollama | :: |
| `OLLAMA_DEFAULT_MODELS` | Ollama | llama3.2:1b |
| `PORT` | AnythingLLM | 3001 |
| `SERVER_PORT` | AnythingLLM | 3001 |
| `STORAGE_DIR` | AnythingLLM | /storage |
| `LLM_PROVIDER` | AnythingLLM | ollama |
| `OLLAMA_MODEL` | AnythingLLM | llama3 |

## Configuration

- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/anythingllm-with-ollama)
