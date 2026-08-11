# Deploy ChatGPT Web Midjourney Proxy on Railway

A web UI supporting AI chat, art, music, video, dance, and live voice.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatgpt-web-midjourney-proxy)

## About

ChatGPT Web Midjourney Proxy is a web UI for interacting with AI services through a single interface. It supports AI conversations, image generation, music generation, video generation, AI dance, and real-time voice conversations. The application is designed for users who want a web-based interface for accessing multiple AI capabilities.

Hosting ChatGPT Web Midjourney Proxy on Railway involves deploying the provided Docker image as a Railway service. The application listens on port `3002` and binds to `0.0.0.0` so it can receive connections through Railway's public networking. An OpenAI API key is required, with the application configured to use `https://api.openai.com` as its API base URL. Railway provides the container runtime, public HTTP networking, and HTTPS domain needed to access the web interface. No database, persistent volume, or additional infrastructure service is documented in the supplied configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatgpt-web-midjourney-proxy | `ydlhero/chatgpt-web-midjourney-proxy:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 3002 |
| `OPENAI_API_KEY` | (secret) |
| `OPENAI_API_BASE_URL` | https://api.openai.com |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/chatgpt-web-midjourney-proxy)
