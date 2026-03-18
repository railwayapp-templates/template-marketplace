# Deploy OpenClaw (Fmr. Moltbot, Clawdbot) - Railway Template on Railway

Deploy and Host OpenClaw on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-fmr-moltbot-clawdbot-railway-te)

## About

Openclaw Railway Template is a one-click deployment package for Openclaw (formerly Moltbot, formerly Clawdbot), an AI coding assistant that integrates with multiple chat platforms. This template includes a web-based setup wizard, persistent storage, and automatic gateway management—no command-line experience required.

This template simplifies Openclaw deployment by packaging the AI assistant with a wrapper web server that handles configuration, state persistence, and reverse proxying. Users access a password-protected `/setup` wizard to configure their AI provider (OpenAI, Anthropic, Google, etc.) and connect chat channels (Telegram, Discord, Slack). The wrapper automatically manages the Openclaw gateway process, persists configuration to a Railway volume, and provides one-click backup exports. Everything runs in a single container with minimal configuration—just set environment variables and deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway-template | [clawzero/openclaw-railway-template](https://github.com/clawzero/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal port where the gateway listens (proxied by the wrapper) |
| `OPENCLAW_ENTRY` | /openclaw/dist/entry.js | /openclaw/dist/entry.js |
| `SETUP_PASSWORD` | (secret) | Password for the setup and wrapper |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | Path to the clawdbot configuration file |
| `INTERNAL_GATEWAY_PORT` | 18789 | Internal host for the gateway |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Token for the gateway and passed by the wrapper |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** JavaScript, HTML, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/openclaw-fmr-moltbot-clawdbot-railway-te)
