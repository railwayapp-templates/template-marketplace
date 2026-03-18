# Deploy simplestclaw (anthropic) on Railway

One-click OpenClaw deployment. AI assistant that runs 24/7.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/simplestclaw-anthropic)

## About

Deploy OpenClaw to Railway with one click. Get a fully managed AI assistant running 24/7 in the cloud.

SimplestClaw packages OpenClaw into a Railway-ready deployment. Your gateway runs on Railway's infrastructure with automatic restarts, health checks, and a public URL you can access from any device.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| @simplestclaw/gateway | [mbron64/simplestclaw](https://github.com/mbron64/simplestclaw) (root: /apps/gateway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API Key |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | - |

**Category:** Other · **Languages:** TypeScript, Rust, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/template/simplestclaw-anthropic)
