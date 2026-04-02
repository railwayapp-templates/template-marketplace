# Deploy AnythingLLM on Railway

[Apr '26] One click setup for private LLM chat and agent workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingllm-on-railway-or-1-click-llm-ap)

## About

**AnythingLLM** is an open-source, privacy-first AI workspace by Mintplex Labs that lets you chat with your documents, build agent workflows, and run large language models locally or in the cloud. It supports OpenAI, Anthropic, Ollama, and more—making it one of the most versatile LLM apps to self-host or deploy in minutes.

With this template, you can deploy AnythingLLM to Railway in a **single click**— no manual Docker setup or infrastructure provisioning required.

---

Hosting AnythingLLM on Railway means deploying a fully managed instance of the AnythingLLM application stack—complete with web UI, vector storage, and LLM connectivity—without managing servers or Docker manually. 
Railway handles the infrastructure, persistent storage, networking, and environment variables automatically. In less than five minutes, you can launch a private, cloud-based RAG (Retrieval-Augmented Generation) workspace for chatting with PDFs, DOCX files, CSVs, or entire knowledge bases. 
It’s ideal for developers, data teams, or businesses looking for fast, secure, and scalable AI document chat hosting.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AnythingLLM | `mintplexlabs/anythingllm:railway` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | Internal port that the app listens on (defaults to `3001` if unset). |
| `SERVER_PORT` | 3001 | The internal port that the AnythingLLM server will use |
| `STORAGE_DIR` | - | Path to the mounted Railway volume used to store uploaded documents and embeddings. |

## Configuration

- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/anythingllm-on-railway-or-1-click-llm-ap)
