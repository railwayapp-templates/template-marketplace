# Deploy Open Source LLM Models on Railway

[Mar '26] Self host open LLMs + connect your ChatGPT Account

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/open-source-llm-models)

## About

This Railway template gives you a simple setup for running open‑source LLMs. It provides an Ollama model server, a browser UI, persistent storage for models, and optional OpenAI support. Everything is connected and ready to use right after deployment.
![UI of Open WebUI](https://docs.openwebui.com/assets/images/demo-f704541c988ae735dde16b8baba17627.png)

Hosting open‑source LLMs normally involves downloading models, configuring storage, setting up networking, and linking a UI. This template handles those steps for you. It starts Ollama, downloads the models you list, connects the UI, and uses a persistent volume for storage. You can adjust model choices and scale your instance whenever required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama | `ollama/ollama` | Database |
| Open WebUI | `ghcr.io/open-webui/open-webui` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_HOST` | ollama | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | ollama | - | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |
| `OLLAMA_DEFAULT_MODELS` | ollama | gemma3:270m | Comma separated list of models to download at boot start. Default is gemma3:270m |
| `OPENAI_API_KEY` | Open WebUI | (secret) | Enter your OpenAI API Key to access all the OpenAI models inside Open WebUI" |
| `OLLAMA_BASE_URL` | Open WebUI | - | Points OpenWebUI to the internal Ollama API endpoint for model access. |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Secret key used by OpenWebUI to secure sessions and authentication. |
| `CORS_ALLOW_ORIGIN` | Open WebUI | * | Allows the web UI to connect from any origin. |

## Configuration

- **Start command:** `bash -c "ollama serve & sleep 5 && for model in $(echo $OLLAMA_DEFAULT_MODELS | tr ',' ' '); do ollama pull $model; done && wait"`
- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/open-source-llm-models)
