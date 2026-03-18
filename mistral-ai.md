# Deploy Mistral AI on Railway

[Mar '26] Self-host Mistral models locally, using Ollama+OpenWebUI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mistral-ai)

## About

Mistral is one of the most capable open-source model families available today. Known for strong reasoning, concise outputs, and excellent performance per parameter, the Mistral series includes lightweight base models, instruction-tuned chat variants, and larger 7B+ models that rival proprietary systems. Mistral 7B is widely used for code generation, agents, structured output, and general-purpose chat.

This template deploys **Ollama** as the model runtime and automatically pulls **mistral:7b** on startup, giving you a ready-to-use inference server immediately after deployment. It includes **OpenWebUI** as the frontend, so you can interact with the model, test prompts, and explore system tools without writing a single line of code.

Railway handles the networking between services, persistent storage, and environment variables, letting you run Mistral without touching CUDA, GPUs, Dockerfiles, or custom servers. With this template, you get a clean chat interface and a private API endpoint in under a minute.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Web service |
| mistral | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_BASE_URL` | Open-WebUI | - | Points OpenWebUI to the internal Ollama API endpoint for model access. |
| `WEBUI_SECRET_KEY` | Open-WebUI | (secret) | Secret key used by OpenWebUI to secure sessions and authentication. |
| `CORS_ALLOW_ORIGIN` | Open-WebUI | * | Allows the web UI to connect from any origin. |
| `OLLAMA_HOST` | mistral | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | mistral | - | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |
| `OLLAMA_DEFAULT_MODELS` | mistral | mistral:7b | You can specify the Mistral model to download at boot time (from https://ollama.com/library). Default is mistral:7b |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Start command:** `bash -c "ollama serve & sleep 5 && ollama pull $OLLAMA_DEFAULT_MODELS && wait"`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/mistral-ai)
