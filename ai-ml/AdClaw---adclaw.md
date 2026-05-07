# Deploy AdClaw on Railway

AI marketing agent team - 130+ skills, multi-agent personas, multi-channel 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adclaw)

## About

AdClaw is an open-source multi-agent AI marketing platform that runs SEO, ads, content, social, and analytics workflows as a coordinated team of specialist agents — each with its own LLM, 130+ built-in skills, work schedule, and shared memory. Chat with the team from Telegram, Discord, or the built-in web console.

AdClaw runs as a single FastAPI server with a React console, packaged in one Docker image (`nttylock/adclaw:latest`). On Railway it builds from the public `Citedy/adclaw` GitHub repo using the included `deploy/Dockerfile`. The container listens on port 8088 with a `/api/diagnostics/health` endpoint that surfaces LLM, channel, MCP, and watchdog status. A persistent volume at `/app/working` keeps your config, sessions, sqlite memory, and skill cache across redeploys; provider API keys live alongside it. After the first deploy, open the public URL — a one-step wizard asks for any LLM provider key (OpenAI, Anthropic, Aliyun, Z.AI, etc.) and you're chatting with the agent team within seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AdClaw | `nttylock/adclaw:1.0.2-core` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8088 | Internal HTTP port the AdClaw container binds to (must match Railway's targetPort). |

## Configuration

- **Start command:** `sh -c 'adclaw init --defaults --accept-security 2>/dev/null || true; exec /app/venv/bin/adclaw app --host 0.0.0.0 --port 8088'`
- **Healthcheck:** `/api/diagnostics/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/adclaw)
