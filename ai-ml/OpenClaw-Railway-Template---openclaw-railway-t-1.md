# Deploy OpenClaw Railway Template on Railway

[May '26] Simple 1-click deploy OpenClaw (Clawdbot)  on VPS | TUI Support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-railway-t-1)

## About

**OpenClaw** is a self-hosted AI agent framework that can execute commands, manage files, and perform tasks autonomously based on user instructions. This template deploys OpenClaw on Railway with minimal configuration, allowing you to run and access it remotely without managing servers. 🤖⚙️

![OpenCrawl Setup Complete Page](https://res.cloudinary.com/asset-cloudinary/image/upload/v1770581375/openclaw_sb_pa8ipt.png)

Hosting OpenClaw involves running it as a long-lived service with access to environment variables, compute resources, and optional external APIs. This Railway template packages OpenClaw in a containerized service, handles startup configuration, and exposes it over Railway’s infrastructure. You deploy it with a few clicks, configure required environment variables, and interact with OpenClaw remotely via supported clients or SSH. No manual server setup or VM management required. 🚀

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | AIAssistant | [praveen-ks-2001/openclaw-self-host-on-vps](https://github.com/praveen-ks-2001/openclaw-self-host-on-vps) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port for wrapper server. |
| `ENABLE_WEB_TUI` | true | Gives an option Terminal UI |
| `SETUP_PASSWORD` | (secret) | Password to access /setup wizard |
| `OPENCLAW_VERSION` | 2026.5.7 | Pin openclaw version. Use 'latest' to always take the most recent version. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Where config and credentials are stored. |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | Internal host for gateway |
| `INTERNAL_GATEWAY_PORT` | 18789 | Internal port for OpenClaw gateway. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Shared secret used to authenticate every request between the proxy and the OpenClaw gateway. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Filesystem workspace where OpenClaw reads/writes user projects, tools, and generated artifacts. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openclaw-railway-t-1)
