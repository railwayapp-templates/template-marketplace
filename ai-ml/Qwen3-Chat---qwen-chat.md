# Deploy Qwen3 Chat on Railway

[May '26] Self-host Alibaba's Qwen models locally, using Ollama+OpenWebUI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qwen-chat)

## About

Qwen3 is Alibaba's open-source large language model series, offering efficient performance with smaller parameter sizes (0.6B to 235B). It excels at multilingual tasks, code generation, and reasoning while using significantly less memory than GPT-class models. You can run Qwen3 locally or on private infrastructure without API costs.

This template deploys **Ollama**, pulls **Qwen3** automatically at boot, and boots up **OpenWebUI** so you have a clean chat interface the moment your service goes live. Instead of provisioning GPU servers or manually wiring API routes, Railway builds, boots, and networks both services for you.

You get:
– An Ollama runtime hosting the Qwen3 model
– A private API endpoint for inference
– A browser-based chat UI to test the model immediately
– Full flexibility to pull additional models, swap versions, or load your own modelfile

This is one of the fastest ways to self-host an open-source model without dealing with CUDA versions, driver mismatches, or system-level setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Web service |
| qwen3 | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_BASE_URL` | Open-WebUI | - | Points OpenWebUI to the internal Ollama API endpoint for model access. |
| `WEBUI_SECRET_KEY` | Open-WebUI | (secret) | Secret key used by OpenWebUI to secure sessions and authentication. |
| `CORS_ALLOW_ORIGIN` | Open-WebUI | * | Allows the web UI to connect from any origin. |
| `OLLAMA_HOST` | qwen3 | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | qwen3 | - | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |
| `OLLAMA_DEFAULT_MODELS` | qwen3 | qwen3:1.7b | You can specify the qwen model to download at boot time (from https://ollama.com/library). Default is qwen3:1.7b |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Start command:** `bash -c "ollama serve & sleep 5 && ollama pull $OLLAMA_DEFAULT_MODELS && wait"`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qwen-chat)
