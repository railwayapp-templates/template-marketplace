# Deploy Open WebUI on Railway

Self-hosted AI chat interface for Ollama and OpenAI-compatible models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-5)

## About

Open WebUI is a self-hosted, extensible AI chat platform for local and hosted language models. It connects to Ollama and OpenAI-compatible APIs, supports retrieval-augmented generation, model management, user accounts, and a responsive interface, while keeping application data under your control on persistent storage for teams and individuals.

Hosting Open WebUI provides a private, browser-based workspace for interacting with local or remote language models without relying on a vendor-specific chat interface. This Railway template runs the official container image, exposes the application on its native port, and stores the backend database, uploads, and configuration on a persistent volume. You can connect an Ollama server, OpenAI, or another OpenAI-compatible provider through environment variables or the administration interface. Account signup is enabled for initial onboarding, while a strong secret protects signed sessions. Administrators can then manage users, models, knowledge bases, tools, and provider connections from one responsive web application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui:v0.10.2@sha256:9fcea9c6e32ab60b0498f3986c6cdf651ddbe61db48d2213a3d28048ddd673d4` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WEBUI_SECRET_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-5)
