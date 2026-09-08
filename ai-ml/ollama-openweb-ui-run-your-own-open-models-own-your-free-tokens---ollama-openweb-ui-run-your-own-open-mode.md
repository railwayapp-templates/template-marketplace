# Deploy ollama + openweb-ui: run your own open models, own your (free) tokens on Railway

Ollama + OpenWeb-UI + Real, Working, Local Models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-openweb-ui-run-your-own-open-mode)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/impacte-ollama-webui)

Run your own private AI chat — **Ollama** serving 100+ open models (Llama, Qwen, Gemma, Mistral, DeepSeek, Phi and more) with **Open WebUI** on top: a polished, self-hosted ChatGPT-style interface. No API keys, no rate limits, no per-token bills — your prompts never leave your Railway instance.

> 🎯 **Stop renting tokens. Own them.** With closed-model APIs you pay for every token, forever. Here, tokens are unlimited and free — you only pay for infrastructure.

This template deploys a production-ready, two-service stack with persistent storage:

- 🦙 **Ollama** — the model runtime. Pulls and serves open models, exposes an OpenAI-compatible API. Kept **private** (no public domain) and wired to WebUI over Railway private networking.
- 💬 **Open WebUI** — the ChatGPT-style interface. Multi-user auth, chat history, markdown + code highlighting, voice input, document uploads (RAG), and web search. This is the only public-facing service.
- 💾 **Two persistent volumes** — one for pulled models (`/root/.ollama`), one for users, chats, and uploads (`/app/backend/data`). Both survive redeploys and updates.

Your models and conversations are 100% yours: nothing is sent to third parties, and there are no token meters running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui` | Web service |
| Ollama | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_BASE_URL` | Open WebUI | - | Base URL |
| `OLLAMA_HOST` | Ollama | 0.0.0.0:11434 | The ollama host |
| `OLLAMA_ORIGINS` | Ollama | - | Allowed Origins |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-openweb-ui-run-your-own-open-mode)
