# Deploy OpenClaw (Secure) on Railway

OpenClaw template with persistent secure storage for skills and context

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-secure)

## About

OpenClaw is a personal AI assistant platform that runs a gateway server, bridging multiple messaging channels — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Teams, Matrix, and more — into a unified interface. It routes messages between channels and an AI agent runtime via WebSocket, giving you a single control plane for all your conversations.

Deploying OpenClaw on Railway provisions a Node.js gateway server with a Go toolchain and persistent storage. The container installs OpenClaw via its public install script, configures a health-checked HTTP/WebSocket endpoint, and seeds a minimal default configuration on first boot. A persistent volume at `/data` preserves state, workspace files, and installed tool binaries across deploys. The gateway runs as a non-root user with hardened file permissions and binary integrity verification. Authentication is handled via a gateway token that is auto-generated at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [turbo-labs/openclaw](https://github.com/turbo-labs/openclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ANTHROPIC_API_KEY` | (secret) | Generate a key at https://platform.claude.com/settings/keys |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Password for the gateway WebSocket API. Auto-generated — cut-and-paste into your OpenClaw Dashboard > Overview tab. |
| `OPENCLAW_GATEWAY_PASSWORD` | (secret) | Password for the gateway dashboard. Auto-generated — cut-and-paste into your OpenClaw Dashboard > Overview tab. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-secure)
