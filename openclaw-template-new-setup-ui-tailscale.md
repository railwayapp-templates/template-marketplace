# Deploy OpenClaw Template (New Setup UI + Tailscale) on Railway

Quickly deploy your openclaw (clawdbot) on Railway: https://openclaw.ai

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-template-new-setup-ui-tailscale)

## About

Production-ready deployment package for OpenClaw, an AI coding assistant that integrates with multiple chat platforms. Features a redesigned dark-themed setup wizard, 12+ AI provider support, optional Tailscale private networking, enterprise-grade health monitoring, persistent storage, and a full admin dashboard — no command-line experience required.

> **NOTE:** If you experience a gateway disconnected issue in the UI, copy the value of `OPENCLAW_GATEWAY_TOKEN` from Railway environment variables and paste it on the overview page, then click connect.

This template wraps OpenClaw with a Node.js server providing complete lifecycle management through an intuitive web interface. Deploy in under 2 minutes, then walk through a modern **5-step setup wizard** to configure AI providers (OpenAI, Anthropic, Google Gemini, OpenRouter, GitHub Copilot, Moonshot, and more) and chat channels (Telegram, Discord, Slack) — all from a password-protected `/setup` page. Optionally enable **Tailscale VPN** for private networking to local LLMs, installed on-demand without bloating the Docker image. The wrapper automatically manages the OpenClaw gateway process, persists configuration to a Railway volume, and provides advanced management tools including a debug console, live config editor, device pairing, and import/export backups — all without SSH access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway-template | [duc-nguyen-1223/openclaw-railway-template](https://github.com/duc-nguyen-1223/openclaw-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the wrapper server listens on |
| `SETUP_PASSWORD` | (secret) | Password to access the /setup wizard |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Directory where openclaw stores configuration and state |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Authentication token for the openclaw gateway and Control UI |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Directory where openclaw stores workspace files |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, HTML, CSS, Dockerfile

[View on Railway →](https://railway.com/template/openclaw-template-new-setup-ui-tailscale)
