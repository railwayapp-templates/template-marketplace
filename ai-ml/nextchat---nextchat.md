# Deploy nextchat on Railway

✨ Light and Fast AI Assistant template for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextchat)

## About

NextChat is a production-ready AI chat interface that connects to multiple LLM providers through a single, self-hosted web application. It's essentially a private ChatGPT interface that works with OpenAI, Anthropic Claude, Google Gemini, and 20+ other AI services—all running from your own Railway deployment with your own API keys.

Hosting NextChat gives you complete control over your AI interactions. The application runs as a standalone Next.js container that manages API connections, maintains conversation history in browser storage, and provides a responsive interface that works on desktop and mobile. The real power comes from its flexibility: you can switch between GPT-4, Claude 3, Gemini Pro, or DeepSeek models mid-conversation, all while keeping your API keys secure and your data private. Railway handles the containerization and scaling, while NextChat manages the AI orchestration layer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NextChat-Railway | [krishkumar/NextChat-Railway](https://github.com/krishkumar/NextChat-Railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, SCSS, JavaScript, Rust, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nextchat)
