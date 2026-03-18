# Deploy OpenWebUI [Updated Mar ’26] on Railway

OpenWebUI [Mar ’26] (Chat with Local or Remote AI Models) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui)

## About

OpenWebUI is a modern, open-source web interface designed to provide an easy and efficient way to interact with AI models like LLaMA, Mistral, and others through a clean, intuitive interface. It allows you to run and manage local or hosted AI models with full flexibility, customization, and privacy control.

Self-hosting OpenWebUI on Railway gives you the power to run AI interfaces your way - without depending on third-party services or sharing data with external servers. When paired with Railway Workers, OpenWebUI becomes even more scalable and reliable, as workloads are efficiently distributed across multiple worker instances for fast, responsive AI interactions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui/open-webui:main | `ghcr.io/open-webui/open-webui:main` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_BASE_URL` | https://ollama.com |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui)
