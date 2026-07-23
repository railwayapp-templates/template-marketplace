# Deploy OpenClaw (AI Agent + Private Search) on Railway

OpenClaw AI agent + private SearXNG search. Token-protected, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-ai-agent-private-search)

## About

Self-host OpenClaw — the open-source personal AI agent (formerly Clawdbot) — in one click, with a token-protected gateway + Control UI, persistent memory, and a bundled private SearXNG web-search backend. Onboard entirely in your browser: pick a model provider, name your agent, connect Telegram or WhatsApp.

OpenClaw runs as a gateway service that hosts your agent, its Control UI, and its channel connections. This template pins the current stable release (2026.7.1 — which post-dates the early-2026 security advisories) and ships with authentication always on: a 48-character gateway token is generated per deploy, and the gateway refuses unauthenticated access by design. Agent state — config, provider keys, memory, channel sessions, workspace files — lives on a persistent volume at /data, so your agent survives redeploys and upgrades. A second, private-only SearXNG service gives your agent real web search with no API key and no third-party search provider seeing your queries.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng | [niteshkumargupta/openclaw-railway-template](https://github.com/niteshkumargupta/openclaw-railway-template) | Worker |
| openclaw | `ghcr.io/openclaw/openclaw:2026.7.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SEARXNG_PORT` | searxng | 8080 | Listen port. |
| `SEARXNG_SECRET` | searxng | (secret) | Auto-generated SearXNG secret key (cookies/signatures). |
| `SEARXNG_BASE_URL` | searxng | - | SearXNG's own base URL on the private network. This service must never be public. |
| `SEARXNG_BIND_ADDRESS` | searxng | :: | Bind on IPv6 so OpenClaw can reach it over Railway private networking. |
| `GEMINI_API_KEY` | openclaw | (secret) | Optional: Google Gemini API key. |
| `OPENAI_API_KEY` | openclaw | (secret) | Optional: OpenAI API key. |
| `SEARXNG_BASE_URL` | openclaw | - | Points the web-search plugin at the bundled private SearXNG service. Remove if you delete searxng. |
| `ANTHROPIC_API_KEY` | openclaw | (secret) | Optional: Anthropic API key (recommended provider). You can also add providers later in the browser onboarding wizard. |
| `OPENCLAW_LOG_LEVEL` | openclaw | info | Log verbosity. |
| `OPENCLAW_STATE_DIR` | openclaw | /data/.openclaw | State directory on the persistent volume: config, keys, memory, channel sessions. |
| `OPENROUTER_API_KEY` | openclaw | (secret) | Optional: OpenRouter API key (one key, many models). |
| `TELEGRAM_BOT_TOKEN` | openclaw | (secret) | Optional: Telegram bot token from @BotFather. Channels can also be connected later via the Control UI. |
| `OPENCLAW_GATEWAY_PORT` | openclaw | 8080 | Port the gateway listens on (matches the service target port). |
| `OPENCLAW_GATEWAY_TOKEN` | openclaw | (secret) | Auto-generated admin token for the gateway + Control UI. Copy it from this Variables tab and paste it into the Control UI when prompted. Never remove it. |
| `OPENCLAW_WORKSPACE_DIR` | openclaw | /data/workspace | Agent workspace directory on the persistent volume. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openclaw-ai-agent-private-search)
