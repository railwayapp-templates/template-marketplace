# Deploy railclaw on Railway

Latest version of OpenClaw - Simple Setup - by K7CFO

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railclaw)

## About

Railclaw is a turnkey deploy wrapper for OpenClaw — the open-source AI assistant platform. It automatically builds the latest stable OpenClaw release from source, provides a browser-based setup wizard, and gives you HTTPS out of the box. One click to deploy, paste your API keys, and you're chatting.

Railclaw runs as a single Railway service with a persistent volume at `/data`. On deploy, it fetches the latest stable OpenClaw release from GitHub, builds it from source inside a Docker container, and starts a wrapper server on port 8080. The wrapper proxies to the OpenClaw gateway, serves a password-protected setup wizard at `/setup`, and manages the gateway lifecycle automatically. Railway provides TLS termination — no tunnels, no Cloudflare, no DNS config required. After the build finishes (~3–5 minutes), visit `/setup` to paste your API keys and optionally connect Telegram or Discord.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railclaw | [k7cfo/railclaw](https://github.com/k7cfo/railclaw) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Healthcheck:** `/setup/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/template/railclaw)
