# Deploy snapclaw on Railway

OpenClaw on rails — batteries included, claws ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/snapclaw)

## About

SnapClaw is a production-ready template for deploying OpenClaw — an open-source personal AI agent — on Railway. It comes with built-in browser automation (Playwright + Chromium), persistent storage, and an
  interactive web setup wizard. Connect your ChatGPT subscription via OAuth and talk to your bot through Telegram, Discord, or the built-in Web UI.

  ## About Hosting SnapClaw

  SnapClaw packages OpenClaw into a single container with everything needed to run a personal AI agent in the cloud. OpenClaw is installed via npm for fast builds (~2 min), Playwright with Chromium handles browser
   automation, and a TypeScript wrapper manages the gateway process, health checks, and reverse proxying. An embedded web terminal lets you run the full setup wizard from your browser — no CLI or SSH needed.
  Configuration and conversation history persist on a Railway Volume at /data, so your bot survives redeploys.

  ## Common Use Cases

  - Personal AI assistant — deploy a 24/7 AI agent you can message from Telegram or any browser
  - Browser automation — let your bot browse the web, extract data, fill forms, and take screenshots
  - Multi-channel bot — connect Telegram, Discord, Slack, or other messaging platforms to one AI agent
  - Self-hosted AI — keep your conversations and data on your own infrastructure instead of third-party services

  ## Dependencies for SnapClaw Hosting

  - Railway account with a plan that supports 2GB+ memory
  - AI provider — ChatGPT subscription (for Codex OAuth, recommended) or Anthropic/OpenAI API key

  ### Deployment Dependencies

  - [OpenClaw](https://openclaw.ai) — open-source AI agent framework ([GitHub](https://github.com/openclaw/openclaw))
  - [Playwright](https://playwright.dev) — browser automation library
  - [Telegram BotFather](https://t.me/BotFather) — for creating a Telegram bot (optional)

  ## Why Deploy SnapClaw on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying SnapClaw on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

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
