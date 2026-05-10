# Deploy nanobot on Railway

Minimal OpenClaw lightweight AI agent. It works, 1-click deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanobot-4)

## About

Nanobot is a lightweight AI gateway and orchestration layer that routes requests across multiple LLM providers and messaging channels such as Telegram. It provides a centralized dashboard to manage models, API keys, and runtime configuration, making it ideal for building scalable AI-powered backends without managing multiple integrations manually.

![Nanobot](https://github.com/HKUDS/nanobot/raw/main/images/GitHub_README.png)

Hosting nanobot involves deploying a containerized gateway service along with its admin dashboard. The system acts as a middleware between your applications (or chat channels) and multiple AI providers such as OpenAI, Gemini, or Groq.

Instead of hardcoding API integrations, nanobot allows dynamic configuration via a web dashboard, with persistent storage for settings. On Railway, deployment becomes straightforward: you run a Docker container, attach a persistent volume, and configure environment variables. Railway handles networking, scaling, and uptime, while nanobot handles AI routing, logging, and orchestration.

![](https://github.com/HKUDS/nanobot/raw/main/images/nanobot_arch.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nanobot | [codestorm-official/nanobot](https://github.com/codestorm-official/nanobot) | Web service |

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

[View on Railway →](https://railway.com/deploy/nanobot-4)
