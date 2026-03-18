# Deploy OpenClaw on Railway

Just one click to run your powerful 24/7 Personal AI Assistant. 🦞🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-4)

## About

OpenClaw is an open-source **Personal AI Agent** designed to go beyond simple chat. It is an "agentic" assistant capable of executing real-world tasks like managing files, running terminal commands, and connecting to third-party APIs (Telegram/WhatsApp), giving you complete control over your data and digital automation in a private environment.

Hosting OpenClaw on Railway involves deploying a lightweight yet powerful Docker container that manages the gateway and a web-based dashboard. This process requires configuring persistent storage (Railway Volumes) to ensure that your agent's long-term memory, custom "skills," and configuration settings are preserved across deployments. By hosting on Railway, your AI agent gains 24/7 server-side stability, allowing it to monitor tasks or respond to messages in real-time without needing your local machine to stay online, all within a secure and scalable infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [codestorm-official/openclaw](https://github.com/codestorm-official/openclaw) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SETUP_PASSWORD` | (secret) |
| `CLAWDBOT_STATE_DIR` | /data/.clawdbot |
| `CLAWDBOT_GATEWAY_TOKEN` | (secret) |
| `CLAWDBOT_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/openclaw-4)
