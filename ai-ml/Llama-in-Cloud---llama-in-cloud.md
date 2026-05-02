# Deploy Llama in Cloud on Railway

[May '26] Host Meta's Llama models privately, using Ollama + OpenWebUI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llama-in-cloud)

## About

Run Meta's Llama models with Ollama backend and OpenWebUI frontend on Railway's infrastructure. This template gives you a private, ChatGPT-like interface for running Llama 3.2 and other open-source models without sending data to third-party APIs.

Deploying Llama requires two components: an inference engine (Ollama) and a web interface (OpenWebUI). Ollama downloads and serves the model via API, while OpenWebUI provides the chat interface. Railway handles both services, connects them privately, and manages model downloads at boot time. The template pre-configures environment variables so Ollama listens on all network interfaces and OpenWebUI connects through Railway's internal networking—no manual configuration needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Llama | `ollama/ollama` | Database |
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_HOST` | Llama | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | Llama | - | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |
| `OLLAMA_DEFAULT_MODELS` | Llama | llama3.2:3b | You can specify the deepseek model to download at boot time (from https://ollama.com/library). Default is llama3.2:3b |
| `OLLAMA_BASE_URL` | Open-WebUI | - | Points OpenWebUI to the internal Ollama API endpoint for model access. |
| `WEBUI_SECRET_KEY` | Open-WebUI | (secret) | Secret key used by OpenWebUI to secure sessions and authentication. |
| `CORS_ALLOW_ORIGIN` | Open-WebUI | * | Allows the web UI to connect from any origin. |

## Configuration

- **Start command:** `bash -c "ollama serve & sleep 5 && ollama pull $OLLAMA_DEFAULT_MODELS && wait"`
- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/llama-in-cloud)
