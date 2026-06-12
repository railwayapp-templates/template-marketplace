# Deploy openclaw on Railway

openclaw simple to deploy and host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-6)

## About

OpenClaw is an open-source, self-hosted personal AI agent that connects powerful
AI models like Claude, GPT, and Gemini to your messaging apps and local tools.
It runs as a persistent gateway, executing tasks, managing files, automating
workflows, and maintaining memory — all on infrastructure you control.

Hosting OpenClaw involves running a long-lived Node.js gateway process that stays
online 24/7 to handle incoming messages and execute tasks autonomously. This
template wraps the OpenClaw gateway with a browser-based setup wizard, so you
can configure your AI provider, messaging channels, and credentials without
needing SSH or CLI access. A Railway Volume is required to persist your
configuration, agent memory, and workspace across redeploys. Once live, the
gateway is accessible via your Railway-assigned domain, with the setup wizard
at `/setup` and the Control UI at `/openclaw`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway | [matlee0409/openclaw-railway](https://github.com/matlee0409/openclaw-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `OPENCLAW_VERSION` | 2026.6.5 |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `WRAPPER_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `node src/sever.js`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-6)
