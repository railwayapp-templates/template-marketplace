# Deploy Llama Index on Railway

Llama Index w/Basic Auth (Updated Apr 2026)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llama-index)

## About

LlamaIndex PDF Chat is a document intelligence app that lets you upload PDFs and chat with them using local Ollama (free) or OpenAI. It uses LlamaIndex for retrieval-augmented generation (RAG) over PDF documents, with a Streamlit UI and nginx basic auth for protection.

Hosting LlamaIndex PDF Chat gives you a fully private, self-hosted document Q&amp;A system. Upload any PDF and start asking questions — the app chunks, indexes, and retrieves relevant passages to generate accurate answers. All data stays on your Railway deployment with no third-party API calls required (unless you choose OpenAI).

The deployment runs as a single container: nginx sits in front as a reverse proxy and auth wall, Streamlit serves the UI, and LlamaIndex handles the PDF parsing and LLM inference. A /data volume persists uploaded PDFs and the search index across restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| llama-index | [0xBadMad/llamaindex-pdf-chat-railway](https://github.com/0xBadMad/llamaindex-pdf-chat-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `ADMIN_PASSWORD` | (secret) | Admin Password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/llama-index)
