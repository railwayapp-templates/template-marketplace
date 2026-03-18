# Deploy AnythingLLM (latest) on Railway

Chat with docs, use AI Agents, and more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingllm-latest)

## About

AnythingLLM is an all-in-one AI application with built-in RAG, AI agents, and a no-code agent builder. Chat with your documents using any LLM provider—transform PDFs, text files, and other resources into context your AI can reference.

Deploying AnythingLLM on Railway gives you a full-featured AI chat platform with document intelligence. Upload documents (PDF, TXT, DOCX, etc.) and chat with them using your preferred LLM provider—OpenAI, Anthropic, Ollama, and many more. The platform includes workspace containerization for organizing different projects, multi-user support with permissions, MCP compatibility for external tools, and a no-code agent builder. Built-in vector database (LanceDB) handles embeddings out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AnythingLLM | `mintplexlabs/anythingllm` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3001 |
| `STORAGE_DIR` | /store |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/store`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/anythingllm-latest)
