# Deploy OpenClaw on Railway by JSUN on Railway

Deploy and Host OpenClaw on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-on-railway-by-jsun)

## About

openclaw is a self-hosted, multi-channel personal AI assistant that bridges chat platforms (Telegram, Discord, Slack, Matrix, iMessage, Signal, Feishu, and more) to LLM providers (Anthropic, OpenAI, Gemini, OpenRouter). This template wraps the upstream openclaw image with Railway-friendly defaults and a daily auto-sync workflow that always pins the latest upstream release — no manual build maintenance required.

This template deploys openclaw's gateway service — the HTTP/WebSocket server that handles channels, LLM routing, and the Control UI. State persists on a 5 GB Railway volume mounted at `/data` so tokens, channel auth, and workspace files survive redeploys. A GitHub Actions workflow on the source repo repins the wrapper to the latest upstream digest daily, smoke-tests it, then pushes — Railway redeploys automatically. Upstream improvements and security patches arrive on their own. Configure LLM keys and channel tokens via the Variables tab after the first deploy; no setup required to boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [sjhddh/openclaw-railway-adaptor](https://github.com/sjhddh/openclaw-railway-adaptor) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-on-railway-by-jsun)
