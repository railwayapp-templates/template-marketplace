# Deploy Crawl4AI (LLM-Ready Web Crawler API) on Railway

Open-source web crawler API for LLMs & AI agents. Clean Markdown/JSON

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crawl4ai-llm-ready-web-crawler-api)

## About

Crawl4AI is the most-starred open-source web crawler built for LLMs. It renders pages with a real headless Chromium, strips boilerplate and returns clean Markdown, structured JSON (CSS/XPath or LLM-based extraction), screenshots and PDFs — everything a RAG pipeline or AI agent needs to read the web. This template deploys the official Crawl4AI REST API server so any language or agent framework can crawl through a simple HTTP call.

The template runs `unclecode/crawl4ai` as a single service on port 11235 with a public domain and a `/health` check. A random `CRAWL4AI_API_TOKEN` is generated for you and required as a Bearer token on every request, so your crawler is not open to the internet. Optional provider keys (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_TOKEN`, `GROQ_API_KEY`) enable LLM extraction strategies. Chromium is memory hungry: budget 1–2 GB RAM for comfortable concurrent crawls. No database or volume is needed — Crawl4AI is stateless, and Railway's usage-based pricing means you only pay while it runs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Crawl4AI | `unclecode/crawl4ai:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 11235 | Port the Crawl4AI API listens on |
| `GROQ_API_KEY` | (secret) | Optional: enables Groq LLM extraction strategies |
| `OPENAI_API_KEY` | (secret) | Optional: enables OpenAI LLM extraction strategies |
| `GEMINI_API_TOKEN` | (secret) | Optional: enables Gemini LLM extraction strategies |
| `ANTHROPIC_API_KEY` | (secret) | Optional: enables Anthropic LLM extraction strategies |
| `CRAWL4AI_API_TOKEN` | (secret) | Bearer token required on every API request (generated) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Tags:** crawl4ai, web-scraping, crawler, rag, llm, ai-agent, playwright, mcp

[View on Railway →](https://railway.com/deploy/crawl4ai-llm-ready-web-crawler-api)
