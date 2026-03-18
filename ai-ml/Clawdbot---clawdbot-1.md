# Deploy Clawdbot on Railway

Self-hosted AI agent gateway with web UI. Any LLM provider.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/clawdbot-1)

## About

Clawdbot is a self-hosted AI agent gateway that connects any LLM provider — Anthropic, OpenAI, MiniMax, and more — to a unified web dashboard. It includes chat, agent management, persistent memory, a file workspace, and support for messaging channels like Telegram, Discord, WhatsApp, and Slack.

Clawdbot runs as a Node.js gateway inside a Docker container. This template deploys it with a persistent volume so your config, agent memories, and workspace files survive redeployments. A minimal gateway config is baked into the Docker image and automatically seeded to the volume on first boot. After deploy, you configure your API keys and model provider entirely through the web-based Control UI — no SSH, no manual JSON editing, no environment variable juggling. The gateway supports hot-reloading, so config changes apply without downtime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clawdbot-railway | [namanxajmera/clawdbot-railway](https://github.com/namanxajmera/clawdbot-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CLAWDBOT_STATE_DIR` | /data/.clawdbot | Persistent config directory. Do not change. |
| `CLAWDBOT_GATEWAY_PORT` | - | Access token for the Control UI. |
| `CLAWDBOT_GATEWAY_TOKEN` | (secret) | Port the gateway listens on. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Swift, JavaScript, Kotlin, Shell, CSS, Python, HTML, Dockerfile, Ruby

[View on Railway →](https://railway.com/template/clawdbot-1)
