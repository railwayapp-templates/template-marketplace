# Deploy Ollama [Updated Mar '26] on Railway

[Mar '26] Self-host your own LLM model server with a single click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ollama-or-self-host-open-source-llms)

## About

**Ollama** lets you run and serve open-source LLMs like Llama 3, Mistral, and Gemma — locally or in the cloud.  
This Railway template deploys a fully configured Ollama model server that exposes an **OpenAI-compatible API**, ready for use with **Flowise**, **AnythingLLM**, **LangChain**, or your own apps.

---

This one-click Railway template gives you a private, fully self-hosted ChatGPT alternative.  
It runs **Ollama** (model backend) and **OpenWebUI** (browser chat interface) in a single cloud project, already networked together through Railway’s private environment variables.  
Everything is pre-configured — from ports and URLs to security keys — so you can focus on using the models, not wiring the infrastructure.  

Once deployed, you get:
- A hosted Ollama API (`http://ollama.railway.internal:11434`)  

It’s ideal for creators, developers, or teams who want local AI control with cloud simplicity.


---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ollama | `ollama/ollama` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OLLAMA_HOST` | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | * | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/ollama-or-self-host-open-source-llms)
