# Deploy 9Router (Self-Hosted AI Gateway & Router) on Railway

Self-hosted AI gateway: one OpenAI-compatible API for 60+ LLM providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-self-hosted-ai-gateway-and-route)

## About

9Router is a self-hosted AI gateway and router. It exposes a single OpenAI-compatible endpoint (`/v1`) in front of 60+ providers — OpenAI, Anthropic, Google Gemini, DeepSeek, Groq, OpenRouter, Ollama and more — with per-key routing, fallbacks, usage tracking and a web dashboard. Point Claude Code, Cursor, Codex, Cline, Continue or any OpenAI SDK at your 9Router URL and switch models without touching your apps.

This template deploys the official `decolua/9router` image as a single Next.js service on port 20128 with a persistent volume at `/app/data` for its SQLite database (providers, API keys, routes, request logs). `JWT_SECRET`, `API_KEY_SECRET` and `MACHINE_ID_SALT` are generated per deployment, and `BASE_URL` is wired to your Railway public domain so OAuth-style provider logins and the dashboard work out of the box. Optionally set `INITIAL_PASSWORD` to pre-seed the admin password; otherwise you set it on first visit. The service is lightweight (well under 512 MB RAM at idle) and keeps a heartbeat log so it never sleeps mid-request.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9Router | `decolua/9router:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | Port the 9Router web app listens on |
| `BASE_URL` | - | Public URL of this deployment |
| `DATA_DIR` | /app/data | Persistent data directory (volume) |
| `HOSTNAME` | 0.0.0.0 | Bind to all interfaces |
| `NODE_ENV` | production | Run in production mode |
| `CLOUD_URL` | https://9router.com | 9Router cloud URL (model catalog & pricing sync) |
| `JWT_SECRET` | (secret) | Secret used to sign dashboard sessions (generated) |
| `API_KEY_SECRET` | (secret) | Secret used to derive API credentials (generated) |
| `MACHINE_ID_SALT` | - | Salt for the machine identifier (generated) |
| `INITIAL_PASSWORD` | (secret) | Optional admin password for first login. Leave empty to set it in the UI. |
| `NEXT_PUBLIC_BASE_URL` | - | Public URL exposed to the browser |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com | 9Router cloud URL for the frontend |

## Configuration

- **Start command:** `sh -c 'while true; do echo "$(date) - 9Router is active"; sleep 30; done & exec node server.js'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Tags:** 9router, ai-gateway, llm-router, openai-compatible, openrouter-alternative, claude-code, cursor, litellm

[View on Railway →](https://railway.com/deploy/9router-self-hosted-ai-gateway-and-route)
