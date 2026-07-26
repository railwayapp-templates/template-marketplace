# Deploy Nanobot — Multi-LLM Gateway with Dashboard on Railway

Route OpenAI, Gemini & Groq with fallback — Telegram-ready gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanobot-llm-gateway)

## About

Nanobot is a lightweight, self-hosted AI gateway and orchestration layer — a single service that routes requests across multiple LLM providers (OpenAI, Gemini, Groq) with automatic fallback, and connects them to messaging channels like Telegram. Instead of hardcoding a different integration for every model and every chat platform, you configure everything through a web dashboard and Nanobot handles the routing, key management, and logging in one place.

---

Nanobot sits between your applications or chat channels and multiple AI providers, acting as a single control point. Rather than wiring OpenAI into one service, Gemini into another, and rebuilding a Telegram bot from scratch each time, you point everything at Nanobot and manage providers, keys, models, and channels from its dashboard.

The whole thing runs as one Docker container that exposes three things: a basic-auth-protected admin dashboard, a gateway API that routes requests, and a background worker that processes incoming messages. Railway builds it from the included `Dockerfile` via `railway.toml`, assigns a public URL, and handles networking and uptime.

The one requirement that matters: **attach a Railway volume at `/data`.** All configuration and state — provider keys, model selections, channel settings, logs — live there. Without the volume, every redeploy wipes your setup and you reconfigure from scratch. And because that data includes your provider API keys, set a strong `ADMIN_PASSWORD` before exposing the dashboard: an unprotected instance is an open door to your API credits.

Typical cost: **~$5/month** on Railway's Hobby plan for the single container. Nanobot is MIT-licensed and free; you pay only for the LLM providers you route to.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nanobot | [codestorm-official/nanobot](https://github.com/codestorm-official/nanobot) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |
| `NANOBOT_AGENTS__DEFAULTS__WORKSPACE` | /data/.nanobot/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/nanobot-llm-gateway)
