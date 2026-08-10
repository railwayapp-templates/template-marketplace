# Deploy 9Router - Railway Template on Railway

Self-hosted AI router for Claude Code, Cursor, Copilot & 60+ AI providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-railway-template)

## About

9Router is a self-hosted AI gateway and LLM router that lets developers connect Claude, Codex, Cursor, OpenAI-compatible tools, and many other AI providers through a single unified endpoint. It simplifies model access, request routing, provider switching, and AI development workflows from one central dashboard.

![9Router](https://9router.com/9router-hero.jpg)

Hosting 9Router on Railway gives you an easy way to run your own AI routing gateway without managing servers yourself. With this template you only need to set an `INITIAL_PASSWORD` and click deploy. Railway takes care of the deployment, service hosting, networking, and runtime environment.

Once deployed, 9Router becomes a centralized AI gateway for developer tools, coding assistants, API clients, and any OpenAI-compatible integration. It reduces provider lock-in by letting you manage multiple AI models, API keys, and routing rules from a single self-hosted dashboard.

### Quick Comparison with Other AI Gateways

| Feature                              | 9Router          | LiteLLM          | OpenRouter       | Bifrost          |
|--------------------------------------|------------------|------------------|------------------|------------------|
| Fully self-hosted                    | ✅               | ✅               | ❌               | ✅               |
| OpenAI-compatible endpoint           | ✅               | ✅               | ✅               | ✅               |
| Smart 3-tier fallback (sub → cheap → free) | ✅          | ❌ (basic only)  | ❌               | ❌               |
| Built-in RTK token saver (20-40%+)   | ✅               | ❌               | ❌               | ❌               |
| Native coding CLI/IDE support (Claude Code, Codex, Cursor, Cline, etc.) | ✅ | ❌ (generic)    | ❌               | ❌               |
| Simple one-password Railway deploy   | ✅               | ❌               | ❌ (hosted only) | ❌               |
| Built-in visual dashboard            | ✅               | ✅ (needs DB)    | ✅               | ✅               |
| Zero external database required      | ✅ (SQLite)      | ❌ (Postgres)    | N/A              | ✅               |
| Free & open-source                   | ✅               | ✅               | ❌               | ✅               |
| Focused on coding workflows          | ✅               | ❌               | ❌               | ❌               |

9Router stands out when you want a lightweight, coding-first gateway with automatic subscription-aware fallback and built-in token savings — all deployable on Railway in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | `decolua/9router:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 20128 |
| `DATA_DIR` | /app/data |
| `HOSTNAME` | 0.0.0.0 |
| `NODE_ENV` | production |
| `CLOUD_URL` | https://9router.com |
| `JWT_SECRET` | (secret) |
| `API_KEY_SECRET` | (secret) |
| `INITIAL_PASSWORD` | (secret) |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com |

## Configuration

- **Start command:** `sh -c 'while true; do echo "$(date) - Server is active"; sleep 30; done & exec node server.js'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-railway-template)
