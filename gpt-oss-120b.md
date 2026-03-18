# Deploy GPT-OSS 120B | Self-host GPT OSS 120B on Railway with a chat UI on Railway

[Mar '26] Ensure To Have >64GB Memory Available to Host Successfully

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gpt-oss-120b)

## About

**GPT-OSS 120B** is a powerful open-weight, 120-billion-parameter large language model designed for reasoning, coding, and chat-based interactions. With this template, you can deploy it in minutes on **Railway**, complete with a built-in API and browser-based chat interface powered by **Ollama** and **OpenWebUI**.

![ChatUI](https://ollama.com/assets/library/gpt-oss/51b69d33-c747-4117-ba76-a6efa1b0a986)
---

Hosting GPT-OSS 120B on Railway gives you a fully self-contained AI stack. It uses **Ollama** as the backend model server and **OpenWebUI** as the chat interface, preconfigured to run together automatically. Once deployed, Ollama will pull and serve the `gpt-oss:120b` model while OpenWebUI provides a clean interface for chat. You’ll also get a ready-to-use **API endpoint**, allowing you to call the model directly from any app, service, or workflow.

The setup includes persistent storage for models, so downloads only happen once, and can scale up easily by adjusting your Railway plan.
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tCe9Yx?referralCode=QXdhdr&amp;utm_medium=integration&amp;utm_source=template&amp;utm_campaign=generic)

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GPT-OSS 20B | `ollama/ollama` | Database |
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_HOST` | GPT-OSS 20B | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | GPT-OSS 20B | - | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |
| `OLLAMA_BASE_URL` | Open-WebUI | - | Points OpenWebUI to the internal Ollama API endpoint for model access. |
| `WEBUI_SECRET_KEY` | Open-WebUI | (secret) | Secret key used by OpenWebUI to secure sessions and authentication. |
| `CORS_ALLOW_ORIGIN` | Open-WebUI | * | Allows the web UI to connect from any origin. |

## Configuration

- **Start command:** `bash -c "ollama serve & sleep 5 && ollama pull gpt-oss:20b && wait"`
- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/gpt-oss-120b)
