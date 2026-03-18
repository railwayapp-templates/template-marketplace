# Deploy Open WebUI on Railway

User-friendly ChatGPT UI alternative designed to operate offline. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/2yb5lj)

## About

### Overview
This template deploys Open WebUI (formerly Ollama WebUI), an extensible, feature-rich, and user-friendly self-hosted web interface designed to operate entirely offline. It supports various LLM runners, including Ollama and OpenAI-compatible APIs.

### Learn More
* [Open-Source ChatGPT UI Alternative with Open WebUI](https://alphasec.io/open-source-chatgpt-ui-alternative-with-open-webui/)
* [Open WebUI site](https://openwebui.com/)
* [Open WebUI GitHub repo](https://github.com/open-webui/open-webui)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_BASE_URL` | https://ollama.com |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/2yb5lj)
