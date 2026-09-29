# Deploy 9router on Railway

Self-hosted AI router for Cursor, Claude, Gemini, OpenAI & 60+ AI providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-4)

## About

9router is a self-hosted AI gateway that lets you connect coding tools such as Claude Code, Codex, Cursor, Cline, and Copilot to multiple AI providers through a single endpoint. It supports 60+ providers, provider switching, automatic fallback, multiple accounts, and an OpenAI-compatible API.

Hosting 9router on Railway gives you a publicly accessible instance of the 9router gateway without having to manage a VPS or configure a server manually. This template runs the `decolua/9router:latest` Docker image, exposes the service on port `8080`, and stores 9router data in a persistent volume mounted at `/app/data`. Railway also generates the initial dashboard password through the `INITIAL_PASSWORD` variable. After deployment, open your Railway URL, log in to the 9router dashboard, add your AI providers, and configure your coding tools or applications to use the 9router endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | `decolua/9router:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | /app/data | Volume Path |
| `INITIAL_PASSWORD` | (secret) | Initial password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-4)
