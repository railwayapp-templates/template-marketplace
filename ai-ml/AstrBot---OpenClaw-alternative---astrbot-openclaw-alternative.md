# Deploy AstrBot - OpenClaw alternative on Railway

OpenClaw alternative: AI agent framework with IM & LLM integration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/astrbot-openclaw-alternative)

## About

AstrBot is a modern, open-source AI agent platform that enables you to build intelligent chatbots for popular messaging platforms using today's leading large language models. It combines AI conversations, plugins, knowledge bases, multimodal capabilities, MCP support, and agent workflows into a single platform, making it easy to deploy production-ready AI assistants for personal, business, and community use.

Deploying AstrBot on Railway provides a fast, production-ready hosting solution without the complexity of managing infrastructure. Railway automatically builds the application using its Dockerfile, provisions networking, and allows persistent storage through Volumes so your configuration, plugins, and data survive deployments.

AstrBot includes a modern WebUI for managing AI providers, messaging platform integrations, plugins, personas, and knowledge bases. Once deployed, you can connect providers such as OpenAI, Gemini, Anthropic, DeepSeek, Ollama, LM Studio, Dify, Coze, and many others using secure Railway environment variables.

Railway also provides automatic deployments from GitHub, centralized logs, monitoring, custom domains, and seamless scaling, allowing you to focus on building AI-powered applications instead of maintaining servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| soulter/astrbot:latest | `soulter/astrbot:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Asia/Karachi | - |
| `OPENAI_API_KEY` | (secret) | Configure here or later in UI |
| `OPENAI_BASE_URL` | https://api.openai.com/v1 | Configure here or later in UI |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/AstrBot/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/astrbot-openclaw-alternative)
