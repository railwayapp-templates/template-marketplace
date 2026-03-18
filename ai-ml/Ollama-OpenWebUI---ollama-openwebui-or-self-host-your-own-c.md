# Deploy Ollama + OpenWebUI on Railway

[Mar '26] Deploy open-source LLMs with a simple, private web interface.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-openwebui-or-self-host-your-own-c)

## About

**Ollama + OpenWebUI** lets you run and chat with open-source LLMs like Llama 3, Mistral, or Gemma — all on your own infrastructure.  
This template deploys a ready-to-use stack on Railway with Ollama as your model server and OpenWebUI as your visual chat interface — no setup, no Docker commands, no friction.

---

This one-click Railway template gives you a private, fully self-hosted ChatGPT alternative.  
It runs **Ollama** (model backend) and **OpenWebUI** (browser chat interface) in a single cloud project, already networked together through Railway’s private environment variables.  
Everything is pre-configured — from ports and URLs to security keys — so you can focus on using the models, not wiring the infrastructure.  

Once deployed, you get:
- A hosted Ollama API (`http://ollama.railway.internal:11434`)  
- A public WebUI URL for chatting with your models  

It’s ideal for creators, developers, or teams who want local AI control with cloud simplicity.

![OpenWebUI](https://docs.openwebui.com/assets/images/demo-f704541c988ae735dde16b8baba17627.png)

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Web service |
| Ollama | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_BASE_URL` | Open-WebUI | - | Points OpenWebUI to the internal Ollama API endpoint for model access. |
| `WEBUI_SECRET_KEY` | Open-WebUI | (secret) | Secret key used by OpenWebUI to secure sessions and authentication. |
| `CORS_ALLOW_ORIGIN` | Open-WebUI | * | Allows the web UI to connect from any origin. |
| `OLLAMA_HOST` | Ollama | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | Ollama | - | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-openwebui-or-self-host-your-own-c)
