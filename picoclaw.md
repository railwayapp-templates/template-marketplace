# Deploy PicoClaw on Railway

Ultra-Efficient AI Assistant in Go

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/picoclaw)

## About

PicoClaw is an ultra-lightweight personal AI assistant written in Go. It runs on as little as 10MB of RAM and $10 hardware, supporting multiple LLM providers, chat channels (Telegram, Discord, QQ, DingTalk, LINE), web search, scheduled tasks, and a security sandbox — all from a single binary.

This Railway template deploys PicoClaw from source alongside a Python-based web management layer. The web server provides a configuration UI protected by Basic Auth for editing providers, channels, agent defaults, and tools, plus a status dashboard with live gateway state and real-time logs. On startup, if a provider API key is configured, the gateway launches automatically as a managed subprocess with auto-restart. All state — config, workspace, sessions, and cron jobs — persists on a Railway volume at `/data` across redeploys. You'll need to set `ADMIN_PASSWORD` for the web UI and configure at least one LLM provider API key to get the gateway running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PicoClaw | [arjunkomath/picoclaw-railway-template](https://github.com/arjunkomath/picoclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | Auto generated admin portal password |
| `ADMIN_USERNAME` | (secret) | Admin portal username |
| `PICOCLAW_VERSION` | main | Git branch/tag to build PicoClaw from |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/template/picoclaw)
