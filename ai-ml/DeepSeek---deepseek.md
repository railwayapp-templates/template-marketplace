# Deploy DeepSeek on Railway

[Apr '26] Self Host DeepSeek models and chat via a chat UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deepseek)

## About

This Railway template lets you deploy DeepSeek models using Ollama and OpenWebUI without manual setup. It includes a model server, a chat interface, persistent storage, and automatic model downloads. You only choose which DeepSeek models to load, and the template handles the rest.

Hosting DeepSeek models usually requires configuring an inference backend, setting up storage, and manually downloading models. This template handles those steps for you. It boots Ollama, downloads the DeepSeek models listed in your environment variable, connects OpenWebUI, and stores everything on a persistent volume. You can change the model list anytime and redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Web service |
| deepseek | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_BASE_URL` | Open-WebUI | - | Points OpenWebUI to the internal Ollama API endpoint for model access. |
| `WEBUI_SECRET_KEY` | Open-WebUI | (secret) | Secret key used by OpenWebUI to secure sessions and authentication. |
| `CORS_ALLOW_ORIGIN` | Open-WebUI | * | Allows the web UI to connect from any origin. |
| `OLLAMA_HOST` | deepseek | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | deepseek | - | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |
| `OLLAMA_DEFAULT_MODELS` | deepseek | deepseek-r1:1.5b | You can specify the deepseek model to download at boot time (from https://ollama.com/library). Default is deepseek-r1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Start command:** `bash -c "ollama serve & sleep 5 && ollama pull $OLLAMA_DEFAULT_MODELS && wait"`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deepseek)
