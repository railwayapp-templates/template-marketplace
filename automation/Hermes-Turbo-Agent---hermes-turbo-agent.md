# Deploy Hermes-Turbo-Agent on Railway

Hermes Agent, pre-hardened: secure dash, self-improving, TURBO MODE

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-turbo-agent)

## About

Hermes Agent is an open-source, self-improving AI agent by Nous Research. It remembers you across sessions, builds its own skills, browses the web, runs code, and talks to you through Telegram or a web dashboard. This template deploys it in one click, pre-hardened, so grug not fight config for 3 hours. Grug click. Agent live.

TLDR: one container, one volume, zero drama. This template runs the official `nousresearch/hermes-agent` Docker image in gateway mode (`gateway run`), with a Railway Volume mounted at `/opt/data` so the agent's brain (memories, skills, config, sessions) survives every restart and redeploy. The web dashboard ships ENABLED and PASSWORD-PROTECTED out of the box: most Hermes templates either skip the dashboard or ship it broken since the June 2026 auth hardening. This one generates unique credentials per deploy with Railway's secret() helper, so no two deployments share a key. Restart policy is set to always claw itself back up. Big image, so first pull takes a few minutes. That's the toll bridge, pay it once.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nousresearch/hermes-agent:latest | `nousresearch/hermes-agent:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `XAI_API_KEY` | (secret) | Your XAi API key from console.x.ai for Grok  |
| `DEEPSEEK_API_KEY` | (secret) | Your DeepSeek API key from platform.deepseek.com for DeepSeek models |
| `HERMES_DASHBOARD` | 1 | - |
| `ANTHROPIC_API_KEY` | (secret) | Your Anthropic API key from console.anthropic.com for Claude models |
| `TELEGRAM_BOT_TOKEN` | (secret) | Get one in 60 seconds from @BotFather in Telegram |
| `HERMES_DASHBOARD_HOST` | 0.0.0.0 | - |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) | - |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | - |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | - |

## Configuration

- **Start command:** `/init /opt/hermes/docker/main-wrapper.sh gateway run`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/hermes-turbo-agent)
