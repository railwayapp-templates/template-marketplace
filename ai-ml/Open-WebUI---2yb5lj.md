# Deploy Open WebUI on Railway

User-friendly ChatGPT UI alternative designed to operate offline. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/2yb5lj)

## About

Open WebUI (formerly Ollama WebUI) is an extensible, self-hosted web interface for interacting with large language models. It supports Ollama and any OpenAI-compatible API, giving you a polished ChatGPT-like experience on your own infrastructure — with no data leaving your deployment.

Open WebUI is a single Docker container that serves a full-featured chat interface backed by a SQLite database. This Railway template deploys the container with a persistent volume for storing conversations, uploaded documents, user accounts, and settings across redeploys. On first visit, you create an admin account — the first user registered automatically receives admin privileges. Connect it to OpenAI-compatible APIs via environment variables or configure providers directly in the UI after login. Ollama is not bundled — if you want local model inference, deploy Ollama as a separate Railway service and point OLLAMA_BASE_URL at it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_BASE_URL` | https://ollama.com |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/2yb5lj)
