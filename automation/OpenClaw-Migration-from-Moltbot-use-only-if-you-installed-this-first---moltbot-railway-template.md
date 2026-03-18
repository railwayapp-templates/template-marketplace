# Deploy OpenClaw (Migration from Moltbot, use only if you installed this first) on Railway

(Use this instead  https://railway.com/deploy/openclaw-railway-template)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/moltbot-railway-template)

## About

(Deprecating, use this instead: https://railway.com/deploy/openclaw-railway-template)

Production-ready deployment package for OpenClaw, an AI coding assistant that integrates with multiple chat platforms. Features a web-based management interface, enterprise-grade health monitoring, persistent storage, and automatic gateway management—no command-line experience required.

**Battle-tested with over 2,000 production deployments.**

NOTE1: Now includes auto-stable release detection but optionally you can pin the openclaw release you want to install with the OPENCLAW_VERSION env variable

NOTE2: If you experience a gateway disconnected issue in the UI, copy the value of `OPENCLAW_GATEWAY_TOKEN` from Railway environment variables and paste it on the overview page, then click connect.

This template wraps OpenClaw with a Node.js server providing complete lifecycle management through an intuitive web interface. Deploy in under 2 minutes, configure AI providers (OpenAI, Anthropic, Google Gemini, custom OpenAI-compatible endpoints) and chat channels (Telegram, Discord, Slack) via password-protected `/setup` wizard. The wrapper automatically manages the OpenClaw gateway process, persists configuration to a Railway volume, and provides advanced management tools—all without SSH access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [codetitlan/openclaw-railway-template](https://github.com/codetitlan/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal port where the gateway listens (proxied by the wrapper) |
| `OPENCLAW_ENTRY` | /openclaw/dist/entry.js | Node.js executable to use |
| `SETUP_PASSWORD` | (secret) | Password for the setup and wrapper (username will be blank) |
| `OPENCLAW_VERSION` | - | Tag of the version to be deployed. (empty to deploy unstable main) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Directory where clawdbot stores workspace files |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | Path to the clawdbot configuration file |
| `INTERNAL_GATEWAY_PORT` | 18789 | Internal host for the gateway |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Token for the gateway (you need to paste this in the UI on first run) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** JavaScript, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/template/moltbot-railway-template)
