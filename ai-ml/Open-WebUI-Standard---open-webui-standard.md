# Deploy Open WebUI Standard on Railway

Run AI on your own terms. Connect any model, extend code, protect data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-standard)

## About

Open WebUI is a self-hosted AI interface for chatting with local and cloud-based models through a clean web app. It gives users a familiar chat experience while supporting flexible model connections, user management, and extensibility for private or team AI workflows.

![Imgur](https://imgur.com/zoim8T9.png)

Hosting Open WebUI gives you your own AI workspace that you can connect to the model provider of your choice. This template deploys the Open WebUI application on Railway and keeps the setup intentionally lightweight. After deployment, you can open the admin settings and connect external providers such as Ollama, OpenAI-compatible APIs, OpenRouter, DeepSeek, Groq, Together, vLLM, or other supported backends. This approach is ideal when you want the interface hosted separately while keeping model configuration flexible and controlled from the Open WebUI dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WEBUI_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-standard)
