# Deploy OpenClaw (Updated Sep 2026) on Railway

Openclaw Deployment Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-updated-s-1)

## About

OpenClaw is an open-source autonomous AI assistant framework designed to connect large language models (LLMs) with messaging applications (such as WhatsApp, Telegram, Slack, and Discord), developer tools, and external services. It enables developers and users to build proactive, personal AI agents that automate tasks and manage workflows directly from chat interfaces.

Hosting OpenClaw involves running a persistent server process (typically a Node.js or Docker environment) that maintains persistent connections to your chosen messaging platform webhooks or gateways. Because OpenClaw operates continuously to handle webhooks, execute automated skills, run guardrail watchdogs, and store conversation context, it requires a host with consistent uptime and a persistent disk volume to retain user configurations, API keys, and session histories across container redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [tejask29/clawdbot-railway-template](https://github.com/tejask29/clawdbot-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SETUP_PASSWORD` | (secret) | The administrative password required to access the initial web setup wizard and configuration portal. Set a strong password to prevent unauthorized administrative access upon deployment. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | he internal directory path where OpenClaw stores runtime state, session data, local database files, and system logs (e.g., /data/state). Should be mapped to a persistent storage volume to ensure data persists across deployments. |
| `OPENCLAW_GATEWAY_PORT` | 8080 | The network port on which the OpenClaw gateway web server listens for webhooks and incoming HTTP traffic (default: 8080). |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | A secret authentication token used by external client applications, webhooks, and CLI extensions to securely communicate with the OpenClaw gateway API. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | The persistent directory path where OpenClaw reads and writes active user scripts, skill modules, downloaded media, and temporary workspace files (e.g., /data/workspace). |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-updated-s-1)
