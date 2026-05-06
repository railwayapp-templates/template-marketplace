# Deploy OpenClaw AI Agent on Railway

Self-host OpenClaw AI Agent with web setup, dashboard, TUI & pairing 🤖

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-ai-agent)

## About

OpenClaw AI Agent is an open-source, self-hosted personal AI assistant that works across OSes and platforms. It connects chat apps and AI providers into an autonomous agent that can browse, manage files, run commands, and help with coding, research, automation, and daily workflows.

![](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/openclaw/openclaw)

Hosting OpenClaw AI Agent means running your own private agent gateway with persistent storage, configurable AI providers, and browser-based management. This template includes a web setup flow, admin dashboard, live logs, terminal access, device pairing, and configuration editing, so you can launch and manage OpenClaw without needing manual CLI or SSH setup. After deployment, open the setup page, choose your AI provider, add your API key, optionally configure chat channels, and connect your OpenClaw UI to start using your self-hosted assistant.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [praveen-ks-2001/openclaw-railway](https://github.com/praveen-ks-2001/openclaw-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `OPENCLAW_VERSION` | latest |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `WRAPPER_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-ai-agent)
