# Deploy Open WebUI on Railway

Your self-hosted interface for local and cloud AI models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-ai-platform)

## About

Open WebUI is a self-hosted AI interface for chatting with local and cloud AI models from one modern web application. It provides a familiar chat experience while giving you control over users, conversations, model connections, knowledge, prompts, tools, and integrations.

This template deploys **Open WebUI as a standalone AI workspace** with persistent storage.

Open WebUI can connect to Ollama, OpenAI-compatible APIs, LiteLLM, OpenRouter, remote model gateways, and other supported AI backends. Providers are configured after deployment, so the template stays flexible and is not tied to one model vendor.

Persistent storage keeps user accounts, conversations, settings, knowledge data, and application state available across restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `openwebui/open-webui:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Railway public service port |
| `WEBUI_URL` | - | Public URL of the Open WebUI instance |
| `WEBUI_AUTH` | true | Enable user authentication |
| `DO_NOT_TRACK` | true | Disable optional tracking |
| `WEBUI_SECRET_KEY` | (secret) | Persistent secret used for sessions and authentication |
| `SCARF_NO_ANALYTICS` | true | Disable Scarf analytics |
| `ANONYMIZED_TELEMETRY` | false | Disable anonymized telemetry |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-ai-platform)
