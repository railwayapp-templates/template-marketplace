# Deploy OpenClaw - Complete Setup 🦞 on Railway

24/7 Personal AI Agent. Graphical Setup + TUI Support + Pairing Support. 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-complete-setup)

## About

**Graphical Setup + TUI Support + Pairing Support.** A production-ready deployment package for OpenClaw, the advanced AI agent that goes beyond chatting to execute real-world tasks. This template features a web-based management interface, persistent storage via Railway Volumes, and automatic gateway management—designed for a seamless **"one-click"** experience.

**NOTE 1:** All required Environment Variables are **pre-configured** for an instant start. However, you can always review and modify them in the **Variables** tab of your Railway project.
**NOTE 2:** If you encounter a "Gateway Disconnected" status in the UI, simply copy your `OPENCLAW_GATEWAY_TOKEN` from the Railway variables and paste it into the connection field on the dashboard.

This template wraps OpenClaw with a Node.js management layer, providing a complete lifecycle solution through an intuitive web interface. Deploy in under 2 minutes and configure your AI brains (Anthropic, OpenAI, Gemini) and communication channels (Telegram, WhatsApp, Discord) via the password-protected `/setup` wizard. The system automatically handles the internal gateway process, ensures your configuration is safely stored in a persistent volume, and provides a graphical bridge for TUI commands—all without needing SSH or CLI expertise.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [codetitlan/openclaw-railway-template](https://github.com/codetitlan/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `OPENCLAW_ENTRY` | node |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_VERSION` | v2026.2.15 |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 |
| `INTERNAL_GATEWAY_PORT` | 18789 |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** HTML, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openclaw-complete-setup)
