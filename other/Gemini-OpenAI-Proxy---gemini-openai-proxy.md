# Deploy Gemini-OpenAI-Proxy on Railway

Converting the OpenAI API protocol to the Google Gemini Pro protocol.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gemini-openai-proxy)

## About

Gemini-OpenAI-Proxy is an open-source gateway that translates the OpenAI API protocol into the Google Gemini API protocol. It enables OpenAI-compatible applications to communicate directly with Gemini models while supporting Chat Completions, Embeddings, Vision requests, and Model endpoints without requiring application code changes.

Railway provides a fast and reliable platform for deploying Gemini-OpenAI-Proxy using the official Docker image. The proxy runs as a lightweight stateless HTTP service that accepts OpenAI-compatible requests and forwards them to Google Gemini using your Google AI Studio API key. Railway automatically manages HTTPS, networking, deployments, and scaling, allowing developers to expose an OpenAI-compatible endpoint with minimal configuration. Since the application does not persist state, no database or Railway Volume is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gemini-openai-proxy | `zhu327/gemini-openai-proxy:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 8080 |
| `GPT_4_VISION_PREVIEW` | gemini-1.5-flash-latest |
| `DISABLE_MODEL_MAPPING` | 0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/gemini-openai-proxy)
