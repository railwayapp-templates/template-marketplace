# Deploy Crawl4AI on Railway

Crawl4AI is an AI-ready web crawler for LLMs, AI agents, & data pipelines.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Owzyy8)

## About

Crawl4AI is the #1 trending GitHub repository, actively maintained by a vibrant community. It delivers blazing-fast, AI-ready web crawling tailored for large language models, AI agents, and data pipelines. Fully open source, flexible, and built for real-time performance, Crawl4AI empowers developers with unmatched speed, precision, and deployment ease.

To get started, follow the steps below:

Optional: Add either your OpenAI API Key or Anthropic API Key

Deploy

Your Crawl4AI API Key will auto generate, you can find it in the variables section.

Crawl4AI woks great with N8N, or other workflow apps.

For more information and documentation, checkout the project main page for details.

https://docs.crawl4ai.com/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Crawl4AI | `unclecode/crawl4ai:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 11235 | - |
| `GROQ_API_KEY` | (secret) | - |
| `OPENAI_API_KEY` | (secret) | Your OpenAI API Key |
| `GEMINI_API_TOKEN` | (secret) | - |
| `ANTHROPIC_API_KEY` | (secret) | Your Anthropic API Key |
| `CRAWL4AI_API_TOKEN` | (secret) | Your generated Crawl4AI API Token. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/Owzyy8)
