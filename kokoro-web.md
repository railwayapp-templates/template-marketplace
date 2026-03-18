# Deploy Kokoro Web on Railway

Free AI Voice Generator with API integration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kokoro-web)

## About

Kokoro Web is a free, browser-based AI text-to-speech generator powered by the Kokoro-82M model. It creates natural-sounding voices without requiring installation and can be self-hosted to provide an OpenAI-compatible TTS API for your applications.

Hosting Kokoro Web on Railway gives you a self-hosted text-to-speech service with an OpenAI-compatible API endpoint. The application runs as a web service that can process TTS requests either through a browser interface or via API calls. The underlying Kokoro-82M model, despite being lightweight at 82 million parameters, delivers quality comparable to larger commercial models while being significantly faster and more cost-efficient. The service supports WebGPU acceleration for improved performance, multiple language accents, and various voice customization options.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kokoro-web | `ghcr.io/eduardolat/kokoro-web:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `KW_SECRET_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/kokoro/cache`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/kokoro-web)
