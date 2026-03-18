# Deploy zeroclaw-docker on Railway

Deploy and Host zeroclaw-docker with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zeroclaw-docker)

## About

ZeroClaw is a Rust-first autonomous agent runtime optimized for performance, security, and extensibility. It provides an HTTP/WebSocket gateway for LLM-powered agents, supports multiple model providers (OpenRouter, OpenAI, Anthropic, Gemini, Groq, and more), and connects to chat channels like Telegram, Discord, and Slack — all from a single lightweight binary under 9 MB.

Deploying ZeroClaw involves building a statically compiled Rust binary inside a multi-stage Docker pipeline. The release image uses a distroless base (`gcr.io/distroless/cc-debian13:nonroot`) with no shell or package manager, running as a non-root user for minimal attack surface. Railway handles the Docker build automatically — you provide an LLM provider API key, and the template configures port binding, health checks, and restart policies. The resulting service exposes an HTTP/WebSocket API gateway with a baseline memory footprint under 5 MB and sub-10 ms cold starts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zeroclaw | `ghcr.io/zeroclaw-labs/zeroclaw:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |
| `PROVIDER` | ${PROVIDER:-openrouter} |
| `ZEROCLAW_GATEWAY_PORT` | ${ZEROCLAW_GATEWAY_PORT:-42617} |
| `ZEROCLAW_ALLOW_PUBLIC_BIND` | true |

## Configuration

- **Volume:** `/zeroclaw-data`

**Category:** Other

[View on Railway →](https://railway.com/template/zeroclaw-docker)
