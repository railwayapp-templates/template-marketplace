# Deploy Nanobot + Ollama on Railway

nanobot: The Ultra-Lightweight Clawdbot 🐈 + 🦙

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanobot-1)

## About

nanobot is an ultra-lightweight personal AI assistant built in just ~4,000 lines of Python. It connects to LLM providers like Ollama, OpenRouter, Anthropic, OpenAI, or DeepSeek, and integrates with chat platforms including Telegram, WhatsApp, and Feishu. Despite its minimal footprint, it delivers full agent functionality with web search, scheduled tasks, persistent memory, and extensible skills.

This template deploys nanobot + Ollama + OpenWebUI on Railway, providing a self-hosted AI agent stack with:
- A local or remote LLM runtime via Ollama
- A web-based interface via OpenWebUI
- A configurable nanobot agent that can run continuously and respond to chat platforms or scheduled tasks
Railway handles infrastructure, networking, and scaling so you can focus on configuring your agent and prompts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ollama | `ollama/ollama:latest` | Database |
| Open WebUI | [open-webui/open-webui](https://github.com/open-webui/open-webui) | Web service |
| nanobot | [roicort/nanobot](https://github.com/roicort/nanobot) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OLLAMA_HOST` | Ollama | :: |
| `OLLAMA_MODEL` | Ollama | llama3.2:3b |
| `VLLM_API_KEY` | nanobot | (secret) |
| `TELEGRAM_TOKEN` | nanobot | (secret) |
| `TELEGRAM_ENABLED` | nanobot | true |
| `OPENROUTER_ENABLED` | nanobot | false |

## Configuration

- **Start command:** `sh -c "ollama serve & sleep 5 && ollama pull $OLLAMA_MODEL && wait"`
- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Volume:** `/root/.nanobot`

**Category:** Bots · **Languages:** Python, Svelte, JavaScript, TypeScript, CSS, Shell, Dockerfile, HTML, Batchfile, Mako, Makefile

[View on Railway →](https://railway.com/deploy/nanobot-1)
