# Deploy hajimi - Gemini API Proxy on Railway

OpenAI-compatible Gemini API proxy with key rotation & Vertex AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hajimi-gemini-api-proxy)

## About

hajimi is a high-performance Gemini API proxy built with FastAPI that exposes Google Gemini models through an OpenAI-compatible API. It supports API key rotation, AI Studio and Vertex AI, streaming responses, multimodal inputs, online search, caching, rate limiting, and an easy-to-use web dashboard for managing your AI gateway.

hajimi provides a production-ready API gateway for Google's Gemini models while maintaining compatibility with the OpenAI Chat Completions API. This Railway template deploys hajimi with persistent storage, allowing you to securely manage Gemini API keys, configure advanced proxy features, and expose a stable REST API for AI applications. Built on FastAPI, hajimi includes automatic API key polling, streaming and non-streaming responses, multimodal support, optional web search, Vertex AI compatibility, configurable rate limits, caching, and an intuitive web interface. Railway handles deployment, networking, health checks, and scaling so you can focus on building AI-powered applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| beijixingxing/hajimi:latest | `beijixingxing/hajimi:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Asia/Shanghai |
| `PASSWORD` | (secret) |
| `SEARCH_MODE` | false |
| `WEB_PASSWORD` | (secret) |
| `ENABLE_VERTEX` | false |
| `PRECISE_CACHE` | false |
| `RANDOM_STRING` | true |
| `ENABLE_STORAGE` | true |
| `FAKE_STREAMING` | true |
| `GEMINI_API_KEYS` | (secret) |
| `API_KEY_DAILY_LIMIT` | (secret) |
| `CONCURRENT_REQUESTS` | 1 |
| `MAX_EMPTY_RESPONSES` | 5 |
| `RANDOM_STRING_LENGTH` | 5 |
| `MAX_CONCURRENT_REQUESTS` | 3 |
| `MAX_REQUESTS_PER_MINUTE` | 30 |
| `MAX_REQUESTS_PER_DAY_PER_IP` | 600 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/hajimi/settings`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hajimi-gemini-api-proxy)
