# Deploy OpenClaw + Ollama on Railway | Self-Hosted Personal AI Assistant on Railway

Self-host OpenClaw (optional - Local LLM Models). 20+ chat platforms.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-with-ollama)

## About

Deploy OpenClaw — the open-source personal AI assistant — on Railway with a single click. OpenClaw is a self-hosted agent runtime that connects your favorite chat apps (WhatsApp, Telegram, Discord, Slack, iMessage, and 20+ more) to AI models like Claude, GPT, Gemini, or **fully local models via Ollama** — letting an AI agent browse the web, manage files, run commands, and work autonomously on your behalf.

Self-host OpenClaw on Railway with this template and get a fully configured **gateway, browser-based setup wizard, admin dashboard with live terminal, and persistent storage** — no CLI or SSH access needed.

OpenClaw is a fully open-source (MIT), local-first personal AI agent. It runs as a long-lived Node.js gateway that routes messages between chat platforms and AI models.

**Key features:**
- 🔌 Multi-channel messaging — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, and 20+ more
- 🤖 Multi-provider AI — Claude, GPT, Gemini, Groq, OpenRouter, Moonshot, Z.AI, MiniMax, or local models via Ollama
- 🧠 Autonomous agent — browses the web, manages files, runs commands, schedules tasks via heartbeat daemon
- 🎨 Live Canvas with A2UI — agent-driven visual workspace
- 🔒 Self-hosted & private — your data stays on your machine
- 📱 Companion apps for macOS, iOS, and Android

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw 🦞  | [praveen-ks-2001/openclaw-railway](https://github.com/praveen-ks-2001/openclaw-railway) | Web service |
| Ollama | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenClaw 🦞  | 8080 | HTTP server listening port |
| `OLLAMA_BASE_URL` | OpenClaw 🦞  | - | Ollama internal service endpoint |
| `OPENCLAW_VERSION` | OpenClaw 🦞  | 2026.4.15 | OpenClaw service version |
| `OPENCLAW_GATEWAY_TOKEN` | OpenClaw 🦞  | (secret) | Gateway authentication token |
| `WRAPPER_ADMIN_PASSWORD` | OpenClaw 🦞  | (secret) | Admin panel access password |
| `OLLAMA_HOST` | Ollama | :: | Bind address for Ollama server |
| `OLLAMA_ORIGINS` | Ollama | - | Allowed CORS origins for requests |
| `OLLAMA_DEFAULT_MODELS` | Ollama | llama3.2:1b | Default models loaded at startup. Make sure the model has tool calling capability. Explore available model here - https://ollama.com/library |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `bash -c "ollama serve & sleep 5 && ollama pull $OLLAMA_DEFAULT_MODELS && wait"`
- **Volume:** `/root/.ollama`

**Category:** Automation · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-with-ollama)
