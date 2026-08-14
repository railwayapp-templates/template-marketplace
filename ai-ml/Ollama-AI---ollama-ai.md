# Deploy Ollama AI on Railway

Run your private AI models with a clean web interface, ready in 1 click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-ai)

## About

Ollama makes it easy to run open AI models, while Open WebUI provides a modern, self-hosted interface for chatting with and managing those models.

This template combines both into a simple private AI stack with persistent storage, making it easy to run models such as Llama, Qwen, Mistral, Gemma, Phi, and many others from a web interface.

![Ollama AI with Open WebUI](https://imgur.com/uCGVznx.png)

This template deploys two connected services:

* **Ollama** — runs and manages AI models
* **Open WebUI** — provides the web interface for chat, model management, users, knowledge, prompts, tools, and integrations

The services communicate over Railway's private network, while only Open WebUI needs to be exposed publicly.

Both services use persistent storage so downloaded models, user accounts, conversations, settings, and application data survive restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama | `ollama/ollama:latest` | Database |
| open-webui | `ghcr.io/open-webui/open-webui:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_HOST` | ollama | 0.0.0.0:11434 | Listen on all interfaces so Open WebUI can reach Ollama over Railway private networking |
| `OLLAMA_ORIGINS` | ollama | - | Allow requests from services using the Railway private domain |
| `PORT` | open-webui | 8080 | Railway public service port |
| `WEBUI_URL` | open-webui | - | Public URL used by Open WebUI |
| `WEBUI_AUTH` | open-webui | true | Enable built-in user authentication |
| `DO_NOT_TRACK` | open-webui | true | Disable optional tracking where supported |
| `OLLAMA_BASE_URL` | open-webui | - | Connect Open WebUI to Ollama over Railway private networking |
| `WEBUI_SECRET_KEY` | open-webui | (secret) | Persistent secret used for sessions and authentication |
| `ENABLE_OLLAMA_API` | open-webui | true | Enable Ollama API integration |
| `SCARF_NO_ANALYTICS` | open-webui | true | Disable Scarf analytics |
| `OPENAI_API_BASE_URL` | open-webui | https://api.openai.com/v1 | Default OpenAI-compatible API endpoint |
| `ANONYMIZED_TELEMETRY` | open-webui | false | Disable anonymized telemetry |

## Configuration

- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-ai)
