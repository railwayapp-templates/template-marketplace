# Deploy OpenClaw | Personal AI Assistant on Railway

Self Host Openclaw. Web Setup, Admin Dashboard, Terminal, Pairing and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-host-openclaw)

## About

Deploy OpenClaw — the open-source personal AI assistant with 328k+ GitHub stars — on Railway with a single click. OpenClaw is a self-hosted agent runtime that connects your favorite chat apps (WhatsApp, Telegram, Discord, Slack, iMessage, and 20+ more) to powerful AI models like Claude, GPT, and Gemini, letting an AI agent browse the web, manage files, run commands, and work autonomously on your behalf.

Self-host OpenClaw on Railway with this template and get a fully configured **gateway, a browser-based setup wizard, admin dashboard with live terminal, and persistent storage** — no CLI or SSH access needed.

OpenClaw (formerly ClawdBot/MoltBot) is a fully open-source (MIT), local-first personal AI agent created by Peter Steinberger. It runs as a long-lived Node.js gateway process that routes messages between chat platforms and AI coding agents.

**Key features:**

- 🔌 Multi-channel messaging — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, and 20+ more
- 🤖 Multi-provider AI — Anthropic Claude, OpenAI GPT, Google Gemini, Groq, OpenRouter, or local models via Ollama
- 🧠 Autonomous agent — browses the web, manages files, runs commands, schedules tasks via heartbeat daemon
- 🎨 Live Canvas with A2UI — agent-driven visual workspace
- 🔒 Self-hosted & private — your data, conversations, and memory stay on your machine
- 📱 Companion apps for macOS, iOS, and Android

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw 🦞  | [praveen-ks-2001/openclaw-railway](https://github.com/praveen-ks-2001/openclaw-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Express server port (Railway sets automatically) |
| `OPENCLAW_VERSION` | 2026.4.2 | Pin openclaw version. Use 'latest' to always take the most recent version. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Auth token for gateway proxy and device management |
| `WRAPPER_ADMIN_PASSWORD` | (secret) | Password for /admin, and /api endpoints |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/self-host-openclaw)
