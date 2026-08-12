# Deploy StakeVladDracula - AI API Proxy Service on Railway

Pure AI API Proxy Service - No UI, Just Performance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stakevladdracula)

## About

StakeVladDracula is a pure AI API proxy service that routes requests to multiple AI providers through a unified API endpoint. It supports OpenAI, OpenAI Responses API, Claude, Gemini, and Groq. The service has no frontend UI and is designed for API integrations, routing requests through a single deployed endpoint.

Hosting StakeVladDracula on Railway involves deploying the `main` branch of the GitHub repository as a Railway service. The documented Railway configuration uses the Docker runtime and exposes the application's HTTP service on port `80`. The application binds to `0.0.0.0` so it can receive traffic through Railway's network. Railway provides the public HTTPS domain used to access the API proxy, while `SERVER_NAME` is configured using the Railway public domain. No database or persistent storage is documented as required. After deployment, applications can use the Railway URL as their API base URL for supported OpenAI, Claude, Gemini, and Groq integrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| StakeVladDracula | [Herm-Studio/StakeVladDracula](https://github.com/Herm-Studio/StakeVladDracula) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 80 |
| `FORCE_CONTAINERIZED` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/stakevladdracula)
