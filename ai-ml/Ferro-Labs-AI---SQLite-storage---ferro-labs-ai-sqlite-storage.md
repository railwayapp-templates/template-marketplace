# Deploy Ferro Labs AI - SQLite storage on Railway

Unified AI Gateway - All your traffic. One gateway - SQLite storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ferro-labs-ai-sqlite-storage)

## About

Ferro Labs AI - SQLite storage is a high-performance, OpenAI-compatible AI gateway written in Go. It routes requests across multiple LLM providers through one API while persisting admin keys, config history, and request logs in embedded SQLite, making it a simple, self-contained deployment option for Railway.

Hosting Ferro Labs AI - SQLite storage on Railway gives you a production-ready AI gateway with minimal setup. Railway builds and runs the service directly from the repository, while a mounted volume provides persistent SQLite storage for API keys, configuration state, and request logs. You only need a `MASTER_KEY`, at least one provider API key such as `OPENAI_API_KEY`, and the SQLite store environment variables. This template is ideal when you want a lightweight deployment without managing a separate database, while still keeping persistence across restarts and redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ferro Labs AI Gateway | [ferro-labs/ai-gateway](https://github.com/ferro-labs/ai-gateway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `OLLAMA_HOST` | - | http://localhost:11434 |
| `XAI_API_KEY` | (secret) | - |
| `CORS_ORIGINS` | - | e.g http://xyz.com |
| `GROQ_API_KEY` | (secret) | - |
| `OLLAMA_MODELS` | - | llama3,codellama |
| `COHERE_API_KEY` | (secret) | - |
| `GATEWAY_CONFIG` | - | e.g /etc/config.yaml |
| `GEMINI_API_KEY` | (secret) | - |
| `OPENAI_API_KEY` | (secret) | - |
| `MISTRAL_API_KEY` | (secret) | - |
| `CONFIG_STORE_DSN` | /data/config.db | - |
| `DEEPSEEK_API_KEY` | (secret) | - |
| `TOGETHER_API_KEY` | (secret) | - |
| `ANTHROPIC_API_KEY` | (secret) | - |
| `API_KEY_STORE_DSN` | (secret) | - |
| `CONFIG_STORE_BACKEND` | sqlite | - |
| `API_KEY_STORE_BACKEND` | (secret) | - |
| `REQUEST_LOG_STORE_DSN` | /data/logs.db | - |
| `REQUEST_LOG_STORE_BACKEND` | sqlite | - |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Go, JavaScript, HTML, CSS, Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/ferro-labs-ai-sqlite-storage)
