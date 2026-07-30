# Deploy Open WebUI on Railway

Self-hosted AI chat for OpenAI-compatible APIs and local models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-7)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-7)

**Published on the Railway marketplace:** https://railway.com/deploy/open-webui-7 (category: AI/ML).

Open WebUI is a self-hosted AI chat interface for local and hosted language models. It provides a polished multi-user web experience, conversation history, model management, file and knowledge features, and connections to Ollama, OpenAI, and other OpenAI-compatible APIs while keeping application data under the deployer's control.

Hosting Open WebUI on Railway requires one public container and one persistent volume. This package pins the official Open WebUI `v0.11.0` image, exposes container port `8080` through Railway HTTPS, checks the image-supported `/health` endpoint, and mounts `/app/backend/data` for the SQLite database, uploads, vector data, caches, and configuration. Authentication remains enabled. The first account is promoted atomically to administrator even though later signup is disabled, preventing an unclaimed public registration window after setup. Railway generates the JWT/session secret once per deployment. Ollama and OpenAI-compatible URLs and API keys remain optional no-default inputs and can also be configured later from the administrator UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui:v0.11.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `WEBUI_AUTH` | True |
| `ENABLE_SIGNUP` | False |
| `OPENAI_API_KEY` | (secret) |
| `WEBUI_SECRET_KEY` | (secret) |
| `DEFAULT_USER_ROLE` | pending |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-7)
