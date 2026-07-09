# Deploy LangBot on Railway

Build AI bots for Discord & Telegram using DeepSeek, OpenAI & Dify.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langbot)

## About

LangBot is an open-source, production-ready platform for building AI-powered messaging bots across Discord, Telegram, Slack, WeChat, LINE, QQ, and many other platforms. It supports multiple LLM providers, AI agents, RAG, plugins, and workflow integrations, all managed through an intuitive web dashboard.

Deploying LangBot on Railway lets you launch a production-ready AI bot platform in minutes without managing servers or infrastructure. Railway automatically provisions networking, HTTPS, persistent storage, and service orchestration while LangBot provides a powerful web dashboard for configuring bots, AI models, plugins, and messaging platforms. Connect OpenAI, Gemini, Claude, DeepSeek, Ollama, Dify, Coze, n8n, Langflow, and many more services to build intelligent chatbots for Discord, Telegram, Slack, WeChat, LINE, QQ, and other platforms. The Railway template includes all required services and networking, so no manual Docker or infrastructure setup is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rockchin/langbot:latest | `rockchin/langbot:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | "Asia/Shanghai" |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/langbot)
