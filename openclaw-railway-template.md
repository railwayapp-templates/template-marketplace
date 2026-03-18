# Deploy OpenClaw - Railway Template on Railway

Graphical Setup + TUI Support + Pairing support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-railway-template)

## About

Production-ready deployment package for OpenClaw, an AI coding assistant that integrates with multiple chat platforms. Features a web-based management interface, enterprise-grade health monitoring, persistent storage, and automatic gateway management—no command-line experience required.

**Battle-tested with over 2,000 production deployments.**

IF YOU ARE UPGRADING FROM A PREVIOW VERSION REMOVE THE ENV VAR 'OPENCLAW_ENTRY' AS NOW OPENCLAW IS INSTALLED VIA NPM

NOTE1: Now includes auto-stable release detection but optionally you can pin the openclaw release you want to install with the OPENCLAW_VERSION env variable

This template wraps OpenClaw with a Node.js server providing complete lifecycle management through an intuitive web interface. Deploy in under 2 minutes, configure AI providers (OpenAI, Anthropic, Google Gemini, custom OpenAI-compatible endpoints) and chat channels (Telegram, Discord, Slack) via password-protected `/setup` wizard. The wrapper automatically manages the OpenClaw gateway process, persists configuration to a Railway volume, and provides advanced management tools—all without SSH access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw Main | [codetitlan/openclaw-railway-template](https://github.com/codetitlan/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal port where the gateway listens (proxied by the wrapper) |
| `SETUP_PASSWORD` | (secret) | Password for the setup (no username required) |
| `OPENCLAW_VERSION` | - | Tag of the openclaw release to install |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Directory where clawdbot stores workspace files |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | Path to the clawdbot configuration file |
| `INTERNAL_GATEWAY_PORT` | 18789 | Internal host for the gateway |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Token for the gateway. Set it to something secure (you need to paste this on the UI on first run) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** HTML, JavaScript, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/template/openclaw-railway-template)
