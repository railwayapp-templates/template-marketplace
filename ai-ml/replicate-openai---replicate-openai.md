# Deploy replicate-openai on Railway

OpenAI-compatible gateway for Replicate models. BYOK supported.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/replicate-openai)

## About

replicate-openai is an OpenAI-compatible API gateway for Replicate models. It lets you use any Replicate model — text, image, audio — with tools and SDKs that expect an OpenAI-compatible endpoint. Just change the base URL and API key, zero code changes required.

Hosting replicate-openai gives you a persistent, always-on gateway that any OpenAI-compatible client can connect to. The server runs as a lightweight FastAPI app inside Docker. It supports both streaming and non-streaming responses, pre-configured aliases for popular models like Llama 3, Mistral, Flux, and SDXL, and a BYOK mode where each client passes their own Replicate token — meaning the server owner pays nothing for inference.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| replicate-openai | [CookieShualon/replicate-openai](https://github.com/CookieShualon/replicate-openai) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/replicate-openai)
