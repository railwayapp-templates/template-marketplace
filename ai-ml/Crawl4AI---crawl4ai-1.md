# Deploy Crawl4AI on Railway

Open-source LLM-friendly web crawler with REST API, playground and MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crawl4ai-1)

## About

Crawl4AI is an open-source web crawler and scraper that turns web pages into clean, LLM-ready Markdown and structured data. Its self-hosted server exposes a REST API, a browser playground, and an MCP endpoint, so AI agents, RAG pipelines, and automation tools can crawl the web on demand.

Hosting Crawl4AI means running the official Crawl4AI Docker image, which bundles a FastAPI server, headless Chromium, and a private Redis instance managed by supervisord. Since version 0.9 the server refuses to accept outside connections unless an API token is configured, so every request except the health check must send `Authorization: Bearer `. Chromium needs generous memory and shared memory. This template pins the image by version and digest, generates the API token for you, gives the container 1 GiB of `/dev/shm`, gates deploys on the `/health` endpoint, and exposes the API on a public HTTPS domain. No database or volume is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Crawl4AI | [salmanalfariz24/crawl4ai-railway](https://github.com/salmanalfariz24/crawl4ai-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 11235 | Port Crawl4AI listens on. Railway sends traffic and healthchecks here. Do not change. |
| `SECRET_KEY` | (secret) | Signing key for the internal tokens Crawl4AI's MCP tools use. Generated on deploy; at least 32 characters. |
| `LLM_PROVIDER` | - | Optional. Default LLM in LiteLLM provider/model format, for example anthropic/<model>. Requests can only use this provider's family. Empty means openai/gpt-4o-mini. |
| `OPENAI_API_KEY` | (secret) | Optional. OpenAI API key for LLM features. Used by the default model openai/gpt-4o-mini. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Anthropic API key for LLM features. Also set LLM_PROVIDER to an anthropic/<model> value. |
| `CRAWL4AI_API_TOKEN` | (secret) | API token for every Crawl4AI endpoint except /health. Send it as "Authorization: Bearer <token>". Generated on deploy; keep it secret. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/crawl4ai-1)
