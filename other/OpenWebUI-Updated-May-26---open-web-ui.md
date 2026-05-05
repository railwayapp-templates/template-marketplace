# Deploy OpenWebUI [Updated May ’26] on Railway

[May'26] Deploy and Host Open Web UI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-web-ui)

## About

Open WebUI is a feature-rich, self-hosted AI platform that lets you run and interact with large language models entirely on your own infrastructure. It supports Ollama, OpenAI, Anthropic, and any OpenAI-compatible API — all from one clean, ChatGPT-style interface you fully control.

Hosting Open WebUI requires a persistent runtime environment, a volume mount for conversation and model data, and a connection to an LLM backend such as Ollama or an external API provider. The application runs as a single Docker container exposed on port 8080, with an SQLite database handling chat history and user sessions by default. On Railway, the container is deployed directly from GitHub Container Registry, environment variables handle all provider connections, and persistent storage keeps your data intact across redeploys — no manual server configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:main` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_BASE_URL` | https://ollama.com |

## Configuration

- **Volume:** `/app/backend/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/open-web-ui)
