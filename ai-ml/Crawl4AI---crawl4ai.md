# Deploy Crawl4AI on Railway

Open-source LLM-friendly web crawler with REST API and MCP integration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crawl4ai)

## About

Crawl4AI is an open-source, LLM-friendly web crawling and scraping framework. It extracts clean markdown, structured data, and screenshots from any webpage via a REST API. Built with async browser automation, it supports LLM-powered content extraction, streaming results, and includes a built-in monitoring dashboard, interactive playground, and MCP integration.

Deploying Crawl4AI requires running a containerized service that bundles a FastAPI server, headless Chromium browser, and Redis — all managed by supervisord. The official Docker image handles this out of the box. The service exposes a REST API on port 11235 for crawling, markdown extraction, screenshots, PDFs, and LLM-powered content extraction. To use LLM extraction features, you'll need at least one LLM provider API key (OpenAI, Anthropic, Groq, etc.), though basic crawling and markdown extraction work without any API keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Crawl4AI | `unclecode/crawl4ai:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 11235 | Crawl4AI API server port |
| `GROQ_API_KEY` | (secret) | Groq API key for fast LLM inference |
| `OPENAI_API_KEY` | (secret) | OpenAI API key for LLM-powered content extraction |
| `MISTRAL_API_KEY` | (secret) | Mistral AI API key for LLM extraction |
| `DEEPSEEK_API_KEY` | (secret) | DeepSeek API key for LLM extraction |
| `GEMINI_API_TOKEN` | (secret) | Google Gemini API token for LLM extraction |
| `TOGETHER_API_KEY` | (secret) | Together AI API key for LLM extraction |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key for Claude-based extraction |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/crawl4ai)
