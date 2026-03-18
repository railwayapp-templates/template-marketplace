# Deploy Nanobot | OpenClaw Alternative (Open Source ) on Railway

[Mar '26] Self Host an AI Agent with API and Chat Integation (Telegram/WA)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanobot-openclaw-alternative-open-source)

## About

🐈  [nanobot](https://github.com/HKUDS/nanobot) is an ultra-lightweight personal AI assistant inspired by [OpenClaw](https://railway.com/deploy/openclaw-prev-clawdbot-moltbot-self-host). It's positioned as an alternative to OpenClaw, offering a simpler setup with similar multi-provider support. This Railway template gets you up and running with a one-click deployment.

Hosting Nanobot on Railway means running it as a Docker-based backend service. The deployment includes persistent storage for logs and configuration, an admin dashboard for managing API keys and routes, and a gateway process that handles incoming requests. You'll configure environment variables for admin access and LLM provider credentials. Railway handles the container orchestration and gives you a public URL automatically. 
**Note that Nanobot is not a chat interface—it's a backend API gateway that your applications send requests to.**

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nanobot | [praveen-ks-2001/nanobot](https://github.com/praveen-ks-2001/nanobot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port number the web server listens on. |
| `ADMIN_PASSWORD` | (secret) | The username required to log into the Nanobot admin dashboard. |
| `ADMIN_USERNAME` | (secret) | The password required to log into the Nanobot admin dashboard. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/nanobot-openclaw-alternative-open-source)
