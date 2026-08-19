# Deploy Open WebUI | Self-Hosted LLM Chat with a Real Volume on Railway

Self-hosted chat UI for LLMs, on a pinned release with a persistent volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-or-self-hosted-llm-chat-with-)

## About

Open WebUI is a self-hosted web interface for large language models. It talks to Ollama or any OpenAI-compatible endpoint, keeps chats, users and settings in its own database, and runs entirely on infrastructure you control.

This template runs the official image on a pinned release, 0.10.2, rather than a floating tag, so a redeploy gives you back the same version you verified. The container listens on 8080 and is served over HTTPS on a Railway domain.

State lives on a persistent volume mounted at /app/backend/data: the database, uploaded files and the vector index survive restarts and redeploys. WEBUI_SECRET_KEY is generated per deployment, so sessions are not signed with an empty or shared key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui:0.10.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `DATA_DIR` | /app/backend/data |
| `ENABLE_SIGNUP` | true |
| `WEBUI_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-or-self-hosted-llm-chat-with-)
