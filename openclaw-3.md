# Deploy openclaw on Railway

Openclaw Enhanced Launcher.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-3)

## About

OpenClaw is an open-source AI coding agent gateway that connects LLM providers (OpenAI, Anthropic, Google, and 20+ others) to messaging channels like Telegram, Discord, and Slack. It acts as a self-hosted bridge between AI models and your team's chat platforms, with a built-in web UI for configuration and device management.

Hosting OpenClaw involves building the gateway from source and running it behind an Express reverse proxy that handles setup, authentication, and WebSocket forwarding. This template packages everything into a single Docker container: the OpenClaw gateway process, a React-based setup wizard at `/setup`, and a control UI at `/openclaw`. A Railway Volume mounted at `/data` persists configuration and credentials across redeploys. The setup wizard walks you through provider selection (API key or OAuth), channel configuration, and gateway startup. Once configured, the wrapper auto-restarts the gateway on crashes with exponential backoff and exposes a `/healthz` endpoint for Railway's health checks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw-Polished | [dielect/OpenClaw-Polished](https://github.com/dielect/OpenClaw-Polished) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SETUP_PASSWORD` | (secret) | Login password for the setup interface. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | gateway token |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Healthcheck:** `/setup/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, CSS, HTML

[View on Railway →](https://railway.com/template/openclaw-3)
