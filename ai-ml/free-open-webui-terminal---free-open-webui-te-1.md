# Deploy free-open-webui-terminal on Railway

No need for OpenClaw! Your own computer on the cloud, free via Nvidia NIM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/free-open-webui-te-1)

## About

A single-container deployment of Open WebUI with Open Terminal, pre-configured to use free NVIDIA NIM AI models. Chat with 100+ LLMs and execute code directly in your browser — no API costs, no configuration needed.

free-open-webui-terminal bundles Open WebUI (a full-featured ChatGPT-style interface) and Open Terminal (a browser-based code execution environment) into a single container. It connects to NVIDIA NIM's free API tier, giving you access to models like Qwen, LLaMA, and Mistral at no cost. The only setup required is a free NVIDIA NIM API key — everything else (model defaults, terminal integration, secret keys) is auto-configured at startup.  Deploy once and start chatting immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatgpt-at-home | [polats/chatgpt-at-home](https://github.com/polats/chatgpt-at-home) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEBUI_ADMIN_EMAIL` | - | username for open-webui |
| `NVIDIA_NIM_API_KEY` | (secret) | get one from build.nvidia.com |
| `WEBUI_ADMIN_PASSWORD` | (secret) | strong password for open-webui |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/free-open-webui-te-1)
