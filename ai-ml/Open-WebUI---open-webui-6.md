# Deploy Open WebUI on Railway

Self-hosted AI chat UI for Ollama and OpenAI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-6)

## About

Open WebUI is a self-hosted, feature-rich chat interface for AI models that you can deploy on Railway in minutes. It connects to Ollama for local LLMs and to any OpenAI-compatible API, giving you a polished ChatGPT-like experience with full data privacy and no per-seat fees.

Hosting Open WebUI requires running its Python-based web server alongside persistent storage for chat history, user accounts, and settings. It uses SQLite by default, so no separate database service is needed — but the SQLite file lives on disk, so attach a Railway volume mounted at `/app/backend/data` if you want chats and accounts to survive redeploys.

The app reads its configuration from environment variables at startup: your OpenAI API key or Ollama base URL, auth settings, and a secret key for session management. On Railway, the service deploys from a Dockerfile with a single click and gets a public HTTPS URL automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openwebui-railway | [Amritasha/openwebui-railway](https://github.com/Amritasha/openwebui-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `WEBUI_AUTH` | true |
| `ENABLE_SIGNUP` | true |
| `OPENAI_API_KEY` | (secret) |
| `WEBUI_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/open-webui-6)
