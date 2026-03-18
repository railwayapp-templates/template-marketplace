# Deploy Open WebUI on Railway on Railway

[Mar '26] OpenWebUI | Self-hosted AI interface. Connect with any LLM model.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/open-webui-2)

## About

**Open WebUI** is an open-source, self-hosted chat interface for large language models (LLMs). It provides a sleek, ChatGPT-like experience for interacting with models such as Ollama, OpenAI, or Anthropic—complete with RAG workflows, document uploads, and multi-user authentication.
![UI of Open WebUI](https://docs.openwebui.com/assets/images/demo-f704541c988ae735dde16b8baba17627.png)

---

Hosting Open WebUI gives you a private, production-ready interface for running and managing AI chat applications. With this template, you can deploy Open WebUI to Railway in a single click—no manual Docker setup or infrastructure provisioning required.  
Railway automatically builds, configures, and exposes your instance with HTTPS, persistent volumes, and environment variables pre-wired for external LLM backends such as **Ollama** or **OpenAI APIs**. You’ll have a secure, always-on chat UI that scales seamlessly as your workload grows.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OLLAMA_BASE_URL` | https://ollama.com | URL of the Ollama server (backend API) that OpenWebUI should connect to. |
| `WEBUI_SECRET_KEY` | (secret) | Overrides the randomly generated string used for JSON Web Token |
| `CORS_ALLOW_ORIGIN` | * | Sets the allowed origins for Cross-Origin Resource Sharing (CORS) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/open-webui-2)
