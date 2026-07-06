# Deploy Open WebUI with Ollama on Railway

[Jul'26] Open WebUI with Ollama bundled. Download models, chat privately.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-with-ollama)

## About

Open WebUI with Ollama is a self-hosted AI chat workspace that bundles Open WebUI and Ollama together in one deployment. It lets you run a private AI interface, download the models you need, and chat through a clean web UI without relying on a separate model server.

![Imgur](https://imgur.com/A0174wZ.png)

Hosting Open WebUI with Ollama gives you an all-in-one AI workspace where the chat interface and local model runtime are bundled together. This template uses the Open WebUI Ollama image, which includes Ollama inside the same environment. After deployment, you can open Open WebUI, download supported Ollama models, and start chatting privately from your own hosted instance. Because this setup includes persistent storage mounted to Open WebUI's backend data directory, your Open WebUI data, conversations, and settings can remain available across redeploys when the volume is attached correctly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui-ollama | `ghcr.io/open-webui/open-webui:ollama` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `WEBUI_AUTH` | true |
| `DO_NOT_TRACK` | true |
| `WEBUI_SECRET_KEY` | (secret) |
| `SCARF_NO_ANALYTICS` | true |
| `OPENAI_API_BASE_URL` | https://api.openai.com/v1 |
| `ANONYMIZED_TELEMETRY` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-with-ollama)
