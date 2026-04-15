# Deploy snapclaw on Railway

Your own AI agent with Telegram. One-click deploy, browser setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/snapclaw)

## About

Deploy and Host SnapClaw on Railway

  SnapClaw is a production-ready template for deploying OpenClaw — an open-source personal AI agent — on Railway. Connect your ChatGPT subscription via OAuth, add a Telegram bot, and start chatting with your own
  AI agent. Setup is done entirely through a browser-based wizard — no terminal or config files needed.

  About Hosting SnapClaw

  SnapClaw packages OpenClaw into a single container with a built-in setup UI, reverse proxy, and gateway manager. The OpenClaw base image includes Playwright with Chromium for browser automation. A TypeScript
  wrapper handles the gateway process lifecycle, health checks, and authentication. Configuration, conversation history, and credentials persist on a Railway Volume at /data, so your bot survives redeploys and
  updates.

  Common Use Cases

  - Personal AI Assistant — deploy a 24/7 AI agent you can message from Telegram or any browser
  - Browser Automation — let your agent browse the web, extract data, fill forms, and take screenshots
  - Multi-Channel Bot — connect Telegram, Discord, Slack, or other messaging platforms to one AI agent
  - Self-Hosted AI — keep your conversations and data on your own infrastructure instead of third-party services

  Dependencies for SnapClaw Hosting

  - Railway account with a plan that supports 2GB+ memory
  - ChatGPT subscription for Codex OAuth authentication
  - Telegram app for creating a bot via @BotFather

  Deployment Dependencies

  - OpenClaw — open-source AI agent framework (GitHub)
  - Playwright — browser automation (included in the OpenClaw base image)

  Why Deploy SnapClaw on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying SnapClaw on Railway, you get a personal AI agent running in the cloud with persistent storage, automatic restarts, and a public domain — all without managing servers or Docker.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| snapclaw | [balukov/snapclaw](https://github.com/balukov/snapclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SETUP_PASSWORD` | (secret) | - |
| `OPENCLAW_GIT_REF` | v2026.4.2 | - |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Generate a random secret |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Healthcheck:** `/setup/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/snapclaw)
