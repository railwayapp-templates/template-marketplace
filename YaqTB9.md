# Deploy Bolt.DIY on Railway

Build, run, and deploy full-stack web apps using any LLM of your choice!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/YaqTB9)

## About

Bolt.diy is the open-source version of Bolt.new, providing developers with a customizable platform for AI-driven coding assistance. With bolt.diy, users can dynamically select their preferred LLM (Large Language Model) for each prompt. The platform supports multiple AI providers, including OpenAI, Anthropic, Ollama, OpenRouter, Gemini, LMStudio, Mistral, xAI, HuggingFace, DeepSeek, Groq, and any model compatible with the Vercel AI SDK.

## bolt.diy Features

- **AI-powered full-stack web development** directly in your browser.
- **Support for multiple LLMs** with an extensible architecture to integrate additional models.
- **Attach images to prompts** for better contextual understanding.
- **Integrated terminal** to view output of LLM-run commands.
- **Revert code to earlier versions** for easier debugging and quicker changes.
- **Download projects as ZIP** for easy portability.
- **Integration-ready Docker support** for a hassle-free setup.

## Setup bolt.diy 

Simply input the API key(s) for the providers you wish to use, deploy the app, and you're ready to go!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bolt.diy | [stackblitz-labs/bolt.diy](https://github.com/stackblitz-labs/bolt.diy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5173 | - |
| `XAI_API_KEY` | (secret) | - |
| `GROQ_API_KEY` | (secret) | - |
| `COHERE_API_KEY` | (secret) | - |
| `OPENAI_API_KEY` | (secret) | - |
| `VITE_LOG_LEVEL` | debug | - |
| `MISTRAL_API_KEY` | (secret) | - |
| `ANTHROPIC_API_KEY` | (secret) | - |
| `PERPLEXITY_API_KEY` | (secret) | - |
| `HuggingFace_API_KEY` | (secret) | - |
| `OPENAI_LIKE_API_KEY` | (secret) | OpenAI Like API Key (OpenAI Like Base Url required) |
| `OPEN_ROUTER_API_KEY` | (secret) | - |
| `OPENAI_LIKE_API_BASE_URL` | - | Base Url if you want to use OpenAI Like Models |
| `GOOGLE_GENERATIVE_AI_API_KEY` | (secret) | - |

## Configuration

- **Start command:** `pnpm run dev --host`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, SCSS, JavaScript, Shell, Dockerfile, CSS

[View on Railway →](https://railway.com/template/YaqTB9)
